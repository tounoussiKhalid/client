import React from 'react';
import MaterialTable, {MTableToolbar} from 'material-table'
import MySwitch from '../../pages/MySwitch'
import Search from '@material-ui/icons/Search'
import SaveAlt from '@material-ui/icons/SaveAlt'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Check from '@material-ui/icons/Check'
import FilterList from '@material-ui/icons/FilterList'
import Remove from '@material-ui/icons/Remove'
import Clear from '@material-ui/icons/Clear'
import Icon from '@material-ui/core/Icon';
import SubmitButton from '../../pages/SubmitButton'
import Header from '../../pages/Header'
import Alert from 'react-bootstrap/Alert'
//import MuiAlert from '@material-ui/lab/Alert';

/*
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }*/
class StudentList extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          show : false,
          selectedRow: null,
          students : [],
          classes_modules : [],
          id_user : this.props.id_user,
          data : []
        }

        this.absentStudentsList = [];
        this.class= '';
        this.module ='';
        this.hour = '';
        console.log( " StudentListConstructor-----> ", this.props.id_user )
        this.getClasses( this.props.id_user );
        //this.getData();
    }

    handleHeaderChange = (students ) =>{
        console.log("BRRR",students)
        
        let i = 0;
        let data = students.map ( (student) =>{
            
            return ({
                "number" : ++i,
                "name" : student.name,
                "absent": <MySwitch checked={false} handleSwitcheChanges={this.handleSwitcheChanges} id_student={student._id}/>
            })
        })
        console.log ("Data'", data );
        this.setState({
            data
        })
    }

    handleSwitcheChanges = (event)=>{
       if( event.target.checked)
            this.absentStudentsList.push( event.target.value )
        else
            if(  this.absentStudentsList.indexOf(event.target.value)  !== -1)
                this.absentStudentsList = this.absentStudentsList.filter(item => item !== event.target.value)

        console.log ( "CHAGe ",this.absentStudentsList)
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

               /*let vals = res.map(
                     (e) => {
                         let cmp = 1;
                    return this.makeStudent( cmp++, e.fullName, <MySwitch/>)  
                    });
                */
                //console.log ( vals );
                /*this.setState ( {
                    students : vals
                })*/
                
               /* console.log( "students =",this.students)
                res.map( ( e) => console.log( e))
                console.log( "->", res)*/
            } 
        )
      }

      /*componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/posts",{
          headers: { crossDomain: true, "Content-Type": "application/json" }
        }).then(response=>response.json())
          .then(data => {
            console.log(data);
            this.setState({
              jokeComponents: data.map(joke => (
                <Joke
                  key={joke.id}
                  question={joke.title}
                  punchLine={joke.body}
                />
              ))
            });
          });
          demoAsyncCall().then(() => this.setState({ loading: false }));
      }*/

      handleSelectHeaderChange = (event )=>{
        switch ( event.target.name ){
            case 'Classe' : this.class = event.target.value; break;
            case 'Module' : this.module = event.target.value; break;
            case 'Hour' : this.hour = event.target.value; break;
        }
        console.log( "handleSelectHeaderChange");
      }

      handleSubmit = (event) =>{
          event.preventDefault();
          if ( this.class !== '' && this.module !== '' && this.hour !== '')
          {
            
            this.saveAbsence();
          }
          else 
          {
            console.log( "Not yet")
          }
        /*  fetch('http://localhost:5000/api/professors/home', {
                        headers: {'Content-Type':'application/json'},
                        method: 'post',
                        body: JSON.stringify({ 
                          //  class : ,

                         })
        }) 
        .then( res => res.json())
        .then (
            res =>{
                if ( res.success)
                    console.log( "Succes !");
             }
        )*/
      };

     
      saveAbsence = ()=>{
          console.log( "Before Fetch",this.absentStudentsList)
          const today = (new Date()).toLocaleDateString("en-US")
          console.log( "TODAY:",today)
          console.log( "seance:", this.hour)
            fetch('http://localhost:5000/api/absences/', {
                        headers: {'Content-Type':'application/json'},
                        method: 'post',
                        body: JSON.stringify({ 
                          class : this.class ,
                          module : this.module ,
                          absentStudents : this.absentStudentsList,
                          seance : this.hour,
                          date: today
                        })
            }) 
            .then( res => res.json())
            .then (
            res =>{
                if ( res.success){
                    let element = document.getElementById("result");
                   
                        this.setState({
                            show: true
                        })
                        
                        setTimeout( ()=>{
                            console.log( "Callback called");
                            this.setState({
                                show: false
                            })
                        }, 3000)
                        
                }
                
                else
                    console.log( "Failed !");
            }
            )
      }

     render(){
        
        const Students = [];
        let counter = 0;
        /*this.students.map( ({ student}) => {
            
            return ( 
                Students.push( {number : (++counter), name: student.fullName, absent: <MySwitch/>} )
                )
            } ); */
            let i = 0;
            console.log( ++i, "CLass mOdules in Student List ->",this.state.classes_modules)
            console.log( this.state.show.toString() )
        return (
        <div >
            <Header id_page={0} handleSelectHeaderChange={this.handleSelectHeaderChange} handleHeaderChange={this.handleHeaderChange} classes_modules={this.state.classes_modules}></Header>
            <div id="result" >  
                        <Alert show={this.state.show} variant="success">
                            <Alert.Heading>Success</Alert.Heading>
                        </Alert>
            </div>
            <div  className="Table">
                <MaterialTable 
                    options={{
                       // selection: true,
                        headerStyle:{backgroundColor:'#F5F5F5'}
                    }}
                    components={{
                        Toolbar: props => (
                        <div  style={{  borderBottom: '1px solid #A3AAEB' }}>
                            <MTableToolbar {...props} />
                        </ div>
                        ),
                        
                    }}
                    icons={{ 
                        Check: Check,
                        DetailPanel: ChevronRight,
                        Export: SaveAlt,
                        Filter: FilterList,
                        FirstPage: FirstPage,
                        LastPage: LastPage,
                        NextPage: ChevronRight,
                        PreviousPage: ChevronLeft,
                        Search: Search,
                        ThirdStateCheck: Remove,
                        ResetSearch:  Clear ,
                        Add: props => <Icon>delete</Icon>
                    }}
                    columns={[
                        { title: 'number', field: 'number', cellStyle: {
                            width: '20%',
                            maxWidth: '20%'
                        },
                        headerStyle: {
                            width: '20%',
                            maxWidth: '20%'
                        }
                        },
                        { title: 'name', field: 'name' },
                        { title: 'absent', field: 'absent' },
                    ]}
                    data={this.state.data}
                    onRowClick={((evt, selectedRow) => this.setState({ selectedRow }))}
                    title= {
                    <span style={{"color" : "#082C7F", "fontSize" : 24, "fontWeight ": 'normal'}}>Students List</span> }
                
                />
                 <SubmitButton handleSubmit={this.handleSubmit}></SubmitButton>
            </div>
        </div>

        );
    }
}
export default StudentList;