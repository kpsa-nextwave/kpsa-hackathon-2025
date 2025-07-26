import { useNavigate } from "react-router-dom";
import { doctorsData } from "../../data/doctors";


const HospitalDoctors = () => {
    const navigate = useNavigate();

    return (
        <div className="max-h-[575px] overflow-y-auto bg-white py-1.5">
            {doctorsData.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start py-3 border-b border-gray-200">
                    <div className="flex-1">
                        <div className="text-base font-bold leading-snug">{item.title}</div>
                        <div className="text-base mt-1">{item.content}</div>
                        <div className="text-sm text-gray-500 mt-1">
                            {item.hospital}
                        </div>
                    </div>
                    <div className="w-[60px] h-[60px] bg-gray-300 rounded-lg ml-3 flex-shrink-0" />
                </div>
            ))}
        </div>
    );
};

export default HospitalDoctors;
