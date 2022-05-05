import React, { Component } from 'react';
import Modal from '../services/DisclaimerComponent';
import AkagiService from '../services/AkagiService';

export default class UpdateRecordComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            idEmployee: '',
            idCompany: '',
            company: '',
            fullName: '',
            emailAddress: '',
            vaccinated: '1',
            selectedFile: null,     
            show: true,
            canUpload: '',
            fileNameClass: 'display-none',
            selectedFileName: ''
        }
        this.onChangeVaccinated = this.onChangeVaccinated.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);   
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
    }

    componentDidMount() {
        const qp = new URLSearchParams(window.location.search);
        const code = qp.get('code');
        AkagiService.getUniqueForm(code).then((res) => {
            console.log(JSON.stringify(res));
            this.setState({
                idEmployee: res.data.idEmployee,
                idCompany: res.data.idCompany,
                company: res.data.company,
                fullName: res.data.name,
                emailAddress: res.data.emailAddress,
                show: true,
                selectedFile: null
                });
        });
    }

    showModal = () => {
        this.setState({ show: true });
    };
    
    hideModal = () => {
        this.setState({ show: false });
    };

    onChangeVaccinated(event) {
        this.setState({
            vaccinated: event.target.value
        });
        if(event.target.value === '-1') {
            this.setState({
                canUpload : 'display-none'
            })
        } else {
            this.setState({
                canUpload: ''
            })
        }
    }

    onFileChange(event) {    
        // Update the state

        this.setState({ 
            selectedFile: event.target.files[0],
            fileNameClass: 'comment-p ',
            selectedFileName: event.target.files[0].name
        });

    };

    handleSubmit(event) {
        event.preventDefault();

        let fileId = 0;

        if(this.state.vaccinated === '1') {
            const config = {     
                headers: { 'content-type': 'multipart/form-data' }
            }
            const formData = new FormData();
            formData.append(
                "file",
                this.state.selectedFile,
                this.state.selectedFile.name
            );
            AkagiService.uploadFile(formData, config)
            .then(response => {                
                fileId = response.data;
                this.updateEmployee(fileId);
            });
        } else {
            this.updateEmployee(fileId);
        }
        
    }

    updateEmployee(fileId) {
        const data = {
            idEmployee: this.state.idEmployee,
            idFile: fileId,
            status: this.state.vaccinated
        }

        const config = {     
            headers: { 'content-type': 'application/json' }
        }

        AkagiService.updateRecord(data, config);

        window.location.href = "/success?re=" + this.state.vaccinated;


    }

    render() {
        return (
            <div>                
                <div className= "container" >
                    <div className= "row" >
                        <div className= "card col-md-6 offset-md-3 offset-md-3 mt-4" style={{overflowY:"auto"}}>
                            <div className="row text-center mt-4" >
                                <div className="col-md-4">
                                    <img src={`${process.env.PUBLIC_URL}/img/Company${this.state.idCompany}.png`} alt="logo"
                                        className="img-logo"></img>
                                </div>
                                <div className="col-md-8">
                                    <h3>Vaccine Record Survey</h3>
                                </div>    
                            </div>                                
                            <div className= "card-body">
                                <form>
                                    <div className='mt-2'>
                                        <div className="form-group row">
                                            <label><span style={{fontWeight: 'bold'}}>Name: </span>
                                                <input type="text" readOnly className="form-control-plaintext" name="staticName" defaultValue={this.state.fullName}/>
                                            </label>
                                        </div>
                                        <div className="form-group row">
                                            <label><span style={{fontWeight: 'bold'}}>Company: </span>
                                                <input type="text" readOnly className="form-control-plaintext" name="staticCompany" defaultValue={this.state.company}/>
                                            </label>
                                        </div>
                                        <div className="form-group row">
                                            <label><span style={{fontWeight: 'bold'}}>Email: </span>
                                                <input type="text" readOnly className="form-control-plaintext" name="staticEmail" defaultValue={this.state.emailAddress}/>
                                            </label>
                                        </div>
                                    </div>                                    
                                    <div className= "form-group forSpace" style={{textAlign:'center'}}
                                    data-tip="">
                                        <label><h3> Are you Fully Vaccinated? </h3></label>
                                        <p className="comment-p">Currently Fully vaccinated means having taken 2 shots of 
                                        Pfizer or Moderna COVID-19 vaccine OR 1 shot of J&amp;J COVID-19 vaccine.</p>
                                        <div className="wrapper">                                            
                                            <input className="option option-1" name="select" type="radio" value='1' checked={this.state.vaccinated === '1'} onChange= {this.onChangeVaccinated}/>
                                            <label className="option option-1">
                                                <span>Yes</span> 
                                            </label>
                                            <input className="option option-2" name="select" type="radio" value='-1' checked={this.state.vaccinated === '-1'} onChange= {this.onChangeVaccinated}/> 
                                            <label className="option option-2"> 
                                                <span>No</span>
                                            </label>
                                        </div>
                                    </div>                                    
                                    <div className={this.state.canUpload}>
                                        <div className= "form-group forSpace" style={{textAlign:'center'}}>
                                            <label><h3>Upload proof of vaccination</h3></label>
                                            <ol style={{fontStyle:'normal', fontSize:'14px', fontFamily: 'sans-serif', textAlign:'left'}}>Acceptable proof of vaccination includes:
                                                <li>A copy of the COVID-19 Vaccination Record Card</li>
                                                <li>The record of immunization from a health care provider or pharmacy</li>
                                                <li>A copy of medical records documenting the vaccination</li>
                                                <li>A copy of immunization records from a public health, state, or tribal immunization information system</li>
                                                <li>A copy of any other official documentation that contains the type of vaccine administered, date(s) of administration, 
                                                    and the name of the health care professional(s) or clinic site(s) administering the vaccine(s)</li>
                                            </ol>
                                            <div className="wrapper forSpace">
                                                <label className="btn btn-outline-primary btn-lg custom-upload">
                                                    Upload
                                                    <input id="fileUpload" type="file" accept=".pdf, image/*, .doc, .docx" style={{display: 'none'}} ref={this.fileInput} onChange={this.onFileChange}/>
                                                </label>
                                                <div className={this.state.fileNameClass}>
                                                    File: {this.state.selectedFileName}
                                                </div>
                                            </div>
                                        <div>
                                            
                                        </div>
                                    </div>
                                    </div>
                                    <div className= "form-group" style={{textAlign:'center'}}>
                                        <button className= "btn btn-success" onClick={this.handleSubmit}>Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div> 
                <Modal show={this.state.show} handleClose={this.hideModal} company={this.state.company}>
                    <p>Modal</p>
                </Modal>                       
            </div>
        )
    }
}