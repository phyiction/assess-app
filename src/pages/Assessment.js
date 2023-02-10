import { Link } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import { useLoaderData } from "react-router-dom";

export default function Assessment() {
    
  const assessment = useLoaderData();

  return (
    <Container>
      <h2>{assessment.name}</h2>
      <p>{assessment.description}</p>
      <Link to={`section/1`}>Start &rarr;</Link>
    </Container>
  );
}