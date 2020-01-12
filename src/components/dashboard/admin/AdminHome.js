import React from 'react';
import StudentList from '../prof/StudentsList';
import Absence from '../prof/absence';

class AdminHome extends React.Component{

    render(){
        return(
            (this.props.page == 1 ? <StudentList id_user={this.props.id_user}></StudentList> : <Absence />)
        );
    }
}

export default AdminHome;