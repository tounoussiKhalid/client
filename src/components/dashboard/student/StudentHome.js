import React from 'react';
import MaterialTable, {MTableToolbar} from 'material-table'
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
var moment = require('moment');

class StudentHome extends React.Component{

    constructor(props){
        super(props);
        this.id = this.props.id_user;
        this.state  = {
            data : [],
            name : '',
            total : '',
            show : false
        }
    }

    componentDidMount(){
        this.whoIam();
        this.getAbsences();
    }

    whoIam = ()=>{
        fetch('http://localhost:5000/api/users/whoIam', {
                    headers: {'Content-Type':'application/json'},
                    method: 'post',
                    body: JSON.stringify({ id_user : this.id })
        }) 
        .then( res => res.json())
        .then (
        res =>{
            this.state.name = res.name
        }
        )
        
    }


    getAbsences = ()=>{
        fetch('http://localhost:5000/api/absences/MyAbsences', {
                    headers: {'Content-Type':'application/json'},
                    method: 'post',
                    body: JSON.stringify({ id_student : this.id })
        }) 
        .then( res => res.json())
        .then (
        res =>{
            console.log ( res);
            
            if ( res ){
                let data = [];
                if ( res .length ){
                    this.setState({show: true,total : res.length})
                    let i = 0;
                    res.map( (absence) =>{
                        data.push ({
                            "number" : ++i,
                            "module" : absence.module,
                            "date" : moment(absence.date).format('YYYY-MM-DD'),
                            "seance" : absence.seance
                        })
                    });
                    this.setState({
                        data
                    })
                } else {
                    this.setState({
                        show : false
                    })
                }
            }
        })
    }


    render(){
        return(
            <div>

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
                        { title: 'module', field: 'module' },
                        { title: 'seance', field: 'seance' },
                        { title: 'date', field: 'date' },
                    ]}
                    data={this.state.data}
                    onRowClick={((evt, selectedRow) => this.setState({ selectedRow }))}
                    title= {
                    <span style={{"color" : "#082C7F", "fontSize" : 24, "fontWeight ": 'normal'}}>Seances Absences of {this.state.name}</span> }
                
                />
                {this.state.show && 
                 <div className="alert alert-warning" role="alert">
                     Total : {this.state.total} seances
                </div> }
               
            </div>
                    </div>
        )
    }
}
export default StudentHome;