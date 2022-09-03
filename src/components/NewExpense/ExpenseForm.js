import React, { useState } from "react";
import "./ExpenseForm.css";

const ExpenseForm = (props) => {
    const [enteredTitle, setEnteredTitle] = useState("");
    const [enteredAmount, setEnteredAmount] = useState("");
    const [enteredDate, setEnteredDate] = useState("");

    // const [userInput, setUserInput] = useState({
    //     enteredTitle: "",
    //     enteredAmount: "",
    //     enteredDate: "",
    // });
    const titleChangeHandler = (e) => {
        setEnteredTitle(e.target.value);
        // setUserInput((prev) => {
        //     return { ...prev, enteredTitle: e.target.value };
        // });
    };
    const amountChangeHandler = (e) => {
        setEnteredAmount(e.target.value);

        // setUserInput((prev) => {
        //     return { ...prev, enteredAmount: e.target.value };
        // });
    };
    const dateChangeHandler = (e) => {
        // console.log(e.target.value);
        setEnteredDate(e.target.value);

        // setUserInput((prev) => {
        //     return { ...prev, enteredDate: e.target.value };
        // });
    };
    const submitHandler = (e) => {
        e.preventDefault();
        const expenseData = {
            title: enteredTitle,
            amount: enteredAmount,
            date: new Date(enteredDate),
        };
        props.onSavedExpenseData(expenseData);

        setEnteredTitle("");
        setEnteredAmount("");
        setEnteredDate("");
    };
    return (
        <form onSubmit={submitHandler}>
            <div className="new-expense__controls">
                <div className="new-expense__control">
                    <label>Title</label>
                    <input type="text" vlaue={enteredTitle} onChange={titleChangeHandler} />
                </div>
                <div className="new-expense__control">
                    <label>Amount</label>
                    <input type="number" value={enteredAmount} min="0.01" step="0.01" onChange={amountChangeHandler} />
                </div>
                <div className="new-expense__control">
                    <label>Date</label>
                    <input type="date" value={enteredDate} min="2019-01-01" max="2022-12-31" onChange={dateChangeHandler} />
                </div>
            </div>
            <div className="new-expense__actions">
                <button type="button" onClick={props.onCancelClick}>
                    Cancel
                </button>
                <button type="submit">Add Expense</button>
            </div>
        </form>
    );
};

export default ExpenseForm;
