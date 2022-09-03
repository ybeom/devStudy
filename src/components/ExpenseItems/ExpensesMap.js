import ExpenseItem from "./ExpenseItem";

const ExpensesMap = (props) => {
    let expenses = props.expenses.map((expense) => <ExpenseItem key={expense.id} date={expense.date} title={expense.title} amount={expense.amount} />);
    return <div>{expenses}</div>;
};

export default ExpensesMap;
