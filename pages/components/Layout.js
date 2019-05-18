import Header from './Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/standard.css'

const Layout = props => (
  <div className= "layout">
    <Header />
    <div>
      {props.children}
    </div>
  </div>
)

export default Layout