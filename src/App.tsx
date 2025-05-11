import "./App.css";
import InputSection from "./components/InputSection";
import ProductImage from "./components/ProductImage";
import { CircleProvider } from "./context/CircleContext";

function App() {
	return (
		<CircleProvider>
			<div className="grid grid-cols-12">
				<ProductImage />
				<InputSection />
			</div>
		</CircleProvider>
	);
}

export default App;
