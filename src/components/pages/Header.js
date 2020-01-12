import React from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import MySelect from './MySelect';

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state={
            classes_modules : this.props.classes_modules,
            Classe : '',
            Module : '',
            Hour  : ''
        }
        this.id_page = this.props.id_page;
        this.classes = new Object(); 
        this.className = '';   
        console.log("Header Constructor" , this.props.classes_modules )    
    }

    componentDidUpdate(prevProps, prevState) {
        // Typical usage (don't forget to compare props):
        console.log( "PrevProps->",prevProps ,"prevState->",prevState, "CurrProps->",this.props, " CurrState->",this.state )
      }

      getStudentList = async (classe)=>{
           await fetch( `http://localhost:5000/api/students/${classe}`)
           .then( res => res.json() )
           .then ( res => {
               console.log( "RESULT ",res );
            this.props.handleHeaderChange( res )
           })
      }

      getAbsentStudentList = async ()=>{
          console.log( this.state.Classe , " *-*-* ", this.state.Module)
        await fetch( `http://localhost:5000/api/absences/list` , {
            headers: {'Content-Type':'application/json'},
            method: 'post',
            body: JSON.stringify({ 
              class : this.state.Classe,
              module : this.state.Module
            })
        }) 
        .then( res => res.json() )
        .then ( res => {
            console.log( "RESULT ",res );
         this.props.handleHeaderChange( res )
        })
   }

      
      handleChange = (e)=>{
          let val = e.target.value;
          let name = e.target.name;
         this.props. handleSelectHeaderChange(e);
          console.log( "CHANGE ::",e.target.name,"::",e.target.value )
          this.setState({
              [name] : val
          },  (prevState,props)=>{
                    
                    if ( this.state.Classe !== '' && this.state.Module !== '' )
                    {
                            this.getStudentList( this.state.Classe) 
            
                        console.log( "77", this.state.Classe.trim() ,"77-")
                    }
         }
         )


      }

      handleAbsenceChange = (e)=>{
          console.log( "l3adaaaaaaaaaaaaaaaaaaaaaaaab");
        let val = e.target.value;
        let name = e.target.name;
        console.log( val ,"<<->>", name)
       this.props. handleSelectHeaderChange(e);
        console.log( "CHANGE ::",e.target.name,"::",e.target.value )
        this.setState({
            [name] : val
        },  (prevState,props)=>{
            console.log ( "Header",this.state);
                  if (this.state.Classe !== '' && this.state.Module !== ''  )
                  {
                      console.log( "*/*",this.state.Classe,this.state.Module)
                          this.getAbsentStudentList()           
                  }
       }
       )


        console.log (this.state)
    }

    render (){ 
        let classes_modules = this.state.classes_modules;
        
        classes_modules.map( ( classe_modules) => {
                this.classes[classe_modules.class_name] = classe_modules.modules;
        })  
        let modules = [];
        Object.values( this.classes).map( (obj) => {
            modules =  modules.concat(  obj);
        });

        console.log ( modules );

        return (
           this.id_page == 0 ?
            <div>
                <Container>
                    <Row>
                        <Col >
                             <div className="Line" >
                             <div className="oneLine up">classe</div> 
                             <div className="oneLine"><MySelect handleSelect={this.handleChange} title="Classe" content={Object.keys(this.classes)} /></div> 
                             <div className="oneLine up">Module</div>
                             <div className="oneLine"><MySelect title="Module" handleSelect= {this.handleChange} content={modules} /></div>  
                             <div className="oneLine up">hour</div> 
                             <div className="oneLine" ><MySelect title="Hour" handleSelect= {this.handleChange} content={["8-10","10-12","2-4","4-6"]}/></div> 
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            :
            <div>
                <Container>
                    <Row>
                        <Col >
                             <div className="Line" >
                             <div className="oneLine up">classe</div> 
                             <div className="oneLine"><MySelect handleSelect={(e)=>{this.handleAbsenceChange(e);}} title="Classe" content={Object.keys(this.classes)} /></div> 
                             <div className="oneLine up">Module</div>
                             <div className="oneLine"><MySelect title="Module" handleSelect= {(e)=>{this.handleAbsenceChange(e);}} content={modules} /></div>   
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Header;