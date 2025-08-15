export default function DateRangePicker({ value, onChange }){
  return (
    <div className="card" style={{display:'grid', gap: 8}}>
      <div className="section-title">Date Filter</div>
      <div className="form-row">
        <div>
          <div className="subtle">From</div>
          <input className="date" type="date" value={value.from} onChange={e=>onChange({ ...value, from: e.target.value })} />
        </div>
        <div>
          <div className="subtle">To</div>
          <input className="date" type="date" value={value.to} onChange={e=>onChange({ ...value, to: e.target.value })} />
        </div>
      </div>
    </div>
  )
}
