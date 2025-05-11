import "./App.css";
import InputSection from "./components/InputSection";
import ProductImage from "./components/ProductImage";

function App() {

	return (
		<div className="grid grid-cols-12">
			<ProductImage />
			<InputSection/>
		</div>
	)
}

export default App;
