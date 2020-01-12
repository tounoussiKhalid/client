import React from 'react';
import StudentList from './StudentsList';
import Absence from './absence';

class ProfessorHome extends React.Component{

    constructor(props){
        super(props);
        this.state= {
            classes_modules : []
        }
        this.id_user = this.props.id_user
    }

    componentDidMount(){
        this.getClasses(this.id_user);
    }

    getClasses = async ( id_user )=>{
        console.log( "Get Classes -> ",id_user)
      fetch('http://localhost:5000/api/professors/home', {
                      headers: {'Content-Type':'application/json'},
                      method: 'post',
                      body: JSON.stringify({ id_user })
      }) 
      .then( res => res.json())
      .then (
          res =>{
              if (res.success )
                  res.classes_modules.map(  ( class_module )=>{
                      let class_name = class_module.class_name;
                       this.state.classes_modules.push( { 
                          "class_name" : class_name,
                          "modules" : class_module.modules
                      } ); 
                  } )

                  this.setState(  this.state.classes_modules );
          } 
      )
    }

    
    render(){
        return(
            (this.props.page == 0 ? <StudentList id_user={this.props.id_user} classes_modules={this.state.classes_modules} /> : <Absence classes_modules={this.state.classes_modules}/>)
        );
    }
}

export default ProfessorHome;