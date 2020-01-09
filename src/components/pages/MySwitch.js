import React from 'react';
import Switch from '@material-ui/core/Switch';

class MySwitch extends React.Component{
    state = {
        isCheked : true
    }
    handleChange = ( event) => {
        this.setState({
            isCheked : !this.state.isCheked
        })
        console.log( event.target.checked)
    }
    render(){
        return (
            <Switch
                checked={ this.state.isCheked}
                onChange={this.handleChange}
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
        );
    }

}

export default MySwitch;