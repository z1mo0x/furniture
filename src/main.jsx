import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import AboutPage from './assets/pages/AboutPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/about',
    element: <AboutPage />
  }

])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} basename={'/'} />
)
