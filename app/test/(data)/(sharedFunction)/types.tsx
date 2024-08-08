//user type
export interface User {
    id: string;
    lineId: string;
    name: string;
    picture: string;
    groups: UserGroup[];
}

export interface UserGroup {
    id: string;
    name: string;
    picture:
    | 'groupIcon01'
    | 'groupIcon02'
    | 'groupIcon03'
    | 'groupIcon04'
    | 'groupIcon05'
    | 'groupIcon06'
    | 'groupIcon07'
    | 'groupIcon08'
    | 'groupIcon09'
    | 'groupIcon10'
    | 'groupIcon11'
    | 'groupIcon12'
    | 'groupIcon13'
    | 'groupIcon14'
    | 'groupIcon15';
}

//group type
export interface Group {
    id?: string;
    name: string;
    picture:
    | 'groupIcon01'
    | 'groupIcon02'
    | 'groupIcon03'
    | 'groupIcon04'
    | 'groupIcon05'
    | 'groupIcon06'
    | 'groupIcon07'
    | 'groupIcon08'
    | 'groupIcon09'
    | 'groupIcon10'
    | 'groupIcon11'
    | 'groupIcon12'
    | 'groupIcon13'
    | 'groupIcon14'
    | 'groupIcon15';
    creatorId?: string;
    expenses?: Expense[];
    users: GroupUser[];
}

export interface GroupUser {
    id: string;
    name: string;
    picture: string;
    adoptable: boolean;
}

//expense type
export interface Debt {
    [expenseName: string]: number;
}

export interface DebtWithTotalDebt extends Debt {
    totalDebt: number;
}

export interface Debts {
    [userId: string]: DebtWithTotalDebt | Debt;
}

export interface TotalDebts {
    [userId: string]: number;
}

export interface Sharer {
    id: string;
    amount: number;
}

export interface Expense {
    id: string;
    name: string;
    amount: number;
    date: string;
    category:
    | 'food'
    | 'drink'
    | 'transport'
    | 'stay'
    | 'shopping'
    | 'entertainment'
    | 'other';
    payerId: string;
    sharers: Sharer[];
    note: string;
}

export interface ExtendedExpense extends Expense {
    expenseDebt?: string;
}

export interface SettingExpense {
    id: string;
    name: undefined;
    category: undefined;
    amount: number;
    date: undefined;
    note: undefined;
    payerId: string;
    sharers: {
        id: string;
        amount: number;
    }[];
};

export interface AddingExpense {
    name: string;
    category: string;
    amount: number;
    date: string;
    note: string;
    payerId: string;
    sharers: {
        id: string;
        amount: number;
    }[];
};