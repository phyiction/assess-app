import { 
  Link,  
  useLoaderData
} from "react-router-dom";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';


import { MultipleChoiceQuestion } from '../components/MultipleChoiceQuestion.js';

export default function Section() {
    
  const data = useLoaderData();

  const questions = data.section.questions.map((q) => {
    return (
      <MultipleChoiceQuestion key={q.id} question={q} />
    );
  });

  let previous;
  if(data.section.prevSection === null){
    previous = (<div className="text-muted">&laquo; Previous</div>);
  } else {
    previous = (<Link to={`/assessments/${data.assessment.id}/section/${data.section.prevSection}`}>&laquo; Previous</Link>);
  }

  let next, results;
  if(data.section.nextSection === null){    
    next = (<div className="text-muted">Next &raquo;</div>);
    results = (
      <Link to={`/assessments/${data.assessment.id}/results`}>
        <span className="btn btn-primary">Get Results</span>
      </Link>
    );
  }else{
    next = (<Link to={`/assessments/${data.assessment.id}/section/${data.section.nextSection}`}>Next &raquo;</Link>);  
  }

  return (
    <Container>     
      <Row> 
        <Col>
          <p>
            <Link to="/">Home</Link> &gt; &nbsp;
            <Link to={`/assessments/${data.assessment.id}`}>{data.assessment.name}</Link> &gt; &nbsp;
            <span className="text-muted">Section {data.section.id}</span>
          </p>
          <h5>Directions</h5>
          <p>{data.section.directions}</p>
          { questions }
        </Col>
      </Row>
      <Row>
        <Col>
          {previous}
        </Col>        
        <Col className="text-end">
          {next}
        </Col>
      </Row>      
      <Row>
        <Col className="text-center">
          {results}
        </Col>
      </Row>      
    </Container>
  );
}