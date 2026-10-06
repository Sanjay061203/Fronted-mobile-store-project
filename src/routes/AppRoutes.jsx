import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Mobiles from "../pages/Mobiles";
import MobileDetails from "../pages/MobileDetails";
import AddMobile from "../pages/AddMobile";
import EditMobile from "../pages/EditMobile";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import ProtectedRoute from "./ProtectedRoute";
import Favorites from "../pages/Favorites"; 
import Cart from "../pages/Cart";    
import Orders from "../pages/Orders";    

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mobiles" element={<Mobiles />} />
      <Route path="/mobiles/:id" element={<MobileDetails />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route
        path="/add-mobile"
        element={
          <ProtectedRoute>
            <AddMobile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-mobile/:id"
        element={
          <ProtectedRoute>
            <EditMobile />
          </ProtectedRoute>
        }
      />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/cart" element={<Cart />} />
      <Route
  path="/orders"
  element={
    <ProtectedRoute>
      <Orders />
    </ProtectedRoute>
  }
/>
    </Routes>
  );
}

export default AppRoutes;