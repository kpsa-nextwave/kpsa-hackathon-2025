import { useNavigate } from "react-router-dom";
import { newsData } from "../../data/news";

const News = () => {
  const navigate = useNavigate();

  return (
    <div className="max-h-[660px] overflow-y-auto bg-white py-1.5">
      {newsData.map((item, idx) => (
        <div
          key={idx}
          className="flex justify-between items-start py-3 border-b border-gray-200 cursor-pointer"
          onClick={() => navigate(`/news/${idx}`)}
        >
          <div className="flex-1">
            <div className="text-base font-bold leading-snug">{item.title}</div>
            <div className="text-sm text-gray-500 mt-1">
              {item.company} &nbsp;&nbsp; {item.date}
            </div>
          </div>
          <div className="w-[60px] h-[60px] bg-gray-300 rounded-lg ml-3 flex-shrink-0" />
        </div>
      ))}
    </div>
  );
};

export default News;
