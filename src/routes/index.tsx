import { createFileRoute } from '@tanstack/react-router'
import { useState, type FormEvent } from 'react'
import { supabase } from '../../supabase'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Vault Prime — Seu conteúdo, seu universo' },
      { name: 'description', content: 'Uma vitrine premium para seus produtos digitais.' },
    ],
  }),
  component: Home,
})

function Home() {
  const [authOpen, setAuthOpen] = useState(false)
  const [register, setRegister] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusy(true)
    setMessage('')
    try {
      if (!supabase) throw new Error('Configure VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY para ativar o acesso.')
      const result = register
        ? await supabase.auth.signUp({ email, password, options: { data: { name } } })
        : await supabase.auth.signInWithPassword({ email, password })
      if (result.error) throw result.error
      setMessage(register ? 'Conta criada. Verifique seu e-mail para continuar.' : 'Login realizado com sucesso.')
      if (!register) setAuthOpen(false)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Não foi possível entrar agora.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="vault-page">
      <nav className="vault-nav"><a className="vault-brand" href="#top">VAULT<span>PRIME</span></a><div className="vault-links"><a href="#manifesto">Manifesto</a><a href="#access">Acesso</a><button className="glass-control" onClick={() => setAuthOpen(true)}>Entrar</button></div></nav>
      <section id="top" className="vault-hero"><div className="hero-image" aria-hidden="true" /><div className="hero-vignette" aria-hidden="true" /><div className="hero-copy"><p className="kicker">DIGITAL VAULT · 001</p><h1>Seu conteúdo.<br /><i>Seu universo.</i></h1><p className="hero-lede">Uma experiência privada para descobrir, adquirir e acessar aquilo que realmente importa.</p><div className="hero-actions"><button className="gold-control" onClick={() => document.getElementById('access')?.scrollIntoView({ behavior: 'smooth' })}>Explorar coleção <span>↗</span></button><button className="quiet-control" onClick={() => setAuthOpen(true)}>Já sou membro</button></div></div><div className="hero-index">Nº 01<br /><span>EST. 2024</span></div><div className="scroll-note">SCROLL TO ENTER <span>↓</span></div></section>
      <section id="manifesto" className="manifesto"><div><p className="kicker">A EXPERIÊNCIA</p><h2>Menos ruído.<br /><i>Mais intenção.</i></h2></div><p className="manifesto-copy">Vault Prime foi feito para quem valoriza curadoria, acesso simples e uma estética que não precisa gritar. Produtos digitais, arquivos e experiências reunidos em um só lugar.</p></section>
      <section id="access" className="access-section"><div className="section-heading"><div><p className="kicker">COMO FUNCIONA</p><h2>Entre quando quiser.</h2></div><p>Três movimentos, zero complicação.</p></div><div className="access-grid"><article><strong>01</strong><h3>Descubra</h3><p>Uma coleção enxuta, pensada para encontrar o essencial.</p></article><article><strong>02</strong><h3>Escolha</h3><p>Detalhes claros, checkout seguro e uma decisão sem pressa.</p></article><article><strong>03</strong><h3>Acesse</h3><p>Seu conteúdo fica disponível para você, no seu ritmo.</p></article></div></section>
      <footer className="vault-footer"><span>VAULT PRIME</span><span>PRIVATE DIGITAL GOODS · 2024</span><button onClick={() => setAuthOpen(true)}>Área de membro ↗</button></footer>
      {authOpen && <div className="auth-backdrop" role="dialog" aria-modal="true" aria-label="Acesso Vault Prime"><div className="auth-card"><button className="close-control" onClick={() => setAuthOpen(false)} aria-label="Fechar">×</button><p className="kicker">VAULT PRIME · MEMBER ACCESS</p><h2>{register ? 'Criar conta' : 'Bem-vindo de volta.'}</h2><p className="auth-subtitle">{register ? 'Entre para guardar e acessar sua coleção.' : 'Acesse seu universo privado.'}</p><form onSubmit={submit}>{register && <input aria-label="Nome" placeholder="Nome" value={name} onChange={event => setName(event.target.value)} required />}<input aria-label="E-mail" type="email" placeholder="E-mail" value={email} onChange={event => setEmail(event.target.value)} required /><input aria-label="Senha" type="password" placeholder="Senha" minLength={6} value={password} onChange={event => setPassword(event.target.value)} required /><button className="gold-control submit-control" disabled={busy}>{busy ? 'Aguarde…' : register ? 'Criar minha conta' : 'Entrar na Vault'}</button></form>{message && <p className="auth-message">{message}</p>}<button className="switch-control" onClick={() => { setRegister(!register); setMessage('') }}>{register ? 'Já tenho uma conta' : 'Ainda não sou membro'}</button></div></div>}
    </main>
  )
}
