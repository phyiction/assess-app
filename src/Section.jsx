import { 
  Link, 
  useLoaderData 
} from "react-router-dom";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';


import { MultipleChoiceQuestion } from './MultipleChoiceQuestion.jsx';

export default function Section() {
    
  const data = useLoaderData();

  const questions = data.section.questions.map((q) => {
    return (
      <MultipleChoiceQuestion key={q.id} question={q} />
    );
  });

  let previous;
  if(data.section.prevSection === null){
    previous = <span>&laquo; Previous</span>;
  }else{
    previous = <Link to={`/assessments/${data.aid}/section/${data.section.prevSection}`}>&laquo; Previous</Link>;
  }

  let next;
  if(data.section.nextSection === null){
    next = <span>Next &raquo;</span>;
  }else{
    next = <Link to={`/assessments/${data.aid}/section/${data.section.nextSection}`}>Next &raquo;</Link>;
  }

  return (
    <Container>      
      <h5>Directions</h5>
      <p>{data.section.directions}</p>
      { questions }
      <Row>
        <Col>
          {previous}
        </Col>
        <Col>
          {next}
        </Col>
      </Row>
    </Container>
  );
}