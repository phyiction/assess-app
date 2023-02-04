import { Component } from 'react';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export class MultipleChoiceQuestion extends Component {
  
  constructor(props){
    super(props);
  }

  render() {

    const options = ["A","B","C","D"].map((opt) => {
      return (        
        <Form.Check key={opt} name={`q-${this.props.question.id}`} type="radio" label={`${opt}. ${this.props.question[opt]}`} />
      );
    });

    return (
      <div className="question">
        <h6>{this.props.question.id}.</h6>
        <div className="mb-3">          
          { options }            
        </div>
      </div>
    );
  }
}