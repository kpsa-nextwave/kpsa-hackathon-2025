import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home"
import MyPage from "./pages/mypage/Mypage"
import Community from "./pages/community/Community"
import Record from "./pages/record/Record"
import LoginPage from "./pages/auth/LoginPage"
import SignupPage from "./pages/auth/SignupPage"
import LandingPage from "./pages/auth/LandingPage"
import DiseasePage from "./pages/auth/DiseasePage"
import PostPage from "./pages/community/PostPage"

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/community" element={<Community />} />
        <Route path="/community/post" element={<PostPage />} />
        <Route path="/record" element={<Record />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signup/disease" element={<DiseasePage />} />
      </Routes>
    </BrowserRouter>
  )
}
