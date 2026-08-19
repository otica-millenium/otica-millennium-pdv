import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  LayoutDashboard, ShoppingCart, Users, Glasses, ScanEye, ClipboardList,
  FlaskConical, Package, Truck, WalletCards, BellRing, Star, Settings,
  Search, Plus, Clock3, CheckCircle2, AlertTriangle, ChevronRight,
  Eye, FileImage, Camera, Save, X, MessageCircle, Heart, Menu
} from 'lucide-react'
import './styles.css'

const menu = [
  ['dashboard','Dashboard',LayoutDashboard],
  ['vendas','Nova venda',ShoppingCart],
  ['clientes','Clientes',Users],
  ['armacoes','Armações',Glasses],
  ['lentes','Lentes',ScanEye],
  ['os','Ordens de serviço',ClipboardList],
  ['laboratorio','Laboratório',FlaskConical],
  ['estoque','Estoque',Package],
  ['fornecedores','Fornecedores',Truck],
  ['financeiro','Financeiro',WalletCards],
  ['posvenda','Pós-venda',BellRing],
  ['avaliacoes','Avaliações',Star],
  ['config','Configurações',Settings],
]

const seedClients = [
  {id:1,nome:'Maria Aparecida',telefone:'(21) 99999-1001',ultima:'18/08/2026',proxima:'18/08/2027',oculos:'Multifocal 1.60 + AR'},
  {id:2,nome:'Joana Silva',telefone:'(21) 98888-2202',ultima:'02/08/2026',proxima:'02/08/2027',oculos:'Visão simples + filtro azul'},
]

function App(){
  const [active,setActive] = useState('dashboard')
  const [mobile,setMobile] = useState(false)
  const [clients,setClients] = useState(()=>JSON.parse(localStorage.getItem('millenium.clients')||'null')||seedClients)
  const saveClients = (next)=>{setClients(next);localStorage.setItem('millenium.clients',JSON.stringify(next))}

  return <div className="app-shell">
    <aside className={`sidebar ${mobile?'open':''}`}>
      <div className="brand"><img src="/logo-millenium.png"/><div><strong>Millenium</strong><span>ÓTICA • PDV</span></div></div>
      <nav>{menu.map(([id,label,Icon])=><button key={id} className={active===id?'active':''} onClick={()=>{setActive(id);setMobile(false)}}><Icon size={19}/><span>{label}</span></button>)}</nav>
      <div className="sidebar-foot"><small>Sistema independente</small><b>Ótica Millenium</b></div>
    </aside>
    <main>
      <header>
        <button className="menu-btn" onClick={()=>setMobile(!mobile)}><Menu size={22}/></button>
        <div><h1>{menu.find(x=>x[0]===active)?.[1]}</h1><p>Gestão óptica, vendas, laboratório e relacionamento</p></div>
        <div className="header-actions"><div className="search"><Search size={17}/><input placeholder="Buscar cliente, OS, armação..."/></div><div className="user-badge">HM</div></div>
      </header>
      <section className="page">
        {active==='dashboard' && <Dashboard clients={clients} setActive={setActive}/>} 
        {active==='clientes' && <Clientes clients={clients} saveClients={saveClients}/>} 
        {active==='vendas' && <Venda clients={clients}/>} 
        {active==='armacoes' && <Armacoes/>}
        {active==='lentes' && <Lentes/>}
        {active==='os' && <OS/>}
        {active==='laboratorio' && <Laboratorio/>}
        {active==='avaliacoes' && <Avaliacoes/>}
        {!['dashboard','clientes','vendas','armacoes','lentes','os','laboratorio','avaliacoes'].includes(active) && <Coming title={menu.find(x=>x[0]===active)?.[1]}/>} 
      </section>
    </main>
  </div>
}

