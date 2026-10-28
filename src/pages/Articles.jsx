import { useMemo, useState } from 'react'
import { Bookmark, BookOpen } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import ArticleCard from '../components/ArticleCard.jsx'
import CategoryFilter from '../components/CategoryFilter.jsx'
import SearchBar from '../components/SearchBar.jsx'
import { articles, categories } from '../data/articles.js'
import { useSite } from '../utils/siteContext.js'

export default function Articles() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState(searchParams.get('category') || 'All topics')
  const [difficulty, setDifficulty] = useState('All levels')
  const [sort, setSort] = useState('featured')
  const [savedOnly, setSavedOnly] = useState(searchParams.get('saved') === '1')
  const { bookmarks, toggleBookmark } = useSite()

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    const result = articles.filter((article) => {
      const matchesQuery = !normalized || `${article.title} ${article.summary}`.toLowerCase().includes(normalized)
      return matchesQuery && (category === 'All topics' || article.category === category) && (difficulty === 'All levels' || article.difficulty === difficulty) && (!savedOnly || bookmarks.includes(article.slug))
    })
    if (sort === 'title') result.sort((a, b) => a.title.localeCompare(b.title))
    if (sort === 'reading-time') result.sort((a, b) => a.readTime - b.readTime || a.title.localeCompare(b.title))
    if (sort === 'featured') result.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
    return result
  }, [bookmarks, category, difficulty, query, savedOnly, sort])

  function changeCategory(value) {
    setCategory(value)
    const next = new URLSearchParams(searchParams)
    if (value === 'All topics') next.delete('category')
    else next.set('category', value)
    setSearchParams(next, { replace: true })
  }

  function toggleSavedOnly() {
    const nextValue = !savedOnly
    setSavedOnly(nextValue)
    const next = new URLSearchParams(searchParams)
    if (nextValue) next.set('saved', '1')
    else next.delete('saved')
    setSearchParams(next, { replace: true })
  }

  return <>
    <section className="page-intro"><div className="container"><span className="eyebrow">The NeuralNotes library</span><h1 className="page-title">Articles for curious minds</h1><p>Explore clear, practical guides to artificial intelligence, machine learning, neural networks, and the tools that bring them to life.</p></div></section>
    <section className="section articles-section"><div className="container">
      <div className="filter-panel">
        <div className="filter-field search-field"><label>Search</label><SearchBar value={query} onChange={setQuery} /></div>
        <CategoryFilter categories={categories} value={category} onChange={changeCategory} />
        <div className="filter-field"><label htmlFor="difficulty-filter">Difficulty</label><select id="difficulty-filter" value={difficulty} onChange={(event) => setDifficulty(event.target.value)}><option>All levels</option><option>Beginner</option><option>Intermediate</option></select></div>
        <div className="filter-field"><label htmlFor="sort-filter">Sort by</label><select id="sort-filter" value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured first</option><option value="title">Title (A–Z)</option><option value="reading-time">Reading time</option></select></div>
        <button className={`button button-quiet${savedOnly ? ' is-active' : ''}`} type="button" onClick={toggleSavedOnly} aria-pressed={savedOnly}><Bookmark size={15} /> Saved{savedOnly ? ' only' : ''}</button>
      </div>
      <div className="results-line"><span>{filtered.length} {filtered.length === 1 ? 'article' : 'articles'}{savedOnly ? ' saved' : ''}</span></div>
      {filtered.length ? <div className="articles-grid">{filtered.map((article) => <ArticleCard key={article.slug} article={article} saved={bookmarks.includes(article.slug)} onToggleBookmark={toggleBookmark} />)}</div> : <div className="empty-state"><BookOpen size={28} /><h2>{savedOnly && !bookmarks.length ? 'No saved articles yet' : 'No articles found'}</h2><p>{savedOnly && !bookmarks.length ? 'Save an article with the bookmark button and it will appear here.' : 'Try a different search or clear one of the filters.'}</p><button className="button button-secondary" type="button" onClick={() => { setQuery(''); setCategory('All topics'); setDifficulty('All levels'); setSavedOnly(false); setSearchParams({}, { replace: true }) }}>Clear filters</button></div>}
    </div></section>
  </>
}