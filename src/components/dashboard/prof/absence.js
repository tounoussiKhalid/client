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
import Header from '../../pages/Header'
import Alert from 'react-bootstrap/Alert'
var moment = require('moment');

class Absence extends React.Component{

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
        this.studentsList = [];
        this.class= '';
        this.module ='';
        this.hour = '';
        console.log( " StudentListConstructor-----> ", this.props.id_user )
    }

    getStudentList = async ( list_id, students)=>{
        let data = [];
        console.log( "Ghanfetchiw al3awd")
        await fetch( 'http://localhost:5000/api/students/listId', {
            headers: {'Content-Type':'application/json'},
            method: 'post',
            body: JSON.stringify({ listIds : list_id })
            }) 
            .then( res => res.json())
            .then( res =>{
                console.log( "this.state.students ",this.state.students )
                if ( res ){
                    data = [];
                    if ( res.length){
                         res.map(  (student)=>{
                            if ( this.studentsList.indexOf(student.name ) == -1)
                            this.studentsList.push( student.name )
                        })
                        let i = 0;
                        
                         students.map( async ( student) => {
                             this.studentsList.map( async(name) =>{
                            data.push ({
                               "number" : ++i,
                               "name" : name,
                               "module" : student.module,
                               "date" : moment(student.date).format('YYYY-MM-DD'),
                               "seance" : student.seance,
                               "absent": <MySwitch checked={true} handleSwitcheChanges={this.handleSwitcheChanges} id_student={student._id}/>
                           })
                           console.log( "DATA b MAN",data);
                           }) 
                   console.log( "DATA MAN",data);
                           
                   })
                   
                    }
                    this.setState({
                        students : this.studentsList,
                        data
                    });
                   
                    console.log( "this.state.students ",this.state.students )
                    console.log( "this.students ",this.studentsList )
                }
            })
            
        
    }

    handleHeaderChange = async (students ) =>{
        
        console.log("BRRR",students)
        if( students && students.length ){
            let i = 0;
            //let data =
            console.log( "We have started");
            await students.map ( async (student) => {
                if( student.absentStudents && student.absentStudents.length)
                   await this.getStudentList( student.absentStudents, students );
            });
                console.log( "and we gonna continue");
              
        } else{
            let data = [];
            this.setState({
                data
            });
        }
        
        
    }

    componentDidUpdate(prevProps, prevState){
        console.log( "Absence did update ", prevState,"+", this.state)
    }

    handleSwitcheChanges = (event)=>{
       if( event.target.checked)
            this.absentStudentsList.push( event.target.value )
        else
            if(  this.absentStudentsList.indexOf(event.target.value)  !== -1)
                this.absentStudentsList = this.absentStudentsList.filter(item => item !== event.target.value)

    }

      handleSelectHeaderChange = (event )=>{
        switch ( event.target.name ){
            case 'Classe' : this.class = event.target.value; break;
            case 'Module' : this.module = event.target.value; break;
            case 'Hour' : this.hour = event.target.value; break;
        }
      }


     render(){
        
        const Students = [];
        let counter = 0;
            let i = 0;
        return (
        <div >
            <Header id_page={1} handleSelectHeaderChange={this.handleSelectHeaderChange} handleHeaderChange={this.handleHeaderChange} classes_modules={this.props.classes_modules}></Header>
            <div id="result" >  
                        <Alert show={this.state.show} variant="success">
                            <Alert.Heading>Success</Alert.Heading>
                        </Alert>
            </div>
            <div  className="Table">
                <MaterialTable 
                    options={{
                       
                        headerStyle:{backgroundColor:'#F5F5F5', fontWeight: '900'}
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
                        { title: 'module', field: 'module' },
                        { title: 'seance', field: 'seance' },
                        { title: 'date', field: 'date' },
                        { title: 'absent', field: 'absent' },
                    ]}
                    data={this.state.data}
                    onRowClick={((evt, selectedRow) => this.setState({ selectedRow }))}
                    title= {
                    <span style={{"color" : "#082C7F", "fontSize" : 24, "fontWeight ": 'normal'}}>Absent Students</span> }
                
                />
            </div>
           
        </div>

        );
    }
}
export default Absence;