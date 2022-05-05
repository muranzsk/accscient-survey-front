import React, { useState } from 'react';
import AkagiService from './AkagiService';

const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal-akagi display-block" : "modal-akagi display-none";  
    const [email, setEmail] = useState('');

    const handleInputChange = (event) => {
        setEmail(event.target.value);
    };

    const enviarDatos = (event) => {
        event.preventDefault();
        AkagiService.sendIndivReminder(email)
        .then((res) => 
        {
            if(res.data === 0) {
                alert('Could not send email, try again later');
            } else {
                alert('Email Sent');
            }  
        });
        document.getElementById("mailModal").classList.add("display-none");
        setEmail('');
    }

    return (
        <div className={showHideClassName} id="mailModal">
            <section className="modal-main">
            <form onSubmit={enviarDatos}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Send New Reminder</h5>
                        </div>
                        <div className="modal-body">
                            
                                <div className='form-group'>
                                    <label>Email: </label>
                                    <input type="email" className="form-control" name="email" placeholder='john@example.com'
                                        onChange={handleInputChange} value={email} />
                                </div>
                            
                        </div>        
                        <div className="modal-footer">
                            <button type="submit" className= "btn btn-success">Send Mail</button>
                            <button type="button" className= "btn btn-danger" onClick={handleClose}>Cancel</button>
                        </div>
                    </div>
                </div>
                </form>
            </section>
        </div>
    );
}

export default Modal