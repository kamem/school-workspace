import { Link } from 'react-router-dom'
import './Home.css'

const WORKS = [
  {
    to: '/hero',
    no: '01',
    title: 'OP MAIN VISUAL',
    desc: '10秒4カットで場面が切り替わる、アニメOP風の疾走感ビジュアル',
  },
  {
    to: '/logo',
    no: '02',
    title: 'LOGO ANIMATION',
    desc: '「かめぶろぐ」ロゴのオープニングシーケンス',
  },
]

export default function Home() {
  return (
    <main className="home">
      <header className="home-header">
        <p className="home-tag">SCHOOL WORKSPACE</p>
        <h1 className="home-title">WORKS</h1>
      </header>
      <nav className="home-nav">
        {WORKS.map((w) => (
          <Link key={w.to} to={w.to} className="home-card">
            <span className="home-card-no">{w.no}</span>
            <span className="home-card-title">{w.title}</span>
            <span className="home-card-desc">{w.desc}</span>
            <span className="home-card-arrow" aria-hidden="true">
              →
            </span>
          </Link>
        ))}
      </nav>
    </main>
  )
}
