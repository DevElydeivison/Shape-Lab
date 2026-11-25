import {useSyncExternalStore} from 'react';
export type Day={water:number;meals:number[];workouts:Record<string,boolean>;loads:Record<string,string>;sleepStart:string;sleepEnd:string;sleepSaved:boolean};
export type Photo={id:string;date:string;weight:number;note:string;image:string};
export type Task={id:string;title:string;date:string;done:boolean;priority:"low"|"medium"|"high"};
export type Event={id:string;title:string;date:string;time:string;description:string};
export type Note={id:string;title:string;body:string;category:string;updatedAt:string;pinned:boolean};
export type Account={id:string;name:string;openingCents:number};
export type FinanceCategory={id:string;name:string;kind:"expense"|"income"};
export type Transaction={id:string;accountId:string;categoryId:string;kind:"expense"|"income";amountCents:number;date:string;description:string};
export type Life={tasks:Task[];events:Event[];notes:Note[];accounts:Account[];categories:FinanceCategory[];transactions:Transaction[]};
export type Data={life:Life;profile:{name:string;email:string;startWeight:number;goal:number};days:Record<string,Day>;weights:{date:string;value:number}[];photos:Photo[];settings:{waterGoal:number;sleepGoal:number}};
const KEY='shapelab-v3';const initialLife=():Life=>({tasks:[],events:[],notes:[],accounts:[{id:'main',name:'Conta principal',openingCents:0}],categories:[{id:'food',name:'Alimentação',kind:'expense'},{id:'transport',name:'Transporte',kind:'expense'},{id:'housing',name:'Moradia',kind:'expense'},{id:'health',name:'Saúde',kind:'expense'},{id:'leisure',name:'Lazer',kind:'expense'},{id:'other',name:'Outros',kind:'expense'},{id:'salary',name:'Salário',kind:'income'},{id:'extra',name:'Renda extra',kind:'income'}],transactions:[]});const LEGACY='shapelab-v2';const DEFAULT:Data={life:initialLife(),profile:{name:'Atleta',email:'',startWeight:50,goal:60},days:{},weights:[{date:'2026-11-23',value:56.35}],photos:[],settings:{waterGoal:2500,sleepGoal:8}};
export const today=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
const newDay=():Day=>({water:0,meals:[],workouts:{},loads:{},sleepStart:'22:00',sleepEnd:'05:30',sleepSaved:false});
function valid(x:unknown):x is Data {if(!x||typeof x!=='object')return false;const v=x as Partial<Data>;return !!v.profile&&typeof v.profile.name==='string'&&typeof v.profile.goal==='number'&&!!v.days&&typeof v.days==='object'&&Array.isArray(v.weights)&&Array.isArray(v.photos)&&!!v.settings;}
function load():Data{for(const key of [KEY,LEGACY]){try{const raw=localStorage.getItem(key);if(raw){const parsed:unknown=JSON.parse(raw);if(valid(parsed))return {...parsed,life:{...initialLife(),...(parsed.life??{})}};}}catch{}}return structuredClone(DEFAULT)}
let data=load();let snapshot={data,revision:0};const listeners=new Set<()=>void>();let error='';
function emit(){snapshot={data,revision:snapshot.revision+1};listeners.forEach(l=>l())}
export function getError(){return error}
export function useStore(){return useSyncExternalStore(cb=>{listeners.add(cb);return()=>listeners.delete(cb)},()=>snapshot)}
export function mutate(fn:(draft:Data)=>void){const draft=structuredClone(data);fn(draft);try{localStorage.setItem(KEY,JSON.stringify(draft));data=draft;error='';emit();return true}catch{error='Não foi possível salvar: armazenamento do navegador cheio. Exporte seus dados ou remova fotos.';emit();return false}}
export function restore(v:unknown){if(!valid(v))throw Error('Backup incompatível');const cleaned={...structuredClone(v),life:{...initialLife(),...((v as Partial<Data>).life??{})}} as Data;if(!Number.isFinite(cleaned.profile.goal)||cleaned.weights.some(w=>!Number.isFinite(w.value))||cleaned.photos.some(p=>typeof p.image!=='string'||!p.image.startsWith('data:image/')))throw Error('Backup contém valores inválidos');if(!mutate(d=>{Object.assign(d,cleaned)}))throw Error(getError())}
export function day(d:Data,date=today()):Day{return d.days[date]??newDay()}
export function editDay(date:string,fn:(v:Day)=>void){return mutate(d=>{if(!d.days[date])d.days[date]=newDay();fn(d.days[date])})}
export const currentWeight=(d:Data)=>[...d.weights].sort((a,b)=>a.date.localeCompare(b.date)).at(-1)?.value??d.profile.startWeight;
export const pct=(v:number,total:number)=>Math.max(0,Math.min(100,Math.round(100*v/Math.max(0.01,total))));
export const fmt=(v:number)=>Number(v).toLocaleString('pt-BR',{maximumFractionDigits:2});
export function sleepHours(d:Day){if(!d.sleepSaved)return 0;const [h,m]=d.sleepStart.split(':').map(Number),[eh,em]=d.sleepEnd.split(':').map(Number);let minutes=(eh*60+em)-(h*60+m);if(minutes<=0)minutes+=1440;return minutes/60}
export function downloadBackup(d:Data){const url=URL.createObjectURL(new Blob([JSON.stringify(d,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=`shapelab-backup-${today()}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}

export const uid=()=>crypto.randomUUID();
export const brl=(cents:number)=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(cents/100);
export function parseMoney(input:string){const value=Number(input.replace(",","."));return Number.isFinite(value)&&value>0?Math.round(value*100):null}