function Dashboard({clients,setActive}){
  const stats=[
    ['Vendas hoje','R$ 1.280,00','+12%',ShoppingCart],
    ['Óculos em produção','8','3 para esta semana',FlaskConical],
    ['Prontos para retirada','4','avisar clientes',CheckCircle2],
    ['Retornos próximos','6','próximos 30 dias',BellRing],
  ]
  return <>
    <div className="hero"><div><span className="eyebrow">ÓTICA MILLENIUM</span><h2>Visão completa da sua ótica.</h2><p>Vendas, receitas, laboratório, estoque e histórico da cliente em um só lugar.</p><div className="hero-actions"><button className="primary" onClick={()=>setActive('vendas')}><Plus size={18}/>Nova venda</button><button onClick={()=>setActive('clientes')}><Users size={18}/>Cadastrar cliente</button></div></div><div className="hero-mark"><Eye size={64}/></div></div>
    <div className="stats">{stats.map(([a,b,c,Icon])=><div className="stat" key={a}><div className="stat-icon"><Icon size={21}/></div><span>{a}</span><strong>{b}</strong><small>{c}</small></div>)}</div>
    <div className="grid-2">
      <Card title="Fluxo do laboratório" action="Ver todas"><div className="pipeline">{[['Aguardando envio',2],['No laboratório',5],['Conferência',1],['Prontos',4]].map(([x,n])=><div><span>{x}</span><b>{n}</b></div>)}</div></Card>
      <Card title="Clientes para relacionamento" action="Ver clientes"><div className="rows">{clients.map(c=><div className="row" key={c.id}><div className="avatar">{c.nome.slice(0,1)}</div><div className="grow"><b>{c.nome}</b><span>Última compra: {c.ultima}</span></div><button className="icon-btn"><MessageCircle size={18}/></button></div>)}</div></Card>
    </div>
    <Card title="Pedidos em andamento" action="Abrir laboratório"><table><thead><tr><th>OS</th><th>Cliente</th><th>Serviço</th><th>Enviado</th><th>Prazo</th><th>Status</th></tr></thead><tbody><tr><td>#000152</td><td>Maria Aparecida</td><td>Multifocal 1.60 + AR</td><td>18/08 16:47</td><td>26/08</td><td><Badge>Em produção</Badge></td></tr><tr><td>#000153</td><td>Joana Silva</td><td>VS + filtro azul</td><td>19/08 09:12</td><td>22/08</td><td><Badge tone="warn">Aguardando</Badge></td></tr></tbody></table></Card>
  </>
}

function Clientes({clients,saveClients}){
  const [open,setOpen]=useState(false)
  const [selected,setSelected]=useState(null)
  const [form,setForm]=useState({nome:'',telefone:'',cpf:'',nascimento:'',email:'',endereco:''})
  const add=()=>{if(!form.nome.trim())return; const next=[...clients,{id:Date.now(),...form,ultima:'—',proxima:'—',oculos:'Sem histórico'}]; saveClients(next);setOpen(false);setForm({nome:'',telefone:'',cpf:'',nascimento:'',email:'',endereco:''})}
  return <>
    <div className="toolbar"><div><h2>Clientes</h2><p>Cadastro, receitas, histórico de óculos e renovações.</p></div><button className="primary" onClick={()=>setOpen(true)}><Plus size={18}/>Novo cliente</button></div>
    <div className="client-grid">{clients.map(c=><div className="client-card" key={c.id} onClick={()=>setSelected(c)}><div className="avatar lg">{c.nome.slice(0,1)}</div><div><h3>{c.nome}</h3><p>{c.telefone}</p></div><div className="client-meta"><span>Última compra<b>{c.ultima}</b></span><span>Último óculos<b>{c.oculos}</b></span></div><button>Ver ficha <ChevronRight size={16}/></button></div>)}</div>
    {open&&<Modal title="Novo cliente" close={()=>setOpen(false)}><div className="form-grid">{[['Nome completo','nome'],['WhatsApp','telefone'],['CPF','cpf'],['Nascimento','nascimento'],['E-mail','email'],['Endereço','endereco']].map(([l,k])=><label><span>{l}</span><input value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})}/></label>)}</div><div className="modal-actions"><button onClick={()=>setOpen(false)}>Cancelar</button><button className="primary" onClick={add}><Save size={17}/>Salvar cliente</button></div></Modal>}
    {selected&&<ClientSheet client={selected} close={()=>setSelected(null)}/>} 
  </>
}

