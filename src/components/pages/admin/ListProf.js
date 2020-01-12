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

class ListProf extends React.Component{

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
        this.getProfs();
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

    getProfs = ()=>{
        fetch('http://localhost:5000/api/professors/') 
        .then( res => res.json())
        .then (
        res =>{
            console.log ( res);
            
            if ( res ){
                let data = [];
                if ( res .length ){
                    let i = 0;
                    let classes = [];
                    res.map( (prof) =>{
                        prof.classes_modules.map( (obj)=>{
                            classes.push( obj.class_name);
                        })
                        data.push ({
                            "number" : ++i,
                            "name" : prof.name,
                            "email" : prof.email,
                            "password" : prof.password,
                            "classes": classes
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
            <div width="100%" style={{backgroundColor:'red'}}>
             <div  className="Table" width="100%">
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
                        { title: 'email', field: 'email' },
                        { title: 'password', field: 'password' },
                        { title: 'classes', field: 'classes' },
                    ]}
                    data={this.state.data}
                    onRowClick={((evt, selectedRow) => this.setState({ selectedRow }))}
                    title= {
                    <span style={{"color" : "#082C7F", "fontSize" : 24, "fontWeight ": 'normal'}}>Professors' List</span> }
                
                />
               
            </div>
            </div>
        )
    }
}
export default ListProf;