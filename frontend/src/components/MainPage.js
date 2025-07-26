import React, { useState } from 'react';

const MainPage = ({ user, onLogout }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [activeTab, setActiveTab] = useState('calendar');

    // Sample treatment data
    const treatmentData = {
        '2025-01-28': [
            { type: 'appointment', time: '10:00', title: '종양내과 진료', doctor: '김○○ 교수' },
            { type: 'medication', time: '08:00', title: '경구약 복용', detail: '항암제 1정' }
        ],
        '2025-01-30': [
            { type: 'chemotherapy', time: '09:00', title: '화학요법 (1주기)', location: '암센터 3층' },
            { type: 'test', time: '08:00', title: '혈액검사', detail: 'CBC, 간기능' }
        ],
        '2025-02-03': [
            { type: 'radiation', time: '14:00', title: '방사선 치료 (5회차)', location: '방사선종양학과' }
        ]
    };

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            days.push(day);
        }

        return days;
    };

    const formatDateKey = (year, month, day) => {
        return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    };

    const getEventTypeIcon = (type) => {
        const icons = {
            appointment: '🏥',
            chemotherapy: '💉',
            radiation: '⚡',
            test: '🔬',
            medication: '💊',
            surgery: '🔪',
            counseling: '💭'
        };
        return icons[type] || '📅';
    };

    const renderCalendar = () => {
        const days = getDaysInMonth(currentDate);
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        return (
            <div className="calendar-grid">
                <div className="calendar-header">
                    <button onClick={() => setCurrentDate(new Date(year, month - 1))}>‹</button>
                    <h3>{year}년 {month + 1}월</h3>
                    <button onClick={() => setCurrentDate(new Date(year, month + 1))}>›</button>
                </div>

                <div className="calendar-weekdays">
                    {['일', '월', '화', '수', '목', '금', '토'].map(day => (
                        <div key={day} className="weekday">{day}</div>
                    ))}
                </div>

                <div className="calendar-days">
                    {days.map((day, index) => {
                        if (!day) return <div key={index} className="empty-day"></div>;

                        const dateKey = formatDateKey(year, month, day);
                        const events = treatmentData[dateKey] || [];
                        const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();

                        return (
                            <div
                                key={day}
                                className={`calendar-day ${isToday ? 'today' : ''} ${events.length > 0 ? 'has-events' : ''}`}
                                onClick={() => setSelectedDate(dateKey)}
                            >
                                <span className="day-number">{day}</span>
                                <div className="day-events">
                                    {events.slice(0, 2).map((event, i) => (
                                        <div key={i} className={`event-dot ${event.type}`}>
                                            {getEventTypeIcon(event.type)}
                                        </div>
                                    ))}
                                    {events.length > 2 && <div className="more-events">+{events.length - 2}</div>}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    const renderDayDetail = () => {
        if (!selectedDate) return null;

        const events = treatmentData[selectedDate] || [];
        const date = new Date(selectedDate);

        return (
            <div className="day-detail">
                <h4>{date.getMonth() + 1}월 {date.getDate()}일 일정</h4>
                {events.length === 0 ? (
                    <p>예정된 일정이 없습니다.</p>
                ) : (
                    <div className="events-list">
                        {events.map((event, index) => (
                            <div key={index} className={`event-item ${event.type}`}>
                                <div className="event-icon">{getEventTypeIcon(event.type)}</div>
                                <div className="event-content">
                                    <div className="event-time">{event.time}</div>
                                    <div className="event-title">{event.title}</div>
                                    {event.doctor && <div className="event-detail">담당의: {event.doctor}</div>}
                                    {event.location && <div className="event-detail">장소: {event.location}</div>}
                                    {event.detail && <div className="event-detail">{event.detail}</div>}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="main-page-container">
            <div className="main-header">
                <h1 className="main-title">치료 캘린더</h1>
                <p className="main-subtitle">
                    {user?.name || user?.phoneNumber}님의 맞춤형 치료 일정 관리
                </p>
            </div>

            <div className="main-content">
                <div className="content-tabs">
                    <button
                        className={`tab ${activeTab === 'calendar' ? 'active' : ''}`}
                        onClick={() => setActiveTab('calendar')}
                    >
                        📅 캘린더
                    </button>
                    <button
                        className={`tab ${activeTab === 'today' ? 'active' : ''}`}
                        onClick={() => setActiveTab('today')}
                    >
                        📋 오늘 할 일
                    </button>
                    <button
                        className={`tab ${activeTab === 'symptoms' ? 'active' : ''}`}
                        onClick={() => setActiveTab('symptoms')}
                    >
                        📊 증상 기록
                    </button>
                </div>

                <div className="tab-content">
                    {activeTab === 'calendar' && (
                        <div className="calendar-section">
                            {renderCalendar()}
                            {renderDayDetail()}
                        </div>
                    )}

                    {activeTab === 'today' && (
                        <div className="today-section">
                            <h3>오늘의 치료 일정</h3>
                            <div className="today-tasks">
                                <div className="task-item">
                                    <span className="task-icon">💊</span>
                                    <div className="task-content">
                                        <div className="task-title">아침 약물 복용</div>
                                        <div className="task-time">08:00 - 완료됨</div>
                                    </div>
                                </div>
                                <div className="task-item pending">
                                    <span className="task-icon">🏥</span>
                                    <div className="task-content">
                                        <div className="task-title">종양내과 진료</div>
                                        <div className="task-time">10:00 - 예정</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'symptoms' && (
                        <div className="symptoms-section">
                            <h3>증상 및 부작용 기록</h3>
                            <div className="symptom-tracker">
                                <div className="symptom-item">
                                    <label>통증 수준 (0-10)</label>
                                    <input type="range" min="0" max="10" defaultValue="3" />
                                    <span>3</span>
                                </div>
                                <div className="symptom-item">
                                    <label>피로도 (0-10)</label>
                                    <input type="range" min="0" max="10" defaultValue="5" />
                                    <span>5</span>
                                </div>
                                <div className="symptom-item">
                                    <label>식욕 상태</label>
                                    <select>
                                        <option>좋음</option>
                                        <option>보통</option>
                                        <option>나쁨</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="quick-actions">
                    <button className="quick-action-btn emergency">
                        <span>🚨</span>
                        응급 연락
                    </button>
                    <button className="quick-action-btn primary">
                        <span>📞</span>
                        의료진 연락
                    </button>
                    <button className="quick-action-btn secondary">
                        <span>📝</span>
                        증상 기록
                    </button>
                </div>
            </div>

            <div className="main-footer">
                <button className="logout-btn" onClick={onLogout}>
                    로그아웃
                </button>
            </div>
        </div>
    );
};

export default MainPage;