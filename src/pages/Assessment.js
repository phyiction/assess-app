import { Link } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import { useLoaderData } from "react-router-dom";

export default function Assessment() {  
    
  const data = useLoaderData();

  return (
    <Container>
      <h2>{data.assessment.name}</h2>
      <p>{data.assessment.description}</p>
      <p>
        <Link to={`section/1`}>Start &rarr;</Link>
      </p>      
    </Container>
  );
}