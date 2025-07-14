import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, useParams } from 'react-router-dom'
import App from './App'
import AboutPage from './assets/pages/AboutPage'
import ProductPage from './assets/pages/ProductPage'
import Collection from './assets/pages/Collection'
import store from './store'
import { Provider } from 'react-redux'
import Basket from './assets/pages/Basket'



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
  {
    path: '/collection',
    element: <Collection />,
  },
  {
    path: '/basket',
    element: <Basket />,
  },
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} basename={'/'} />
  </Provider>
)
