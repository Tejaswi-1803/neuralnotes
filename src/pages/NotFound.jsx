import { Link } from 'react-router-dom'

export default function NotFound() {
  return <section className="not-found"><div><span className="eyebrow">404 · Page not found</span><h1>That page isn’t here.</h1><p>The link may be outdated. Let’s get you back to the learning library.</p><Link className="button button-primary" to="/">Go to homepage</Link></div></section>
}