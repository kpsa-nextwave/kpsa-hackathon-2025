import React, { useEffect, useState } from 'react';

const WelcomePage = ({ onLogin }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  useEffect(() => {
    // Google Sign-In 초기화
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: 'YOUR_GOOGLE_CLIENT_ID', // 실제 Google Client ID로 교체 필요
        callback: handleGoogleSignIn
      });
    }
  }, []);

  const handleGoogleSignIn = (response) => {
    console.log('Google Sign-In Response:', response);
    // 여기에 로그인 처리 로직 추가
    // JWT 토큰을 백엔드로 전송하여 인증 처리
    onLogin();
  };

  const handleGoogleLogin = () => {
    if (window.google) {
      window.google.accounts.id.prompt();
    } else {
      // 개발용: Google API 없이도 다음 페이지로 이동
      console.error('Google Sign-In not loaded');
      onLogin();
    }
  };

  const handlePhoneLogin = () => {
    if (phoneNumber.length >= 10) {
      console.log('Phone Login:', phoneNumber);
      onLogin();
    } else {
      alert('올바른 전화번호를 입력해주세요.');
    }
  };

  const formatPhoneNumber = (value) => {
    const numbers = value.replace(/[^\d]/g, '');
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
    }
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  return (
    <div className="welcome-container">
      <h1 className="app-title">
        Cancer<br />
        Companion
      </h1>

      <p className="app-subtitle">
        환자 맞춤형 항암치료<br />
        추천 및 정보 등반 대시보드
      </p>

      <div className="feature-icons">
        <div className="feature-icon">📊</div>
        <div className="feature-icon">💊</div>
        <div className="feature-icon">📈</div>
        <div className="feature-icon">🏥</div>
      </div>

      <div className="login-section">
        <div className="phone-login">
          <input
            type="tel"
            placeholder="전화번호를 입력하세요"
            value={phoneNumber}
            onChange={handlePhoneChange}
            className="phone-input"
            maxLength="13"
          />
          <button
            className={`phone-login-btn ${phoneNumber.length >= 13 ? 'enabled' : 'disabled'}`}
            onClick={handlePhoneLogin}
            disabled={phoneNumber.length < 13}
          >
            전화번호로 시작하기
          </button>
        </div>

        <div className="divider">
          <span>또는</span>
        </div>

        <button className="google-login-btn" onClick={handleGoogleLogin}>
          <div className="google-icon">G</div>
          Google로 시작하기
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;