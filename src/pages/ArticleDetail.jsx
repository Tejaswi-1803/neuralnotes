import { useMemo } from 'react'
import { ArrowLeft, Bookmark, BookmarkCheck, Clock3 } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import ArticleCard from '../components/ArticleCard.jsx'
import CodeBlock from '../components/CodeBlock.jsx'
import ImageWithFallback from '../components/ImageWithFallback.jsx'
import { articles } from '../data/articles.js'
import { useSite } from '../utils/siteContext.js'

export default function ArticleDetail() {
  const { slug } = useParams()
  const article = articles.find((item) => item.slug === slug)
  const { bookmarks, toggleBookmark } = useSite()
  const headings = useMemo(() => article?.sections.filter((section) => section.type === 'heading') || [], [article])

  if (!article) return <section className="not-found"><div><h1>Article not found</h1><p>This note may have moved or the address may be incomplete.</p><Link className="button button-primary" to="/articles">Back to articles</Link></div></section>

  const related = articles.filter((item) => item.slug !== article.slug && item.category === article.category).slice(0, 3)
  return <>
    <div className="article-layout"><article className="article-main">
      <Link className="back-link" to="/articles"><ArrowLeft size={16} /> Back to articles</Link>
      <header className="article-header"><span className="pill">{article.category}</span><h1>{article.title}</h1><p>{article.summary}</p><div className="meta-row"><span className="meta-item"><Clock3 size={15} />{article.readTime} min read</span><span>{article.difficulty}</span><button className={`button button-quiet${bookmarks.includes(article.slug) ? ' is-active' : ''}`} type="button" onClick={() => toggleBookmark(article.slug)} aria-pressed={bookmarks.includes(article.slug)}>{bookmarks.includes(article.slug) ? <BookmarkCheck size={15} /> : <Bookmark size={15} />}{bookmarks.includes(article.slug) ? 'Saved' : 'Save article'}</button></div></header>
      <div className="article-cover"><ImageWithFallback src={article.image} /></div>
      <div className="article-prose">{article.sections.map((section, index) => {
        if (section.type === 'heading') return <h2 id={`section-${index}`} key={index}>{section.text}</h2>
        if (section.type === 'paragraph') return <p key={index}>{section.text}</p>
        if (section.type === 'list') return <ul key={index}>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>
        if (section.type === 'code') return <CodeBlock key={index} code={section.code} language={section.language} />
        return null
      })}</div>
      {article.references?.length > 0 && <aside className="references"><h3>Further reading</h3>{article.references.map((reference) => <a href={reference} target="_blank" rel="noreferrer" key={reference}>{reference}</a>)}</aside>}
    </article>
    {headings.length > 1 && <aside className="article-toc"><strong>On this page</strong>{headings.map((heading) => { const index = article.sections.indexOf(heading); return <a key={heading.text} href={`#section-${index}`}>{heading.text}</a> })}</aside>}
    </div>
    {related.length > 0 && <section className="related-section"><div className="container"><div className="section-heading"><div><span className="eyebrow">Keep exploring</span><h2>Related articles</h2></div></div><div className="articles-grid">{related.map((item) => <ArticleCard key={item.slug} article={item} saved={bookmarks.includes(item.slug)} onToggleBookmark={toggleBookmark} />)}</div></div></section>}
  </>
}