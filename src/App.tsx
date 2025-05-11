import "./App.css";
import InputSection from "./components/InputSection";
import ProductImage from "./components/ProductImage";
import { CircleProvider } from "./context/CircleContext";

function App() {
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<CircleProvider>
				<div className="@container">
					<div className="grid grid-cols-1 @lg:grid-cols-12 gap-6 @lg:gap-10">
						<div className="@lg:col-span-8">
							<ProductImage />
						</div>
						<div className="@lg:col-span-4">
							<InputSection />
						</div>
					</div>
				</div>
			</CircleProvider>
		</div>
	);
}

export default App;
