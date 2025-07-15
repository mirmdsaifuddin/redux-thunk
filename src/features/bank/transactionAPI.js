import { deposit, withdraw } from "./transactionSlice";

export function currencyConvert(amount, fromCurrency, type) {
  return async function (dispatch) {
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=INR`
    );
    const data = await res.json();
    console.log(data.rates.INR);
    if (type === "DEPOSIT") {
      dispatch(deposit(data.rates.INR));
    } else if (type === "WITHDRAW") {
      dispatch(withdraw(data.rates.INR));
    }
  };
}
