import React, { useState } from "react";

import ExpensesMap from "./ExpensesMap";
import ExpensesFilter from "./ExpensesFilter";
import Card from "../UI/Card";
import "./ExpenseItems.css";

const ExpenseItems = (props) => {
    const [filteredYear, setFilteredYear] = useState("ALL");
    // const [filteredExpenses, setFilteredExpenses] = useState(props.expenses);

    const filterChangeHandler = (selectYear) => {
        setFilteredYear(selectYear);

        // let expensesFilter = [];
        // if (selectYear === "ALL") {
        //     expensesFilter = props.expenses;
        // } else {
        //     props.expenses.filter((expense) => {
        //         if (expense.date.getFullYear().toString() === selectYear) {
        //             expensesFilter = [...expensesFilter, expense];
        //         }
        //     });
        // }
        // setFilteredExpenses(expensesFilter);
    };

    const filteredExpenses = props.expenses.filter((expense) => {
        if (filteredYear !== "ALL") {
            return expense.date.getFullYear().toString() === filteredYear;
        } else {
            return true;
        }
    });

    let expensesItemsContent = <p>No Expenses Found.</p>;
    if (filteredExpenses.length > 0) {
        expensesItemsContent = <ExpensesMap expenses={filteredExpenses} />;
    }

    return (
        <Card className="expenses">
            <ExpensesFilter selected={filteredYear} onFilterSelected={filterChangeHandler} />
            {expensesItemsContent}
        </Card>
    );
};

export default ExpenseItems;
