import { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import TopicView from './components/TopicView.jsx'
import { topics } from './topics.js'

function getInitialPage() {
  const match = window.location.hash.match(/#page-(\d+)/)
  if (match) {
    const idx = parseInt(match[1], 10) - 1
    return Math.max(0, Math.min(topics.length - 1, idx))
  }
  return 0
}

export default function App() {
  const [current, setCurrent] = useState(getInitialPage)

  function handleNav(idx) {
    const clamped = Math.max(0, Math.min(topics.length - 1, idx))
    setCurrent(clamped)
    window.location.hash = `#page-${clamped + 1}`
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="app-layout">
      <div className="main-content">
        <TopicView
          key={current}
          topic={topics[current]}
          index={current}
          total={topics.length}
          onNav={handleNav}
        />
      </div>
      <Sidebar
        topics={topics}
        current={current}
        onSelect={handleNav}
      />
    </div>
  )
}
