import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// 5. import store e Provider
import { store } from "./store.jsx";
import { Provider } from "react-redux";
// 6. proprio come la Context API avvolgiamo l'intera App nel
//    nel Provider passando a questo come property store lo store
//    stesso
// 7. Passiamo ora alla creazione della prima Slice in
//    features/cart/cartSlice.jsx

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
