import Link from 'next/link'
import React, {Component} from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
  
const linkStyle = {
  marginRight: 15
}

class Header extends Component{
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render(){
    return(
      <div style= {{position: "fixed", width: "100vw", backgroundColor: "rgba(0, 0, 0, 0.7)"}}>
        <Navbar dark expand="md" style= {{paddingLeft: "3%", paddingRight: "3%"}}>
          <NavbarBrand href="/">Home</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="../about">About</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Users
                </DropdownToggle>
                <DropdownMenu className= "dropdown" right style= {{backgroundColor: "rgba(0, 0, 0, 0.5)", marginTop: "7px"}}>
                  <DropdownItem>
                    <NavLink href="../register">Create</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink href="../login">Login</NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
        <style jsx>{`
        
        `}</style>
      </div>
    )
  }
}

export default Header