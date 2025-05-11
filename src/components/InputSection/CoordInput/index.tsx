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
		<label className="flex items-center gap-2">
			{label}:
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
				className="border p-1 w-20"
			/>
		</label>
	);

	return (
		<div className="flex items-center gap-4">
			{renderInput("X", circle.x, containerWidth - circleSize)}
			{renderInput("Y", circle.y, containerHeight - circleSize)}
		</div>
	);
};

export default React.memo(CoordInput);
