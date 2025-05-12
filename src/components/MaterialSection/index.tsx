import { useState } from "react";
import { useCircle } from "../../hooks/useCircle";
import { containerHeight, containerWidth } from "../../utils/constant";
import Material from "./Material";

const materials = [
	{
		id: 1,
		title: "ALU-CLASSIC MAT",
		image: "/material-1.jpg",
		description: [
			"Premium matte finish",
			"Durable aluminum base",
			"Scratch and fingerprint resistant",
		],
	},
	{
		id: 2,
		title: "ALU-GLOSS FINISH",
		image: "/material-2.jpg",
		description: [
			"High-gloss polish",
			"Elegant reflections",
			"Seamless integration",
		],
	},
	{
		id: 3,
		title: "CARBON-FLEX MAT",
		image: "/material-1.jpg",
		description: [
			"Flexible carbon structure",
			"Ultra-lightweight build",
			"Resilient under pressure",
		],
	},
	{
		id: 4,
		title: "GLASS-FROSTED PANEL",
		image: "/material-2.jpg",
		description: [
			"Smooth frosted texture",
			"Elegant semi-transparency",
			"Modern look & feel",
		],
	},
	{
		id: 5,
		title: "TITANIUM EDGE COAT",
		image: "/material-1.jpg",
		description: [
			"Titanium reinforced corners",
			"Scratch-resistant edges",
			"Premium brushed design",
		],
	},
];

const MaterialSection = () => {
	const [selectedId, setSelectedId] = useState<number | null>(null);

	const { circles } = useCircle();

	const handleSubmit = () => {
		const selectedMaterial = materials.find((mat) => mat.id === selectedId);

		const circlesWithPercentage = circles.map((circle) => {
			const xPercent = (circle.x / containerWidth) * 100;
			const yPercent = (circle.y / containerHeight) * 100;

			return {
				...circle,
				xPercent: `${xPercent.toFixed(2)}%`,
				yPercent: `${yPercent.toFixed(2)}%`,
			};
		});

		const submitResult = {
			selectedMaterial: selectedMaterial || "No material selected",
			circles: circlesWithPercentage,
		};
		console.log("Submission Result:", submitResult);
	};

	return (
		<div className="space-y-4">
			{materials.map((mat) => (
				<Material
					key={mat.id}
					data={mat}
					isSelected={selectedId === mat.id}
					onSelect={() =>
						setSelectedId((prev) => (prev === mat.id ? null : mat.id))
					}
				/>
			))}
			<div className="text-right">
				<button className="btn-primary" onClick={handleSubmit}>
					Submit
				</button>
			</div>
		</div>
	);
};

export default MaterialSection;
