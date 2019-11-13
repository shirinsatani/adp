import React, { Component } from 'react';
import './app.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup'

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      shops: null
    };
  }

  componentDidMount() {
    fetch('/api/getBusiness')
      .then(res => res.json())
      .then(result => this.setState({ shops: (result.business) ? result.business : null}
    ));
  }

  render() {
    const { shops } = this.state;
    return (
      <div className="main-container">
        <ListGroup as="ul">
          {shops ? (shops.map((value, index) => (
            <ListGroup.Item as="li" key={index}>
              <div>
                <h3 className="shop-name-panel">{value.name}!</h3>
                <span>{value.location.city}, {value.location.state}</span>
              </div>
              <div className="review-panel">
                <span>{value.review.text}</span>
                <br/>
                <span className="name-text"> - {value.review.name}</span>
              </div>
            </ListGroup.Item>
            )))  : <ListGroup.Item as="li"><h1> No results to show! </h1></ListGroup.Item>
          }
        </ListGroup>
      </div>
    );
  }
}
