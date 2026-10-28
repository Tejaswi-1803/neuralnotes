import { Search } from 'lucide-react'

export default function SearchBar({ value, onChange, placeholder = 'Search articles...' }) {
  return <div className="search-input-wrap"><Search size={16} aria-hidden="true" /><input type="search" value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} aria-label="Search articles by title or summary" /></div>
}