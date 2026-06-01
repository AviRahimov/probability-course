import { useRef, useEffect, useState } from 'react'
import 'katex/dist/katex.min.css'
import renderMathInElement from 'katex/contrib/auto-render'

const KATEX_OPTS = {
  delimiters: [
    { left: '$$', right: '$$', display: true },
    { left: '$',  right: '$',  display: false },
  ],
  throwOnError: false,
}

const TYPE_LABELS = {
  def:  'הגדרה',
  thm:  'משפט / טענה',
  ex:   'דוגמה',
  note: 'הערה',
}

// Renders HTML with math on mount — solves the "box was hidden when KaTeX ran" problem
function MathHtml({ html, className }) {
  const ref = useRef(null)
  useEffect(() => {
    if (ref.current) renderMathInElement(ref.current, KATEX_OPTS)
  }, [])
  return (
    <div
      ref={ref}
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

function Card({ section }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`card card-${section.type}`}>
      <div className="card-type-label">{TYPE_LABELS[section.type]}</div>
      {section.title && <div className="card-title">{section.title}</div>}
      <MathHtml html={section.content} className="card-body" />
      {section.proof && (
        <>
          <button className="proof-toggle" onClick={() => setOpen(o => !o)}>
            {open ? '▼ הסתר הוכחה' : '▶ הצג הוכחה'}
          </button>
          {open && <MathHtml html={section.proof} className="proof-box" />}
        </>
      )}
    </div>
  )
}

function ExCard({ ex }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`ex-card ${ex.cls}`}>
      <div className="ex-level">{ex.level}</div>
      <MathHtml html={ex.q} className="ex-question" />
      <button className="solution-toggle" onClick={() => setOpen(o => !o)}>
        {open ? '🙈 הסתר פתרון' : '💡 גלה פתרון'}
      </button>
      {open && <MathHtml html={ex.a} className="solution-box" />}
    </div>
  )
}

export default function TopicView({ topic, index, total, onNav }) {
  return (
    <div>
      <div className="topic-header">
        <div className="topic-lec-badge">{topic.lec}</div>
        <h1 className="topic-title-h1">{topic.icon} {topic.title}</h1>
        <p className="topic-intro">{topic.intro}</p>
      </div>

      <div className="cards-grid">
        {topic.sections.map((s, i) => <Card key={i} section={s} />)}
      </div>

      <div className="exercises-section">
        <div className="exercises-title">🏋️ תרגול</div>
        <div className="exercises-list">
          {topic.exercises.map((ex, i) => <ExCard key={i} ex={ex} />)}
        </div>
      </div>

      <div className="topic-nav">
        <button
          className="nav-btn"
          onClick={() => onNav(index - 1)}
          disabled={index === 0}
        >
          ← הנושא הקודם
        </button>
        <span className="nav-counter">{index + 1} / {total}</span>
        <button
          className="nav-btn"
          onClick={() => onNav(index + 1)}
          disabled={index === total - 1}
        >
          הנושא הבא →
        </button>
      </div>
    </div>
  )
}
