import { Link } from "react-router-dom"
import { CustomedNavBar } from "../styles/bottomNavigation"
import homeIcon from "../assets/Home.svg"

function BottomNavigation() {
    return (
        <CustomedNavBar>
            <nav style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '100%' }}>
                <Link to='/' style={{ paddingTop: '8px', textDecoration: 'none', fontSize: '12px', color: 'gray', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={homeIcon} style={{ width: '23px', height: '23px' }} />
                    <p style={{ marginTop: '3px' }}>질환정보</p>
                </Link>
                <Link to='/community' style={{ paddingTop: '8px', textDecoration: 'none', fontSize: '12px', color: 'gray', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={homeIcon} style={{ width: '23px', height: '23px' }} />
                    <p style={{ marginTop: '3px' }}>커뮤니티</p>
                </Link>
                <Link to='/record' style={{ paddingTop: '8px', textDecoration: 'none', fontSize: '12px', color: 'gray', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={homeIcon} style={{ width: '23px', height: '23px' }} />
                    <p style={{ marginTop: '3px' }}>기록</p>
                </Link>
                <Link to='/mypage' style={{ paddingTop: '8px', textDecoration: 'none', fontSize: '12px', color: 'gray', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={homeIcon} style={{ width: '23px', height: '23px' }} />
                    <p style={{ marginTop: '3px' }}>내정보</p>
                </Link>
            </nav>
        </CustomedNavBar>
    )
}

export default BottomNavigation