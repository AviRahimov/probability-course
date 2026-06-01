export default function Sidebar({ topics, current, onSelect }) {
  const pct = Math.round(((current + 1) / topics.length) * 100)

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-brand">🎓 קורס הסתברות</div>
        <div className="sidebar-sub">מדעי הנתונים · 15 נושאים</div>
      </div>

      <ul className="topic-list">
        {topics.map((t, i) => (
          <li
            key={t.id}
            className={`topic-item${i === current ? ' active' : ''}`}
            onClick={() => onSelect(i)}
          >
            <span className="topic-num">{i + 1}</span>
            <span className="topic-icon">{t.icon}</span>
            <span className="topic-name">{t.title}</span>
          </li>
        ))}
      </ul>

      <div className="sidebar-footer">
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="progress-label">נושא {current + 1} מתוך {topics.length}</div>
      </div>
    </nav>
  )
}
