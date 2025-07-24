import { Loader } from "lucide-react";
import React from "react";

const TabLoader = () => {
  return (
    <div className="flex items-center justify-center mt-[100px] space-y-2">
      <div className="flex flex-col items-center">
        <Loader className="animate-spin h-[40px] w-[40px] text-yellow-300" />
        <p>Memuat Data..</p>
      </div>
    </div>
  );
};

export default TabLoader;
