import React, { Component } from 'react';
import AkagiService from '../services/AkagiService';

export default class WelcomeComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            emailAddress: '',
            ultraSuperSecretCode: ''
        }
        this.addressHandler = this.addressHandler.bind(this);
        this.ultraSuperSecretHandler = this.ultraSuperSecretHandler.bind(this);
        this.sendCode = this.sendCode.bind(this);
    }

    sendCode(e) {
        e.preventDefault();
        const data = {
            email: this.state.emailAddress,
            code: this.state.ultraSuperSecretCode
        }
    
        const config = {     
            headers: { 'content-type': 'application/json' }
        }
    
        AkagiService.verifyAccess(data, config)
        .then(response => {     
            /*alert(JSON.stringify(response) );*/           
            if(!response.data) {
                window.location.href = "/";
            } else {
                window.location.href = "/dashboard?code=" + response.data;                
            }
        }); 
  
    }

    addressHandler = (event) => {
        this.setState({emailAddress: event.target.value});
    }

    ultraSuperSecretHandler = (event) => {
        this.setState({ultraSuperSecretCode: event.target.value});
    }

    render() {
        return (
            <div>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3 mt-4">
                            <h2 className="text-center mt-4">Welcome!</h2>   
                            <div className = "card-body">
                                <form>
                                    <div className="form-group mt-2">
                                        <label>Email: </label>
                                        <input type="text" className= "form-control" name="emailAddress" placeholder= "john@example.com"
                                            value={this.state.emailAddress} onChange={this.addressHandler}/>
                                    </div>
                                    <div className="form-group mt-2">
                                        <label>Password: </label>
                                        <input type="password" className= "form-control" name="ultraSuperSecretCodeId" placeholder= "CODE"
                                            value={this.state.ultraSuperSecretCode} onChange={this.ultraSuperSecretHandler}/>
                                    </div>
                                    <div className="form-group mt-4">
                                        <button className="btn btn-success" onClick={this.sendCode}>Log In</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
