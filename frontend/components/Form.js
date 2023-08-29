import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../state/action-creators";
import axios from "axios";

export function Form(props) {
  const onChange = (evt) => {
    const { id, value } = evt.target;
    props.inputChange(id, value);
  };

  const onSubmit = async (evt) => {
    evt.preventDefault();
    const { newQuestion, newTrueAnswer, newFalseAnswer } = props.form;
    const newQuiz = {
      question: newQuestion,
      answers: [
        { text: newTrueAnswer, isCorrect: true },
        { text: newFalseAnswer, isCorrect: false },
      ],
    };

    axios
      .post("http://localhost: 9000/api/quizzes", newQuiz)
      .then((response) => {
        props.addQuiz(response.data);
        props.resetForm();
      })
      .catch((error) => {
        console.error("Error submitting new quiz:", error);
      });
    props.postQuiz(props.form);
  };

  const isDisabled =
    props.form.newQuestion.trim().length == 0 ||
    props.form.newTrueAnswer.trim().length == 0 ||
    props.form.newFalseAnswer.trim().length == 0;

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input
        maxLength={50}
        onChange={onChange}
        id="newQuestion"
        placeholder="Enter question"
        value={props.form.newQuestion}
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newTrueAnswer"
        placeholder="Enter true answer"
        value={props.form.newTrueAnswer}
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newFalseAnswer"
        placeholder="Enter false answer"
        value={props.form.newFalseAnswer}
      />
      <button disabled={isDisabled} id="submitNewQuizBtn">
        Submit new quiz
      </button>
    </form>
  );
}

export default connect((st) => st, { actionCreators })(Form);
