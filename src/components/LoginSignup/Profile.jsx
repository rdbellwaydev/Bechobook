import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Nav from '../Header/Nav';
import Footer from '../Footer/Footer';
import { useAuth } from '../Authentication/AuthContext';
import ApiService, { Base_url } from '../ApiController/ApiController';
import Pagination from '../Pagination/Pagination';
const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
  const { authToken, setAuthToken } = useAuth(); // Destructure setAuthToken
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const navigate = useNavigate();

  // Fetch Profile API
  useEffect(() => {
    const fetchProfile = async () => {
      if (!authToken) {
        navigate('/login'); // Redirect to login if token is missing
        return;
      }

      try {
        const response = await axios.get(Base_url+'getProfile', {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        if (response.data.status) {
          setUserProfile(response.data.user);
        } else {
          setError('Failed to fetch profile.');
        }
      } catch (err) {
        console.log(err);
        setError('Error fetching profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [authToken, navigate]);

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
    <>
      <Header />
      <Nav />
      <div className="flex justify-center items-center flex-col min-h-screen px-4">
  <div className="flex flex-col sm:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-full sm:w-3/4 lg:w-1/2 h-auto mt-12 mb-24">
    {/* Image Section */}
    <div className="bg-yellow-400 flex-1 flex items-center justify-center h-48 sm:h-full">
      <img
        src="https://i.pinimg.com/736x/09/f7/0b/09f70bf95003cd427f3392929abb3270.jpg"
        alt="Profile illustration"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Profile Details Section */}
    <div className="flex-1 p-4 sm:p-6">
      {loading ? (
        <p className="text-center text-lg font-semibold text-gray-800">Loading profile...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          <h2 className="text-center text-lg font-semibold text-gray-800 mb-4">User Profile</h2>

          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-bold mb-1">Full Name:</label>
              <input
                type="text"
                value={userProfile?.name}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
              />
            </div>
            {/* <div>
              <label className="block text-gray-700 font-bold mb-1">Full Name:</label>
              <input
                type="text"
                value={userProfile?.name}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
              />
            </div> */}

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-bold mb-1">Email:</label>
              <input
                type="email"
                value={userProfile?.email}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700 font-bold mb-1">Phone:</label>
              <input
                type="text"
                value={userProfile?.phone || 'Not Provided'}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
              />
            </div>

            {/* Joined Date */}
            <div>
              <label className="block text-gray-700 font-bold mb-1">Joined On:</label>
              <input
                type="text"
                value={new Date(userProfile?.created_at).toLocaleDateString()}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
              />
            </div>
          </div>

          {/* Logout Button */}
          <div className="text-center mt-4">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 w-full sm:w-auto"
              onClick={() => {
                localStorage.removeItem('authtoken'); // Remove token
                setAuthToken(null);
                navigate('/login'); // Redirect to login
              }}
            >
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  </div>

</div>
{/* My Orders Section */}
<div className="mt-8 mb-4 px-4 flex justify-center">
  <div className="w-full sm:w-3/4 lg:w-2/3">
    <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">My Orders</h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {orders.length === 0 ? (
    <p className="text-gray-600 col-span-full">No orders found.</p>
  ) : (
    orders.map((order, index) => (
      <div key={order.id || index} onClick={()=>handleOrderDetails(order.id)} className="border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-sm cursor-pointer">
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

      <Footer />
    </>
  );
};

export default ProfilePage;
