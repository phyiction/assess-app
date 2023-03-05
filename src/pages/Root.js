import { 
  Link, 
  useLoaderData 
} from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Root() {

  const data = useLoaderData();

  const assessmentItems = data.assessments.map((a) => {
    return (
      <li key={`a-${a.id}`}>
        <Link to={`assessments/${a.id}/section/1`}>{a.name}</Link>
      </li>
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