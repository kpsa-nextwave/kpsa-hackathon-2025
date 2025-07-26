import { useParams, useNavigate } from "react-router-dom";
import { diseaseData } from "../../data/diseaseInformation";
import BackIcon from '../../assets/Icons/BackIcon.svg'

const DiseaseInformationDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const index = Number(id);
    const item = diseaseData[index];

    if (!item) return <div className="p-6">질환 정보를 찾을 수 없습니다.</div>;

    return (
        <div className="p-6">
            <img src={BackIcon} onClick={() => navigate(-1)} className="mb-8 ml-[-5px]" />
            <h1 className="text-2xl font-bold mb-2">{item.title}</h1>
            <div className="flex justify-between mb-6 text-gray-500">
                <p>
                    {item.author}
                </p>
                <p>{item.date}</p>
            </div>
            <div>상세 뉴스 내용이 여기에 표시됩니다.</div>
            <div>{item.content}</div>
        </div>
    );
}

export default DiseaseInformationDetail
