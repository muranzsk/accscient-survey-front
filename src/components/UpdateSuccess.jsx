import React, { Component } from 'react'
import './assets/info-pages.css';

export default class UpdateSuccess extends Component {

    constructor(props) {
        super(props)

        this.state = {
            showYes: '',
            showNo:  ''
        }

    }

    componentDidMount() {
        const qp = new URLSearchParams(window.location.search);
        const result = qp.get('re');

        if(result === '1') {
            this.setState({
                showNo : 'display-none'
            })
        } else {
            this.setState({
                showYes : 'display-none'
            })
        }
    }

    render() {
        return (
            <div>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" 
                integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossOrigin="anonymous"/>

                <div className="error">
                    <h1 style={{fontWeight: 'bold', fontFamily: 'Arial, sans-serif', fontSize: '100px'}}>Thank You!</h1>
                    <div className={this.state.showYes}>
                        <p style={{fontFamily: 'Arial, sans-serif', fontSize: '25px'}}>Thank you for submitting your proof of vaccination.</p>
                    </div>
                    <div className={this.state.showNo}>
                        <p style={{fontFamily: 'Arial, sans-serif', fontSize: '25px'}}>Thank you for submitting your response. The HR team will get in touch with you. 
                        If you wish to update your vaccination status in the future, you can access the same link to update your information.</p>
                    </div>
                    <div className="forSpace">
                        <p style={{fontFamily: 'Arial, sans-serif', fontSize: '30px'}}><a href="https://www.google.com">Exit &rarr;</a></p>
                    </div>                    
                </div>
                
            </div>
        )
    }
}
