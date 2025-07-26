import React, { useState } from 'react';
import WelcomePage from './components/WelcomePage';
import PatientInfoPage from './components/PatientInfoPage';
import PatientInfoPage2 from './components/PatientInfoPage2';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('welcome');

  const handleGoogleLogin = () => {
    setCurrentPage('patientInfo');
  };

  const handleNextToPage2 = () => {
    setCurrentPage('patientInfo2');
  };

  const handleNextFromPage2 = () => {
    // 다음 페이지로 이동 (3번째 페이지가 있다면)
    console.log('Moving to next page...');
  };

  return (
    <div className="App">
      {currentPage === 'welcome' && <WelcomePage onLogin={handleGoogleLogin} />}
      {currentPage === 'patientInfo' && <PatientInfoPage onNext={handleNextToPage2} />}
      {currentPage === 'patientInfo2' && <PatientInfoPage2 onNext={handleNextFromPage2} />}
    </div>
  );
}

export default App;