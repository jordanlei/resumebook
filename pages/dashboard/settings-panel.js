import React, { Component } from 'react';
import { Button, ButtonGroup, Row, Col} from 'reactstrap';
import { Link } from 'react-router-dom';
import DashboardMenu from './dashboard-menu';
import Fade from 'react-reveal/Fade';

class SettingsPanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="dashboard-container" style= {{backgroundColor: "rgba(24, 0, 0, 0.3)"}}>
        <Row>
          <Col md={2}>
            <DashboardMenu dark displayPanel={this.props.displayPanel}/>
          </Col>
          <Col md={10}>
            <h3>Settings!</h3>
          </Col>
        </Row>
      </div>
      
    );
  }
}


export default SettingsPanel;