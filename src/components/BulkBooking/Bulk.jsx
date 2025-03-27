// import React from "react";
// import Header from "../Header/Header";
// import Nav from "../Header/Nav";
// import Footer from "../Footer/Footer";
// import { useNavigate } from "react-router-dom";
// const plans = [
//   {
//     title: "Average",
//     qty: "Qty 1500 books",
//     price: "₹100000",
//     ratio: "60 : 40",
//     mrp: "200000",
//     discount: "50%",
//     delivery: "Free",
//     category: "450 Novels, 400 Kids fiction, 370 Kids story, 30 Encyclopedia, 50 Famous titles",
//     gradient: "bg-gradient-to-r from-blue-500 to-indigo-500",
//   },
//   {
//     title: "Standard",
//     qty: "Qty 1500 books",
//     price: "₹130000",
//     ratio: "70 : 30",
//     mrp: "300000",
//     discount: "57%",
//     delivery: "Free",
//     category:
//       "290 Novels, 300 Kids fiction, 250 Kids story, 60 Encyclopedia, 200 Famous titles",
//     gradient: "bg-gradient-to-r from-red-500 to-orange-500",
//   },
//   {
//     title: "Premium",
//     qty: "Qty 1500 books",
//     price: "₹180000",
//     ratio: "All NEW",
//     mrp: "400000",
//     discount: "55%",
//     delivery: "Free",
//     category:
//       "290 Novels, 300 Kids fiction, 250 Kids story, 60 Encyclopedia, 200 Famous titles",

//     gradient: "bg-gradient-to-r from-purple-500 to-pink-500",
//     popular: true,

//   },
//   {
//     title: "Basic Lite",
//     qty: "Qty 1500 books",
//     price: "₹180000",
//     ratio: "All NEW",
//     mrp: "400000",
//     discount: "55%",
//     delivery: "Free",
//     category:
//       "290 Novels, 300 Kids fiction, 250 Kids story, 60 Encyclopedia, 200 Famous titles",
//     gradient: "bg-gradient-to-r from-blue-500 to-indigo-500",
//   },
//   {
//     title: "Basic",
//     qty: "Qty 1500 books",
//     price: "₹180000",
//     ratio: "All NEW",
//     mrp: "400000",
//     discount: "55%",
//     delivery: "Free",
//     category:
//       "290 Novels, 300 Kids fiction, 250 Kids story, 60 Encyclopedia, 200 Famous titles",
//     gradient: "bg-gradient-to-r from-red-500 to-orange-500",
//   },
// ];

// const BulkBookingPage = () => {
//   const navigate = useNavigate();
//   const handleChecklist = () => {
//     navigate('/checklist')
//   }
//   return (
//     <>
//       <Header />
//       <Nav />
//       <div className="p-3">
//         <h2 className="text-md font-bold text-start mb-8">
//           Choose the plan that's right for you
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
//           {plans.map((plan, index) => (
//             <div key={index} className="w-full md:w-64">
//               {/* Card Wrapper */}
//               <div className="relative border rounded-md shadow-sm overflow-visible">
//                 {/* "Best Seller" label */}
//                 {plan.popular && (
//                   <div className="absolute top-[-1.5rem] left-0 right-0 bg-purple-600 text-white rounded-t-md text-center py-1 text-xs font-semibold z-10 max-w-full">
//                     Best Seller
//                   </div>
//                 )}

//                 {/* Card Gradient Header */}
//                 <div className={`${plan.gradient} p-2 text-white`}>
//                   <h3 className="text-sm font-semibold">{plan.title}</h3>
//                   <p className="text-xs">{plan.qty}</p>
//                 </div>

