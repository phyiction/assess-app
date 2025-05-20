import { Component, StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import ThemeProvider from 'react-bootstrap/ThemeProvider';

import Navbar from 'react-bootstrap/Navbar';

import Container from 'react-bootstrap/Container';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import localforage from 'localforage/src/localforage.js';

import AssessmentResults from './pages/AssessmentResults.js';
import AssessmentSection from './pages/AssessmentSection.js';
import Root from './pages/Root.js';

import Utils from './components/Utils.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

export function createAsessAppRoutes(db) {
  return [
    {
      path: '/',
      element: <Root />,
      loader: async ({ params }) => {
        let assessmentData = await import('./data/assessments.json');
        return {
          assessments: assessmentData.assessments,
          db: db,
        };
      },
    },
    {
      path: '/assessments/:aid/section/:sid',
      element: <AssessmentSection />,
      loader: async ({ params }) => {
        let assessmentData = await import('./data/assessments.json');
        let answers = await db.getItem(Utils.getAssessmentId(params.aid));
        const aid = parseInt(params.aid);
        let section;
        switch (aid) {
          case 1:
            let temperamentsAssessmentData = await import(
              './data/temperaments.json'
            );
            section =
              temperamentsAssessmentData.assessment.sections[params.sid - 1];
            break;
          case 2:
            let spiritualGiftsAssessmentData = await import(
              './data/spiritual_gifts.json'
            );
            section =
              spiritualGiftsAssessmentData.assessment.sections[params.sid - 1];
            break;
          case 3:
            let emlMarriageSinglenessData = await import(
              './data/eml_marriage_singleness.json'
            );
            section =
              emlMarriageSinglenessData.assessment.sections[params.sid - 1];
            break;
          case 4:
            let emlLovingUnionData = await import(
              './data/eml_loving_union.json'
            );
            section = emlLovingUnionData.assessment.sections[params.sid - 1];
            break;
          case 5:
            let antiochGiftsData = await import(
              './data/antioch_spiritual_gifts.json'
            );
            section = antiochGiftsData.assessment.sections[params.sid - 1];
            break;
          default:
            section = null;
        }
        return {
          answers: answers,
          assessment: assessmentData.assessments[aid - 1],
          db: db,
          section: section,
        };
      },
    },
    {
      path: '/assessments/:aid/results',
      element: <AssessmentResults />,
      loader: async ({ params }) => {
        let assessmentData = await import('./data/assessments.json');
        let answers = await db.getItem(Utils.getAssessmentId(params.aid));
        const aid = parseInt(params.aid);
        let scoring;
        switch (aid) {
          case 1:
            let temperamentsAssessmentData = await import(
              './data/temperaments.json'
            );
            scoring = temperamentsAssessmentData.scoring;
            break;
          case 2:
            let spiritualGiftsAssessmentData = await import(
              './data/spiritual_gifts.json'
            );
            scoring = spiritualGiftsAssessmentData.scoring;
            break;
          case 3:
            let emlMarriageSinglenessAssessmentData = await import(
              './data/eml_marriage_singleness.json'
            );
            scoring = emlMarriageSinglenessAssessmentData.scoring;
            break;
          case 4:
            let emlLovingUnionData = await import(
              './data/eml_loving_union.json'
            );
            scoring = emlLovingUnionData.scoring;
            break;
          case 5:
            let antiochGiftsData = await import(
              './data/antioch_spiritual_gifts.json'
            );
            scoring = antiochGiftsData.scoring;
            break;
          default:
            scoring = null;
        }
        return {
          answers: answers,
          assessment: assessmentData.assessments[aid - 1],
          scoring: scoring,
        };
      },
    },
  ];
}

export class AssessApp extends Component {
  constructor(props) {
    super(props);

    this.db = localforage.createInstance({
      name: 'assessments',
    });
  }

  componentDidMount() {
    const db = this.db;
    db.ready().then(() => {
      console.info(`localforage driver is ${db.driver()}`);
    });
  }

  render() {
    const props = this.props;

    const router = createBrowserRouter(createAsessAppRoutes(this.db), {
      basename: '/projects/assess-app/',
    });

    return (
      <StrictMode>
        <ThemeProvider
          breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
          minBreakpoint="xxs"
        >
          <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Brand href="/">Assessments</Navbar.Brand>
            </Container>
          </Navbar>
          <RouterProvider router={router} future={{ v7_startTransition: true, v7_relativeSplatPath: true }} />
          <footer className="footer">
            <div className="container text-center">
              <div className="small text-muted">
                Version {props.version} &bull; &nbsp;
                <a href="https://github.com/phyiction/assess-app/issues/new">
                  Report Bug
                </a>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </StrictMode>
    );
  }
}

// Assumes HTML template has an element with an id set to 'root'
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<AssessApp version="0.0.6" />);
