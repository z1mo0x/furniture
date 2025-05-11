import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, useParams } from 'react-router-dom'
import App from './App'
import AboutPage from './assets/pages/AboutPage'
import Loader from './assets/pages/Loader'
import ProductPage from './assets/pages/ProductPage'
import { useState } from 'react'




const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/product/:productId',
    element: <ProductPage />,
  },
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} basename={'/'} />
)
