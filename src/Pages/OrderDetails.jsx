import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import Nav from '../components/Header/Nav';
import Footer from '../components/Footer/Footer';
import axios from 'axios';
import ApiService from '../components/ApiController/ApiController';
import Pagination from '../components/Pagination/Pagination';
import { useNavigate, useParams } from 'react-router-dom';

export default function OrderDetails() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const perPage = 10;

  const {orderId} = useParams(); // Replace this if you want to fetch dynamically

  useEffect(() => {
    fetchOrderDetails();
  }, [page]);

  const fetchOrderDetails = async () => {
    ApiService.orderDetails({order_id:orderId}).then((response)=>{
        if(response.data.status){
           setOrder(response.data.data);
           setLoading(false);
        }else{
           setOrder(null);
           setLoading(false);
        }
        }).catch((error)=>{
           console.log(error);
           setLoading(true);
        }).finally(()=>{
           setLoading(false);
        })
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= order?.books?.last_page) {
      setPage(page);
    }
  };

  const handlebooks = (bookId) =>{
    navigate(`/product/${bookId}`)
  }
  return (
    <div>
      <Header />
      <Nav />

      <section className="max-w-6xl mx-auto px-4 py-10">
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : order ? (
          <>
            {/* Order Info */}
            <div className="mb-8 border-b pb-4">
              <h2 className="text-2xl font-semibold mb-2">Order #{order.quotation_number}</h2>
              <p className="text-gray-700"><strong>Name:</strong> {order.user_name}</p>
              <p className="text-gray-700"><strong>Email:</strong> {order.user_email}</p>
              <p className="text-gray-700"><strong>Phone:</strong> {order.user_phone}</p>
            </div>

            {/* Book List */}
            <h3 className="text-xl font-semibold mb-4">Books in Order</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {order.books.data.map((book) => (
                <div key={book.id} className="bg-white shadow rounded-lg overflow-hidden">
          <div className="w-full max-w-[160px] mx-auto aspect-[2/3] bg-gray-100 overflow-hidden" onClick={()=>handlebooks(book.id)}>
  <img
    src={book.title?.image || 'no-image.png'}
    alt={book.title?.title || 'Book'}
    className="w-full h-full object-cover"
  />
</div>

                  <div className="p-4">
                    <h4 className="font-semibold text-lg mb-1">{book.title?.title}</h4>
                    <p className="text-sm text-gray-600 mb-1"><strong>Publisher:</strong> {book.title?.publisher || 'N/A'}</p>
                    <p className="text-sm text-gray-600 mb-1"><strong>Language:</strong> {book.title?.language || 'N/A'}</p>
                    <p className="text-sm text-gray-600 mb-1"><strong>Price:</strong> ₹{book.price}</p>
                    <p className="text-sm text-gray-600"><strong>Quantity:</strong> {book.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4 space-x-2">
                    <Pagination
                    currentPage={page}
                    totalPages={order?.books?.last_page}
                    goToPage={handlePageChange}
                    />
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600">No order found.</p>
        )}
      </section>

      <Footer />
    </div>
  );
}
