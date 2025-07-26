import TextButton from "../../components/buttons/TextButton"
import { useNavigate } from "react-router-dom"

function LandingPage() {
    const navigate = useNavigate();
    const onLoginClick = () => {
        navigate("/login");
    }
    const onSignupClick = () => {
        navigate("/signup");
    }

    return (
        <>
            <p>랜딩페이지</p>
            <TextButton text="로그인" onClick={onLoginClick}/>
            <TextButton text="회원가입" onClick={onSignupClick} variant="secondary"/>
        </>
    )
}

export default LandingPage