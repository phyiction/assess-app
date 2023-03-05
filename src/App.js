import { Component, StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import ThemeProvider from 'react-bootstrap/ThemeProvider'

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Container from 'react-bootstrap/Container';

import {
  createBrowserRouter,
  Link,
  RouterProvider,
} from "react-router-dom";

import localforage from "localforage/src/localforage.js";

import AssessmentResults from './pages/AssessmentResults.js';
import AssessmentSection from './pages/AssessmentSection.js';
import Root from "./pages/Root.js";

import Utils from './components/Utils.js';

import './scss/styles.scss';

export class AssessApp extends Component {

  constructor(props){
    super(props);

    this.db = localforage.createInstance({
      name: "assessments"
    });    
  }

  componentDidMount(){
    const db = this.db;
    db.ready().then(() => {
      console.info(`localforage driver is ${db.driver()}`);
    });    
  }

  render(){

    const props = this.props;
    const db = this.db;

    const router = createBrowserRouter([
      {
        path: "/",
        element: <Root />,
        loader: async ({ params }) => {
          let assessmentData = await import('./data/assessments.json');
          return {
            assessments: assessmentData.assessments,
            db: db
          };
        }
      },{
        path: '/assessments/:aid/section/:sid',            
        element: <AssessmentSection />,
        loader: async ({ params }) => {
          let assessmentData = await import('./data/assessments.json');
          let answers = await db.getItem(Utils.getAssessmentId(params.aid));
          const aid = parseInt(params.aid);
          let section;
          switch(aid){
            case 1:
              let temperamentsAssessmentData = await import('./data/temperaments.json');
              section = temperamentsAssessmentData.assessment.sections[params.sid-1];
              break;           
            case 2:
              let spiritualGiftsAssessmentData = await import('./data/spiritual_gifts.json');
              section = spiritualGiftsAssessmentData.assessment.sections[params.sid-1];                    
              break;
            default:
              section = null;                
          }          
          return {                
            answers: answers,
            assessment: assessmentData.assessments[aid-1],
            db: db,
            section: section 
          };  
        }
      },{
        path: '/assessments/:aid/results',
        element: <AssessmentResults />,
        loader: async ({ params }) => {
          let assessmentData = await import('./data/assessments.json');          
          let answers = await db.getItem(Utils.getAssessmentId(params.aid));
          const aid = parseInt(params.aid);
          let scoring;
          switch(aid){
            case 1:
              let temperamentsAssessmentData = await import('./data/temperaments.json');
              scoring = temperamentsAssessmentData.scoring;
              break;
            case 2:
              let spiritualGiftsAssessmentData = await import('./data/spiritual_gifts.json');
              scoring = spiritualGiftsAssessmentData.scoring;
              break;
            default:
              scoring = null;
          }   
          return {
            answers: answers,
            assessment: assessmentData.assessments[aid-1],
            scoring: scoring
          }       
        }
      }
    ],{
      basename: '/projects/assess-app/'
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
          <RouterProvider router={router} />
          <footer className="footer">
            <div className="container text-center">
              <small className="small text-muted">
                Version {props.version} &bull; &nbsp;
                <a href="https://github.com/phyiction/assess-app/issues/new">Report Bug</a>
              </small>
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
root.render(<AssessApp version="0.0.1" />);