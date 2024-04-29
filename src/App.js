import Navbar from "./components/Navbar/Navbar";
import { NotFound } from "./components/NotFound/NotFound";
import LogIn from "./components/LogIn/LogIn";
import SingUP from "./components/SingUP/SingUP";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import Orders from "./components/Orders/Orders";
import Logo from "./components/Logo/Logo";
import CustomProviderContext from "./CustomContext/CustomContext";
import { ToastContainer} from 'react-toastify';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";
function App() {

  const router = createBrowserRouter([
    {
      path:'/',
      errorElement:<NotFound />,
      element:<Navbar />,
      children:[
        {
          index:true,
          element:<Logo />
        },
        {
          path:'/Login',
          element: <LogIn />
        },
        {
          path:'/SingUp',
          element:<SingUP />
        },
        
      ]
    },
    {path:'/product',
     element:<><Navbar /><Products/></>
    },
    {
      path:'/Cart',
      element:<><Navbar /><Cart/></>
    },
    {
      path:'/Orders',
      element:<><Navbar /><Orders /></>
    }
  ])

  return (
    <div>
      <Provider store={store}>
      <CustomProviderContext>
      <RouterProvider router={router} />
      </CustomProviderContext>
      </Provider>
      <ToastContainer/>
    </div>
  );
}

export default App;
