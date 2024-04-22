import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import './index.css'

import App from './App.jsx'
import Home from './pages/Home.jsx'
import Catalogue from './pages/Catalogue.jsx'
import Details from './pages/Details/Details.jsx'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'

import store from './store/store.js'

import { loader as checkoutLoader } from "./pages/Checkout/Checkout.jsx";
import { loader as catalogueLoader } from './pages/Catalogue.jsx';
import { loader as homeLoader } from './pages/Home.jsx';
import { loader as searchLoader } from './pages/SearchPage.jsx';
import { loader as accountLoader } from './pages/Account/Account.jsx';
import { loader as detailsLoader } from './pages/Details/Details.jsx';
import { loader as orderDetailsLoader } from './components/Account/Order/OrderDetails.jsx';

import Checkout from './pages/Checkout/Checkout.jsx';
import SearchPage from './pages/SearchPage.jsx';
import Account from './pages/Account/Account.jsx';
import OrderDetails from './components/Account/Order/OrderDetails.jsx';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: homeLoader
      },
      {
        path: '/catalogue/:category',
        element: <Catalogue />,
        loader: catalogueLoader
      },
      {
        path: '/details/:id',
        element: <Details />,
        loader: detailsLoader
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/products/search',
        element: <SearchPage />,
        loader: searchLoader
      },
      {
        path: '/checkout',
        element: <Checkout />,
        loader: checkoutLoader
      },
      {
        path: '/account/:activeView',
        element: <Account />,
        loader: accountLoader,
        children: [
          {
            path: 'order/:id',
            element: <OrderDetails />,
            loader: orderDetailsLoader
          }
        ]
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)