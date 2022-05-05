import React, { Component } from 'react';
import './assets/info-pages.css';

export default class StopComponent extends Component {
    render() {
        return (
            <div>
                
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" 
                integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous"/>

                <div className="error">
                    <h1 style={{fontWeight: 'bold', fontFamily: 'Arial, sans-serif', fontSize: '200px'}}>403</h1>
                    <div>
                        <p style={{fontFamily: 'Arial, sans-serif', fontSize: '25px'}}>We are sorry, you can not answer the survey without accepting the disclaimer.</p>
                        <p style={{fontFamily: 'Arial, sans-serif', fontSize: '25px'}}> You can always enter again and accept the disclaimer to take the survey</p>
                    </div>
                    
                    <i className="far fa-frown forSpace" />
                    <br/>
                    
                    <p style={{fontFamily: 'Arial, sans-serif', fontSize: '30px'}}><a href="https://www.google.com">Exit &rarr;</a></p>
            </div>
                
            </div>
        )
    }
}
