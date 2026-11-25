import 'dotenv/config';
import express, {type Request, type Response, type NextFunction} from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {rateLimit} from 'express-rate-limit';
import {PrismaClient} from '@prisma/client';
import argon2 from 'argon2';
import {randomBytes,createHash} from 'node:crypto';
import {z,ZodError} from 'zod';
const db=new PrismaClient();
const app=express();
app.disable('x-powered-by');
app.use(helmet());
app.use(cors({origin:process.env.WEB_ORIGIN||'http://localhost:5173',credentials:true}));
app.use(express.json({limit:'32kb'}));
app.use(cookieParser());
const production=process.env.NODE_ENV==='production';
const cookieName=production?'__Host-shapelab_session':'shapelab_session';
const cookieOptions={httpOnly:true,secure:production,sameSite:'lax' as const,path:'/'};
const authLimit=rateLimit({windowMs:15*60*1000,limit:15,standardHeaders:'draft-7',legacyHeaders:false,message:{error:'Muitas tentativas. Tente novamente mais tarde.'}});
const credentials=z.object({email:z.string().email().max(254).transform(v=>v.toLowerCase().trim()),password:z.string().min(10).max(128)});
const registration=credentials.extend({name:z.string().trim().min(2).max(80)});
const hash=(s:string)=>createHash('sha256').update(s).digest('hex');
const publicUser=(u:{id:string;name:string;email:string})=>({id:u.id,name:u.name,email:u.email});
async function startSession(res:Response,userId:string){
 const token=randomBytes(32).toString('base64url');
 await db.session.create({data:{userId,tokenHash:hash(token),expiresAt:new Date(Date.now()+7*86400000)}});
 res.cookie(cookieName,token,{...cookieOptions,maxAge:7*86400000});
}
type AuthRequest=Request & {userId?:string};
async function requireAuth(req:AuthRequest,res:Response,next:NextFunction){
 try{
  const token=req.cookies?.[cookieName];
  if(typeof token!=='string') {res.status(401).json({error:'Não autenticado'});return;}
  const session=await db.session.findUnique({where:{tokenHash:hash(token)}});
  if(!session||session.expiresAt<=new Date()){res.status(401).json({error:'Sessão expirada'});return;}
  req.userId=session.userId;next();
 }catch(e){next(e)}
}
app.get('/api/v1/health',(_req,res)=>res.json({status:'ok'}));
app.post('/api/v1/auth/register',authLimit,async(req,res,next)=>{
 try{
  const data=registration.parse(req.body);
  const exists=await db.user.findUnique({where:{email:data.email}});
  if(exists){res.status(409).json({error:'E-mail já cadastrado'});return;}
  const user=await db.user.create({data:{name:data.name,email:data.email,passwordHash:await argon2.hash(data.password,{type:argon2.argon2id})}});
  await startSession(res,user.id);res.status(201).json({user:publicUser(user)});
 }catch(e){next(e)}
});
app.post('/api/v1/auth/login',authLimit,async(req,res,next)=>{
 try{
  const data=credentials.parse(req.body);
  const user=await db.user.findUnique({where:{email:data.email}});
  if(!user||!(await argon2.verify(user.passwordHash,data.password))){res.status(401).json({error:'Credenciais inválidas'});return;}
  await startSession(res,user.id);res.json({user:publicUser(user)});
 }catch(e){next(e)}
});
app.post('/api/v1/auth/logout',async(req,res,next)=>{
 try{const token=req.cookies?.[cookieName];if(typeof token==='string')await db.session.deleteMany({where:{tokenHash:hash(token)}});res.clearCookie(cookieName,cookieOptions);res.status(204).send()}catch(e){next(e)}
});
app.get('/api/v1/users/me',requireAuth,async(req:AuthRequest,res,next)=>{
 try{const user=await db.user.findUnique({where:{id:req.userId},select:{id:true,name:true,email:true}});if(!user){res.status(404).json({error:'Usuário não encontrado'});return;}res.json({user})}catch(e){next(e)}
});
app.get('/api/v1/weight-logs',requireAuth,async(req:AuthRequest,res,next)=>{
 try{res.json({items:await db.weightLog.findMany({where:{userId:req.userId},orderBy:{recordedAt:'desc'},take:100})})}catch(e){next(e)}
});
app.post('/api/v1/weight-logs',requireAuth,async(req:AuthRequest,res,next)=>{
 try{const {weightKg,recordedAt}=z.object({weightKg:z.number().min(20).max(400),recordedAt:z.string().datetime().optional()}).parse(req.body);const item=await db.weightLog.create({data:{userId:req.userId!,weightKg,recordedAt:recordedAt?new Date(recordedAt):new Date()}});res.status(201).json({item})}catch(e){next(e)}
});
app.use((err:unknown,_req:Request,res:Response,_next:NextFunction)=>{
 if(err instanceof ZodError){res.status(400).json({error:'Dados inválidos',issues:err.flatten()});return;}
 console.error(err);res.status(500).json({error:'Erro interno'});
});
const port=Number(process.env.PORT||3333);
app.listen(port,()=>console.log(`ShapeLab API: http://localhost:${port}`));
process.on('SIGINT',async()=>{await db.$disconnect();process.exit(0)});
