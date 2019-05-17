import Header from './Header'

const layoutStyle = {
  padding: 10 + "%",
  fontFamily: "Arial"
}

const Layout = props => (
  <div style={layoutStyle}>
    <Header />
    {props.children}
  </div>
)

export default Layout