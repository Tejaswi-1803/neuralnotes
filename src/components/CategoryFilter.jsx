export default function CategoryFilter({ categories, value, onChange, label = 'Category' }) {
  return <div className="filter-field"><label htmlFor="category-filter">{label}</label><select id="category-filter" value={value} onChange={(event) => onChange(event.target.value)}>{categories.map((category) => <option key={category} value={category}>{category}</option>)}</select></div>
}