import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "./constants/icons";
import MemoryCardIcon from "./components/MemoryCardIcon";

const page = () => {
  return (
    <div className="flex gap-4 m-4 flex-col w-fit">
      <button className="button-primary">Restat</button>
      <button className="button-secondary">Restat</button>
      <button className="menu-selection">Restat</button>
      <button className="menu-selection active">Restat</button>
      <button className="menu-selection active ">1</button>
      <button className="menu-selection ">2</button>
      <button className="menu-button-big">Start Game</button>
      <div className="flex gap-4 flex-wrap">
        {icons.map((icon, index) => (
          <MemoryCardIcon icon={icon} key={index} size={40}></MemoryCardIcon>
        ))}
      </div>
    </div>
  );
};

export default page;
