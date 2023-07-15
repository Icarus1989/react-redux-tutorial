// 24. Creiamo il Component CartContainer e poi velocemente un
//    CartItem

import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";

// 31. Importeremo quindi useDispatch e clearCart per poterlo
//    utilizzare

// import { clearCart } from "../features/cart/cartSlice";

// 56. Importiamo il reducer openModal
import { openModal } from "../features/modal/modalSlice";

const CartContainer = () => {
	const dispatch = useDispatch();
	// 32. Invochiamo useDispatch, va bene senza ulteriori arguments

	const { cartItems, total, amount } = useSelector((store) => store.cart);
	// 25. Otteniamo sempre le properties usando useSelector e
	//    dopo aver creato il Component passiamo a CartItem

	if (amount < 1) {
		return (
			<section className="cart">
				<header>
					<h2>your bag</h2>
					<h4 className="empty-cart">is currently empty</h4>
				</header>
			</section>
		);
	}
	return (
		<section className="cart">
			<header>
				<h2>your bag</h2>
			</header>
			<div>
				{cartItems.map((item) => {
					return <CartItem key={item.id} {...item} />;
				})}
			</div>
			<footer>
				<hr />
				<div className="cart-total">
					<h4>
						total <span>${total.toFixed(2)}</span>
					</h4>
				</div>
				{/* 33. Inseriamo come Evnet Listener una callback che 
        chiami dispatch con argument clearCart, la funzione che 
        vogliamo chiamare */}
				<button className="btn clear-btn" onClick={() => dispatch(openModal())}>
					clear cart
				</button>
				{/* 57. Eliminiamo clearCart ed invece usiamo il dispatch
        con openModal. Passiamo ora a Modal.jsx per gestire la
        conferma o meno del Modal. */}
			</footer>
		</section>
	);
};

export default CartContainer;
