const KEY='shapelab-v2';const OLD='shapelab-v1';
export const today=()=>{const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')};
const initial=()=>({profile:{name:'Atleta',email:'',startWeight:50,goal:60},days:{},weights:[{date:'2026-11-23',value:56.35}],photos:[],settings:{waterGoal:2500,sleepGoal:8}});
function migrate(){try{const o=JSON.parse(localStorage.getItem(OLD));if(!o||!o.days)return null;return {...initial(),days:o.days,weights:o.weights?.length?o.weights:initial().weights,settings:{...initial().settings,...o.settings},profile:{...initial().profile,goal:o.settings?.weightGoal||60}}}catch{return null}}
export let state;try{state=JSON.parse(localStorage.getItem(KEY))||migrate()||initial()}catch{state=initial()}
export function save(){try{localStorage.setItem(KEY,JSON.stringify(state));return true}catch{alert('Armazenamento cheio. Exporte um backup ou remova fotos antigas.');return false}}
export function replace(data){if(!data||typeof data!=='object'||!data.days||!Array.isArray(data.weights)||!Array.isArray(data.photos)||!data.profile)throw Error('Backup inválido');state=data;save()}
export function day(date=today()){if(!state.days[date])state.days[date]={water:0,meals:[],workouts:{},loads:{},sleepStart:'22:00',sleepEnd:'05:30',sleepSaved:false};return state.days[date]}
export const weight=()=>state.weights.length?state.weights[state.weights.length-1].value:56.35;
export const clamp=(n,min,max)=>Math.min(max,Math.max(min,n));
export const pct=(n,d)=>clamp(Math.round((n/Math.max(d,0.0001))*100),0,100);
export const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const fmt=n=>Number(n).toLocaleString('pt-BR',{maximumFractionDigits:2});
export function sleepHours(d){if(!d.sleepSaved)return 0;const [a,b]=d.sleepStart.split(':').map(Number),[c,e]=d.sleepEnd.split(':').map(Number);let t=c*60+e-a*60-b;if(t<=0)t+=1440;return t/60}
export function exportData(){const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`shapelab-backup-${today()}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
