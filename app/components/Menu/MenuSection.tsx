"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MenuSelection from "./MenuSelection";

interface Props {
  title: string;
  options: (string | number)[];
  queryParamName: string;
}

const MenuSection = ({ title, options, queryParamName }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const updateQueryParam = (param: string, value: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (value == null) params.delete(param);
    else params.set(param, value);
    router.push(`${pathname}?${params.toString()}`);
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
              updateQueryParam(queryParamName, option.toString());
            }}
            active={searchParams.get(queryParamName) == option}
            key={index}
          >
            {option}
          </MenuSelection>
        ))}
      </div>
    </div>
  );
};

export default MenuSection;
