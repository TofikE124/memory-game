"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MenuSection, { MenuSectionOption } from "./MenuSection";
import { useEffect } from "react";
import Link from "next/link";
import { menuSections } from "@/app/constants/GameOptions";

const Menu = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    menuSections.forEach((menuSection) => {
      if (!params.get(menuSection.queryParamName))
        params.set(
          menuSection.queryParamName,
          menuSection.options[0].value.toString()
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

        <Link
          className="menu-button-big text-center no-underline"
          href={`/game?${searchParams.toString()}`}
        >
          Start Game
        </Link>
      </div>
    </div>
  );
};

export default Menu;