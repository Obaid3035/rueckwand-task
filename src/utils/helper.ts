import type { ICircle } from "../type";
import { circleSize } from "./constant";

export const getRandomColor = () => {
	const letters = "0123456789ABCDEF";
	let color = "#";

	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}

	return color;
};

export const overLapCircle = (circle1: ICircle, circle2: ICircle) => {
	const c1x = circle1.x + circleSize / 2;
	const c2x = circle2.x + circleSize / 2;
	const c1y = circle1.y + circleSize / 2;
	const c2y = circle2.y + circleSize / 2;

	const distance = Math.sqrt((c2x - c1x) ** 2 + (c2y - c1y) ** 2);

	return distance < circleSize;
};
