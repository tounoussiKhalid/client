import React from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import MySelect from './MySelect';

class Header extends React.Component{

    render (){
        return (
            <div>
                <Container>
                    <Row>
                        
                        <Col >
                            <div className="Line" >
                             <div className="oneLine up">Module</div>
                             <div className="oneLine"><MySelect title="Module" content={["Modelisation","Electronique","Math"]} /></div>  
                             <div className="oneLine up">classe</div> 
                             <div className="oneLine"><MySelect  title="Classe" content={["info1","MBF","ISIL"]} /></div> 
                             <div className="oneLine up">hour</div> 
                             <div className="oneLine" ><MySelect title="Hour"content={["8-10","10-12","2-4","4-6"]}/></div> 
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

        );
    }
}

export default Header;