import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Articles from './pages/Articles.jsx'
import ArticleDetail from './pages/ArticleDetail.jsx'
import Quiz from './pages/Quiz.jsx'
import MLPlayground from './pages/MLPlayground.jsx'
import About from './pages/About.jsx'
import NotFound from './pages/NotFound.jsx'
import { SiteContext } from './utils/siteContext.js'
import { readBookmarks, readTheme, saveBookmarks, saveTheme } from './utils/storage.js'
import './App.css'
import './NeuralNotes.css'

function App() {
  const [theme, setTheme] = useState(readTheme)
  const [bookmarks, setBookmarks] = useState(readBookmarks)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    saveTheme(theme)
  }, [theme])

  useEffect(() => saveBookmarks(bookmarks), [bookmarks])

  function toggleBookmark(slug) {
    setBookmarks((current) => current.includes(slug)
      ? current.filter((item) => item !== slug)
      : [...current, slug])
  }

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <SiteContext.Provider value={{ bookmarks, toggleBookmark }}>
        <div className="site-shell">
          <Navbar theme={theme} onThemeChange={() => setTheme((value) => value === 'dark' ? 'light' : 'dark')} />
          <main id="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/articles/:slug" element={<ArticleDetail />} />
              <Route path="/learn" element={<Quiz />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/playground" element={<MLPlayground />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </SiteContext.Provider>
    </BrowserRouter>
  )
}

export default App
