import UserHeader from './UserHeader'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/standard.css'

import Header from './Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/standard.css'
import {Component} from 'react'
import {Spinner} from 'reactstrap'


  
class Loading extends Component{
  constructor(props) {
    super(props);
  }

  render(){

    return(
      <div style={{width: "100vw"}} >
        <div style= {{margin: "0 auto", width: "200px", textAlign: "center", paddingTop: "20%"}}>
          <h3>Please wait... </h3>
          <Spinner style={{ width: '4rem', height: '4rem' }} />{' '}
        </div>
      </div>
    )
  }

}

export default Loading