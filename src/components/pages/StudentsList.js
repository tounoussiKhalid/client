import React from 'react';
import MaterialTable, {MTableToolbar} from 'material-table'
import MySwitch from './MySwitch'
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
import SubmitButton from './SubmitButton'
import Header from './Header'
class StudentList extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          selectedRow: null,
          students : []
        }
        this.getData();
      }

      makeStudent = ( number, name, absent )=>{
          var obj = {
              number,
              name,
              absent
          }
          return obj;
      }

     getData = async () =>{ 
        await fetch('http://localhost:5000/api/students/listStudents/isil')
        .then( res => res.json())
        .then (
            res =>{
               let vals = res.map(
                     (e) => {
                         let cmp = 1;
                    return this.makeStudent( cmp++, e.fullName, <MySwitch/>)  
                    });
                    console.log ( vals );
                this.setState ( {
                    students : vals
                })
                
                console.log( "students =",this.students)
                res.map( ( e) => console.log( e))
                console.log( "->", res)
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
        return (
        <div >
            <Header></Header>
            <div  className="Table">
                <MaterialTable 
                    options={{
                        //selection: true,
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
                    data={this.state.students}
                    onRowClick={((evt, selectedRow) => this.setState({ selectedRow }))}
                    title= {
                    <span style={{"color" : "#082C7F", "fontSize" : 24, "fontWeight ": 'normal'}}>Students List</span> }
                
                />
                 <SubmitButton></SubmitButton>
            </div>
           
        </div>

        );
    }
}
export default StudentList;