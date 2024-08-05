import React, { Suspense } from "react";
import Menu from "../components/Menu/Menu";
import { Metadata } from "next";
import { GameTheme, Difficulty } from "../constants/MenuOptions";
interface SearchParams {
  theme: GameTheme;
  playersNumber: "1" | "2" | "3" | "4";
  gridSize: "4" | "6";
  difficulty: Difficulty;
}

interface Props {
  searchParams: SearchParams;
}

const page = () => {
  return (
    <div className="bg-dark-navy w-screen min-h-screen overflow-y-auto flex justify-center lg:pt-[30px] md:pt-[75px] sm:py-[40px]">
      <div className="flex flex-col items-center sm:w-full sm:max-w-[90vw]">
        <h1 className="text-white text-[40px] sm:text-[32px] font-bold lg:mb-[70px] md:mb-[50px] sm:mb-[34px]">
          Memory
        </h1>
        <Suspense>
          <Menu></Menu>
        </Suspense>
      </div>
    </div>
  );
};

export async function generateMetadata({
  searchParams: { gridSize, difficulty, playersNumber, theme },
}: Props): Promise<Metadata> {
  return {
    title: "Menu",
    description: "Menu",
  };
}

export default page;
