import TextButton from "../../components/buttons/TextButton"
import { useNavigate } from "react-router-dom"

function LoginPage() {
    const navigate = useNavigate();
    const onLoginClick = () => {
        navigate("/");
    }

    return (
        <>
            <p>로그인</p>
            <TextButton text="로그인하기" onClick={onLoginClick}/>
        </>
    )
}

export default LoginPage