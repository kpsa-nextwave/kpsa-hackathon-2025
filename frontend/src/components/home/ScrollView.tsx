import { useState } from "react"

function ScrollView(props: {
    activeTab: string
    setActiveTab: (tab: string) => void
}) {
    const { activeTab, setActiveTab } = props
    const tabs = ['뉴스', '질환 정보', '지원금', '임상시험', '병원/의료진']

    return (
        <div
            style={{
                width: '100%',
                overflowX: 'auto',
                whiteSpace: 'nowrap',
                scrollbarWidth: 'none',
            }}
        >
            <div
                style={{
                    display: 'inline-flex',
                    height: '35px',
                    gap: '15px',
                }}
            >
                {tabs.map(tab => (
                    <div
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            minWidth: '80px',
                            textAlign: 'center',
                            lineHeight: '35px',
                            fontWeight: activeTab === tab ? '700' : '400',
                            borderBottom: activeTab === tab ? '3px solid #ccc' : '3px solid transparent',
                            cursor: 'pointer',
                        }}
                    >
                        {tab}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ScrollView
