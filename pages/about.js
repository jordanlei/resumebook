import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Layout from './components/Layout';

class About extends Component {
  
  render() {
    return (
      <Layout>
        <div className="dark-container" style={{paddingBottom: 2+"%"}}>            
          <div>
          <Row>
            <Col md={4}>
              <h3>
                I love drawing, writing, making music, 
                and training AI to beat me at all of those things
              </h3>
            </Col>
            <Col md={1}>
            </Col>
            <Col md={7}>
              <p>
              I'm a junior in the <b>Jerome Fisher Program in 
              Management and Technology</b> at the <b>University of Pennsylvania.</b> <br/>
              I consider myself an inquisitive person - I love figuring 
              out what makes things tick - maybe that's why I chose to 
              pursue <b>Computer Science</b> and <b>Behavioral Economics</b>!
              It's probably also why I love doing research. <br/>
              I have a nerdy passion for <b>Deep Learning and Artificial 
              Intelligence</b>. Before the singularity, you'll find me painting, 
              playing the guitar, or snuggling up with a good book. <br/>
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
