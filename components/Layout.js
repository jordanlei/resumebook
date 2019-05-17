import Header from './Header'
import 'bootstrap/dist/css/bootstrap.min.css';

const layoutStyle = {
  fontFamily: "Arial"
}

const Layout = props => (
  <div style={layoutStyle}>
    <Header />
    {props.children}
  </div>
)

export default Layout