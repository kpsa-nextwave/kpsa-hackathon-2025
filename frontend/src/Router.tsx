import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home"
import MyPage from "./pages/mypage/Mypage"
import Community from "./pages/community/Community"
import Record from "./pages/record/Record"

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/community" element={<Community />} />
        <Route path="/record" element={<Record />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  )
}
