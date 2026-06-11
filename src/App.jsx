import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ScrollToTopButton from './components/ScrollToTopButton'

import Home from './pages/Home'
import Business from './pages/Business'
import Sustainability from './pages/Sustainability'
import About from './pages/About'
import Investment from './pages/Investment'
import Support from './pages/Support'
import Recruit from './pages/Recruit'
import SimplePage from './pages/SimplePage'

export default function App() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <div className="min-w-[320px]">
      <ScrollToTop />
      <Header />
      {/* 헤더가 fixed 이므로 메인 외 페이지는 헤더 높이만큼 상단 여백 */}
      <main className={isHome ? '' : 'pt-24'}>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* 회사소개 */}
          <Route path="/about" element={<Navigate to="/about/greetings" replace />} />
          <Route path="/about/:tab" element={<About />} />

          {/* 사업소개 — :category 로 탭 전환 */}
          <Route path="/business" element={<Navigate to="/business/housing" replace />} />
          <Route path="/business/:category" element={<Business />} />

          {/* 지속가능경영 */}
          <Route
            path="/sustainability"
            element={<Navigate to="/sustainability/ethical" replace />}
          />
          <Route path="/sustainability/:tab" element={<Sustainability />} />

          {/* 투자정보 */}
          <Route path="/investment" element={<Navigate to="/investment/governance" replace />} />
          <Route path="/investment/:tab" element={<Investment />} />

          {/* 고객센터 */}
          <Route path="/support" element={<Navigate to="/support/notice" replace />} />
          <Route path="/support/:tab" element={<Support />} />

          {/* 인재채용 */}
          <Route path="/recruit" element={<Navigate to="/recruit/people" replace />} />
          <Route path="/recruit/:tab" element={<Recruit />} />

          {/* 기타 단순 페이지 */}
          <Route path="/report" element={<SimplePage title="제보센터" />} />
          <Route path="/legal" element={<SimplePage title="법적고지" />} />
          <Route path="/privacy" element={<SimplePage title="개인정보처리방침" />} />

          <Route path="*" element={<SimplePage title="페이지를 찾을 수 없습니다" />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  )
}
