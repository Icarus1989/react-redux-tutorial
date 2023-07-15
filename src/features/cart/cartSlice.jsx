// 8. Una Slice non é altro una feature dell'App. Una feature può
//    essere in questo caso il cart, un'altra può essere la
//    comparsa del Modal in caso di button clear cart premuto ecc.

// 9. E' convenzione in redux creare una cartella feature con al suo
//    interno una cartella per la feature, per esempio cart, con
//    all'interno il file della Slice.

// 10. Importiamo createSlice
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// 73. Installiamo ed importiamo axios
import axios from "axios";
// 12. Creiamo un object initialState quindi:

// const initialState = {
// 	cartItems: [],
// 	amount: 0,
// 	total: 0,
// 	isLoading: true
// };

// 22. Importiamo i dati locali e passiamoli alla property cartItems
//    dell'initialState

import cartItems from "../../cartItems";

const url = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
	cartItems: [],
	amount: 4,
	total: 0,
	isLoading: true
};

// 63. Utilizzeremo l'url 'https://course-api.com/react-useReducer-cart-project';
// 		Questo serve per accedere all'API Course-API che restituisce
// 		essenzialmente gli stessi dati usati in locale.
// 		Non si possono effettuare richieste all'API nei reducer correnti.
// 		Per fare questo quindi importeremo un'altra library,
// 		createAsyncThunk.
// 		Invocheremo questa funzione e ne esporteremo il risultato.

// 64. Creiamo quindi una funzione che esporteremo immediatamente, come
// 		le actions:

// 75. Ripartendo da questo ora creiamo una callback asincrona
// export const getCartItems = createAsyncThunk(
// 	"cart/getCartItems",
// 	() => {}
// );

export const getCartItems = createAsyncThunk(
	"cart/getCartItems",
	async (name, thunkAPI) => {
		try {
			// 76. Partiamo da una struttua try...catch e da una response
			// 		ottenuta da axios.
			const res = await axios(url);
			console.log(thunkAPI);
			console.log(thunkAPI.getState());

			// thunkAPI.dispatch(openModal());

			// 77. Otteniamo l'error data non-serialized come prima, questo
			// però solo perché con axios i dati risidono in response.data.
			return res.data;
			// 78. Ora i dati verranno visualizzati.

			// 79. La funzione callback secondo parametro di createAsyncThunk
			// accetta anche un parametro che é quello che possiamo passare
			// alla funzionalità, in questo caso per esempio getCartItems,
			// e qui passeremo name come esempio.

			// 80. Passando sopra il parametro thunkAPI
			// createAsyncThunk("cart/getCartItems", async (thunkAPI) => {...
			// si potranno ottenere ancora più options, come per esempio:
			// getState (lo State dell'intera App), dispatch (con il quale
			// possiamo eseguire il dispatch del Modal per esempio anche se
			// si trova in un'altra Slice),
			// requestId, signal, fulfilledWithValue.
		} catch (error) {
			// 81. Grazie alla ThunkAPI possiamo passare una risposta in
			// caso di error con:
			// return thunkAPI.rejectWithValue(error.response);
			return thunkAPI.rejectWithValue("Something went wrong.");
		}
	}
);

// export const getCartItems = createAsyncThunk("cart/getCartItems", () => {
// 	return fetch(url)
// 		.then((res) => res.json)
// 		.catch((error) => console.log(error));
// });

// 65. Questa funzione prenderà due parametri: la action type con il
// 		name della nostra action, ed una callback che ha bisogno di
// 		restituire una promise.

// 66. Questa restituira viene definita una LIFECYCLE ACTION.
// 		Proprio per questo nella nostra Slice dovremo andare ad impostare
// 		dei reducers abbinati ad ogni stato possibile del ciclo di vita:
// 		Pending, Fulfilled e Rejected.
// 		Dichiareremo questi nella cartSlice con una property extraReducers.

// 11. Invochiamo tale metodo per creare la Slice passando un
//    name e un initialState

// const cartSlice = createSlice({
// 	name: "cart",
// 	initialState
// });

// 27. Creiamo la funzionalità di clearCart. Per farlo sarà molto
//    più semplice rispetto ad un normale reducer.
//    Basterà aggiungere la property reducers nell'object di createSlice
//    con come value un object con una property clearCart dove andremo
//    a scrivere la funzionalità effettiva

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		clearCart: (state) => {
			// il secondo parametro passabile qui oltre a State é action
			// dal quale si può ricavare payload
			state.cartItems = [];
			// 28. possiamo mutare lo State grazie ad Immer o optare per
			//    restare canonici
			// return { ...state, cartItems: [] };
		},
		// 34. Creiamo ora il reducer removeItem ed esportiamola, per
		//    usarla in CartItem
		removeItem: (state, action) => {
			const itemId = action.payload;
			state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
		},

		// 36. Ora creiamo i reducer increase e decrease, poi esportiamole
		//    ed usiamole in cartItem
		increase: (state, { payload }) => {
			const cartItem = state.cartItems.find((item) => item.id === payload.id);
			cartItem.amount = cartItem.amount + 1;
		},
		decrease: (state, { payload }) => {
			const cartItem = state.cartItems.find((item) => item.id === payload.id);
			cartItem.amount = cartItem.amount - 1;
		},
		// 40. Per calcolare il total andremo ad eseguire un forEach
		//    sfruttando delle variabili per i totali.
		//    Esportiamo poi anche questo reducer.
		calculateTotals: (state) => {
			let amount = 0;
			let total = 0;
			state.cartItems.forEach((item) => {
				amount += item.amount;
				total += item.amount * item.price;
			});
			state.amount = amount;
			state.total = total;
		}
		// 41. Per utilizzare questa action ci sposteremo in App.jsx
	},
	// extraReducers: {
	// 	[getCartItems.pending]: (state) => {
	// 		state.isLoading = true;
	// 	},
	// 	[getCartItems.fulfilled]: (state, action) => {
	// 		console.log(action);
	// 		state.isLOading = false;
	// 		state.cartItem = action.payload;
	// 	},
	// 	[getCartItems.rejected]: (state) => {
	// 		state.isLOading = false;
	// 	}
	// }
	// 67. [getCartItems.pending],  [getCartItems.fulfilled] e [getCartItems.rejected]
	// 		sono forniti da Redux. Queste sono LifeCycle Actions.

	// 68. Spostiamoci ora in App.jsx dove importeremo getCartItems

	// 72. NOTA: nell'aggiornamento più recente di Redux occorre usare
	// la builder notation. Aggiungiamo ora axios per vedere le options
	// di createAsynkThunk.

	extraReducers: (builder) => {
		builder
			.addCase(getCartItems.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getCartItems.fulfilled, (state, action) => {
				// console.log(action);
				state.isLoading = false;
				state.cartItems = action.payload;
			})
			.addCase(getCartItems.rejected, (state) => {
				state.isLoading = false;
			});
	}
});

// 13. Esportiamo cartSlice.reducer

// export default cartSlice.reducer;

// 14. Questa funzione controllerà lo State nella nostra Slice.
//    Andiamo quindi ad importarlo in store.jsx

// 23. Creiamo ora due nuovi Components:
//    CartContainer e CartItem e muoviamoci nel primo.

// 29. Esportiamo la Action appena creata. Per action si definisce
//    l'azione descritta nella property reducers del createSlice.

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
	cartSlice.actions;
export default cartSlice.reducer;

// 30. Passiamo ora a CartContainer dove useremo un ulteriore Hook
//    useDispatch per utilizzare questa Action
