import { useRoutes, BrowserRouter } from 'react-router-dom'
import NavBar from '../../Components/NavBar'

import Home from '../Home'
import NotFound from '../NotFound'


import './App.css'


const AppRoutes = () => {
  let routes = useRoutes([
    {path: '/', element: <Home />},
    {path: '/*', element: <NotFound />},

  ])
  return routes
}

const App = () => {
  return (

      <BrowserRouter >
          <NavBar />
          <AppRoutes />
      </BrowserRouter>

  )
}

export default App
