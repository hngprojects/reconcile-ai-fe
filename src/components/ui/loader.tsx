'use client'

export function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#2E604A]">
      <div className="relative h-[100px] w-[75px]">
        <div
          className="absolute bottom-0 h-[50%] w-[10px] [animation:barUp1_4s_infinite] bg-white shadow-sm"
          style={{ left: '0px' }}
        />
        <div
          className="absolute bottom-0 h-[50%] w-[10px] [animation:barUp2_4s_infinite] bg-white shadow-sm"
          style={{ left: '15px' }}
        />
        <div
          className="absolute bottom-0 h-[50%] w-[10px] [animation:barUp3_4s_infinite] bg-white shadow-sm"
          style={{ left: '30px' }}
        />
        <div
          className="absolute bottom-0 h-[50%] w-[10px] [animation:barUp4_4s_infinite] bg-white shadow-sm"
          style={{ left: '45px' }}
        />
        <div
          className="absolute bottom-0 h-[50%] w-[10px] [animation:barUp5_4s_infinite] bg-white shadow-sm"
          style={{ left: '60px' }}
        />
        <div className="absolute bottom-[10px] left-0 h-[10px] w-[10px] [animation:ball624_4s_infinite] rounded-full bg-white" />
      </div>
      <p className="mt-4 text-lg font-medium text-white">Loading...</p>
    </div>
  )
}
