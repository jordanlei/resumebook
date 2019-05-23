import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Layout from './components/Layout';
import SimpleTitle from './components/SimpleTitle'

class About extends Component {
  
  render() {
    return (
      <Layout>
        <SimpleTitle>
          <h3>About</h3>
        </SimpleTitle>
        <div className="light-container" style={{paddingBottom: 2+"%", minHeight: "60vh"}}>            
          <div>
          <Row>
            <Col md={4}>
              <h4>
                Hi. I'm Jordan.
              </h4>
            </Col>
            <Col md={1}>
            </Col>
            <Col md={7}>
              <p>
              I'm a senior in the <b>Jerome Fisher Program in 
              Management and Technology</b> at the <b>University of Pennsylvania.</b> <br/>
              I made this website as a fun summer project. It started out as an attempt to
              make a <b>personal blog</b>, and quickly developed into a much more involved
              rabbit hole that took roughly a week to complete.
              <i> Isn't this too much overhead for a personal blog, 
              you might ask? Isn't this, like, super extra?</i><br/><br/>
              Clearly, we haven't met. Hi. I'm Jordan. 
              </p>
            </Col>
          </Row>
          </div>
        </div>
      </Layout>
    );
  }
}

export default About;
