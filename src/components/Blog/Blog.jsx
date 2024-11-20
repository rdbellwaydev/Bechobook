import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Blog = () => {
  const blogs = [
    {
      image: "src/assets/Blog/35faa8ec50c992275449ef778b6d729b.png",
      blogDate: "11",
      month: "march",
      postedBy: "dfddvff theam Admin",
      title: "How To Grow Epiphytic Tropical Plants",
      description: "This is a short description of Blog 1.",
    },
    {
      image: "src/assets/Blog/0d0effc9711c3a2d3bb98ed0253e4d83.png",
      blogDate: "11",
      month: "march",
      postedBy: "dfddvff theam Admin",
      title: "How To Grow Epiphytic Tropical Plants",
      description: "This is a short description of Blog 1.",
    },
  ];
  return (
    <div className="px-4 md:px-20 py-10">
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {blogs.map((blog, index) => (
          <SwiperSlide
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-fill"
            />
            <div className="py-2">
              <div className="h-16 w-16 bg-gray-300 flex flex-col justify-center items-center rounded-md overflow-hidden">
                <span className="text-xl h-10">{blog.blogDate}</span>
                <span className="text-xl h-8 bg-black text-white w-full text-center">
                  {blog.month}
                </span>
              </div>
              <h3 className="text-xl font-bold">{blog.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{blog.description}</p>

              <p className="text-sm text-gray-600 mt-2">
                <i className="ri-user-3-fill border-2 mr-1"></i>
                { blog.postedBy}
              </p>
              <button className="mt-4">Read More...</button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Blog;
