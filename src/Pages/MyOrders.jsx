import React, { useEffect } from 'react'
import Header from '../components/Header/Header'
import Nav from '../components/Header/Nav'
import Footer from '../components/Footer/Footer'
import { useState } from 'react';
import Pagination from '../components/Pagination/Pagination';
import ApiService from '../components/ApiController/ApiController';
import { TbUserQuestion } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

export default function MyOrders() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const GetOrders = (page)=>{
        ApiService.GetOrders({
          page
        }).then((response)=>{
          if(response.data.status){
            console.log(response.data.data);
            setOrders(response.data.data.data);
            setTotalPages(response.data.last_page); // Laravel-style pagination
            setCurrentPage(response.data.current_page);
          }else{
            setOrders([]);
          }
        }).catch((error)=>{
          console.log(error);
          setOrders([]);
        })
      }
    
      useEffect((currentPage)=>{
        GetOrders(currentPage);
      },[currentPage])
      const handleOrderDetails = (orderId)=>{
        navigate(`/order-details/${orderId}`);
      }
  return (
    <div>
      <Header/>
      <Nav/>
      {/* My Orders Section */}
<div className="mt-8 mb-4 px-4 flex justify-center">
  <div className="w-full sm:w-3/4 lg:w-2/3">
    <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">My Orders</h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {orders.length === 0 ? (
    <p className="text-gray-600 col-span-full">No orders found.</p>
  ) : (
    orders.map((order, index) => (
      <div key={order.id || index} onClick={()=>handleOrderDetails(order.id)} className="border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">Order ID:</span>
          <span className="text-sm font-semibold text-gray-800">#{order.id}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">Date:</span>
          <span className="text-sm text-gray-700">
            {new Date(order.created_at).toLocaleDateString()}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">Status:</span>
          <span className={`text-sm font-semibold ${
            order.status === 'Delivered' ? 'text-green-600' :
            order.status === 'Cancelled' ? 'text-red-600' : 'text-yellow-600'
          }`}>
            {order.status}
          </span>
        </div>
      </div>
    ))
  )}
</div>
<div className="mt-6">
  {totalPages > 1 && (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      goToPage={(page) => setCurrentPage(page)}
    />
  )}
</div>

  </div>
</div>
      <Footer/>
    </div>
  )
}
