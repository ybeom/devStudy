import React, { useState } from "react";

import ExpensesMap from "./ExpensesMap";
import ExpensesFilter from "./ExpensesFilter";
import Card from "../UI/Card";
import ExpensesChart from "./ExpensesChart";

import "./ExpenseItems.css";

const ExpenseItems = (props) => {
    const [filteredYear, setFilteredYear] = useState("ALL");

    const filterChangeHandler = (selectYear) => {
        setFilteredYear(selectYear);
    };

    const filteredExpenses = props.expenses.filter((expense) => {
        if (filteredYear !== "ALL") {
            return expense.date.getFullYear().toString() === filteredYear;
        } else {
            return true;
        }
    });

    return (
        <div>
            <Card className="expenses">
                <ExpensesFilter selected={filteredYear} onFilterSelected={filterChangeHandler} />
                <ExpensesChart expenses={filteredExpenses} />
                <ExpensesMap expenses={filteredExpenses} />;
            </Card>
        </div>
    );
};

export default ExpenseItems;
