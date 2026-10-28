import { useMemo, useState } from 'react'
import { AlertTriangle, CircleHelp, RotateCcw } from 'lucide-react'

const samples = [
  { x: 1.2, y: 1.7, label: 'Setosa' }, { x: 1.5, y: 1.3, label: 'Setosa' }, { x: 1.9, y: 2.0, label: 'Setosa' }, { x: 2.2, y: 1.4, label: 'Setosa' },
  { x: 4.7, y: 3.5, label: 'Versicolor' }, { x: 5.2, y: 4.1, label: 'Versicolor' }, { x: 5.8, y: 3.6, label: 'Versicolor' }, { x: 6.1, y: 4.8, label: 'Versicolor' },
  { x: 7.5, y: 6.2, label: 'Virginica' }, { x: 8.0, y: 7.0, label: 'Virginica' }, { x: 8.5, y: 6.4, label: 'Virginica' }, { x: 9.0, y: 8.0, label: 'Virginica' },
]
const colors = { Setosa: '#4d79ef', Versicolor: '#9a69e8', Virginica: '#28a786' }
const plot = { left: 48, top: 18, width: 360, height: 205 }
const toX = (value) => plot.left + value / 10 * plot.width
const toY = (value) => plot.top + plot.height - value / 10 * plot.height

export default function MLPlayground() {
  const [petalLength, setPetalLength] = useState(5.1)
  const [petalWidth, setPetalWidth] = useState(3.8)
  const prediction = useMemo(() => {
    const nearest = samples.map((sample) => ({ ...sample, distance: Math.hypot(sample.x - petalLength, sample.y - petalWidth) })).sort((a, b) => a.distance - b.distance).slice(0, 3)
    const counts = nearest.reduce((result, sample) => ({ ...result, [sample.label]: (result[sample.label] || 0) + 1 }), {})
    const label = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]
    return { label }
  }, [petalLength, petalWidth])

  function reset() { setPetalLength(5.1); setPetalWidth(3.8) }

  return <>
    <section className="page-intro"><div className="container"><span className="eyebrow">Interactive learning</span><h1 className="page-title">ML Playground</h1><p>Change two measurements and watch a tiny nearest-neighbor classifier compare your point with labeled examples.</p></div></section>
    <section className="playground-wrap"><div className="container"><div className="playground-grid">
      <section className="panel"><span className="eyebrow">Your example</span><h2>Adjust the flower features</h2><p>Move the sliders to place a new example on the plot. The classifier checks which labeled examples are closest.</p>
        <div className="feature-control"><label className="feature-label" htmlFor="petal-length"><span>Petal length</span><output>{petalLength.toFixed(1)} cm</output></label><input id="petal-length" type="range" min="0" max="10" step="0.1" value={petalLength} onChange={(event) => setPetalLength(Number(event.target.value))} /><div className="range-ends"><span>0 cm</span><span>10 cm</span></div></div>
        <div className="feature-control"><label className="feature-label" htmlFor="petal-width"><span>Petal width</span><output>{petalWidth.toFixed(1)} cm</output></label><input id="petal-width" type="range" min="0" max="10" step="0.1" value={petalWidth} onChange={(event) => setPetalWidth(Number(event.target.value))} /><div className="range-ends"><span>0 cm</span><span>10 cm</span></div></div>
        <div className="prediction-box" style={{ '--prediction-color': colors[prediction.label] }}><span className="prediction-dot" /><span><strong>Predicted class: {prediction.label}</strong><small>Majority label among the 3 nearest examples</small></span></div>
        <button className="button button-quiet" type="button" onClick={reset} style={{ marginTop: 16 }}><RotateCcw size={14} /> Reset inputs</button>
      </section>
      <section className="panel"><span className="eyebrow">Local sample data</span><h2>Where does your point fit?</h2><p>Each dot is a labeled sample. The outlined diamond marks your selected measurements.</p>
        <div className="plot-wrap"><svg viewBox="0 0 440 250" role="img" aria-label={`Plot of sample flower measurements. Your point is predicted as ${prediction.label}.`}>
          {[0, 2, 4, 6, 8, 10].map((tick) => <g key={tick}><line x1={toX(tick)} y1={plot.top} x2={toX(tick)} y2={plot.top + plot.height} stroke="currentColor" opacity=".1" /><line x1={plot.left} y1={toY(tick)} x2={plot.left + plot.width} y2={toY(tick)} stroke="currentColor" opacity=".1" /><text x={toX(tick)} y={plot.top + plot.height + 17} textAnchor="middle" fill="currentColor" opacity=".65" fontSize="10">{tick}</text><text x={plot.left - 10} y={toY(tick) + 3} textAnchor="end" fill="currentColor" opacity=".65" fontSize="10">{tick}</text></g>)}
          <text x="228" y="247" textAnchor="middle" fill="currentColor" opacity=".78" fontSize="10">Petal length (cm)</text><text transform="translate(12 120) rotate(-90)" textAnchor="middle" fill="currentColor" opacity=".78" fontSize="10">Petal width (cm)</text>
          {samples.map((sample, index) => <circle key={index} cx={toX(sample.x)} cy={toY(sample.y)} r="5.5" fill={colors[sample.label]} stroke="white" strokeWidth="1.5" />)}
          <path d={`M ${toX(petalLength)} ${toY(petalWidth) - 9} L ${toX(petalLength) + 9} ${toY(petalWidth)} L ${toX(petalLength)} ${toY(petalWidth) + 9} L ${toX(petalLength) - 9} ${toY(petalWidth)} Z`} fill="white" stroke={colors[prediction.label]} strokeWidth="3" />
        </svg><div className="plot-legend">{Object.entries(colors).map(([label, color]) => <span className="legend-item" key={label}><i className="legend-dot" style={{ '--dot-color': color }} />{label}</span>)}<span className="legend-item">◇ Your example</span></div></div>
        <div className="demo-notice"><AlertTriangle size={17} /><span><strong>Educational demo only.</strong> The small sample dataset and simple classifier are for learning, not a production or medically validated model.</span></div>
      </section>
    </div><div className="panel playground-explainer"><h2>How classification works here</h2><p>This demo calculates the distance from your selected point to every local sample, takes the three closest neighbors, then predicts the most common label among them. This is called k-nearest neighbors (k-NN). The plotted data is illustrative and intentionally small so the relationship is easy to see.</p><div className="meta-row"><span className="meta-item"><CircleHelp size={15} />Inputs: petal length and petal width</span><span>Algorithm: Euclidean k-NN, k = 3</span></div></div></div></section>
  </>
}