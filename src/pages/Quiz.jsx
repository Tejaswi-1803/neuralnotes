import { useState } from 'react'
import { Check, RotateCcw, Trophy } from 'lucide-react'
import { quizCategories, quizzes } from '../data/quizzes.js'

export default function Quiz() {
  const [category, setCategory] = useState(quizCategories[0])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [complete, setComplete] = useState(false)
  const questions = quizzes[category]
  const question = questions[questionIndex]

  function chooseCategory(nextCategory) {
    setCategory(nextCategory)
    setQuestionIndex(0)
    setSelected(null)
    setScore(0)
    setComplete(false)
  }

  function continueQuiz() {
    if (selected === null) return
    if (selected === question.answer) setScore((value) => value + 1)
    if (questionIndex === questions.length - 1) setComplete(true)
    else {
      setQuestionIndex((value) => value + 1)
      setSelected(null)
    }
  }

  function restart() {
    setQuestionIndex(0)
    setSelected(null)
    setScore(0)
    setComplete(false)
  }

  return <>
    <section className="page-intro"><div className="container"><span className="eyebrow">Check your understanding</span><h1 className="page-title">A little knowledge check</h1><p>Choose a topic, take it one question at a time, and see an explanation for every answer.</p></div></section>
    <section className="quiz-wrap"><div className="container"><div className="quiz-shell">
      <div className="quiz-top"><span className="eyebrow">Quick quiz</span><div className="quiz-categories" role="group" aria-label="Quiz topic">{quizCategories.map((item) => <button key={item} type="button" className={`quiz-category${category === item ? ' active' : ''}`} aria-pressed={category === item} onClick={() => chooseCategory(item)}>{item}</button>)}</div></div>
      {!complete ? <><div className="quiz-progress" role="progressbar" aria-label="Quiz progress" aria-valuemin="0" aria-valuemax={questions.length} aria-valuenow={questionIndex + (selected !== null ? 1 : 0)}><span style={{ width: `${((questionIndex + (selected !== null ? 1 : 0)) / questions.length) * 100}%` }} /></div><div className="quiz-content"><div className="quiz-question-meta"><span>Question {questionIndex + 1} of {questions.length}</span><span>{score} correct so far</span></div><h2>{question.question}</h2><div className="quiz-options">{question.options.map((option, index) => {
        const answerClass = selected === null ? '' : index === question.answer ? ' correct' : index === selected ? ' incorrect' : ''
        return <button key={option} className={`quiz-option${selected === index ? ' selected' : ''}${answerClass}`} type="button" onClick={() => selected === null && setSelected(index)} disabled={selected !== null} aria-pressed={selected === index}><span className="option-letter">{String.fromCharCode(65 + index)}</span>{option}</button>
      })}</div>{selected !== null && <div className="quiz-feedback" role="status"><strong>{selected === question.answer ? 'That’s right.' : 'Not quite.'}</strong> {question.explanation}</div>}<div className="quiz-actions"><span className="meta-row">Topic: {category}</span><button className="button button-primary" type="button" onClick={continueQuiz} disabled={selected === null}>{questionIndex === questions.length - 1 ? 'See results' : selected === null ? 'Choose an answer' : 'Continue'} <Check size={16} /></button></div></div></> : <div className="quiz-result" role="status"><span className="result-mark"><Trophy size={28} /></span><h2>Quiz complete</h2><p>You answered <strong>{score} of {questions.length}</strong> correctly in {category}.</p><button className="button button-primary" type="button" onClick={restart}><RotateCcw size={16} /> Try again</button></div>}
    </div></div></section>
  </>
}