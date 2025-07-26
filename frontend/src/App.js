import React, { useState } from 'react';
import WelcomePage from './components/WelcomePage';
import PatientInfoPage from './components/PatientInfoPage';
import PatientInfoPage2 from './components/PatientInfoPage2';
import PatientInfoPage3 from './components/PatientInfoPage3';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('welcome');

  const handleGoogleLogin = () => {
    setCurrentPage('patientInfo');
  };

  const handleNextToPage2 = () => {
    setCurrentPage('patientInfo2');
  };

  const handleNextToPage3 = () => {
    setCurrentPage('patientInfo3');
  };

  const handleNextFromPage3 = () => {
    // 다음 페이지로 이동 (4번째 페이지가 있다면)
    console.log('All patient info completed!');
  };

  return (
    <div className="App">
      {currentPage === 'welcome' && <WelcomePage onLogin={handleGoogleLogin} />}
      {currentPage === 'patientInfo' && <PatientInfoPage onNext={handleNextToPage2} />}
      {currentPage === 'patientInfo2' && <PatientInfoPage2 onNext={handleNextToPage3} />}
      {currentPage === 'patientInfo3' && <PatientInfoPage3 onNext={handleNextFromPage3} />}
    </div>
  );
}

export default App;