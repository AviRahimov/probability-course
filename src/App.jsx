import { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import TopicView from './components/TopicView.jsx'
import { topics } from './topics.js'

export default function App() {
  const [current, setCurrent] = useState(0)

  function handleNav(idx) {
    const clamped = Math.max(0, Math.min(topics.length - 1, idx))
    setCurrent(clamped)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="app-layout">
      <div className="main-content">
        <TopicView
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
