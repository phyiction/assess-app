import { useState } from 'react';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import Utils from './Utils.js';

export function NumberInputQuestion(props){

  const assessmentId = Utils.getAssessmentId(props.assessment.id);
  const questionId = Utils.getQuestionId(props.question.id);

  function updateChoice(e){    

    props.db.getItem(assessmentId).then((answers) => {

      if(!answers){
        answers = {};
      }      

      const newValue = e.target.selectedOptions[0].value;
      
      answers[questionId] = newValue; 
      
      props.db.setItem(assessmentId, answers).then(() => {        
        console.debug(`Saved choice for question ${questionId} of assessment ${assessmentId}`);
      }).catch((err) => {
        console.error(`Unable to save choice for question ${questionId} of assessment ${assessmentId}`);
      });
    });
  }

  const options = ["1","2","3","4","5"].map((opt) => {
    return (        
      <option key={opt} value={opt}>{opt}</option>
    );
  });

  return (
    <Container className="question">
      <Row>
        <Col sm={1}>
          <div className="text-end">{props.question.id}.</div>
        </Col>
        <Col sm={1}>
          <Form.Select size="sm" onChange={updateChoice} defaultValue={props.answer}>
            { options }
          </Form.Select>           
        </Col>
        <Col sm={10}>
          { props.question.question }
        </Col>
      </Row>
    </Container>
  );
}