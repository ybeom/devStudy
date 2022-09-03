import React, { useState } from "react";

import ExpensesMap from "./ExpensesMap";
import ExpensesFilter from "./ExpensesFilter";
import Card from "../UI/Card";
import "./ExpenseItems.css";

const ExpenseItems = (props) => {
    const [filteredYear, setFilteredYear] = useState("ALL");
    const [filteredExpenses, setFilteredExpenses] = useState(props.expenses);

    const filterChangeHandler = (selectYear) => {
        setFilteredYear(selectYear);

        let expensesFilter = [];
        if (selectYear === "ALL") {
            expensesFilter = props.expenses;
        } else {
            props.expenses.filter((expense) => {
                if (expense.date.getFullYear().toString() === selectYear) {
                    expensesFilter = [...expensesFilter, expense];
                }
            });
        }
        setFilteredExpenses(expensesFilter);
    };
    return (
        <Card className="expenses">
            <ExpensesFilter selected={filteredYear} onFilterSelected={filterChangeHandler} />
            <ExpensesMap expenses={filteredExpenses} />
        </Card>
    );
};

export default ExpenseItems;