function ClientSheet({client,close}){
  return <div className="drawer-backdrop" onClick={close}><div className="drawer" onClick={e=>e.stopPropagation()}><div className="drawer-head"><div><span>Ficha da cliente</span><h2>{client.nome}</h2><p>{client.telefone}</p></div><button className="icon-btn" onClick={close}><X/></button></div>
    <div className="tabs"><button className="active">Resumo</button><button>Receitas</button><button>Compras</button><button>OS</button><button>Documentos</button><button>Histórico</button></div>
    <div className="sheet-body">
      <div className="grid-2"><Card title="Último óculos"><div className="detail-list"><p><span>Tipo</span><b>Óculos completo</b></p><p><span>Lente</span><b>{client.oculos}</b></p><p><span>Armação</span><b>ML-3052 • Rose</b></p><p><span>Valor pago</span><b>R$ 649,90</b></p></div></Card><Card title="Receita utilizada"><div className="rx-grid"><b></b><b>OD</b><b>OE</b><span>Esférico</span><strong>-2,00</strong><strong>-1,75</strong><span>Cilíndrico</span><strong>-0,75</strong><strong>-0,50</strong><span>Eixo</span><strong>90°</strong><strong>80°</strong><span>DNP</span><strong>31</strong><strong>30</strong></div><button className="soft"><FileImage size={17}/>Ver receita original</button></Card></div>
      <Card title="Linha do tempo"><div className="timeline">{[['18/08/2026 14:32','Venda criada'],['18/08/2026 16:47','Pedido enviado ao laboratório'],['25/08/2026 11:18','Recebido do laboratório'],['25/08/2026 12:05','Conferido pela ótica'],['25/08/2026 13:20','Cliente avisada'],['26/08/2026 17:41','Entregue à cliente']].map(([d,t])=><div><i></i><span>{d}</span><b>{t}</b></div>)}</div></Card>
    </div></div></div>
}

function Venda({clients}){
  const [tipo,setTipo]=useState('completo')
  return <><div className="toolbar"><div><h2>Nova venda</h2><p>Selecione o tipo de atendimento para exibir apenas os campos necessários.</p></div></div>
    <div className="sale-types">{[['completo','Óculos completo','Armação + lentes + receita'],['lentes','Somente lentes','Troca de lentes / nova receita'],['armacao','Somente armação','Venda avulsa de armação'],['servico','Serviço / ajuste','Manutenção e assistência']].map(([id,a,b])=><button className={tipo===id?'active':''} onClick={()=>setTipo(id)}><Glasses/><b>{a}</b><span>{b}</span></button>)}</div>
    <div className="grid-2"><Card title="1. Cliente"><label><span>Selecionar cliente</span><select><option>Escolha...</option>{clients.map(c=><option>{c.nome}</option>)}</select></label><button className="soft"><Plus size={17}/>Cadastrar novo</button></Card>{tipo!=='armacao'&&tipo!=='servico'?<Card title="2. Receita e medidas"><div className="rx-grid editable"><b></b><b>OD</b><b>OE</b><span>Esférico</span><input/><input/><span>Cilíndrico</span><input/><input/><span>Eixo</span><input/><input/><span>DNP</span><input/><input/></div><div className="doc-actions"><button className="soft"><Camera size={17}/>Tirar foto</button><button className="soft"><FileImage size={17}/>Anexar receita</button></div></Card>:<Card title="2. Produto / serviço"><p className="muted">Fluxo simplificado: não exige receita óptica.</p></Card>}</div>
    <Card title="3. Itens da venda"><div className="empty-state"><Glasses size={38}/><b>Adicione os itens da venda</b><span>Armação, lentes, tratamentos e serviços aparecerão aqui.</span><button className="primary"><Plus size={17}/>Adicionar item</button></div></Card>
  </>
}

