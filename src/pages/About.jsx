import { ExternalLink } from 'lucide-react'

export default function About() {
  return <>
    <section className="about-hero"><div className="container"><span className="eyebrow">About this project</span><h1>Making AI feel a little less like a black box.</h1><p>NeuralNotes is an independent educational blog concept for students and curious builders who want a grounded, approachable introduction to artificial intelligence.</p></div></section>
    <section className="about-wrap"><div className="container about-grid">
      <article className="about-card"><h2>Why NeuralNotes exists</h2><p>AI and machine learning can feel crowded with new terms and abstract math. NeuralNotes organizes core ideas into readable notes, illustrates how common methods behave, and gives learners a safe place to experiment with small examples.</p><p>This student portfolio project demonstrates a complete client-side learning experience: editorial content, search and filtering, saved reading, a topic quiz, and an interactive classification demo. It uses local sample data and makes no claims about real users or model performance.</p></article>
      <article className="about-card"><h2>Built with</h2><p>A modern frontend stack, kept intentionally local and easy to explore.</p><div className="tech-list">{['React', 'Vite', 'React Router', 'Lucide', 'CSS', 'Local storage', 'JavaScript'].map((tech) => <span className="tech-chip" key={tech}>{tech}</span>)}</div></article>
      <article className="about-card"><h2>Project overview</h2><p>NeuralNotes brings together responsive page design, reusable React components, URL-based article pages, accessible controls, persisted preferences, and a transparent educational algorithm demo. There is no backend, authentication, external AI API, or deployment service.</p></article>
      <article className="about-card"><h2>Find me online</h2><p>Connect with me on GitHub and LinkedIn.</p><div className="social-links"><a className="social-link" href="https://github.com/Tejaswi-1803" target="_blank" rel="noreferrer" aria-label="GitHub profile"><ExternalLink size={17} /> GitHub</a><a className="social-link" href="https://www.linkedin.com/in/valluri-tejaswi-7578a42b4/" target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><ExternalLink size={17} /> LinkedIn</a></div></article>
    </div></section>
  </>
}