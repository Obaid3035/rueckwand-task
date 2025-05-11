import React from "react";
import type { ICircle } from "../../../type";
import {
	circleSize,
	containerHeight,
	containerWidth,
} from "../../../utils/constant";

interface CoordInputProps {
	circle: ICircle;
	updateCirclePosition: (
		circleId: number,
		axis: "x" | "y",
		value: number,
	) => void;
}

const CoordInput: React.FC<CoordInputProps> = ({
	circle,
	updateCirclePosition,
}) => {
	const renderInput = (label: "X" | "Y", value: number, max: number) => (
		<div className="flex flex-col gap-1">
			<div className="flex items-center rounded-apple overflow-hidden border border-gray-300 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
				<input
					type="number"
					value={Math.round(value)}
					min={0}
					max={max}
					onChange={(e) =>
						updateCirclePosition(
							circle.id,
							label.toLowerCase() as "x" | "y",
							Number.parseFloat(e.target.value),
						)
					}
					className="px-3 py-1.5 w-24 text-sm bg-transparent text-black outline-none"
				/>
				<span className="px-2 text-xs text-gray-500 border-l border-gray-200">
					PX
				</span>
			</div>
		</div>
	);

	return (
		<div className="rounded-apple flex items-center justify-between gap-4 text-start">
			{renderInput("X", circle.x, containerWidth - circleSize)}
			{renderInput("Y", circle.y, containerHeight - circleSize)}
		</div>
	);
};

export default React.memo(CoordInput);
