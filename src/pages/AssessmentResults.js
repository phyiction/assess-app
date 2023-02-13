import { useEffect, useState } from 'react';

import { Link, useLoaderData } from "react-router-dom";

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Utils from '../components/Utils.js';

export default function AssessmentResults() {
    
  const data = useLoaderData();

  switch(data.assessment.id){
    case 1:
      return TemperamentsAssessmentResults(data);
    default:
      return null;
  }
}

function TemperamentsAssessmentResults(data){
  
  const scoringMapEntries = data.scoring.temperaments.map((t) => {
    return [t.name, t.answers];
  });
  const scoringMap = new Map(scoringMapEntries);

  let scores = {}
  for(const qid in data.answers){        
    for(const temperament of scoringMap.keys()){                
      let index = Utils.getIndexFromQuestionId(qid);
      let arr = scoringMap.get(temperament);
      if(arr[index] === data.answers[qid]){          
        if(temperament in scores){
          scores[temperament] = scores[temperament] + 1;
        }else{
          scores[temperament] = 1;
        }          
      }
    }
  }

  const temperamentHeadings = data.scoring.temperaments.map((t) => {
    return (<th key={t.name}>{t.name}</th>);
  });

  const scoreElements = data.scoring.temperaments.map((t) => {
    return (      
      <Col key={t.name}>
        <div className="text-center">
          <b>{t.name}</b>
        </div>
        <div className="text-center" style={{ padding: '15px', border: `solid 4px ${t.color}` }}>
          {scores[t.name]}
        </div>
      </Col>      
    );
  });

  return (
    <Container>
      <Row>
        <Col>
          <p>
            <Link to="/">Home</Link> > &nbsp;
            <Link to={`/assessments/${data.assessment.id}`}>{data.assessment.name}</Link>
          </p>          
        </Col>
      </Row>
      <Row>
       {scoreElements}
      </Row>
    </Container>
  );
}