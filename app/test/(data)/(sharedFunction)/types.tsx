
interface User {
    id: string;
    name: string;
    picture: string;
}

//debt type
interface Debt {
    [expenseId: string]: number;
};

//expense type
interface Sharer {
    id: string;
    amount: string | number;
}

interface Expense {
    id: string;
    name: string;
    amount: string | number;
    date: string;
    category: string;
    payerId: string;
    sharers: Sharer[];
    note: string;
}

interface Group {

}