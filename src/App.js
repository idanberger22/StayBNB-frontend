import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { Home } from './pages/home.jsx'
import { Explore } from './pages/explore'
import { StayDetails } from './pages/stay-details'
import { Helmet } from "react-helmet"
import { LoginSignup } from './cmps/login-signup'
import { Trips } from './pages/trips'
import { Host } from './pages/host'
import ScrollToTop from './cmps/scroll-to-top'
import { HostYourHome } from './pages/host-your-home'
import { AppHeaderMobile } from './cmps/app-header-mobile'
import { AppFooterMobile } from './cmps/app-footer-mobile'

function App() {
  return (
    <Router>
      <ScrollToTop/>
        <div className="app">
          <Helmet>
            <meta charSet="utf-8" />
            <title>StayBnb</title>
            <link rel="canonical" href="https://staybnb-app.herokuapp.com" />
            <meta name="description" content="Vacation apartments rental" />
          </Helmet>

          <AppHeader />
          <main>
            <Routes>
              <Route path='/stay/:stayId' element={<StayDetails />} />
              <Route path='/home' element={<Home />} />
              <Route path='/explore' element={<Explore />} />
              <Route path='/trips' element={<Trips />} />
              <Route path='/host' element={<Host />} />
              <Route path='/host-your-home' element={<HostYourHome />} />
              <Route path='/' element={<Home />} />
            </Routes>
            <LoginSignup/>
          </main>
          <AppFooter />
          <AppFooterMobile/>
        </div>
     
    </Router>
  );
}

export default App;
