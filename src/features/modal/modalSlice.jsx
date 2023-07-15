import { createSlice } from "@reduxjs/toolkit";
// 46. importiamo createSlice

// 47. Creiamo un nuovo initialState
const initialState = {
	isOpen: false
};

// 48. Creiamo quindi la nuova Slice dando al metodo createSlice
//    un object con properties name, initialState e reducers.
//    All'interno di reducers creiamo due reducer openModal e
//    closeModal.

const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		openModal: (state, action) => {
			state.isOpen = true;
		},
		closeModal: (state, action) => {
			state.isOpen = false;
		}
	}
});

// 49. Esportiamo i due reducer e modalSlice.reducer

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;

// 50. Così facendo avremo accesso a questa parte di State ed ai
//    reducers in tutta l'App. Partiamo da App.jsx.
