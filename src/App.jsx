import { useState, useEffect } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import CartContainer from "./components/CartContainer";
import { useSelector, useDispatch } from "react-redux";
import { calculateTotals, getCartItems } from "./features/cart/cartSlice";
// 69. Importiamo getCartItems

function App() {
	// 42. Usiamo l'Hook useSelector per poter usare cartItems
	const { cartItems, isLoading } = useSelector((store) => store.cart);
	// 71. Importiamo isLoading in modo che possa venire usato
	// 		dalla condizione impostata in precedenza

	// 51. importiamo isOpen dalla parte modal dello State.
	const { isOpen } = useSelector((store) => store.modal);

	// 43. Importiamo quindi useDispatch, creiamone un'istanza e
	//    poi una chiamata a dispatch con argument calculateTotals
	//    all'interno di un Effect. Useremo come dependency cartItems
	//    in modo che ad ogni suo cambiamento venga rieseguito l'Effect.
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(calculateTotals());
	}, [cartItems]);

	useEffect(() => {
		// 70. Eseguiamo il dispatch di getcartItems al primo render
		// 		del Component
		dispatch(getCartItems());
	}, []);

	if (isLoading) {
		return (
			<div className="loading">
				<h1>Loading...</h1>
			</div>
		);
	}
	return (
		<>
			<main>
				{/* 52. Usiamo isOpen per un conditional */}
				{isOpen && <Modal />}
				<Navbar />
				<CartContainer />
			</main>
		</>
	);
}

export default App;

// 44. Ora passeremo alla creazione di un Modal utilizzando anche una
//    nuova Slice e vedremo anche come accedere ai dati quando abbiamo
//    molteplici reducers nello Store.
//    Passiamo ora alla creazione di components/Modal

// 45. Una volta creato il Component, lo importeremo qui e andremo
//    a creare la nuova Slice features/modal/modalSlice.jsx

// 53. Per poter utilizzare la nuova modalSlice dobbiamo modificare anche
// lo Store in store.jsx
