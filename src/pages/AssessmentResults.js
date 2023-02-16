import { useEffect, useState } from 'react';

import { Link, useLoaderData } from "react-router-dom";

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Utils from '../components/Utils.js';

export default function AssessmentResults() {
    
  const data = useLoaderData();

  let results;
  switch(data.assessment.id){
    case 1:
      results = TemperamentsAssessmentResults(data);
      break;
    case 2:
      results = SpiritualGiftsAssessmentResults(data);
      break;
    default:
       null;
  }

  return (
    <Container>
      <Row>
        <Col>
          <p>
            <Link to="/">Home</Link> > &nbsp;
            <span className="text-muted">{data.assessment.name}</span>
          </p>          
        </Col>
      </Row>
      {results}      
    </Container>
  );
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

  const sortedScores = Object.entries(scores);
  sortedScores.sort((a,b) => {
    if(a[1] < b[1]){
      return 1;
    } else if(a[1] == b[1]){
      return 0;
    } else {
      return -1;
    }
  });

  function getColor(n){
    const found = data.scoring.temperaments.find((t) => t.name === n);
    if(found !== null){
      return found.color;
    }else{
      "";
    }
  }

  const scoreElements = sortedScores.map((t) => {
    return (      
      <Col key={t[0]}>
        <div className="text-center">
          <b>{t[0]}</b>
        </div>
        <div className="text-center" style={{ padding: '15px', border: `solid 4px ${getColor(t[0])}` }}>
          {t[1]}
        </div>
      </Col>      
    );
  });

  return (
    <Row>
     {scoreElements}
    </Row>    
  );
}

function SpiritualGiftsAssessmentResults(data){

  const giftScores = Object.entries(data.scoring).map((arr) => {
    const score = arr[1].map((id) => {
      const qid = Utils.getQuestionId(id);
      return parseInt(data.answers[qid]);
    }).reduce((acc,val) => acc + val, 0);
    return [arr[0], score];
  });
  
  giftScores.sort((a,b) => {
    if(a[1] < b[1]){
      return 1;
    }else if(a[1] == b[1]){
      return 0;
    }else{
      return -1;
    }
  });

  const gifts = giftScores.map((g) => {
    return (
      <Row>
        <Col>{g[0]}</Col>
        <Col>{g[1]}</Col>
      </Row>
    );
  });

  return (
    <Row>
      <Col>
        <Container>
          {gifts}
        </Container>
      </Col>
    </Row>
  );
}