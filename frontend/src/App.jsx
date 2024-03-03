import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// import route elements
import { Home } from './pages/home'
import { Signin } from './pages/signin'
import { Signup } from './pages/signup'
import { Dashboard } from './pages/dashboard'
import { SendMoney } from './pages/sendMoney'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
