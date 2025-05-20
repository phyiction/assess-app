import { useState } from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import Utils from './Utils.js';

export function MultipleChoiceQuestion(props) {
  const assessmentId = Utils.getAssessmentId(props.assessment.id);
  const sectionId = Utils.getSectionId(props.section.id);
  const questionId = Utils.getQuestionId(props.question.id);

  const [choice, setChoice] = useState(props.answer || null);

  function updateChoice(e) {
    props.db.getItem(assessmentId).then((answers) => {
      if (!answers) {
        answers = {};
      }

      answers[questionId] = e.target.value;

      props.db
        .setItem(assessmentId, answers)
        .then(() => {
          setChoice(e.target.value);
          console.info(
            `Saved choice for question ${questionId} in section ${sectionId} of assessment ${assessmentId}`
          );
        })
        .catch((err) => {
          console.error(
            `Unable to save choice for question ${questionId} in section ${sectionId} of assessment ${assessmentId}`
          );
        });
    });
  }

  const options = ['A', 'B', 'C', 'D'].map((opt) => {
    return (
      <Form.Check
        key={opt}
        name={`a${props.assessment.id}-s${props.section.id}-q${props.question.id}`}
        type="radio"
        label={`${opt}. ${props.question[opt]}`}
        value={opt}
        checked={opt === choice}
        onChange={updateChoice}
      />
    );
  });

  return (
    <Container className="aa-question" fluid>
      <Row>
        <Col lg="auto" md="auto" sm="auto" xs="auto">
          {props.question.id}.
        </Col>
        <Col lg="auto" md="auto" sm="auto" xs="auto">
          {options}
        </Col>
      </Row>
    </Container>
  );
}
