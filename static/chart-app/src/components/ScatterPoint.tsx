import { useState } from "react";

const ScatterPoint = ({ x, y, datum }: any) => {
  const [selected, setSelected] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <circle
      cx={x}
      cy={y}
      r={datum.x * datum.y}
      stroke={hovered ? "black" : undefined}
      strokeWidth={1.5}
      fill={selected ? "cyan" : "magenta"}
      onClick={() => setSelected(!selected)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    />
  );
};

export default ScatterPoint;
