import React, { Component } from 'react';
import './assets/info-pages.css';

export default class UpdateFailure extends Component {
    render() {
        return (
            <div>
                
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" 
                integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossOrigin="anonymous"/>

                <div className="error">
                    <h1 style={{fontWeight: 'bold', fontFamily: 'Arial, sans-serif', fontSize: '200px'}}>500</h1>
                    <div >
                        <p style={{fontFamily: 'Arial, sans-serif', fontSize: '25px'}}>Oh, this wasn't meant to happen.</p>
                        <p style={{fontFamily: 'Arial, sans-serif', fontSize: '25px'}}>Looks like something went wrong with your record.</p>
                        <p style={{fontFamily: 'Arial, sans-serif', fontSize: '25px'}}>Try Again in a few minutes or try with a different file.</p>
                    </div>
                    
                    <i className="far fa-frown forSpace" />
                    <br/>
                    
                    <p style={{fontFamily: 'Arial, sans-serif', fontSize: '30px'}}><a href="https://www.google.com">Exit &rarr;</a></p>
            </div>
                
            </div>
        )
    }
}
