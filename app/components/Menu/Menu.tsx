"use client";
import { menuSections, PlayersNumber } from "@/app/constants/MenuOptions";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import MenuSection from "./MenuSection";

const Menu = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    let updateRequired = false;

    menuSections.forEach((menuSection) => {
      if (!params.get(menuSection.queryParamName)) {
        params.set(
          menuSection.queryParamName,
          menuSection.options[0].value.toString()
        );
        updateRequired = true;
      }
    });

    if (updateRequired) {
      router.push(`${pathname.toString()}?${params.toString()}`, {
        scroll: false,
      });
    }
  }, [pathname, router, searchParams]);

  return (
    <div className="pb-[40px]">
      <div className="bg-white rounded-[20px] lgmd:p-14 sm:p-8 w-full">
        <div className="flex flex-col gap-8">
          {menuSections.map(
            ({ title, options, queryParamName, visible }, index) => (
              <MenuSection
                title={title}
                options={options}
                queryParamName={queryParamName}
                visible={visible}
                key={index}
              />
            )
          )}

          <Link
            className="menu-button-big text-center no-underline"
            href={`/game?${searchParams.toString()}`}
          >
            Start Game
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Menu;
