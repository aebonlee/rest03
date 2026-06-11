// ============================================================
// 사이트 전역 데이터 — 회사 정보 / 네비게이션 / 사업 / 프로젝트
// 템플릿 사용 시 이 파일만 수정하면 대부분의 내용이 반영됩니다.
// ※ 모든 문구는 템플릿용 자체 카피입니다. 실제 운영 시 교체하세요.
// ============================================================

// true: 무료 데모 이미지(picsum.photos) 자동 로드 / false: 회색 플레이스홀더 박스
export const useDemoImages = true

export const company = {
  name: 'CHINHUNG',
  nameKo: '진흥기업',
  fullName: 'CHINHUNG INTERNATIONAL INC.',
  copyright: '© 2026 CHINHUNG INTERNATIONAL INC. All rights reserved.',
  intro: [
    '우리는 건물을 짓는 일을 넘어, 사람이 머무는 공간과 그 주변 환경까지 함께 고민합니다.',
    '도시와 자연이 어우러지는 지속 가능한 터전을 만들기 위해 기술과 책임, 그리고 배려를 더해 나갑니다.',
  ],
  offices: [
    {
      label: '서울지사',
      address: '서울특별시 용산구 후암로 27 (후암동)',
      tel: '02-772-1200',
      fax: '02-754-2972',
    },
    {
      label: '본사',
      address: '인천광역시 연수구 컨벤시아대로 69 807호',
      tel: '032-432-0658',
      fax: '032-432-0659',
    },
  ],
  familySites: [
    { name: '효성그룹', url: 'https://www.hyosung.com' },
    { name: '효성중공업', url: 'https://www.hyosungheavyindustries.com' },
    { name: '효성굿스프링스', url: 'https://www.hsgoodsprings.com' },
    { name: '효성티엔씨', url: 'https://www.hyosungtnc.com' },
    { name: '효성화학', url: 'https://www.hyosungchemical.com' },
    { name: '효성티엔에스', url: 'https://korea.hyosunginnovue.com' },
    { name: '효성 ITX', url: 'https://www.hyosungitx.com' },
  ],
  footerLinks: [
    { label: '제보센터', to: '/report' },
    { label: '법적고지', to: '/legal' },
    { label: '개인정보처리방침', to: '/privacy', strong: true },
  ],
}

// 메인 히어로 슬라이드 (카피는 템플릿용 자체 문구)
export const heroSlides = [
  { label: 'HERO 01', copy: 'Build Beyond,\nLive Better' },
  { label: 'HERO 02', copy: 'Trust in Every\nFoundation' },
]

// 히어로 우측 하단 퀵링크
export const heroQuickLinks = [
  { label: '전자조달 시스템', href: '#', variant: 'brand' },
  { label: '주거 브랜드 홈페이지', href: '#', variant: 'stone' },
]

// 메인 카드 4장 (히어로 아래 하이라이트)
export const mainCards = [
  { key: 'card1', title: '프리미엄 주거', desc: '일상의 품격을 높이는 주거 브랜드', to: '/business/housing' },
  { key: 'card2', title: '도시를 잇는 인프라', desc: '안전한 생활의 기반을 만드는 토목 기술', to: '/business/civil' },
  { key: 'card3', title: '안전 최우선 현장', desc: '무재해 현장을 위한 안전경영 체계', to: '/sustainability/safety' },
  { key: 'card4', title: '함께 성장하는 미래', desc: '인재와 함께 만드는 회사의 내일', to: '/recruit/people' },
]

