// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from "redux";

const initialWheelState = 0;
function wheel(state = initialWheelState, action) {
	switch (action.type) {
		case "MOVE_CLOCKWISE":
			state = (state + 1) % 6;
			break;
		case "MOVE_COUNTERCLOCKWISE":
			return (state - 1 + 6) % 6;
		default:
			return state;
	}

	return state;
}

const initialQuizState = null;
function quiz(state = initialQuizState, action) {
	switch (action.type) {
		case "SET_QUIZ_INTO_STATE":
			state = action.payload;
			break;

		default:
			return state;
	}
	return state;
}

const initialSelectedAnswerState = null;
function selectedAnswer(state = initialSelectedAnswerState, action) {
	switch (action.type) {
		case "SET_SELECTED_ANSWER":
			state = action.payload;
			break;

		default:
			return state;
	}
	return state;
}

const initialMessageState = "";
function infoMessage(state = initialMessageState, action) {
	switch (action.type) {
		case "SET_INFO_MESSAGE":
			state = action.payload;
			break;

		default:
			return state;
	}
	return state;
}

const initialFormState = {
	newQuestion: "",
	newTrueAnswer: "",
	newFalseAnswer: "",
};
function form(state = initialFormState, action) {
	console.log(state);
	console.log(action);
	switch (action.type) {
		case "INPUT_CHANGE":
			return {...state, [action.payload.fieldName]: action.payload.value}

		case "RESET_FORM":
			state = {
				newQuestion: "",
				newTrueAnswer: "",
				newFalseAnswer: "",
			};
			break;
		default:
			return state;
	}
	return state;
}

export default combineReducers({
	wheel,
	quiz,
	selectedAnswer,
	infoMessage,
	form,
});