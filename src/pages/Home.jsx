import { ArrowRight, BookOpen, Brain, Braces, ChartNoAxesColumn, Clock3, Network, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import ArticleCard from '../components/ArticleCard.jsx'
import ImageWithFallback from '../components/ImageWithFallback.jsx'
import { articles } from '../data/articles.js'
import { useSite } from '../utils/siteContext.js'

const paths = [
  { title: 'AI Fundamentals', description: 'Build a clear foundation in AI concepts and vocabulary.', icon: Brain, category: 'AI Fundamentals' },
  { title: 'Machine Learning', description: 'Learn how models find patterns and make predictions.', icon: ChartNoAxesColumn, category: 'Machine Learning' },
  { title: 'Deep Learning', description: 'Explore neural networks, layers, and learned features.', icon: Network, category: 'Deep Learning' },
  { title: 'Python for AI', description: 'Prepare data and write your first practical experiments.', icon: Braces, category: 'Python for AI' },
]

export default function Home() {
  const { bookmarks, toggleBookmark } = useSite()
  const featured = articles.find((article) => article.featured)
  const latest = articles.filter((article) => article.slug !== featured.slug).slice(0, 3)

  return <>
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-copy">
          <span className="eyebrow">A clearer way to learn AI</span>
          <h1>Understand AI.<br /><span>Build Intelligence.</span></h1>
          <p>Make sense of artificial intelligence through thoughtful explanations, practical examples, and small experiments you can explore at your own pace.</p>
          <div className="hero-actions"><Link className="button button-primary" to="/learn">Start Learning <ArrowRight size={17} /></Link><Link className="button button-dark" to="/articles">Explore Articles <BookOpen size={16} /></Link></div>
          <div className="hero-note"><Sparkles size={15} /> Built for students, makers, and the curious.</div>
        </div>
        <div className="hero-art" aria-label="Abstract neural network visualization">
          <ImageWithFallback src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1100&q=85" alt="Glowing network of connected points representing machine learning" />
          <div className="art-label"><span className="art-label-icon"><Network size={19} /></span><span><strong>From concepts to code</strong><small>One connected learning path</small></span></div>
        </div>
      </div>
    </section>
    <section className="featured-wrap"><div className="container">
      <div className="section-heading"><div><span className="eyebrow">Editor’s pick</span><h2>Start with a big idea</h2></div></div>
      <article className="featured-card"><div className="featured-visual"><ImageWithFallback src={featured.image} alt="Abstract artificial intelligence visualization" /></div><div className="featured-copy"><span className="pill">{featured.category}</span><h3>{featured.title}</h3><p>{featured.summary}</p><div className="meta-row"><span className="meta-item"><Clock3 size={14} />{featured.readTime} min read</span><span>{featured.difficulty}</span></div><Link className="text-link" to={`/articles/${featured.slug}`} style={{ marginTop: 21 }}>Read the article <ArrowRight size={16} /></Link></div></article>
    </div></section>
    <section className="section learning-section"><div className="container">
      <div className="section-heading"><div><span className="eyebrow">Choose your starting point</span><h2>Learning paths</h2><p>Follow a topic that interests you. Each path is a collection of approachable notes and examples.</p></div></div>
      <div className="path-grid">{paths.map(({ title, description, icon: Icon, category }) => <Link className="path-card" key={title} to={`/articles?category=${encodeURIComponent(category)}`}><span className="path-icon"><Icon size={20} /></span><h3>{title}</h3><p>{description}</p><span className="text-link">Explore path <ArrowRight size={14} /></span></Link>)}</div>
    </div></section>
    <section className="section latest-section"><div className="container">
      <div className="section-heading"><div><span className="eyebrow">Fresh notes</span><h2>Latest articles</h2><p>Practical explanations to help turn new terms into useful mental models.</p></div><Link className="text-link" to="/articles">Browse all articles <ArrowRight size={16} /></Link></div>
      <div className="articles-grid">{latest.map((article) => <ArticleCard key={article.slug} article={article} saved={bookmarks.includes(article.slug)} onToggleBookmark={toggleBookmark} />)}</div>
    </div></section>
    <section className="stats-band"><div className="container stats-inner"><div className="stats-intro"><h2>A small library, built to grow</h2><p>These are project content counts, not audience or usage metrics.</p></div><div className="stat"><strong>{articles.length}</strong><span>sample learning notes</span></div><div className="stat"><strong>{paths.length}</strong><span>learning paths</span></div><div className="stat"><strong>1</strong><span>interactive ML demo</span></div></div></section>
  </>
}