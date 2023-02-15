import { 
  Link,  
  useLoaderData
} from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { MultipleChoiceQuestion } from '../components/MultipleChoiceQuestion.js';
import { NumberInputQuestion } from '../components/NumberInputQuestion.js';
import Utils from '../components/Utils.js';

export default function Section(){
    
  const data = useLoaderData();

  const directions = data.section.directions.map((d, i) => {
    return (<div key={i}>{d}</div>);
  });

  const questions = data.section.questions.map((q) => {

    if(data.assessment.id === 1){
      return (
        <MultipleChoiceQuestion 
          key={q.id} 
          answer={data.answers[Utils.getQuestionId(q.id)]} 
          assessment={data.assessment} 
          db={data.db} 
          section={data.section} 
          question={q} 
        />
      );
    } else {
      return (
        <NumberInputQuestion 
          key={q.id} 
          answer={data.answers[Utils.getQuestionId(q.id)]} 
          assessment={data.assessment} 
          db={data.db}          
          question={q} 
        />);
    }
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
          <div>{ directions }</div>
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