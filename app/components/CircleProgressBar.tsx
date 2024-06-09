import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbarProps } from "react-circular-progressbar/dist/types";

const CircleProgressBar = ({
  value,
  ...props
}: Partial<CircularProgressbarProps> &
  Pick<CircularProgressbarProps, "value">) => {
  return (
    <div className="w-[50px] h-[50px]">
      <CircularProgressbar value={value} {...props} />
    </div>
  );
};

export default CircleProgressBar;
