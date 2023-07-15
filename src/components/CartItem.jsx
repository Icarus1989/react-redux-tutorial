// 26. Creiamo il Component destrutturando tutte le properties
//    dell'istanza con ...item
//    Passiamo poi ad aggiungere la funzionalità di clearCart nella
//    cartSlice

import React from "react";
import { ChevronDown, ChevronUp } from "../icons";
import { removeItem, increase, decrease } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";

const CartItem = ({ id, img, title, price, amount }) => {
	const dispatch = useDispatch();
	return (
		<article className="cart-item">
			<img src={img} alt={title} />
			<div>
				<h4>{title}</h4>
				<h4 className="item-price">${price}</h4>
				{/* 35. Dopo aver importato removeItem e dispatch andiamo a 
        usarla in un Evnet Listener onClick. Ricordarsi di CHIAMARLA
        --> dispatch(removeItem(id)) OK
        Non solo passarla a dispatch 
        --> dispatch(removeItem) */}
				<button className="remove-btn" onClick={() => dispatch(removeItem(id))}>
					remove
				</button>
			</div>
			<div>
				{/* 38. Usiamo le action increase e decrease */}
				<button
					className="amount-btn"
					onClick={() => dispatch(increase({ id }))}
				>
					<ChevronUp />
				</button>
				<p className="amount">{amount}</p>
				<button
					className="amount-btn"
					onClick={() => {
						// 39. Inseriamo un if per l'amount inferiore ad uno
						//    in modo che usi un dispatch con rmeoveItem(id)
						//    in caso di decrease. Passiamo ora al calcolo del
						//    total in cartSlice
						if (amount === 1) {
							dispatch(removeItem(id));
							return;
						}
						dispatch(decrease({ id }));
					}}
				>
					<ChevronDown />
				</button>
			</div>
		</article>
	);
};

export default CartItem;
