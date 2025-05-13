import React,{useEffect} from 'react'
import Home from './Pages/Home'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import AboutUs from './components/About us/AboutUs'
import GetInTouch from './components/Get In Touch/GetInTouch';
import ProductDetails1 from './components/Product Details/ProductDetails1'
import Cartpage from './components/Cart/Cartpage';
import Wishlist from './Wishlist/Wishlist';
import Bulk from './components/BulkBooking/Bulk'
import Checklist from './components/CheckList/Checklist';
import Signup from './components/LoginSignup/Signup';
import Profile from './components/LoginSignup/Profile';
import Login from './components/LoginSignup/Login'
import ChecklistStandard from './components/CheckList/ChecklistStandard';
import ChecklistPremium from './components/CheckList/ChecklistPremium';
import ChecklistBasic from './components/CheckList/ChecklistBasic';
import ChecklistlastBasic from './components/CheckList/ChecklistlastBasic';
import InnerBooks from './components/CheckList/InnerBooks';
import CategoryPage from './components/Category/CategoryPage';
import ProtectedRoute from './components/Protected';
import Featured from './components/Catalog/Featured';
import NewArrival from './components/Catalog/NewArrival';
import MostViewed from './components/Catalog/MostViewed';
import MyOrders from './Pages/MyOrders';
import OrderDetails from './Pages/OrderDetails';
import SearchResults from './Pages/SearchResults';
const ScrollToTop = () => {
   
  const { pathname } = useLocation();




  useEffect(() => {
      window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <div className=''>
      <ScrollToTop/>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about-us" element= {<AboutUs/>}/>
      <Route path="/get-in-touch" element= {<GetInTouch/>}/>
      <Route path="/product/:id" element= {<ProductDetails1/>}/>
      <Route path="/book/:isbn13" element={<InnerBooks />} />
      <Route path="/category/:id" element={<CategoryPage/>} />
      <Route element={<ProtectedRoute />}>
      <Route path="/cart" element= {<Cartpage/>}/></Route>
      <Route element={<ProtectedRoute />}>
      <Route path="/wishlist" element= {<Wishlist/>}/></Route>
      <Route path="/bulk-booking" element= {<Bulk/>}/>
      <Route path="/featured-products" element= {<Featured/>}/>
      <Route path="/new-arrivals" element= {<NewArrival/>}/>
      <Route path="/most-viewed" element= {<MostViewed/>}/>
      <Route path="/checklist" element= {<Checklist/>}/>
      <Route path="/signup" element= {<Signup/>}/>
      <Route path="/login" element= {<Login/>}/>
      <Route element={<ProtectedRoute />}>
      <Route path="/profile" element= {<Profile/>}/></Route>
      <Route path="/checklist-standard" element= {<ChecklistStandard/>}/>
      <Route path="/checklist-premium" element= {<ChecklistPremium/>}/>
      <Route path="/checklist-basic-lite" element= {<ChecklistBasic/>}/>
      <Route path="/checklist-basic" element= {<ChecklistlastBasic/>}/>
      <Route path="/myorders" element= {<MyOrders/>}/>
      <Route path="/order-details/:orderId" element= {<OrderDetails/>}/>
      <Route path="/search" element= {<SearchResults/>}/>
      </Routes>
    </div>
  )
}

export default App
