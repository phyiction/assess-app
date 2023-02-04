import { Component, StrictMode } from 'react';

import ThemeProvider from 'react-bootstrap/ThemeProvider'

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Container from 'react-bootstrap/Container';

import {
  createBrowserRouter,
  Link,
  RouterProvider,
} from "react-router-dom";

import Root from "./routes/root.jsx";

import Assessment from './Assessment.jsx';
import Section from './Section.jsx';

import Logo from './logo.jpg';

import assessmentData from './data/assessments.json';
import insightsDiscoveryData from './data/insights-discovery.json';

export class WWGAssessApp extends Component {

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
          return assessmentData[params.aid-1];
        }
      },{
        path: '/assessments/:aid/section/:sid',            
        element: <Section />,
        loader: async ({ params }) => {
          const aid = parseInt(params.aid);
          let data;
          switch(aid){
            case 1:
              data = { 
                aid: params.aid, 
                section: insightsDiscoveryData.sections[params.sid-1] 
              };
              break;
            case 2:
              data = null;
              break;
            default:
              data = null;                  
          }                
          return data;
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
              <img
                alt=""
                src={Logo}
                width="32"
                height="32"
                className="d-inline-block align-top"
              />            
              {' '} Assessments
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