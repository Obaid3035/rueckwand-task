import type React from "react";
import { useRef, useState } from "react";

interface ICircle {
	id: number;
	x: number;
	y: number;
}

const ProductImage = () => {
	const [circles, setCircles] = useState<ICircle[]>([
		{
			id: 1,
			x: 150,
			y: 100,
		},
	]);
	const [dragging, setDragging] = useState(false);
	const [activeCircleId, setActiveCircleId] = useState(1);
	const containerRef = useRef<HTMLDivElement>(null);

	const zoomLevel = 2; // 2x zoom
	const circleSize = 120;
	const maxCircle = 25;

	const findValidPosition = () => {
		if (!containerRef.current) return;

		const imageRect = containerRef.current.getBoundingClientRect();
		const maxAttempt = 50;

		for (let i = 0; i < 50; i++) {
			const newX = Math.random() * (imageRect.width - circleSize);
			const newY = Math.random() * (imageRect.height - circleSize);

			const newCircle = {
				id: circles.length + 1,
				x: newX,
				y: newY,
			};

			const hasOverlap = circles.some((circle) =>
				overLapCircle(circle, newCircle),
			);

			if (!hasOverlap) return newCircle;
		}
	};

	const overLapCircle = (circle1: ICircle, circle2: ICircle) => {
		const c1x = circle1.x + circleSize / 2;
		const c2x = circle2.x + circleSize / 2;
		const c1y = circle1.y + circleSize / 2;
		const c2y = circle2.y + circleSize / 2;

		const distance = Math.sqrt((c2x - c1x) ** 2 + (c2y - c1y) ** 2);

		return distance < circleSize;
	};

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

	const onAddCircleHandler = () => {
		if (circles.length > maxCircle) {
			return;
		}

		const validPosition = findValidPosition();

		if (validPosition) {
			setCircles([...circles, { ...validPosition }]);
		}
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
		<div
			ref={containerRef}
			className="col-span-7 relative w-[600px] h-[400px] cursor-move"
			onMouseLeave={handleMouseUp}
			onMouseUp={handleMouseUp}
			onMouseMove={handleMouseMove}
		>
			<img
				src="/img.jpg"
				alt="product"
				className="object-cover w-full h-full"
			/>
			<button onClick={onAddCircleHandler}>Add</button>
			{circles.map((circle) => (
				<div
					key={circle.id}
					className="border-2 border-black rounded-full absolute cursor-move shadow-lg"
					style={{
						backgroundImage: "url(/img.jpg)",
						backgroundRepeat: "no-repeat",
						width: `${circleSize}px`,
						height: `${circleSize}px`,
						left: `${circle.x}px`,
						top: `${circle.y}px`,
						backgroundSize: `${600 * zoomLevel}px ${400 * zoomLevel}px`,
						backgroundPosition: `-${circle.x * zoomLevel}px -${
							circle.y * zoomLevel
						}px`,
					}}
					onMouseDown={(e) => handleMouseDown(e, circle.id)}
				/>
			))}
		</div>
	);
};

export default ProductImage;
