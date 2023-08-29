import {
	MOVE_CLOCKWISE,
	INPUT_CHANGE,
	MOVE_COUNTERCLOCKWISE,
	RESET_FORM,
	SET_INFO_MESSAGE,
	SET_QUIZ_INTO_STATE,
	SET_SELECTED_ANSWER,
} from "./action-types";
import axios from "axios";

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {
	return {
		type: MOVE_CLOCKWISE,
	};
}

export function moveCounterClockwise() {
	return {
		type: MOVE_COUNTERCLOCKWISE,
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
		payload: quizData,
	};
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
			.get("http://localhost:9000/api/quiz/next")
			.then((response) => {
				dispatch(setQuizIntoState(response.data));
			})
			.catch((error) => {
				console.error("Error fetching quiz:", error);
			});
	};
}
export function postAnswer(props) {
	return function (dispatch) {
		const payload = {
			answer_id: props.selectedAnswer,
			quiz_id: props.quiz.quiz_id,
		};

		axios
			.post("http://localhost:9000/api/quiz/answer", payload)
			.then((res) => {
				dispatch(setInfoMessage(res.data.message));
        dispatch(fetchQuiz());
			})
			.catch((err) => console.log(err));
	};
}

export function postQuiz(payload) {
	//return function (dispatch) {

	// On successful POST:
	// - Dispatch the correct message to the the appropriate state
	// - Dispatch the resetting of the form
	//}
	const updatedPayload = {
		question_text: payload.newQuestion,
		true_answer_text: payload.newTrueAnswer,
		false_answer_text: payload.newFalseAnswer,
	};
	return async (dispatch) => {
		try {
			const response = await axios.post(
				"http://localhost:9000/api/quiz/new",
				updatedPayload
			);
			if (response.status === 201) {
				// Quiz creation successful, dispatch a success action

				dispatch(setQuizIntoState(response.data));
				dispatch(
					setInfoMessage(
						`Congrats: "${payload.newQuestion}" is a great question!`
					)
				);
				dispatch(resetForm());
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
