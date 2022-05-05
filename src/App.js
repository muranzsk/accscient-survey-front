import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import WelcomeComponent from './components/WelcomeComponent';
import DashboardComponent from './components/DashboardComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import UpdateRecordComponent from './components/UpdateRecordComponent';
import UpdateFailure from './components/UpdateFailure';
import UpdateSuccess from './components/UpdateSuccess';
import StopComponent from './components/StopComponent';

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="container">
          <Routes>
            <Route path= "/" element= {<WelcomeComponent/>}></Route>
            <Route path= "/dashboard" element= {<DashboardComponent/>}></Route>    
            <Route path= "/record" element= {<UpdateRecordComponent/>}></Route>
            <Route path= "/stop" element= {<StopComponent/>}></Route>
            <Route path= "/failure" element= {<UpdateFailure/>}></Route>
            <Route path= "/success" element= {<UpdateSuccess/>}></Route>            
          </Routes>          
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
