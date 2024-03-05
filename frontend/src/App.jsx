import { BrowserRouter as Router, Route, Routes, createBrowserRouter, RouterProvider } from 'react-router-dom'

// import route elements
import { Home } from './pages/home'
import { Signin } from './pages/signin'
import { Signup } from './pages/signup'
import { Dashboard } from './pages/dashboard'
import { SendMoney } from './pages/sendMoney'

import { ProtectedRoute } from '../utils/ProtectedRoute'

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />
//   },
//   {
//     path: "/signup",
//     element: <Signup />
//   },
//   {
//     path: "/signin",
//     element: <Signin />
//   },
//   {
//     path: "/dashboard",
//     element: <Dashboard />
//   },
//   {
//     path: "/send",
//     element: <SendMoney />
//   },
// ])

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<ProtectedRoute Component={<Signup />} loggedInRoute={"/dashboard"} />} />
          <Route path="/signin" element={<ProtectedRoute Component={<Signin />} loggedInRoute={"/dashboard"} />} />
          <Route path="/dashboard" element={<ProtectedRoute Component={<Dashboard />} loggedOutRoute={"/signin"} />} />
          <Route path="/send" element={<ProtectedRoute Component={<SendMoney />} loggedOutRoute={"/signin"} />} />
        </Routes>
      </Router>

      {/* OR */}
      {/* <RouterProvider router={router} /> */}
    </>
  )
}

export default App
