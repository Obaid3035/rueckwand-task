import type React from "react";
import { type ReactNode, createContext, useState } from "react";
import type { ICircle } from "../type";
import { getRandomColor } from "../utils/helper";

export interface CircleContextType {
	circles: ICircle[];
	setCircles: React.Dispatch<React.SetStateAction<ICircle[]>>;
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

	return (
		<CircleContext.Provider value={{ circles, setCircles }}>
			{children}
		</CircleContext.Provider>
	);
};
