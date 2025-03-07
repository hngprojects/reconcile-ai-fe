// import React from "react";
// import Image from "next/image";

// const FileComponent = () => {
//   return (
//     <div className="w-full h-[220px] py-[40px] px-[80px] text-[#333] flex flex-col justify-center items-center gap-[20px] border-1 border-[#333] rounded-[12px]">
//       <Image src="/icon-upload.svg" width={30} height={40} alt="+" />
//       <p className="font-bold text-[16px] md:text-[18px] text-[#678e82]">
//         Upload file
//       </p>
//       <p className="underline cursor-pointer text-[20px]">Choose file here</p>
//     </div>
//   );
// };

// export default FileComponent;

import React, { useRef } from "react";
import Image from "next/image";

interface FileComponentProps {
  onFileUploaded: (fileName: string) => void;
}

const FileComponent: React.FC<FileComponentProps> = ({ onFileUploaded }) => {
  // Create a ref for the hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if file is CSV
      if (file.name.endsWith('.csv')) {
        // Call the callback when file is uploaded, passing the filename
        onFileUploaded(file.name);
      } else {
        // Handle file format error
        console.error("Invalid file format. Only CSV files are supported.");
      }
    }
  };

  return (
    <div className="w-full h-[220px] py-[40px] px-[80px] text-[#333] flex flex-col justify-center items-center gap-[20px] border-1 border-[#333] rounded-[12px]">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".csv"
        onChange={handleFileChange}
      />
      
      <Image src="/icon-upload.svg" width={30} height={40} alt="+" />
      
      <p className="font-bold text-[16px] md:text-[18px] text-[#678e82]">
        Upload file
      </p>
      
      {/* Trigger file selection when clicked */}
      <p 
        className="underline cursor-pointer text-[20px]"
        onClick={() => fileInputRef.current?.click()}
      >
        Choose file here
      </p>
    </div>
  );
};

export default FileComponent;