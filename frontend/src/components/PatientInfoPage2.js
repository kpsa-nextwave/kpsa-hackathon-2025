import React, { useState } from 'react';

const PatientInfoPage2 = ({ onNext }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [passAuthenticated, setPassAuthenticated] = useState(false);

  const questions = [
    {
      id: 'cancer_diagnosis',
      title: '암 진단 받으셨나요?',
      options: [
        { value: 'yes', label: '예', icon: '✅' },
        { value: 'no', label: '아니오', icon: '❌' }
      ]
    },
    {
      id: 'cancer_type',
      title: '어떤 암 진단 받으셨나요?',
      options: [
        { value: 'lung', label: '폐암', icon: '🫁' },
        { value: 'stomach', label: '위암', icon: '🫃' },
        { value: 'liver', label: '간암', icon: '🫀' },
        { value: 'breast', label: '유방암', icon: '🎀' },
        { value: 'colon', label: '대장암', icon: '🩺' },
        { value: 'other', label: '기타', icon: '📋' }
      ],
      showIf: (answers) => answers.cancer_diagnosis === 'yes'
    }
  ];

  const handleAnswer = (questionId, value) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    
    // 다음 질문으로 이동하거나 PASS 인증으로 이동
    const nextQuestionIndex = currentQuestion + 1;
    
    // 모든 필요한 질문에 답변했는지 확인
    const allAnswered = questions.every(question => {
      if (question.showIf && !question.showIf(newAnswers)) {
        return true; // 조건에 맞지 않는 질문은 답변하지 않아도 됨
      }
      return newAnswers[question.id];
    });
    
    if (allAnswered) {
      // 모든 질문에 답변했으면 PASS 인증으로 이동
      setCurrentQuestion(questions.length);
    } else if (nextQuestionIndex < questions.length) {
      const nextQuestion = questions[nextQuestionIndex];
      if (!nextQuestion.showIf || nextQuestion.showIf(newAnswers)) {
        setCurrentQuestion(nextQuestionIndex);
      } else {
        // 조건에 맞지 않으면 그 다음 질문으로
        setCurrentQuestion(nextQuestionIndex + 1);
      }
    }
  };

  const handlePassAuth = () => {
    setPassAuthenticated(true);
  };

  const handleNext = () => {
    console.log('All answers:', answers);
    console.log('PASS authenticated:', passAuthenticated);
    if (onNext) {
      onNext();
    }
  };

  const getCurrentQuestion = () => {
    return questions[currentQuestion];
  };

  const isAllQuestionsAnswered = () => {
    return questions.every(question => {
      if (question.showIf && !question.showIf(answers)) {
        return true; // 조건에 맞지 않는 질문은 답변하지 않아도 됨
      }
      return answers[question.id];
    });
  };

  const currentQ = getCurrentQuestion();
  const showPassAuth = currentQuestion >= questions.length;
  const showNextButton = showPassAuth && passAuthenticated;

  return (
    <div className="patient-info-container">
      <div className="progress-bar">
        <div className="progress-step completed">1</div>
        <div className="progress-line completed"></div>
        <div className="progress-step active">2</div>
        <div className="progress-line"></div>
        <div className="progress-step">3</div>
      </div>

      <h1 className="page-title">환자 정보 입력</h1>
      <p className="page-subtitle">추가 정보를 입력해주세요</p>

      {!showPassAuth && currentQ && (
        <div className="question-section">
          <h3 className="section-title">{currentQ.title}</h3>
          <div className="option-group">
            {currentQ.options.map((option) => (
              <button
                key={option.value}
                className={`option-btn ${answers[currentQ.id] === option.value ? 'selected' : ''}`}
                onClick={() => handleAnswer(currentQ.id, option.value)}
              >
                <div className="option-icon">{option.icon}</div>
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {showPassAuth && (
        <div className="pass-auth-section">
          <h3 className="section-title">건강보험 및 검사결과 데이터 연동</h3>
          <p className="auth-description">
            정확한 진료 정보 제공을 위해 PASS 인증을 통해 
            건강보험공단 데이터와 연동합니다.
          </p>
          
          {!passAuthenticated ? (
            <button 
              className="pass-auth-btn"
              onClick={handlePassAuth}
            >
              <div className="auth-icon">🔐</div>
              <span>PASS 인증하기</span>
            </button>
          ) : (
            <div className="auth-success">
              <div className="success-icon">✅</div>
              <p>PASS 인증이 완료되었습니다.</p>
            </div>
          )}
        </div>
      )}

      {showNextButton && (
        <button 
          className="next-btn enabled"
          onClick={handleNext}
        >
          다음
        </button>
      )}
    </div>
  );
};

export default PatientInfoPage2;