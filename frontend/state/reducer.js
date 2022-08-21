// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux';

const initialWheelState = 0
function wheel(state = initialWheelState, action) {
  switch (action.type) {
    case "MOVE_CLOCKWISE":
      state += 1
      break;
    case 'MOVE_COUNTERCLOCKWISE':
      state -= 1
      break;
    default:
      return state;
  }

  return state

}

const initialQuizState = null
function quiz(state = initialQuizState, action) {
  switch (action.type) {
    case 'SET_QUIZ_INTO_STATE':
      state = action.payload
      break;

    default:
      return state;
  }
  return state
}

const initialSelectedAnswerState = null
function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch (action.type) {
    case 'SET_SELECTED_ANSWER':
      state = action.payload
      break;

    default:
      return state;
  }
  return state
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  switch (action.type) {
    case 'SET_INFO_MESSAGE':
      state = action.payload;
      break;

    default:
      return state;
  }
  return state
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  switch (action.type) {
    case 'INPUT_CHANGE':
      state = action.payload
      break;

    case 'RESET_FORM':
      state = {
        newQuestion: '',
        newTrueAnswer: '',
        newFalseAnswer: '',
      }
      break;
    default:
      return state;
  }
  return state
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