//                 {/* Card Content */}
//                 <div className="p-3 space-y-2 text-gray-800">
//                   <div>
//                     <p className="font-medium text-gray-900 text-xs">Price</p>
//                     <p className="text-sm font-medium">{plan.price}</p>
//                     <hr className="my-1 border-gray-300" />
//                   </div>
//                   <div>
//                     <p className="font-medium text-gray-900 text-xs">Book list</p>
//                     <p className="text-sm font-medium">Available</p>
//                     <hr className="my-1 border-gray-300" />
//                   </div>
//                   <div>
//                     <p className="font-medium text-gray-900 text-xs">New : Used Ratio</p>
//                     <p className="text-sm font-medium">{plan.ratio}</p>
//                     <hr className="my-1 border-gray-300" />
//                   </div>
//                   <div>
//                     <p className="font-medium text-gray-900 text-xs">
//                       Total MRP of books (Approx)
//                     </p>
//                     <p className="text-sm font-medium">{plan.mrp}</p>
//                     <hr className="my-1 border-gray-300" />
//                   </div>
//                   <div>
//                     <p className="font-medium text-gray-900 text-xs">Discount</p>
//                     <p className="text-sm font-medium">{plan.discount}</p>
//                     <hr className="my-1 border-gray-300" />
//                   </div>
//                   <div>
//                     <p className="font-medium text-gray-900 text-xs">
//                       Doorstep Delivery Charges
//                     </p>
//                     <p className="text-sm font-medium">{plan.delivery}</p>
//                     <hr className="my-1 border-gray-300" />
//                   </div>
//                   <div>
//                     <p className="font-medium text-gray-900 text-xs">Category</p>
//                     <p className="text-sm font-medium">{plan.category}</p>
//                     <hr className="my-1 border-gray-300" />
//                   </div>
//                 </div>
//               </div>

//               {/* Button Outside Card */}
//               <div className="mt-3 text-center">
//                 <button onClick={handleChecklist} className="bg-red-500 text-white py-2 px-4 rounded-md transition duration-300">
//                   Check List
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>




//       <Footer />

//     </>

//   );
// };

// export default BulkBookingPage;
// import React, { useEffect, useState } from "react";
// import Header from "../Header/Header";
// import Nav from "../Header/Nav";
// import Footer from "../Footer/Footer";
// import { useNavigate } from "react-router-dom";
// import { useBrochureService } from "../ApiController/ApiController";
// import HashLoader from "react-spinners/HashLoader";
// const BulkBookingPage = () => {
//   const navigate = useNavigate();
//   const { getAllBrochures, getAverageBrochureBooks } = useBrochureService();

//   const [brochures, setBrochures] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBrochures = async () => {
//       try {
//         const data = await getAllBrochures();
//         const combinedBrochures = [
//           ...data.average_brochures,
//           ...data.standard_brochures,
//           ...data.premium_brochures,
//           ...data.basic_lite_brochures,
//           ...data.basic_brochures,
//         ];
//         setBrochures(combinedBrochures);
//       } catch (err) {
//         setError(err.message || "Error fetching brochures");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBrochures();
//   }, []);

//   const handleChecklist = async () => {
//     try {
//       const brochureDetails = await getAverageBrochureBooks();
//       // Navigate or display the brochure details
//       console.log("Brochure Details:", brochureDetails);
//       navigate("/checklist", { state: brochureDetails });
//     } catch (err) {
//       console.error("Error fetching brochure details:", err);
//     }
//   };
//   const gradients = {
//     Average: "bg-gradient-to-r from-blue-500 to-indigo-500",
//     Standard: "bg-gradient-to-r from-red-500 to-orange-500",
//     Premium: "bg-gradient-to-r from-purple-500 to-pink-500",
//     "Basic Lite": "bg-gradient-to-r from-blue-500 to-indigo-500",
//     Basic: "bg-gradient-to-r from-red-500 to-orange-500",
//   };
//   // if (loading) return <p>Loading brochures...</p>;
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         {/* HashLoader with a spinner */}
//         <HashLoader color="#4A90E2" size={80} />
//       </div>
//     );
//   }
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <>
//       <Header />
//       <Nav />
//       <div className="p-3">
//         <h2 className="text-md font-bold text-start mb-8">
//           Choose the plan that's right for you
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
//           {brochures.map((plan, index) => (
//             <div key={index} className="w-full md:w-64">
//               {/* Card Wrapper */}
//               <div className="relative border rounded-md shadow-sm overflow-visible">
//                 {/* "Best Seller" label */}
//                 {plan.brochure_name === "Premium" && (
//                   <div className="absolute top-[-1.5rem] left-0 right-0 bg-purple-600 text-white rounded-t-md text-center py-1 text-xs font-semibold z-10 max-w-full">
//                     Best Seller
//                   </div>
//                 )}

