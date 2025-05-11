import { useCircle } from "../../hooks/useCircle";
import {
	circleSize,
	containerHeight,
	containerWidth,
} from "../../utils/constant";
import { overLapCircle } from "../../utils/helper";

const InputSection = () => {
	const { circles, setCircles } = useCircle();

	const updateCirclePosition = (
		circleId: number,
		axis: "x" | "y",
		value: number,
	) => {
		const clampedValue = Math.max(
			0,
			Math.min(
				value,
				axis === "x"
					? containerWidth - circleSize
					: containerHeight - circleSize,
			),
		);

		const updatedCircles = circles.map((circle) => {
			if (circle.id === circleId) {
				return {
					...circle,
					[axis]: clampedValue,
				};
			}
			return circle;
		});

		const movedCircle = updatedCircles.find((c) => c.id === circleId);
		if (!movedCircle) return;

		const hasOverlap = updatedCircles.some((c) => {
			if (c.id === circleId) return false;
			return overLapCircle(c, movedCircle);
		});

		if (!hasOverlap) {
			setCircles(updatedCircles);
		}
	};

	return (
		<div className="p-4 space-y-4">
			{circles.map((circle) => (
				<div key={circle.id} className="flex items-center gap-4">
					<label className="flex items-center gap-2">
						X:
						<input
							type="number"
							value={Math.round(circle.x)}
							min={0}
							max={containerWidth - circleSize}
							onChange={(e) =>
								updateCirclePosition(
									circle.id,
									"x",
									Number.parseFloat(e.target.value),
								)
							}
							className="border p-1 w-20"
						/>
					</label>
					<label className="flex items-center gap-2">
						Y:
						<input
							type="number"
							value={Math.round(circle.y)}
							min={0}
							max={containerHeight - circleSize}
							onChange={(e) =>
								updateCirclePosition(
									circle.id,
									"y",
									Number.parseFloat(e.target.value),
								)
							}
							className="border p-1 w-20"
						/>
					</label>
				</div>
			))}
		</div>
	);
};

export default InputSection;
