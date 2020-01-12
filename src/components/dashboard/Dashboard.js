import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import ProfessorHome from './prof/ProfessorHome';
import AdminHome from './admin/AdminHome';
import StudentHome from './student/StudentHome';
import * as ReactBootstrap from 'react-bootstrap'
import DashboardAdmin from "./DashboardAdmin";

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state={
      page : 0
    }
  }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

render() {
    const { user } = this.props.auth;
    console.log( "*************" ,user ,"*************" );
    if(user.role === 'admin')
    this.props.history.push("/dashboardAdmin");

return (
  <div>
    <ReactBootstrap.Navbar bg="dark" variant="dark" expand="lg">
    <ReactBootstrap.Navbar.Brand href="/dashboard">School of Technology of Essaouira</ReactBootstrap.Navbar.Brand>
    <ReactBootstrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
    <ReactBootstrap.Navbar.Collapse id="basic-navbar-nav">
    
      <ReactBootstrap.Nav className="mr-auto">
      {user.role !== 'student'  &&
        <ReactBootstrap.Nav.Link href="#home" onClick={(e) => {this.setState({ page : 0}); }}>Home</ReactBootstrap.Nav.Link> }
      {user.role !== 'student'  &&  
<ReactBootstrap.Nav.Link href="#absence" onClick={(e) => {this.setState({ page : 1}); }}>Absence</ReactBootstrap.Nav.Link> }
    </ReactBootstrap.Nav> 
      <ReactBootstrap.Form inline>
        <ReactBootstrap.Button variant="primary" onClick={(e) => {this.onLogoutClick(e);  }}>Logout</ReactBootstrap.Button>
      </ReactBootstrap.Form>
    </ReactBootstrap.Navbar.Collapse>
  </ReactBootstrap.Navbar>

      <div style={{ height: "75vh" }} className="mainContainer valign-wrapper">
        <div  style={{  width : "95%", margin : "auto"}}>
          <div className="col center-align" >
            
          {user.role === 'professor' && <ProfessorHome page={this.state.page} id_user={user.id} /> } 
          {user.role === 'student' && <StudentHome id_user={user.id} /> } 
          </div>
        </div>
      </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);