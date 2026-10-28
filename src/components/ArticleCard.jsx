import { Bookmark, BookmarkCheck, Clock3 } from 'lucide-react'
import { Link } from 'react-router-dom'
import ImageWithFallback from './ImageWithFallback.jsx'

export default function ArticleCard({ article, saved = false, onToggleBookmark }) {
  return (
    <article className="article-card">
      <div className="article-visual">
        <ImageWithFallback src={article.image} />
        <button className={`bookmark-button${saved ? ' is-saved' : ''}`} type="button" onClick={() => onToggleBookmark?.(article.slug)} aria-label={saved ? `Remove ${article.title} from saved articles` : `Save ${article.title}`} title={saved ? 'Remove bookmark' : 'Save article'}>
          {saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
        </button>
      </div>
      <div className="article-card-body">
        <span className="pill">{article.category}</span>
        <h3><Link to={`/articles/${article.slug}`}>{article.title}</Link></h3>
        <p>{article.summary}</p>
        <div className="card-bottom"><div className="meta-row"><span className="meta-item"><Clock3 size={14} />{article.readTime} min</span><span className="meta-item">{article.difficulty}</span></div><Link className="text-link" to={`/articles/${article.slug}`} aria-label={`Read ${article.title}`}>Read <span aria-hidden="true">→</span></Link></div>
      </div>
    </article>
  )
}