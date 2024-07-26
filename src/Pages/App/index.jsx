import { useRoutes, BrowserRouter } from 'react-router-dom'

import NavBar from '../../Components/NavBar'
import FooterComponent from '../../Components/Footer'

import Home from '../Home'
import NotFound from '../NotFound'
import About from '../About'
import Contact from '../Contact'
import Services from '../Services'
import LogIn from '../LogIn'
import Admin from '../Admin'
import Layout from '../../Components/Layout'

import { AuthProvider } from '../../Contexts/AuthContext'
import ProtectedRoute from '../../Routes/ProtectedRoutes'

import './App.css'


const AppRoutes = () => {
  let routes = useRoutes([
    {path: '/', element: <Home />},
    {path: '/About', element: <About />},
    {path: '/Contact', element: <Contact />},
    {path: '/Services', element: <Services />},
    {path: '/LogIn', element: <LogIn />},
    {path: '/Admin', element: <ProtectedRoute><Admin /></ProtectedRoute>},
    {path: '/*', element: <NotFound />},

  ])
  return routes
}

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter >
          <Layout>
            <NavBar />
            <AppRoutes />
          </Layout>
          <FooterComponent />
      </BrowserRouter>
    </AuthProvider>

  )
}

export default App