//                 {/* Card Gradient Header */}
//                 {/* <div className={`bg-gradient-to-r from-blue-500 to-indigo-500 p-2 text-white`}>
//                   <h3 className="text-sm font-semibold">{plan.brochure_name}</h3>
//                   <p className="text-xs">Qty {plan.qty_of_books} books</p>
//                 </div> */}
//                 <div
//                   className={`${gradients[plan.brochure_name] || "bg-gradient-to-r from-gray-500 to-gray-700"} p-2 text-white`}
//                 >
//                   <h3 className="text-sm font-semibold">{plan.brochure_name}</h3>
//                   <p className="text-xs">Qty {plan.qty_of_books} books</p>
//                 </div>

//                 {/* Card Content */}
//                 <div className="p-3 space-y-2 text-gray-800">
//                   <div>
//                     <p className="font-medium text-gray-900 text-xs">Price</p>
//                     <p className="text-sm font-medium">₹{plan.price}</p>
//                     <hr className="my-1 border-gray-300" />
//                   </div>
//                   <div>
//                     <p className="font-medium text-gray-900 text-xs">Book list</p>
//                     <p className="text-sm font-medium">{plan.book_list}</p>
//                     <hr className="my-1 border-gray-300" />
//                   </div>
//                   <div>
//                     <p className="font-medium text-gray-900 text-xs">New : Used Ratio</p>
//                     <p className="text-sm font-medium">{plan.new_used_ratio}</p>
//                     <hr className="my-1 border-gray-300" />
//                   </div>
//                   <div>
//                     <p className="font-medium text-gray-900 text-xs">
//                       Total MRP of books (Approx)
//                     </p>
//                     <p className="text-sm font-medium">{plan.total_mrp_of_books}</p>
//                     <hr className="my-1 border-gray-300" />
//                   </div>
//                   <div>
//                     <p className="font-medium text-gray-900 text-xs">Discount</p>
//                     <p className="text-sm font-medium">{plan.discount}%</p>
//                     <hr className="my-1 border-gray-300" />
//                   </div>
//                   <div>
//                     <p className="font-medium text-gray-900 text-xs">
//                       Doorstep Delivery Charges
//                     </p>
//                     <p className="text-sm font-medium">{plan.doorstep_delivery_charge}</p>
//                     <hr className="my-1 border-gray-300" />
//                   </div>
//                   <div>
//                     <p className="font-medium text-gray-900 text-xs">Category</p>
//                     <p className="text-sm font-medium">{plan.category}</p>
//                     <hr className="my-1 border-gray-300" />
//                   </div>
//                 </div>
//               </div>

//               {/* Button Outside Card */}
//               <div className="mt-3 text-center">
//                 <button
//                   onClick={() => handleChecklist(plan.id)}
//                   className="bg-red-500 text-white py-2 px-4 rounded-md transition duration-300"
//                 >
//                   Check List
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default BulkBookingPage;
import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Nav from "../Header/Nav";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useBrochureService } from "../ApiController/ApiController";
import HashLoader from "react-spinners/HashLoader";

