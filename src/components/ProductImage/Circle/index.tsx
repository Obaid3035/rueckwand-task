import React from "react";
import type { ICircle } from "../../../type";
import { circleSize } from "../../../utils/constant";

const Circle = ({
	circle,
	handleMouseDown,
}: {
	circle: ICircle;
	handleMouseDown: (e: React.MouseEvent, circleId: number) => void;
}) => {
	return (
		<div
			key={circle.id}
			className="rounded-full absolute cursor-move shadow-lg backdrop-blur-md bg-white/30 border border-white/40"
			style={{
				border: "2px solid black",
				width: `${circleSize}px`,
				height: `${circleSize}px`,
				left: `${circle.x}px`,
				top: `${circle.y}px`,
				backgroundColor: circle.color,
				mixBlendMode: "multiply",
				opacity: 1,
			}}
			onMouseDown={(e) => handleMouseDown(e, circle.id)}
		/>
	);
};

export default React.memo(Circle);
