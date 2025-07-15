import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  purposeLoan: "",
  message: "",
};

const transactionSlice = createSlice({
  name: "account",
  initialState: initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.message = "";
    },
    withdraw(state, action) {
      if (state.balance >= action.payload) state.balance -= action.payload;
      else {
        state.message = "withdraw amount is bigger than the balance";
      }
    },
    requestLoan(state, action) {
      if (state.loan > 0) {
        return;
      } else {
        state.balance += action.payload.amount;
        state.loan += action.payload.amount;
        state.purposeLoan = action.payload.purpose;
      }
    },
    payLoan(state) {
      if (state.balance >= state.loan) {
        state.balance -= state.loan;
        state.loan -= state.loan;
        state.purposeLoan = "";
      } else {
        return;
      }
    },
    closeAccount(state) {
      if (state.loan === 0 && state.balance === 0) {
        return initialState;
      } else {
        return;
      }
    },
  },
});

//exporting the actions
export const { deposit, withdraw, requestLoan, payLoan, closeAccount } =
  transactionSlice.actions;
//exporting the reducer
export default transactionSlice.reducer;
