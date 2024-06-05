"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MenuSection from "./MenuSection";
import { useEffect } from "react";

interface MenuSectionType {
  options: (string | number)[];
  queryParamName: string;
  title: string;
}

const Menu = () => {
  const menuSections: MenuSectionType[] = [
    {
      title: "Select Theme",
      options: ["Numbers", "Icons"],
      queryParamName: "theme",
    },
    {
      title: "Number of Players",
      options: [1, 2, 3, 4],
      queryParamName: "playersNumber",
    },
    {
      title: "Grid Size",
      options: ["4x4", "6x6"],
      queryParamName: "gridSize",
    },
  ];

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    menuSections.forEach((menuSection) => {
      if (!params.get(menuSection.queryParamName))
        params.set(
          menuSection.queryParamName,
          menuSection.options[0].toString()
        );
    });
    router.push(`${pathname.toString()}?${params.toString()}`);
  }, []);

  return (
    <div className="bg-white rounded-[20px] p-14 w-fit">
      <div className="flex flex-col gap-8">
        {menuSections.map(({ title, options, queryParamName }, index) => (
          <MenuSection
            title={title}
            options={options}
            queryParamName={queryParamName}
            key={index}
          ></MenuSection>
        ))}

        <button className="menu-button-big">Start Game</button>
      </div>
    </div>
  );
};

export default Menu;
