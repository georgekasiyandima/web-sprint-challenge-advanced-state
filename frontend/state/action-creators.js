import { MOVE_CLOCKWISE, INPUT_CHANGE, MOVE_COUNTERCLOCKWISE, RESET_FORM, SET_INFO_MESSAGE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER } from "./action-types";
import axios from 'axios';

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {
  return {
    type: MOVE_CLOCKWISE,
  };
}

export function moveCounterClockwise() {
  return {
    type: MOVE_COUNTERCLOCKWISE
  };
}

export function setSelectedAnswer(answerId) {
  return {
    type: SET_SELECTED_ANSWER,
    payload: answerId,
  };
}

export function setInfoMessage(message) {
  return {
    type: SET_INFO_MESSAGE,
    payload: message,
  };
}

export function setQuizIntoState(quizData) {
  return {
    type: SET_QUIZ_INTO_STATE,
    payload: quizData
  }
}

export function inputChange(fieldName, value) {
  return {
    type: INPUT_CHANGE,
    payload: { fieldName, value },
  };
}

export function resetForm() {
  return {
    type: RESET_FORM,
  };
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    //dispatch(resetQuiz());

    axios
      .get('http://localhost:9000/api/quiz/next')
      .then((response) => {
    
        dispatch(setQuizIntoState(response.data))
      })
      .catch((error) =>{
        console.error('Error fetching quiz:', error);
      })
  }
}
export function postAnswer(props) {
  return async function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
    const selectedAnswer = props.selectedAnswer;
    const apiUrl = 'http://localhost:9000/api/quiz/new';

    try {
      const selectedAnswerObj = props.quiz.answers.find((answer) => answer.answer_id === selectedAnswer);
      const payload = {
        answer_id: selectedAnswer,
        false_answer_text: selectedAnswerObj.text,
      };

      const response = await axios.post(apiUrl, payload);
      dispatch({ type: SET_SELECTED_ANSWER, payload });
      dispatch({ type: SET_SELECTED_ANSWER, payload: null})

      if (response.data.isCorrect) {
        dispatch({ type: SET_INFO_MESSAGE, payload: 'Nice job! That was the correct answer.'});
      } else {
        dispatch({ type: SET_INFO_MESSAGE, payload: 'What a shame! That was the incorrect answer.'});
      }
      if (response.data.newQuiz) {
        dispatch({ type: SET_QUIZ_INTO_STATE, payload: response.data.newQuiz });
      }
      dispatch(fetchQuiz());
    } catch (error) {
      console.error('');
    }
  };
}

export function postQuiz(payload) {
  //return function (dispatch) {

    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  //}
  const updatedPayload = { "question_text": payload.newQuestion, "true_answer_text": payload.newTrueAnswer, "false_answer_text": payload.newFalseAnswer };
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:9000/api/quiz/new', updatedPayload);
      if (response.status === 201) {
        // Quiz creation successful, dispatch a success action
        
        dispatch(setQuizIntoState(response.data));
        dispatch(setInfoMessage(`Congrats: "${payload.newQuestion}" is a great question!`));
        dispatch(resetForm())
      } else {
        // Handle unexpected response status
        //dispatch(postQuizFailure('Unexpected response status'));
      }
    } catch (error) {
      // Handle API request error
      //dispatch(postQuizFailure(error.message));
    }
  };
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
