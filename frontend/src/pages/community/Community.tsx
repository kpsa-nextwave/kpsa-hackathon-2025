import { useNavigate } from "react-router-dom";
import BottomNavigation from "../../components/BottomNavigation"
import TextButton from "../../components/buttons/TextButton"

function Community() {
    const navigate = useNavigate();
    const onPostClick = () => {
        navigate("/community/post");
    }

    return (
        <>
            <p>커뮤니티 화면</p>
            <TextButton text="글 보기" onClick={onPostClick} />
            <BottomNavigation />
        </>
    )
}

export default Community