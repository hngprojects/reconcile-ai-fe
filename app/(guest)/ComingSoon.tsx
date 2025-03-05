import React from "react";
import Image from "next/image";

export default function ComingSoon() {
    return (
        <div >
            <div className="nav flex justify-start px-sm-[40px] px-[23px] py-sm-[25px] py-[18px]">
                <div className="nav__logo">
                    <Image 
                    
                    src="/assets/images/Logo.png" 

                    width={159}
                    height={50}
                    alt="company logo" />
                </div>
            </div>

            {/* body */}

            <header>
                <div className="px-[80px] py-[140px] flex ">
                    
                </div>
            </header>

        </div>
    );
}
