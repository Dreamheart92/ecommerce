import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './index.css'

import App from './App.jsx'
import Home from './pages/Home.jsx'
import Catalogue from './pages/Catalogue.jsx'
import Details from './pages/Details.jsx'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'

import store from './store/store.js'
import { loader as checkoutLoader } from './pages/Checkout.jsx'

import Checkout from './pages/Checkout.jsx';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/catalogue/:category',
        element: <Catalogue />,
      },
      {
        path: '/details/:id',
        element: <Details />,
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: '/login',
        element: <Login />
      },
    ],
  },
  {
    path: '/checkout',
    element: <Checkout />,
    loader: checkoutLoader
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  // </React.StrictMode>,
)