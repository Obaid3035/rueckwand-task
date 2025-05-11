import type React from "react";
import { type ReactNode, createContext, useState } from "react";
import type { ICircle } from "../type";
import { circleSize, maxCircle } from "../utils/constant";
import { getRandomColor, overLapCircle } from "../utils/helper";

export interface CircleContextType {
	circles: ICircle[];
	setCircles: React.Dispatch<React.SetStateAction<ICircle[]>>;
	addCircle: (containerElement: HTMLDivElement | null) => void;
}

export const CircleContext = createContext<CircleContextType | undefined>(
	undefined,
);

export const CircleProvider = ({ children }: { children: ReactNode }) => {
	const [circles, setCircles] = useState<ICircle[]>([
		{
			id: 1,
			x: 150,
			y: 100,
			color: getRandomColor(),
		},
	]);

	const findValidPosition = (containerElement: HTMLDivElement | null) => {
		if (!containerElement) return;

		const imageRect = containerElement.getBoundingClientRect();
		const maxAttempt = 50;

		for (let i = 0; i < maxAttempt; i++) {
			const newX = Math.random() * (imageRect.width - circleSize);
			const newY = Math.random() * (imageRect.height - circleSize);

			const newCircle = {
				id: circles.length + 1,
				x: newX,
				y: newY,
				color: getRandomColor(),
			};

			const hasOverlap = circles.some((circle) =>
				overLapCircle(circle, newCircle),
			);

			if (!hasOverlap) return newCircle;
		}
	};

	const addCircle = (containerElement: HTMLDivElement | null) => {
		if (circles.length >= maxCircle) {
			return;
		}

		const validPosition = findValidPosition(containerElement);

		if (validPosition) {
			setCircles([...circles, { ...validPosition }]);
		}
	};

	return (
		<CircleContext.Provider value={{ circles, setCircles, addCircle }}>
			{children}
		</CircleContext.Provider>
	);
};
