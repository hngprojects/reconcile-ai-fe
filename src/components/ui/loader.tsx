"use client";

export function Loader() {
  return (
    <div className="fixed inset-0 bg-[#2E604A] flex flex-col items-center justify-center z-50">
      <div className="relative w-[75px] h-[100px]">
        <div
          className="absolute bottom-0 w-[10px] h-[50%] bg-white shadow-sm [animation:barUp1_4s_infinite]"
          style={{ left: "0px" }}
        />
        <div
          className="absolute bottom-0 w-[10px] h-[50%] bg-white shadow-sm [animation:barUp2_4s_infinite]"
          style={{ left: "15px" }}
        />
        <div
          className="absolute bottom-0 w-[10px] h-[50%] bg-white shadow-sm [animation:barUp3_4s_infinite]"
          style={{ left: "30px" }}
        />
        <div
          className="absolute bottom-0 w-[10px] h-[50%] bg-white shadow-sm [animation:barUp4_4s_infinite]"
          style={{ left: "45px" }}
        />
        <div
          className="absolute bottom-0 w-[10px] h-[50%] bg-white shadow-sm [animation:barUp5_4s_infinite]"
          style={{ left: "60px" }}
        />
        <div className="absolute bottom-[10px] left-0 w-[10px] h-[10px] bg-white rounded-full [animation:ball624_4s_infinite]" />
      </div>
      <p className="mt-4 text-white text-lg font-medium">Loading...</p>
    </div>
  );
}
