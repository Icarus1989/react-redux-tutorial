// 1. Lo store si può pensare pensare come l'intero State
//    per l'App

// 2. Configuriamo lo store con il metodo configureStore passando
//    a questo un object come argument

// 3. Tale object dovrà avere una property reducer dove all'interno
//    imposteremo le nostre feature

// 4. Importiamo ora lo store in index.jsx o main.jsx assime
//    al Provider da redux

import { configureStore } from "@reduxjs/toolkit";
// 15. Importiamo il reducer della Slice
import cartReducer from "./features/cart/cartSlice";
// 54. Importiamo modalReducer
import modalReducer from "./features/modal/modalSlice";

export const store = configureStore({
	reducer: {
		// 16. impostiamo una property a nostro piacimento con
		//    come value il cartReducer
		cart: cartReducer,
		// 17. Con questo controlleremo il pezzo di State basato sulla
		//    variabile initialState in cartSlice
		modal: modalReducer
		// 55. Aggiungiamo modal come nuovo reducer, che utilizzeremo
		//    in App.jsx e poi andremo ad utilizzare il reducer
		//    openModal in CartContainer.jsx
	}
});

// 18. Ora andiamo a vedere come accedere all'initialState da ogni
//    Component, partendo da components/NavBar.jsx
