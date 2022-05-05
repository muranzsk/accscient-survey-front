import React, { Component } from 'react';
import { Chart } from "react-google-charts";
import AkagiService from '../services/AkagiService';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Modal from '../services/MailComponent';

export default class DashboardComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            idUser: '',
            userAddress: '',
            employees: [],
            totalYes: '',
            totalNo: '',
            totalNotYet: '',
            show: false
        }
        this.sendReminder = this.sendReminder.bind(this);
        this.sendSingleMail = this.sendSingleMail.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    };

    componentDidMount() {
        const qp = new URLSearchParams(window.location.search);
        const code = qp.get('code');
        console.log(code);
        AkagiService.getDashboard(code).then((res) => {
            
            this.setState({
                idUser: res.data.idUser,
                userAddress : res.data.userAddress,
                employees: res.data.employeeList,
                totalYes: res.data.totalYes,
                totalNo: res.data.totalNo,
                totalNotYet: res.data.totalNotYet
                });
        });
    };

    sendReminder() {
        AkagiService.sendReminderToAll(this.state.idUser).then((res) => 
        {
            if(res.data === 0) {
                alert({ message: 'Could not send email, try again later', type: 'error' });
            } else {
                alert({ message: 'Email Sent', type: 'success' });
            }                
        });
    };

    sendSingleMail = (e) => {
        e.preventDefault();        
        this.hideModal();
    };

    showModal() {
        this.setState({ show: true });
        document.getElementById("mailModal").classList.remove("display-none");
    };
    
    hideModal() {
        this.setState({ show: false });
        
    };

    render() {
        return (
            <div>
                <div className="row text-center mt-4 forSpace" >
                    <div className="col-md-4">
                        <h5>{this.state.userAddress}</h5>
                    </div>
                    <div className="col-md-8">
                        <h3>Employee Records</h3>
                    </div>    
                </div>          
                <div className="row table-container forSpace">
                    <table id="Covid-Table" className="table table-striped table-bordered table-responsive">
                        <thead>
                            <tr>
                                <th className=''>Name</th>
                                <th className=''>Email</th>
                                <th className=''>Company</th>
                                <th className='col-md-auto'>Fully Vaccinated?</th>
                                <th className=''>Date</th>
                                <th className=''>Download</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map(
                                    employee =>
                                    <tr key= {employee.id}>
                                        <td className=''>{employee.name}</td>
                                        <td className=''>{employee.email}</td>
                                        <td className=''>{employee.companyName}</td>
                                        <td className='col-md-auto'>{employee.status}</td>                                                                              
                                        <td className=''>{(employee.recordDate === null) ? ("Pending") : (employee.recordDate)}</td> 
                                        <td className=''>{(employee.cardLink === "Unavailable") ? (employee.cardLink) : (<a href={employee.cardLink}>Download</a>)}</td>  
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className= "row forSpace">
                    <div className="col-md-2 text-center">
                        <ReactHTMLTableToExcel id="covid-table-xls-button"
                            className="download-table-xls-button btn btn-primary"
                            table="Covid-Table"
                            filename={`Covid-Records_${this.state.idUser}-${Date().toLocaleString()}`}
                            sheet="Covid-Table"
                            buttonText="Download"/> 
                    </div>
                </div>
                <div className="row pieChartDiv forSpace">
                    <Chart
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Status', 'Total'],
                            ['Vaccinated', Number(this.state.totalYes)],
                            ['Not Vaccinated', Number(this.state.totalNo)],
                            ['Pending', Number(this.state.totalNotYet)],
                            ]}
                        options={{
                            chartArea: { width: '100%', },
                            height: 500
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />
                </div>
                <div className= "row forSpace">
                    <div className="col-md-2 text-center">
                        <button className= "btn btn-primary" onClick={this.sendReminder}>Send reminder to all</button>
                    </div>  
                    <div className="col-md-3 text-center">
                        <button className= "btn btn-primary" onClick={this.showModal}>Send individual reminder</button>
                    </div>             
                </div>
                <Modal show={this.state.show} handleClose={this.hideModal} >
                    <p>Modal</p>
                </Modal>    
            </div>
        )
    }
}
