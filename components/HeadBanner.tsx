import React from "react";

const HeadBanner = ({
  data,
}: {
  data: {
    span: string;
    bigtext: string;
    smalltext: string;
    color?: string;
  };
}) => {
  return (
    <section className="bg-[#f5fafb] w-full h-[400px] flex flex-col justify-center items-center gap-[32px] px-[32px] max-lg:h-[336px]">
      <span
        className={`px-[12px] py-[4px] bg-[#e6fff2] ${data.color} max-lg:text-xs`}
      >
        {data.span}
      </span>
      <h2 className="text-3xl md:text-5xl font-semibold text-center">
        {data.bigtext}
      </h2>
      <p className="text-center lg:w-[55%] md:w-[70%]">{data.smalltext}</p>
    </section>
  );
};

export default HeadBanner;