function Armacoes(){return <><div className="toolbar"><div><h2>Armações</h2><p>Estoque por modelo e cor, custo, venda, fornecedor e catálogo.</p></div><button className="primary"><Plus size={18}/>Nova armação</button></div><div className="product-grid">{[['ML-3052','Rose','52-17-140','R$ 199,90',1],['ML-1840','Preto','54-18-140','R$ 179,90',2],['ML-2207','Dourado','53-17-138','R$ 229,90',3]].map(([m,c,t,p,e])=><div className="product-card"><div className="product-photo"><Glasses size={56}/><span>{e} em estoque</span></div><h3>{m}</h3><p>{c} • {t}</p><strong>{p}</strong><div><button className="soft"><Eye size={16}/>Detalhes</button><button className="icon-btn"><Heart size={17}/></button></div></div>)}</div></>}
function Lentes(){return <><div className="toolbar"><div><h2>Lentes</h2><p>Catálogo técnico, custos, tratamentos e laboratórios.</p></div><button className="primary"><Plus size={18}/>Cadastrar lente</button></div><Card title="Tabela de lentes"><table><thead><tr><th>Tipo</th><th>Material</th><th>Índice</th><th>Tratamentos</th><th>Laboratório</th><th>Custo</th><th>Venda</th></tr></thead><tbody><tr><td>Multifocal</td><td>Resina</td><td>1.60</td><td>AR + UV</td><td>Vision Lab</td><td>R$ 210,00</td><td>R$ 490,00</td></tr><tr><td>Visão simples</td><td>Policarbonato</td><td>1.59</td><td>Filtro azul</td><td>Óptica Lab</td><td>R$ 85,00</td><td>R$ 219,90</td></tr></tbody></table></Card></>}
function OS(){return <><div className="toolbar"><div><h2>Ordens de serviço</h2><p>Guia completa para o laboratório e rastreabilidade de datas e horários.</p></div><button className="primary"><Plus size={18}/>Nova OS</button></div><Card title="OS em andamento"><table><thead><tr><th>OS</th><th>Cliente</th><th>Tipo</th><th>Laboratório</th><th>Enviado em</th><th>Previsão</th><th>Status</th></tr></thead><tbody><tr><td>#000152</td><td>Maria Aparecida</td><td>Óculos completo</td><td>Vision Lab</td><td>18/08/2026 16:47</td><td>26/08/2026</td><td><Badge>Em produção</Badge></td></tr></tbody></table></Card></>}
function Laboratorio(){return <><div className="toolbar"><div><h2>Laboratório</h2><p>Acompanhe o pedido desde o envio até a entrega à cliente.</p></div></div><div className="kanban">{[['Aguardando envio',['#153 Joana Silva']],['Enviado ao laboratório',['#152 Maria Aparecida','#154 Carla Souza']],['Recebido / conferência',['#150 Ana Lima']],['Pronto para retirada',['#148 Paula Rocha','#149 Sonia Alves']]].map(([title,items])=><div className="kanban-col"><h3>{title}<span>{items.length}</span></h3>{items.map(x=><div className="kanban-card"><b>{x}</b><span>Prazo: 26/08</span><small>Vision Lab</small></div>)}</div>)}</div></>}
function Avaliacoes(){return <><div className="toolbar"><div><h2>Avaliações</h2><p>Avaliações verificadas de armações e da experiência com a Ótica Millenium.</p></div></div><div className="stats"><div className="stat"><span>Nota geral</span><strong>4,9 ★</strong><small>127 avaliações verificadas</small></div><div className="stat"><span>Atendimento</span><strong>4,9</strong><small>média dos clientes</small></div><div className="stat"><span>Qualidade</span><strong>4,8</strong><small>armações e serviço</small></div><div className="stat"><span>Prazo</span><strong>4,7</strong><small>laboratório e entrega</small></div></div><Card title="Últimas avaliações"><div className="review"><div className="avatar">M</div><div><b>Maria S. <em>Compra verificada</em></b><span>★★★★★ • Armação ML-3052 Rose</span><p>Armação linda e muito leve. Atendimento excelente.</p></div></div></Card></>}
function Coming({title}){return <div className="coming"><div><Settings size={42}/><h2>{title}</h2><p>Módulo reservado na estrutura inicial. Vamos desenvolver esta área na próxima etapa.</p></div></div>}
function Card({title,action,children}){return <div className="card"><div className="card-head"><h3>{title}</h3>{action&&<button>{action}<ChevronRight size={15}/></button>}</div>{children}</div>}
function Badge({children,tone}){return <span className={`badge ${tone||''}`}>{children}</span>}
function Modal({title,close,children}){return <div className="modal-backdrop" onClick={close}><div className="modal" onClick={e=>e.stopPropagation()}><div className="modal-head"><h3>{title}</h3><button className="icon-btn" onClick={close}><X size={20}/></button></div>{children}</div></div>}

createRoot(document.getElementById('root')).render(<App/>)
