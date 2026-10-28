import { Link } from 'react-router-dom'
import { BrainCircuit, ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link className="brand" to="/"><span className="brand-mark"><BrainCircuit size={19} /></span><span>Neural<em>Notes</em></span></Link>
            <p>Clear explanations for curious minds. Build a practical understanding of artificial intelligence, one idea at a time.</p>
          </div>
          <div className="footer-col"><strong>Explore</strong><Link to="/articles">All articles</Link><Link to="/learn">Knowledge quiz</Link><Link to="/playground">ML Playground</Link></div>
          <div className="footer-col"><strong>Project</strong><Link to="/about">About NeuralNotes</Link><a href="https://github.com/your-username" target="_blank" rel="noreferrer" aria-label="GitHub profile placeholder"><ExternalLink size={14} style={{ verticalAlign: 'middle', marginRight: 5 }} />GitHub profile placeholder</a><a href="https://www.linkedin.com/in/your-username" target="_blank" rel="noreferrer" aria-label="LinkedIn profile placeholder"><ExternalLink size={14} style={{ verticalAlign: 'middle', marginRight: 5 }} />LinkedIn placeholder</a></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} NeuralNotes. An independent learning project.</span><span>Made for curious minds.</span></div>
      </div>
    </footer>
  )
}