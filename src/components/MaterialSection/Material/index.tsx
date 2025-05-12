import { useEffect, useRef, useState } from "react";

interface MaterialProps {
	data: {
		id: number;
		title: string;
		image: string;
		description: string[];
	};
	isSelected: boolean;
	onSelect: () => void;
}

const Material = ({ data, isSelected, onSelect }: MaterialProps) => {
	const { title, image, description } = data;
	const [height, setHeight] = useState(0);
	const contentRef = useRef<HTMLDivElement>(null);
	const [shouldRender, setShouldRender] = useState(isSelected);

	useEffect(() => {
		if (!contentRef.current) return;

		if (isSelected) {
			setHeight(contentRef.current.scrollHeight);
		} else {
			setHeight(0);
		}
	}, [isSelected]);

	return (
		<div
			onClick={onSelect}
			className={`card p-4 ${
				isSelected ? "border-apple-blue" : "border-gray-200"
			} shadow-sm cursor-pointer bg-white`}
		>
			<div className="flex items-start gap-4">
				<div
					className={`transition-all duration-300 ease-in-out overflow-hidden rounded-apple
            ${
							isSelected
								? "w-24 h-24 opacity-100 scale-100"
								: "w-0 h-0 opacity-0 scale-95"
						}`}
				>
					{(isSelected || shouldRender) && (
						<img
							src={image}
							alt={title}
							width={96}
							height={96}
							className="object-cover w-full h-full"
						/>
					)}
				</div>

				<div className="space-y-1 text-start flex-grow">
					<h2 className="text-base font-semibold text-apple-gray-800">
						{title}
					</h2>

					<div
						style={{ height: `${height}px` }}
						className={
							"overflow-hidden transition-all duration-300 ease-in-out"
						}
					>
						<div ref={contentRef}>
							{(isSelected || shouldRender) && (
								<div
									className={`transition-opacity duration-300 ${
										isSelected ? "opacity-100" : "opacity-0"
									}`}
								>
									{description.map((line, i) => (
										<p key={i} className="text-sm text-gray-500 mb-1">
											{line}
										</p>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Material;