const BulkBookingPage = () => {
  const navigate = useNavigate();
  const { getAllBrochures, getAverageBrochureBooks, getStandardBrochureBooks, getPremiumBrochureBooks, getBasicLiteBrochureBooks, getBasicBrochureBooks } = useBrochureService();

  const [brochures, setBrochures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrochures = async () => {
      try {
        const data = await getAllBrochures();
        const combinedBrochures = [
          ...data.average_brochures,
          ...data.standard_brochures,
          ...data.premium_brochures,
          ...data.basic_lite_brochures,
          ...data.basic_brochures,
        ];
        setBrochures(combinedBrochures);
      } catch (err) {
        setError(err.message || "Error fetching brochures");
      } finally {
        setLoading(false);
      }
    };

    fetchBrochures();
  }, []);

  // Modified handleChecklist function to handle different brochure types
  const handleChecklist = async (brochureName) => {
    try {
      let brochureDetails;
      let redirectTo = "";  // Define the URL dynamically

      // Call different API based on brochure type
      switch (brochureName) {
        case "Average":
          brochureDetails = await getAverageBrochureBooks();
          redirectTo = "/checklist";  // Navigate to Average page
          break;
        case "Standard":
          brochureDetails = await getStandardBrochureBooks();
          redirectTo = "/checklist-standard";  // Navigate to Standard page
          break;
        case "Premium":
          brochureDetails = await getPremiumBrochureBooks();
          redirectTo = "/checklist-premium";  // Navigate to Premium page
          break;
        case "Basic Lite":
          brochureDetails = await getBasicLiteBrochureBooks();
          redirectTo = "/checklist-basic-lite";  // Navigate to Basic Lite page
          break;
        case "Basic":
          brochureDetails = await getBasicBrochureBooks();
          redirectTo = "/checklist-basic";
          break;
        default:
          throw new Error("Invalid brochure type");
      }

      // Navigate to the respective checklist page with the brochure data
      navigate(redirectTo, { state: brochureDetails });

    } catch (err) {
      console.error("Error fetching brochure details:", err);
    }
  };

  const gradients = {
    Average: "bg-gradient-to-r from-blue-500 to-indigo-500",
    Standard: "bg-gradient-to-r from-red-500 to-orange-500",
    Premium: "bg-gradient-to-r from-purple-500 to-pink-500",
    "Basic Lite": "bg-gradient-to-r from-blue-500 to-indigo-500",
    Basic: "bg-gradient-to-r from-red-500 to-orange-500",
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <HashLoader color="#4A90E2" size={80} />
      </div>
    );
  }
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Header />
      <Nav />
      <div className="p-3">
  <h2 className="text-md font-bold text-start mb-8">
    Choose the plan that's right for you
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
    {brochures.map((plan, index) => (
      <div key={index} className="w-full">
        <div className="relative border rounded-md shadow-sm overflow-visible">
          {plan.brochure_name === "Premium" && (
            <div className="absolute top-[-1.5rem] left-0 right-0 bg-purple-600 text-white rounded-t-md text-center py-1 text-xs font-semibold z-10 max-w-full">
              Best Seller
            </div>
          )}

          <div
            className={`${gradients[plan.brochure_name] || "bg-gradient-to-r from-gray-500 to-gray-700"} p-2 text-white`}
          >
            <h3 className="text-sm font-semibold">{plan.brochure_name}</h3>
            <p className="text-xs">Qty {plan.qty_of_books} books</p>
          </div>

          <div className="p-3 space-y-2 text-gray-800">
            <div>
              <p className="font-medium text-gray-900 text-xs">Price</p>
              <p className="text-sm font-medium">₹{plan.price}</p>
              <hr className="my-1 border-gray-300" />
            </div>
            <div>
              <p className="font-medium text-gray-900 text-xs">Book list</p>
              <p className="text-sm font-medium">{plan.book_list}</p>
              <hr className="my-1 border-gray-300" />
            </div>
            <div>
              <p className="font-medium text-gray-900 text-xs">New : Used Ratio</p>
              <p className="text-sm font-medium">{plan.new_used_ratio}</p>
              <hr className="my-1 border-gray-300" />
            </div>
            <div>
              <p className="font-medium text-gray-900 text-xs">
                Total MRP of books (Approx)
              </p>
              <p className="text-sm font-medium">{plan.total_mrp_of_books}</p>
              <hr className="my-1 border-gray-300" />
            </div>
            <div>
              <p className="font-medium text-gray-900 text-xs">Discount</p>
              <p className="text-sm font-medium">{plan.discount}%</p>
              <hr className="my-1 border-gray-300" />
            </div>
            <div>
              <p className="font-medium text-gray-900 text-xs">
                Doorstep Delivery Charges
              </p>
              <p className="text-sm font-medium">{plan.doorstep_delivery_charge}</p>
              <hr className="my-1 border-gray-300" />
            </div>
            <div>
              <p className="font-medium text-gray-900 text-xs">Category</p>
              <p className="text-sm font-medium">{plan.category}</p>
              <hr className="my-1 border-gray-300" />
            </div>
          </div>
        </div>

        <div className="mt-4 mb-4 text-center">
          <button
            onClick={() => handleChecklist(plan.brochure_name)} // Pass brochure name to handle checklist
            className="bg-red-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-red-600"
          >
            Check List
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

      <Footer />
    </>
  );
};

export default BulkBookingPage;
