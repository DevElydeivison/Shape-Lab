const BASE=(import.meta.env.VITE_API_URL||'http://localhost:3333')+'/api/v1';
export type ApiUser={id:string;name:string;email:string};
export async function api<T>(path:string,options:RequestInit={}):Promise<T>{
 const res=await fetch(BASE+path,{...options,credentials:'include',headers:{'Content-Type':'application/json',...options.headers}});
 if(!res.ok){const body=await res.json().catch(()=>({error:'Erro de conexão'}));throw new Error(body.error||`Erro ${res.status}`)}
 return res.status===204?undefined as T:res.json() as Promise<T>;
}
export const authApi={me:()=>api<{user:ApiUser}>('/users/me'),register:(name:string,email:string,password:string)=>api<{user:ApiUser}>('/auth/register',{method:'POST',body:JSON.stringify({name,email,password})}),login:(email:string,password:string)=>api<{user:ApiUser}>('/auth/login',{method:'POST',body:JSON.stringify({email,password})}),logout:()=>api<void>('/auth/logout',{method:'POST'})};
