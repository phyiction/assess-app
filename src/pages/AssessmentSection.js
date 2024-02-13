import { Link, useLoaderData } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { MultipleChoiceQuestion } from '../components/MultipleChoiceQuestion.js';
import { NumberInputQuestion } from '../components/NumberInputQuestion.js';
import Utils from '../components/Utils.js';

export default function AssessmentSection() {
  const data = useLoaderData();

  function renderDirections() {
    const directions = data.section.directions.map((d, i) => {
      return <div key={i}>{d}</div>;
    });

    let additionalDirections;
    if (data.assessment.id === 2) {
      additionalDirections = (
        <div>
          <ul>
            <li>
              Select the one response you feel best characterizes yourself and
              place that number in the blank provided. Record your answer in the
              blank beside each item.
            </li>
            <li>
              Do not spend too much time on any one item. Remember, it is not a
              test. Usually your immediate response is best.
            </li>
            <li>Please give an answer for each item. Do not skip any items.</li>
            <li>
              Do not ask others how they are answering or how they think you
              should answer.
            </li>
            <li>Work at your own pace.</li>
          </ul>
          <div>
            <div>Your response choices are: </div>
            <div className="ml-2">
              5 - Highly characteristic of me/definitely true for me{' '}
            </div>
            <div className="ml-1">
              4 - Most of the time this would describe me/be true for me{' '}
            </div>
            <div className="ml-1">
              3 - Frequently characteristic of me/true for me-about 50 percent
              of the time
            </div>
            <div className="ml-1">
              2 - Occasionally characteristic of me/true for me-about 25 percent
              of the time
            </div>
            <div className="ml-1">
              1 - Not at all characteristic of me/definitely untrue for me
            </div>
          </div>
        </div>
      );
    } else if ([3, 4].includes(data.assessment.id)) {
      additionalDirections = (
        <div>
          <p>
            Next to each statement, write down the number that best describes
            your response.
          </p>
          <div>Use the following scale:</div>
          <div className="ml-2">5 = Always true of me</div>
          <div className="ml-2">4 = Frequently true of me</div>
          <div className="ml-2">3 = Occasionally true of me</div>
          <div className="ml-2">2 = Rarely true of me</div>
          <div className="ml-2">1 = Never true of me</div>
        </div>
      );
    }

    return (
      <div className="aa-directions">
        {directions}
        {additionalDirections}
      </div>
    );
  }

  const questions = data.section.questions.map((q) => {
    const answer = data.answers
      ? data.answers[Utils.getQuestionId(q.id)]
      : null;

    if (data.assessment.id === 1) {
      return (
        <MultipleChoiceQuestion
          key={q.id}
          answer={answer}
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
          answer={answer}
          assessment={data.assessment}
          db={data.db}
          question={q}
        />
      );
    }
  });

  let previous;
  if (data.section.prevSection === null) {
    previous = <span></span>;
  } else {
    previous = (
      <Link
        to={`/assessments/${data.assessment.id}/section/${data.section.prevSection}`}
      >
        <span className="btn btn-outline-secondary">&laquo; Previous</span>
      </Link>
    );
  }

  let next, results;
  if (data.section.nextSection === null) {
    next = (
      <Link to={`/assessments/${data.assessment.id}/results`}>
        <span className="btn btn-primary">Get Results</span>
      </Link>
    );
  } else {
    next = (
      <Link
        to={`/assessments/${data.assessment.id}/section/${data.section.nextSection}`}
      >
        <span className="btn btn-outline-primary">Next &raquo;</span>
      </Link>
    );
  }

  return (
    <Container>
      <Row>
        <Col>
          <p>
            <Link to="/">Home</Link> &gt; &nbsp;
            <span className="text-muted">{data.assessment.name}</span> &gt;
            &nbsp;
            <span className="text-muted">Section {data.section.id}</span>
          </p>
          <h5>Directions</h5>
          {renderDirections()}
          {questions}
        </Col>
      </Row>
      <Row>
        <Col>{previous}</Col>
        <Col className="text-end">{next}</Col>
      </Row>
    </Container>
  );
}
