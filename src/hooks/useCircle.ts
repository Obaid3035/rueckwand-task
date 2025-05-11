import { useContext } from "react";
import {
	CircleContext,
	type CircleContextType,
} from "../context/CircleContext";

export const useCircle = (): CircleContextType => {
	const context = useContext(CircleContext);
	if (!context) {
		throw new Error("useCircle must be used within a CircleProvider");
	}
	return context;
};
