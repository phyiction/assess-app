import { Link } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import assessments from '../data/assessments.json';


export default function Root() {

  const assessmentItems = assessments.map((a) => {
    return (
      <li key={`a-${a.id}`}><Link to={`assessments/${a.id}`}>{a.name}</Link></li>
    );
  });

  return (
    <Container>      
      <Row>
        <Col>
          <ul>
            { assessmentItems }      
          </ul>
        </Col>
      </Row>
    </Container>
  );
}