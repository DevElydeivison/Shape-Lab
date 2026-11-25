export type Workout={day:string;name:string;focus:string;items:[string,string][]};
export type Meal={time:string;name:string;detail:string;kcal:number;protein:number};
export const WORKOUTS:Workout[]=[
{day:'Segunda',name:'Inferior A',focus:'Quadríceps e glúteos',items:[['Hack machine','3 × 6–10'],['Leg press 45°','3 × 10–12'],['Elevação pélvica','3 × 8–12'],['Cadeira extensora','2 × 12–15'],['Mesa flexora','2 × 10–15'],['Panturrilha sentado','4 × 10–15']]},
{day:'Terça',name:'Superior A',focus:'Peito, costas e ombros',items:[['Supino reto na máquina','3 × 6–10'],['Barra fixa ou puxada alta','3 × 6–10'],['Supino inclinado com halteres','2 × 8–12'],['Remada iso-lateral','3 × 8–12'],['Crucifixo voador','2 × 10–15'],['Elevação lateral com halteres','3 × 12–20'],['Crucifixo invertido','2 × 12–20']]},
{day:'Quarta',name:'Ombros e braços',focus:'Deltoides, bíceps e tríceps',items:[['Desenvolvimento na máquina','3 × 8–12'],['Elevação lateral na polia','3 × 12–20'],['Crucifixo invertido','2 × 12–20'],['Rosca direta barra W','3 × 8–12'],['Rosca martelo','2 × 10–12'],['Tríceps francês','3 × 10–12'],['Tríceps corda','2 × 10–15']]},
{day:'Quinta',name:'Inferior B',focus:'Posteriores e glúteos',items:[['Stiff com barra ou halteres','3 × 8–10'],['Cadeira flexora','3 × 10–15'],['Agachamento livre','2 × 8–10'],['Passada com halteres','2 × 10 por perna'],['Elevação pélvica','2 × 10–12'],['Panturrilha em pé','4 × 10–15']]},
{day:'Sexta',name:'Superior B',focus:'Costas, peito e braços',items:[['Puxada alta','3 × 8–12'],['Remada baixa iso-lateral','3 × 8–12'],['Supino reto com halteres','2 × 8–12'],['Supino inclinado na máquina','2 × 8–12'],['Crossover na polia','1 × 12–15'],['Elevação lateral com halteres','2 × 12–20'],['Rosca inclinada com halteres','3 × 10–12'],['Tríceps na polia','3 × 10–15']]}
];
export const MEALS:Meal[]=[{time:'05:35',name:'Pré-treino',detail:'Banana 100 g',kcal:90,protein:1},
{time:'07:30',name:'Café da manhã',detail:'Pão francês 50 g, 2 ovos mexidos (100 g), manteiga 5 g e mamão 100 g',kcal:360,protein:19},
{time:'10:00',name:'Shake Dark Mass 1',detail:'Dark Mass 75 g (2 dosadores estimados), leite integral 200 ml e banana 100 g',kcal:505,protein:17},
{time:'12:30',name:'Almoço',detail:'Arroz cozido 180 g, feijão 120 g, frango grelhado 90 g, legumes 100 g e azeite 5 g',kcal:550,protein:37},
{time:'16:00',name:'Shake Dark Mass 2',detail:'Dark Mass 75 g (2 dosadores estimados), leite integral 200 ml e banana 100 g',kcal:505,protein:17},
{time:'19:30',name:'Jantar',detail:'Cuscuz pronto 180 g, frango desfiado 60 g, legumes 100 g e azeite 5 g',kcal:375,protein:24},
{time:'21:00',name:'Ceia reforçada',detail:'2 ovos mexidos (100 g), pão francês 50 g e queijo minas 30 g',kcal:355,protein:23}
];
