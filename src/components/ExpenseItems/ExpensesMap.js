import ExpenseItem from "./ExpenseItem";
import "./ExpensesMap.css";

const ExpensesMap = (props) => {
    let expensesItemsContent = <h2 className="expenses-list__fallback">No Expenses Found.</h2>;
    if (props.expenses.length > 0) {
        expensesItemsContent = props.expenses.map((expense) => <ExpenseItem key={expense.id} date={expense.date} title={expense.title} amount={expense.amount} />);
    }

    return <ul className="expenses-list">{expensesItemsContent}</ul>;
};

export default ExpensesMap;
