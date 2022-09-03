import React, { useState } from "react";

import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";

const NewExpense = (props) => {
    const [formOpenBtnClicked, setFormOpenBtnClicked] = useState(false);
    const saveExpenseDataHandler = (enteredExpenseData) => {
        const expenseData = {
            ...enteredExpenseData,
            id: Math.random().toString(),
        };
        props.onAddExpense(expenseData);
    };
    const formOpenBtnClickedHandler = () => {
        setFormOpenBtnClicked(!formOpenBtnClicked);
    };

    let renderingContent = <button onClick={formOpenBtnClickedHandler}>Add New Expense</button>;

    if (formOpenBtnClicked === true) {
        renderingContent = <ExpenseForm onSavedExpenseData={saveExpenseDataHandler} onCancelClick={formOpenBtnClickedHandler} />;
    } else {
        <button onClick={formOpenBtnClickedHandler}>Add New Expense</button>;
    }
    return <div className="new-expense">{renderingContent}</div>;
};

export default NewExpense;
