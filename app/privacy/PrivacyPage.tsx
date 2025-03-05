import React from "react";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const PrivacyPage = () => {
    return (
        <div>
            <Nav />

            <header className="flex justify-center md:py-[110px] py-[48px] px-6 bg-[#F5FAF8]">
                <div className="border-2 border-red-500 text-center">

                    <p className="text-green-400 bg-green-100 px-4 py-2 text-xs inline-block w-fit mb-6 mx-auto">Privacy</p>

                    <h1 className="md:text-[60px] text-[28px] font-semibold mb-6">How We Protect Your Information</h1>

                    <p className="text-md">Find advice and answers from our support team</p>
                </div>
            </header>

            <section>
                <div className="flex justify-center">
                    <div className="w-max-[1120px] flex lg:flex-col">

                        <div>
                            <h2>Trust Us</h2>
                        </div>

                        <div>
                            <h2>Trust Us</h2>
                        </div>
                    </div>

                </div>
            </section>
            <Footer />
        </div>
    )
}

export default PrivacyPage;