import { useState, useEffect } from "react";
import BottomNavigation from "../../components/BottomNavigation";
import ScrollView from "../../components/home/ScrollView";
import SortDropdown from "../../components/home/SortDropdown";
import AlertIcon from "../../assets/Icons/AlertIcon.svg";

import News from "../../components/home/News";
import DiseaseInformation from "../../components/home/DiseaseInformation";
import Benefit from "../../components/home/Benefit";
import ClinicalTrial from "../../components/home/ClinicalTrial";
import HospitalDoctors from "../../components/home/HospitalDoctors";

function Home() {
    const [activeTab, setActiveTab] = useState("뉴스");

    useEffect(() => {
        const savedTab = localStorage.getItem("activeTab");
        if (savedTab) {
            setActiveTab(savedTab);
        }
    }, []);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        localStorage.setItem("activeTab", tab);
    };

    return (
        <>
            <div className="flex justify-end p-5 px-6">
                <img src={AlertIcon} />
            </div>

            <ScrollView activeTab={activeTab} setActiveTab={handleTabChange} />

            <div className="mt-2 px-6">
                <div className="flex justify-between items-center mb-3">
                    <p>
                        총 <span className="font-bold">55</span>건
                    </p>
                    <SortDropdown />
                </div>

                {activeTab === "뉴스" && <News />}
                {activeTab === "질환 정보" && <DiseaseInformation />}
                {activeTab === "지원금" && <Benefit />}
                {activeTab === "임상시험" && <ClinicalTrial />}
                {activeTab === "병원/의료진" && <HospitalDoctors />}
            </div>

            <BottomNavigation />
        </>
    );
}

export default Home;