// 상단 GNB — 대메뉴 + 하위메뉴
export const nav = [
  {
    label: '회사소개',
    to: '/about/greetings',
    children: [
      { label: 'CEO 인사말', to: '/about/greetings' },
      { label: '비전/가치', to: '/about/vision' },
      { label: '연혁', to: '/about/history' },
      { label: '브랜드 소개', to: '/about/brand' },
    ],
  },
  {
    label: '사업소개',
    to: '/business/housing',
    children: [
      { label: '주택사업', to: '/business/housing' },
      { label: '건축사업', to: '/business/building' },
      { label: '토목사업', to: '/business/civil' },
      { label: '플랜트사업', to: '/business/plant' },
      { label: '해외사업', to: '/business/global' },
    ],
  },
  {
    label: '지속가능경영',
    to: '/sustainability/ethical',
    children: [
      { label: '윤리경영', to: '/sustainability/ethical' },
      { label: '안전경영', to: '/sustainability/safety' },
      { label: '품질경영', to: '/sustainability/quality' },
      { label: '사회공헌', to: '/sustainability/csr' },
    ],
  },
  {
    label: '투자정보',
    to: '/investment/governance',
    children: [
      { label: '기업지배구조', to: '/investment/governance' },
      { label: '재무정보', to: '/investment/financial' },
      { label: '공시', to: '/investment/disclosure' },
      { label: '공고', to: '/investment/announcement' },
      { label: 'IR 자료실', to: '/investment/report' },
    ],
  },
  {
    label: '고객센터',
    to: '/support/notice',
    children: [
      { label: '공지사항', to: '/support/notice' },
      { label: '협력업체 등록안내', to: '/support/partner' },
      { label: '고객문의', to: '/support/contact' },
    ],
  },
  {
    label: '인재채용',
    to: '/recruit/people',
    children: [
      { label: '인재상', to: '/recruit/people' },
      { label: '채용공고', to: '/recruit/jobs' },
    ],
  },
]

// 메인 — Our Business 카드 (문구는 템플릿용 자체 카피)
export const businessCards = [
  {
    key: 'housing',
    title: '주택사업',
    desc: '라이프스타일 변화에 맞춘 수준 높은 주거 공간을 기획하고 시공합니다.',
    to: '/business/housing',
  },
  {
    key: 'building',
    title: '건축사업',
    desc: '기술과 디자인을 함께 담은 건축물로 도시의 풍경을 새롭게 만듭니다.',
    to: '/business/building',
  },
  {
    key: 'civil',
    title: '토목사업',
    desc: '도로·철도 등 사회 기반 시설을 건설하여 안전하고 편리한 일상을 뒷받침합니다.',
    to: '/business/civil',
  },
  {
    key: 'plant',
    title: '플랜트사업',
    desc: '높은 기술 난이도가 요구되는 산업 설비 프로젝트를 안정적으로 완수합니다.',
    to: '/business/plant',
  },
  {
    key: 'global',
    title: '해외사업',
    desc: '국내에서 검증된 시공 역량을 바탕으로 세계 시장에서 신뢰를 쌓아갑니다.',
    to: '/business/global',
  },
]

// 메인 — 시공 중인 프로젝트 캐러셀 (데모 데이터)
export const ongoingProjects = [
  { title: '수도권 주거복합 신축공사', region: '경기', to: '/business/housing' },
  { title: '광역 간선도로 확장공사', region: '인천', to: '/business/civil' },
  { title: '업무시설 리모델링 공사', region: '서울', to: '/business/building' },
  { title: '산업단지 환경설비 공사', region: '충남', to: '/business/plant' },
  { title: '동남아 인프라 개발 프로젝트', region: '해외', to: '/business/global' },
]

// 사업소개 페이지 메타 (탭 / 카테고리)
export const businessPages = {
  housing: {
    title: '주택사업',
    headLabel: 'Housing',
    categories: ['아파트', '주상복합', '오피스텔', '도시정비'],
  },
  building: {
    title: '건축사업',
    headLabel: 'Building',
    categories: ['업무시설', '상업시설', '교육/문화', '의료시설'],
  },
  civil: {
    title: '토목사업',
    headLabel: 'Civil',
    categories: ['도로/포장', '지하철/철도', '교량/터널/기타', '부지조성', '보안시설'],
  },
  plant: {
    title: '플랜트사업',
    headLabel: 'Plant',
    categories: ['발전', '환경', '산업설비'],
  },
  global: {
    title: '해외사업',
    headLabel: 'Global',
    categories: ['아시아', '중동', '기타'],
  },
}

