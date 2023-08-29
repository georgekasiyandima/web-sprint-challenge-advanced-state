import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Quiz(props) {

  useEffect(() => {
    props.fetchQuiz()
  }, []);
  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        props.quiz ? (
          <>
            <h2>{props.quiz.question}</h2>

            <div id="quizAnswers">
              <div className={`answer ${props.selectedAnswer === props.quiz.answers[0].answer_id ? 'selected' : ''}`}>
                {props.quiz.answers[0].text}
                <button onClick= {() => props.setSelectedAnswer(props.quiz.answers[0].answer_id)}>
                {props.selectedAnswer === props.quiz.answers[0].answer_id ? 'SELECTED' : 'Select'}
                  
                </button>
              </div>

              <div className={`answer ${props.selectedAnswer === props.quiz.answers[1].answer_id ? 'selected' : ''}`}>
              {props.quiz.answers[1].text}
                <button onClick= {() => props.setSelectedAnswer(props.quiz.answers[1].answer_id)}>
                {props.selectedAnswer === props.quiz.answers[1].answer_id ? 'SELECTED' : 'Select'}
                </button>
              </div>
            </div>

            <button onClick={() => props.postAnswer(props)} disabled={!props.selectedAnswer} id="submitAnswerBtn">Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

export default connect(st => st, actionCreators)(Quiz)
