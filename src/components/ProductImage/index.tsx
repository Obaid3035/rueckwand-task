import type React from "react";
import { useRef, useState } from "react";
import { useCircle } from "../../hooks/useCircle";
import {
	circleSize,
	containerHeight,
	containerWidth,
} from "../../utils/constant";
import { overLapCircle } from "../../utils/helper";
import Circle from "./Circle";

const ProductImage = () => {
	const { circles, setCircles } = useCircle();

	const [dragging, setDragging] = useState(false);
	const [activeCircleId, setActiveCircleId] = useState(1);
	const containerRef = useRef<HTMLDivElement>(null);

	const handleMouseDown = (e: React.MouseEvent, circleId: number) => {
		e.stopPropagation();
		setDragging(true);
		setActiveCircleId(circleId);
		document.body.style.userSelect = "none";
	};

	const handleMouseUp = () => {
		setDragging(false);
		document.body.style.userSelect = "auto";
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!dragging) return;
		if (!containerRef.current) return;

		const imageRect = containerRef.current.getBoundingClientRect();

		let newX = e.clientX - imageRect.left - circleSize / 2;
		let newY = e.clientY - imageRect.top - circleSize / 2;

		newX = Math.max(0, Math.min(newX, imageRect.width - circleSize));
		newY = Math.max(0, Math.min(newY, imageRect.height - circleSize));

		const updatedCircle = circles.map((circle) => {
			if (activeCircleId === circle.id) {
				return {
					...circle,
					x: newX,
					y: newY,
				};
			}
			return circle;
		});

		const movedCircle = updatedCircle.find(
			(circle) => circle.id === activeCircleId,
		);

		if (!movedCircle) return;

		const hasOverLap = updatedCircle.some((circle) => {
			if (circle.id === activeCircleId) return false;
			return overLapCircle(circle, movedCircle);
		});

		if (!hasOverLap) setCircles(updatedCircle);
	};

	return (
		<div className="bg-apple-gray-100 rounded-apple p-6 @md:p-8 flex items-center justify-center">
			<div
				ref={containerRef}
				className="relative product-image cursor-move rounded-apple overflow-hidden "
				style={{
					width: `${containerWidth}px`,
					height: `${containerHeight}px`,
					backgroundImage: `url('/img.jpg')`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
				onMouseLeave={handleMouseUp}
				onMouseUp={handleMouseUp}
				onMouseMove={handleMouseMove}
			>
				{circles.map((circle) => (
					<Circle
						key={circle.id}
						circle={circle}
						handleMouseDown={handleMouseDown}
					/>
				))}
			</div>
		</div>
	);
};

export default ProductImage;
