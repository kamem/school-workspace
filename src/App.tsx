import { Suspense, lazy } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import KameLogo from './components/KameLogo'
import Home from './pages/Home'
import './App.css'

// three.js を含む重いページはトップとは別チャンクにして遅延読み込み
const HeroVisual = lazy(() => import('./components/HeroVisual'))

/** 作品ページの左上に置く、トップへ戻るリンク */
function BackToTop() {
  return (
    <Link to="/" className="back-to-top">
      ← TOP
    </Link>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/hero"
          element={
            <>
              <Suspense fallback={<div className="page-loading">LOADING…</div>}>
                <HeroVisual />
              </Suspense>
              <BackToTop />
            </>
          }
        />
        <Route
          path="/logo"
          element={
            <>
              <KameLogo />
              <BackToTop />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
