import { CartIcon } from "../icons";
// 19. Per accedere ai dati dell'initialState andiamo ad
//    importare l'Hook useSelector di Redux
import { useSelector } from "react-redux";

const Navbar = () => {
	// 20. Invochiamo quindi useSelector e passiamo come parametro
	//    una funzione che come parametro avrà l'intero Store,
	//    in pratica l'intero State dell'App, e accediamo a state.cart
	//    Da qui andiamo a destrutturare la property { amount }.

	const { amount } = useSelector((store) => store.cart);

	return (
		<nav>
			<div className="nav-center">
				<h3>redux toolkit</h3>
				<div className="nav-container">
					<CartIcon />
					<div className="amount-container">
						<p className="total-amount">{amount}</p>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;

// 21. Passiamo ora alla creazione di dai in locale e poi su
//    cartSlice
