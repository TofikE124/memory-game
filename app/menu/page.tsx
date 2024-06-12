import React, { Suspense } from "react";
import Menu from "../components/Menu/Menu";

const page = () => {
  return (
    <div className="bg-dark-navy w-screen min-h-screen flex justify-center py-[100px] px-10">
      <div className="flex flex-col items-center">
        <h1 className="text-white text-[40px] sm:text-[32px] font-bold lg:mb-[70px] sm:mb-[34px]">
          Memory
        </h1>
        <Suspense>
          <Menu></Menu>
        </Suspense>
      </div>
    </div>
  );
};

export default page;
