import React from 'react'
import { BiSearchAlt } from "react-icons/bi";
import { MdOutlineFilterList } from "react-icons/md";
import { Button } from './button'

export default function FilterExport() {
    return (
          <div className="md:flex md:items-center md:justify-between">
            <div className="order-2 md:order-1">
              <Button variant="outline" size="lg" className="w-full py-4 px-[57px] bg-[#2E604A] text-white mb-5">
                Export
              </Button>
            </div>
    
            <div className="flex flex-row justify-between items-center mb-5 gap-5">
              <div className="px-4 py-2 border rounded-[12px] focus:outline-none focus:ring-2 focus:ring-blue-500 flex flex-row w-full">
                <input 
                  type="text" 
                  placeholder="Search by transaction" 
                  className="w-full focus:outline-none"
                />

                <BiSearchAlt className="w-5 h-5 text-gray-500 my-auto flex justify-end" />
              </div>
    
              <div>
                <Button variant="outline" size="lg" className="md:flex md:flex-row md:items-center md:gap-2">
                    <MdOutlineFilterList className='text-[#667085]' /> 
                    <span className='hidden md:block'>
                        Filter
                    </span>
                </Button>
              </div>
            </div>
        </div>
    )
}
