import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { BookOpen, BrainCircuit, Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle.jsx'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Learn', to: '/learn' },
  { label: 'Articles', to: '/articles' },
  { label: 'ML Playground', to: '/playground' },
  { label: 'About', to: '/about' },
]

export default function Navbar({ theme, onThemeChange }) {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link className="brand" to="/" aria-label="NeuralNotes home" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark"><BrainCircuit size={20} aria-hidden="true" /></span>
          <span>Neural<em>Notes</em></span>
        </Link>
        <nav className={`nav-links${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          {links.map((link) => <NavLink key={link.to} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to={link.to} end={link.to === '/'} onClick={() => setMenuOpen(false)}>{link.label}</NavLink>)}
        </nav>
        <div className="nav-actions">
          <ThemeToggle theme={theme} onChange={onThemeChange} />
          <Link className="icon-button" to="/articles?saved=1" aria-label="View saved articles" title="Saved articles"><BookOpen size={18} /></Link>
          <button className="icon-button menu-button" type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
        </div>
      </div>
    </header>
  )
}