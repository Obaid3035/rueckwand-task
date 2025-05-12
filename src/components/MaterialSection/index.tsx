import { useState } from "react";
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
		</div>
	);
};

export default MaterialSection;
