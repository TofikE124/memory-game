"use client";
import { MenuSectionOption } from "@/app/constants/MenuOptions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MenuSelection from "./MenuSelection";

interface Props {
  title: string;
  options: MenuSectionOption[];
  queryParamName: string;
  visible?: boolean | ((params: URLSearchParams) => boolean);
}

const MenuSection = ({ title, options, queryParamName, visible }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Check visibility condition
  if (
    visible === false ||
    (typeof visible === "function" && !visible(searchParams))
  ) {
    return null;
  }

  const updateQueryParam = (param: string, value: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (value == null) params.delete(param);
    else params.set(param, value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col">
      <h3 className="h3 text-slate-blue">{title}</h3>
      <div
        className={`flex flex-wrap items-center ${
          options.length > 2 ? "gap-2" : "gap-4"
        }`}
      >
        {options.map((option, index) => (
          <MenuSelection
            onClick={() => {
              updateQueryParam(queryParamName, option.value.toString());
            }}
            active={searchParams.get(queryParamName) == option.value.toString()}
            extraDetails={option.extraDetails?.call(this, searchParams)}
            key={index}
          >
            {option.label}
          </MenuSelection>
        ))}
      </div>
    </div>
  );
};

export default MenuSection;
