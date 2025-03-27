import React from 'react'
import Header from '../Header/Header'
import Nav from '../Header/Nav'
import Footer from '../Footer/Footer'
import Footer2 from '../Footer/Footer2'
const AboutUs = () => {
    return (
        <>
            <Header />
            <Nav />
            <div className=" mx-auto p-24">

                <div class="flex flex-col md:flex-row items-center mb-8  mt-8">
                    <div class="md:w-1/2 mb-4 md:mb-0">
                        <img src='https://i.pinimg.com/736x/59/86/b5/5986b588bf3f27375f224e447ff23b11.jpg' alt="Tech Future" class="w-full h-auto rounded-lg shadow-lg" />
                    </div>
                    <div class="md:w-1/2 md:pl-8">
                        <h3 class="text-3xl font-bold text-center">Why Us?</h3>
                        <p class="text-xl mb-4 mt-8">Our books strictly adhere to CBSE and ICSE guidelines, ensuring relevance and quality education. Get your books delivered to your doorstep swiftly and securely.
                            <br /><br />
                            Explore a vast collection of textbooks, reference guides, and curated book packs tailored to meet every student’s needs. Pick and choose individual books or opt for ready-made packs curated by subject matter experts.
                            <br /><br />
                            Access study materials, guides, and tools to enhance your learning experience. Enjoy a seamless shopping experience with an intuitive interface and quick checkout options.

                        </p>

                    </div>
                </div>
            </div>


            {/* mobile footer */}
            {/* <div className="md:hidden">
                <Footer2 />
            </div> */}
            {/* desktop footer */}
            <div className="md:inline">
                <Footer />
            </div>
        </>
    )
}

export default AboutUs