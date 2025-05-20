import { useEffect, useState } from 'react';

import { Link, useLoaderData } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Utils from '../components/Utils.js';

export default function AssessmentResults() {
  const data = useLoaderData();

  let results;
  switch (data.assessment.id) {
    case 1:
      results = TemperamentsAssessmentResults(data);
      break;
    case 2:
      results = SpiritualGiftsAssessmentResults(data);
      break;
    case 3:
    case 4:
      results = EmlAssessmentResults(data);
      break;
    case 5:
      results = AntiochGiftsAssessmentResults(data);
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

function TemperamentsAssessmentResults(data) {
  const scoringMapEntries = data.scoring.temperaments.map((t) => {
    return [t.name, t.answers];
  });
  const scoringMap = new Map(scoringMapEntries);

  let scores = {};
  for (const qid in data.answers) {
    for (const temperament of scoringMap.keys()) {
      let index = Utils.getIndexFromQuestionId(qid);
      let arr = scoringMap.get(temperament);
      if (arr[index] === data.answers[qid]) {
        if (temperament in scores) {
          scores[temperament] = scores[temperament] + 1;
        } else {
          scores[temperament] = 1;
        }
      }
    }
  }

  const sortedScores = Object.entries(scores);
  sortedScores.sort((a, b) => {
    if (a[1] < b[1]) {
      return 1;
    } else if (a[1] == b[1]) {
      return 0;
    } else {
      return -1;
    }
  });

  function getColor(n) {
    const found = data.scoring.temperaments.find((t) => t.name === n);
    if (found !== null) {
      return found.color;
    } else {
      ('');
    }
  }

  const scoreElements = sortedScores.map((t) => {
    return (
      <Col key={t[0]}>
        <div className="text-center">
          <b>{t[0]}</b>
        </div>
        <div
          className="text-center"
          style={{ padding: '15px', border: `solid 4px ${getColor(t[0])}` }}
        >
          {t[1]}
        </div>
      </Col>
    );
  });

  return <Row>{scoreElements}</Row>;
}

function SpiritualGiftsAssessmentResults(data) {
  const giftScores = Object.entries(data.scoring).map((arr) => {
    const score = arr[1]
      .map((id) => {
        const qid = Utils.getQuestionId(id);
        return parseInt(data.answers[qid]);
      })
      .reduce((acc, val) => acc + val, 0);
    return [arr[0], score];
  });

  giftScores.sort((a, b) => {
    if (a[1] < b[1]) {
      return 1;
    } else if (a[1] == b[1]) {
      return 0;
    } else {
      return -1;
    }
  });

  const gifts = giftScores.map((g, i) => {
    return (
      <tr>
        <td>{i + 1}</td>
        <td>{g[0]}</td>
        <td>{g[1]}</td>
      </tr>
    );
  });

  return (
    <Row>
      <Col>
        <table className="aa-table">
          <thead>
            <th>#</th>
            <th>Spiritual Gift</th>
            <th>Score</th>
          </thead>
          <tbody>{gifts}</tbody>
        </table>
      </Col>
    </Row>
  );
}

function EmlAssessmentResults(data) {
  function renderResults(map, buckets, title) {
    let results = structuredClone(buckets);
    let iter = map.entries();
    let next = iter.next();
    while (!next.done) {
      const choice = parseInt(next.value[0]);
      const freq = parseInt(next.value[1]);

      results.forEach((r) => {
        if (r.values.includes(choice)) {
          if ('total' in r) {
            r['total'] += freq;
          } else {
            r['total'] = freq;
          }
        }
      });
      next = iter.next();
    }

    results.sort((a, b) => {
      if ('total' in a && 'total' in b) {
        if (a['total'] < b['total']) {
          return 1;
        } else if (a['total'] == b['total']) {
          return 0;
        } else {
          return -1;
        }
      } else if ('total' in a) {
        return -1;
      } else {
        return 1;
      }
    });

    if (map.size > 0) {
      const rows = results.map((r) => {
        return (
          <tr>
            <td>{r.name}</td>
            <td>{r.total}</td>
          </tr>
        );
      });

      return (
        <div>
          <h2>{title}</h2>
          <table className="aa-table">
            <thead>
              <tr>
                <th>Bucket</th>
                <th>Frequency</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
          <p>{results[0].description}</p>
        </div>
      );
    }
  }

  const section1Answers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
    (x) => data.answers[Utils.getQuestionId(x)]
  );
  const section1Freq = Utils.getFrequencyMap(section1Answers);

  const section2Answers = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(
    (x) => data.answers[Utils.getQuestionId(x)]
  );
  const section2Freq = Utils.getFrequencyMap(section2Answers);

  const section1Title =
    data.assessment.id === 3
      ? 'Leading out of your Marriage'
      : 'Understanding Your Loving Union Assessment';

  return (
    <Row>
      {renderResults(section1Freq, data.scoring.buckets, section1Title)}
      {renderResults(
        section2Freq,
        data.scoring.buckets,
        'Leading out of your Singleness'
      )}
    </Row>
  );
}

function AntiochGiftsAssessmentResults(data) {
  const giftTuples = data.scoring.buckets.map((b) => {
    const sum = b.values
      .map((x) => parseInt(data.answers[Utils.getQuestionId(x)]))
      .reduce((acc, curr) => acc + curr, 0);
    return { gift: b.name, sum: sum };
  });

  giftTuples.sort((a, b) => {
    if (a.sum < b.sum) {
      return 1;
    } else if (a.sum === b.sum) {
      return 0;
    } else {
      return -1;
    }
  });

  const rows = giftTuples.map((x, i) => {
    return (
      <tr>
        <td>{x.gift}</td>
        <td>{x.sum}</td>
      </tr>
    );
  });

  return (
    <table className='aa-table'>
      <tbody>{rows}</tbody>
    </table>
  );
}