// 토목사업 — 도로/포장 카테고리 실적 (공개 실적 정보 기반, 이미지는 플레이스홀더)
export const civilProjects = [
  { title: '경부선 화성동탄 방음시설 설치공사', period: '2018.06 ~ 2019.11' },
  { title: '보령-부여 도로건설공사', period: '2016.07 ~ 2023.12' },
  { title: '분당~수서간 도시고속도로 소음저감시설 설치공사', period: '2015.07 ~ 2023.11' },
  { title: '진접-내촌 도로건설공사 2공구', period: '2014.01 ~ 2020.12' },
  { title: '명지지구진입도로 개설공사', period: '2013.07 ~ 2016.09' },
  { title: '장지삼거리 입체화시설 건설공사', period: '2012.01 ~ 2016.12' },
  { title: '충남도청신도시개발사업 2구역 지하차도 건설공사', period: '2010.07 ~ 2012.09' },
  { title: '고속도로 제65호선 주문진 ~ 속초간 4공구', period: '2009.01 ~ 2016.12' },
]

// 공지사항 (메인 + 고객센터 공용 데모 데이터)
export const notices = [
  { id: 9, title: '홈페이지 리뉴얼 오픈 안내', date: '2026.05.27' },
  { id: 8, title: '2026년 상반기 신입/경력사원 채용 공고', date: '2026.05.20' },
  { id: 7, title: 'ISO 9001 품질경영시스템 인증 갱신', date: '2026.05.05' },
  { id: 6, title: '주거 브랜드 신규 분양 일정 안내', date: '2026.04.18' },
  { id: 5, title: '협력업체 정기 등록 접수 안내', date: '2026.03.30' },
  { id: 4, title: '안전보건경영 방침 개정 공지', date: '2026.03.12' },
  { id: 3, title: '제67기 정기주주총회 소집 공고', date: '2026.02.25' },
  { id: 2, title: '동절기 현장 안전점검 강화 안내', date: '2026.01.15' },
]

// 투자정보 페이지 메타
export const investmentPages = {
  governance: { title: '기업지배구조', en: 'Governance', headLabel: 'Governance' },
  financial: { title: '재무정보', en: 'Financial Information', headLabel: 'Financial' },
  disclosure: { title: '공시', en: 'Disclosure', headLabel: 'Disclosure' },
  announcement: { title: '공고', en: 'Announcements', headLabel: 'Announcements' },
  report: { title: 'IR 자료실', en: 'IR Library', headLabel: 'IR Library' },
}

// 재무 하이라이트 (데모 데이터)
export const financialHighlights = [
  { label: '매출액', value: '7,420', unit: '억 원', note: '2025년 연결 기준 (데모)' },
  { label: '영업이익', value: '312', unit: '억 원', note: '2025년 연결 기준 (데모)' },
  { label: '수주잔고', value: '2.1', unit: '조 원', note: '2025년 말 기준 (데모)' },
]

// 인재채용 — 인재상 (템플릿용 자체 카피)
export const talentValues = [
  { title: '도전', desc: '현장의 어려움 앞에서 한 걸음 더 나아가는 사람' },
  { title: '전문성', desc: '자기 분야의 기술을 끝까지 파고드는 사람' },
  { title: '신뢰', desc: '약속한 품질과 일정을 반드시 지키는 사람' },
  { title: '협력', desc: '동료·협력사와 함께 더 큰 성과를 만드는 사람' },
]

// 인재채용 — 채용공고 (데모 데이터)
export const jobPostings = [
  { title: '2026년 상반기 신입사원 공개채용', dept: '전 부문', period: '2026.05.20 ~ 2026.06.10', status: '진행중' },
  { title: '토목 시공관리 경력직 채용', dept: '토목사업본부', period: '상시', status: '진행중' },
  { title: '안전관리자 채용 (현장)', dept: '안전경영실', period: '상시', status: '진행중' },
  { title: '플랜트 공무 경력직 채용', dept: '플랜트사업본부', period: '2026.04.01 ~ 2026.04.30', status: '마감' },
]
