import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from './supabase'

export function Home() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)

  async function login() {
    setBusy(true)
    setMessage('')
    try {
      if (!supabase) throw new Error('Configure o Supabase nas variáveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.')
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      setMessage('Login realizado com sucesso.')
      setOpen(false)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Não foi possível entrar agora.')
    } finally { setBusy(false) }
  }

  return <main className="vault-page">
    <nav className="vault-nav"><Link className="vault-brand" to="/">VAULT<span>PRIME</span></Link><div className="vault-links"><a href="#manifesto">Manifesto</a><a href="#access">Acesso</a><button className="glass-control" onClick={() => setOpen(true)}>Entrar</button></div></nav>
    <section className="vault-hero"><div className="hero-image" /><div className="hero-vignette" /><div className="hero-copy"><p className="kicker">DIGITAL VAULT · 001</p><h1>Seu conteúdo.<br /><i>Seu universo.</i></h1><p className="hero-lede">Uma experiência privada para descobrir, adquirir e acessar aquilo que realmente importa.</p><div className="hero-actions"><a className="gold-control" href="#access">Explorar coleção <span>↗</span></a><button className="quiet-control" onClick={() => setOpen(true)}>Já sou membro</button></div></div><div className="hero-index">Nº 01<br /><span>EST. 2024</span></div><div className="scroll-note">SCROLL TO ENTER <span>↓</span></div></section>
    <section id="manifesto" className="manifesto"><div><p className="kicker">A EXPERIÊNCIA</p><h2>Menos ruído.<br /><i>Mais intenção.</i></h2></div><p className="manifesto-copy">Vault Prime foi feito para quem valoriza curadoria, acesso simples e uma estética que não precisa gritar. Produtos digitais, arquivos e experiências reunidos em um só lugar.</p></section>
    <section id="access" className="access-section"><div className="section-heading"><div><p className="kicker">COMO FUNCIONA</p><h2>Entre quando quiser.</h2></div><p>Três movimentos, zero complicação.</p></div><div className="access-grid"><article><strong>01</strong><h3>Descubra</h3><p>Uma coleção enxuta, pensada para encontrar o essencial.</p></article><article><strong>02</strong><h3>Escolha</h3><p>Detalhes claros, checkout seguro e uma decisão sem pressa.</p></article><article><strong>03</strong><h3>Acesse</h3><p>Seu conteúdo fica disponível para você, no seu ritmo.</p></article></div></section>
    <footer className="vault-footer"><span>VAULT PRIME</span><span>PRIVATE DIGITAL GOODS · 2024</span><button onClick={() => setOpen(true)}>Área de membro ↗</button></footer>
    {open && <div className="auth-backdrop"><div className="auth-card"><button className="close-control" onClick={() => setOpen(false)} aria-label="Fechar">×</button><p className="kicker">VAULT PRIME · MEMBER ACCESS</p><h2>Bem-vindo de volta.</h2><p className="auth-subtitle">Acesse seu universo privado.</p><form onSubmit={event => { event.preventDefault(); void login() }}><input aria-label="E-mail" type="email" placeholder="E-mail" value={email} onChange={event => setEmail(event.target.value)} required /><input aria-label="Senha" type="password" placeholder="Senha" value={password} onChange={event => setPassword(event.target.value)} required /><button className="gold-control submit-control" disabled={busy}>{busy ? 'Aguarde…' : 'Entrar na Vault'}</button></form>{message && <p className="auth-message">{message}</p>}<Link className="switch-control" to="/login">Criar uma conta ou recuperar senha</Link></div></div>}
  </main>
}
