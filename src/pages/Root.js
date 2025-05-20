import { Link, useLoaderData } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Utils from '../components/Utils.js';

export default function Root() {
  const data = useLoaderData();

  function resetAssessmentData(aid) {
    return function (e) {
      const assessmentId = Utils.getAssessmentId(aid);
      data.db
        .removeItem(assessmentId)
        .then(() => {
          console.info(`Cleared assessment (id=${assessmentId}) data.`);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }

  const assessmentItems = data.assessments.map((a) => {
    return (
      <li key={`a-${a.id}`}>
        <Link to={`assessments/${a.id}/section/1`}>{a.name}</Link> (
        <a
          href="#"
          className="link-primary"
          onClick={resetAssessmentData(`${a.id}`)}
        >
          Reset
        </a>
        )
      </li>
    );
  });

  return (
    <Container>
      <Row>
        <Col>
          <ul>{assessmentItems}</ul>
        </Col>
      </Row>
    </Container>
  );
}
