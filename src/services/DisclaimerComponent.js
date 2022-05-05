
const Modal = ({ handleClose, show, company, children }) => {
    const showHideClassName = show ? "modal-akagi display-block" : "modal-akagi display-none";  
    
    function getFailure() {
        window.location.href = "stop";
    }

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Disclaimer</h5>
                        </div>
                        <div className="modal-body">
                            <p> • I understand that per the <strong> Emergency Temporary Standard (ETS) </strong> issued by <strong> The Occupational Safety and Health 
                                Administration (OSHA) </strong>, <strong> {company} </strong> is required to collect a limited data set of protected health information. 
                                To protect the privacy of personal health information under <strong> HIPAA </strong>, <strong> {company} </strong> will only use this 
                                collected information for tracking compliance with the COVID-19 vaccination mandate; securely retain this information in compliance with
                                HIPAA safeguard requirements; only allow access to this information by authorized users that have “need to know” responsibilities.</p>
                            <p> • I certify that the information about my vaccination status is true and accurate. I understand that knowingly providing false information 
                                regarding my vaccination status on this form may subject me to criminal penalties</p>
                        </div>        
                        <div className="modal-footer">
                            <button type="button" className= "btn btn-success" onClick={handleClose}>I Agree</button>
                            <button type="button" className= "btn btn-danger" onClick={getFailure}>I Decline</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Modal