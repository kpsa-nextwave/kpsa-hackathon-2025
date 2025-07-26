import TextButton from "../../components/buttons/TextButton"
import { useNavigate } from "react-router-dom"

function SignupPage() {
    const navigate = useNavigate();
    const onSignupClick = () => {
        navigate("/");
    }

    return (
        <>
            <p>회원가입</p>
            <TextButton text="질병 선택" onClick={() => navigate("/signup/disease")}/>
            <TextButton text="회원가입하기" onClick={onSignupClick}/>
        </>
    )
}

export default SignupPage