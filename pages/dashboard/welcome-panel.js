import React, { Component } from 'react';
import { Button, ButtonGroup, Row, Col} from 'reactstrap';
import { Link } from 'react-router-dom';
import DashboardMenu from './dashboard-menu';

class WelcomePanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Row>
        <Col md={2}>
          <DashboardMenu displayPanel={this.props.displayPanel}/>
        </Col>
        <Col md={10}>
          <div className="dashboard-menu-container">
          <h3>Welcome!</h3>
          </div>
        </Col>
      </Row>
      
    );
  }
}

export default WelcomePanel;