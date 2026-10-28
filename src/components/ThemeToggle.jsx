import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle({ theme, onChange }) {
  return <button className="icon-button" type="button" onClick={onChange} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} title="Toggle color theme">{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button>
}