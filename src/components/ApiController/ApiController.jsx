import axios from "axios";

export const Base_url =   'https://admin.bechobook.com/api/'; //'https://bb.bechobookscan.com/api/';
 
export const useBrochureService = () => {
    // Base URL for the API
    // const ApiBaseUrl = "https://bb.bechobookscan.com/api/";

    const token = localStorage.getItem("authtoken");
  
    // Axios instance with the token
    const Api = axios.create({
      baseURL: Base_url,
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

  const getAllBrochures = async () => {
    try {
      const response = await Api.get("brochures/all");
      return response.data.data;
      console
    } catch (error) {
      console.error("Error fetching all brochures:", error);
      throw error;
    }
  };
  const getAverageBrochureBooks = async () => {
    try {
      const response = await Api.get("average-brochure-books");
      return response.data; // Adjust as per the response structure
    } catch (error) {
      console.error("Error fetching average brochure books:", error);
      throw error;
    }
  };
  const getStandardBrochureBooks = async () => {
    try {
      const response = await Api.get("standard-brochure-books");
      return response.data; // Adjust as per the response structure
    } catch (error) {
      console.error("Error fetching average brochure books:", error);
      throw error;
    }
  };
  const getPremiumBrochureBooks = async () => {
    try {
      const response = await Api.get("premium-brochure-books");
      return response.data; // Adjust as per the response structure
    } catch (error) {
      console.error("Error fetching average brochure books:", error);
      throw error;
    }
  };
  const getBasicLiteBrochureBooks = async () => {
    try {
      const response = await Api.get("basic-lite-brochure-books");
      return response.data; // Adjust as per the response structure
    } catch (error) {
      console.error("Error fetching average brochure books:", error);
      throw error;
    }
  };
  const getBasicBrochureBooks = async () => {
    try {
      const response = await Api.get("basic-brochure-books");
      return response.data; // Adjust as per the response structure
    } catch (error) {
      console.error("Error fetching average brochure books:", error);
      throw error;
    }
  };
  
    // Fetch brochure details by ID
   
  
    // Return the functions for external usage
    return { getAllBrochures, getAverageBrochureBooks, getStandardBrochureBooks,getPremiumBrochureBooks,getBasicLiteBrochureBooks,getBasicBrochureBooks };
  };
  