
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../Components/Home'
import Companies from '../Components/Companies'
import ErrorPage from './ErrorPage'
import Assets from '../Components/Assets'
import Units from '../Components/Units'
import Users from '../Components/Users'
import Workorders from '../Components/Workorders'

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/company",
        element: <Companies />
      },
      {
        path: "/asset",
        element: <Assets />
      },
      {
        path: "/units",
        element: <Units />
      },
      {
        path: "/users",
        element: <Users />
      },
      {
        path: "/workorders",
        element: <Workorders />
      }
    ]
  },

])