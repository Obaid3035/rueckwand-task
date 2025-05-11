import plusIcon from "../../assets/plus.png";
import { useCircle } from "../../hooks/useCircle";
import { circleSize } from "../../utils/constant";
import { overLapCircle } from "../../utils/helper";
import CoordInput from "./CoordInput";

const InputSection = () => {
	const { circles, setCircles, addCircle } = useCircle();

	const updateCirclePosition = (
		circleId: number,
		axis: "x" | "y",
		value: number,
	) => {
		const containerElement = document.querySelector(
			".product-image",
		) as HTMLDivElement;
		if (!containerElement) return;
		const imageRect = containerElement.getBoundingClientRect();
		const clampedValue = Math.max(
			0,
			Math.min(
				value,
				axis === "x"
					? imageRect.width - circleSize
					: imageRect.height - circleSize,
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

	const handleAddCircle = () => {
		const containerElement = document.querySelector(
			".product-image",
		) as HTMLDivElement;
		addCircle(containerElement);
	};

	return (
		<div className="card flex flex-col gap-7">
			<div className="flex items-center justify-between">
				<h2 className="text-xl font-medium text-start text-apple-dark">
					Add Circle
				</h2>
				<img
					src={plusIcon}
					alt="Add"
					className="w-5 h-5 cursor-pointer"
					onClick={handleAddCircle}
				/>
			</div>

			<div className="space-y-5 h-52 overflow-y-scroll apple-scrollbar">
				<div className="flex justify-around ">
					<p>Width</p>
					<p>Height</p>
				</div>
				{circles.map((circle) => (
					<CoordInput
						key={circle.id}
						circle={circle}
						updateCirclePosition={updateCirclePosition}
					/>
				))}
			</div>
		</div>
	);
};

export default InputSection;
