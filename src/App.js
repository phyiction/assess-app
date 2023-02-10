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

import Assessment from './pages/Assessment.js';
import Root from "./pages/root.js";
import Section from './pages/Section.js';

import './scss/styles.scss';

export class AssessApp extends Component {

  render() {

    const router = createBrowserRouter([
      {
        path: "/",
        element: <Root />
      },
      {
        path: `/assessments/:aid`,
        element: <Assessment />,
        loader: async ({ params }) => {      
          let data = await import('./data/assessments.json');
          return data[params.aid-1];          
        }
      },{
        path: '/assessments/:aid/section/:sid',            
        element: <Section />,
        loader: async ({ params }) => {
          let assessmentData = await import('./data/assessments.json');
          let insightsDiscoveryData = await import('./data/insights-discovery.json');
          const aid = parseInt(params.aid);          
          switch(aid){
            case 1:
              return { 
                assessment: assessmentData[aid-1], 
                section: insightsDiscoveryData.sections[params.sid-1] 
              };              
            case 2:
              return null;              
            default:
              return null;                  
          }          
        }
      }
    ]);

    return (
      <ThemeProvider
        breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
        minBreakpoint="xxs"
      >
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="/">                          
              Assessments
            </Navbar.Brand>
          </Container>
        </Navbar>
        <StrictMode>
          <RouterProvider router={router} />
        </StrictMode>        
      </ThemeProvider>
    );
  }
}

// Assumes HTML template has an element with an id set to 'root'
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<AssessApp />);