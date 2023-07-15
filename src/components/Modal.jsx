import React from "react";

// 58. Importiamo quindi closeModal, useDispatch e clearCart
import { closeModal } from "../features/modal/modalSlice";
import { useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";

const Modal = () => {
	// 59. Invochiamo usaDispatch
	const dispatch = useDispatch();

	return (
		<aside className="modal-container">
			<div className="modal">
				<h4>Remove all items from your shopping cart?</h4>
				<div className="btn-container">
					<button
						type="button"
						className="btn confirm-btn"
						onClick={() => {
							dispatch(clearCart());
							dispatch(closeModal());
							// 60. Eseguiammo il dispatch con il clearCart e closeModal
							// 		in caso di tasto Confirm premuto
						}}
					>
						confirm
					</button>
					<button
						type="button"
						className="btn clear-btn"
						onClick={() => dispatch(closeModal())}
					>
						{/* 61. Eseguiammo il dispatch con closeModal in caso di tasto
						Cancel premuto */}
						cancel
					</button>
				</div>
			</div>
		</aside>
	);
};

export default Modal;

// 62. Ora andremo a vedere come utilizzare delle funzionalità
// 		asincrone con Redux. Passiamo a CartSlice.
