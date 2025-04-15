import React from "react";

export type Point = {
  x: number;
  y: number;
  label: -1 | 1;
};

type CanvasProps = {
  points: Point[];
  onAddPoint: (point: Point) => void;
  currentLabel: -1 | 1;
  decisionLine?: { w1: number; w2: number; b: number };
};

const WIDTH = 500;
const HEIGHT = 500;

export default function Canvas({
  points,
  onAddPoint,
  currentLabel,
  decisionLine,
}: CanvasProps) {
  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - svg.left;
    const y = e.clientY - svg.top;
    onAddPoint({
      x,
      y,
      label: currentLabel,
    });
  };

  const renderDecisionLine = () => {
    if (!decisionLine || decisionLine.w2 === 0) return null;
    const { w1, w2, b } = decisionLine;
    const x1 = 0;
    const y1 = (-w1 * x1 - b) / w2;
    const x2 = WIDTH;
    const y2 = (-w1 * x2 - b) / w2;
    return (
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" strokeWidth={2} />
    );
  };

  return (
    <svg
      width={WIDTH}
      height={HEIGHT}
      className="border border-gray-400 bg-white"
      onClick={handleClick}
    >
      {points.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={6}
          fill={p.label === 1 ? "blue" : "red"}
        />
      ))}
      {renderDecisionLine()}
    </svg>
  );
}
