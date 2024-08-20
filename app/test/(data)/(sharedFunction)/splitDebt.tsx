import { filterExpense } from "@/app/test/(data)/(sharedFunction)/totalDebts";
import { ExtendedExpense } from "./types";

interface SplitExpenseResult {
    [userId: string]: {
        [expenseId: string]: number;
    };
}

function splitExpense(expenses: ExtendedExpense[]): SplitExpenseResult {
    let { totalDebts } = filterExpense(expenses)
    const splitDebt: SplitExpenseResult = {};

    const getMaxDebtorCreditor = (debts: { [userId: string]: number }) => {
        const creditors = Object.keys(debts).filter(userId => debts[userId] > 0);
        const debtors = Object.keys(debts).filter(userId => debts[userId] < 0);

        if (creditors.length === 0 || debtors.length === 0) {
            return { creditor: null, debtor: null };
        }

        const creditor = creditors.reduce((maxUserId, userId) => (debts[userId] > debts[maxUserId] ? userId : maxUserId), creditors[0]);
        const debtor = debtors.reduce((minUserId, userId) => (debts[userId] < debts[minUserId] ? userId : minUserId), debtors[0]);

        return { creditor, debtor };
    };

    while (Object.values(totalDebts).some(amount => Math.abs(amount) > 0.01)) {
        const { creditor, debtor } = getMaxDebtorCreditor(totalDebts);

        if (!creditor || !debtor) {
            break;
        }

        const debtAmount = Math.min(totalDebts[creditor], -totalDebts[debtor]);

        if (!splitDebt[creditor]) splitDebt[creditor] = {};
        if (!splitDebt[debtor]) splitDebt[debtor] = {};

        splitDebt[creditor][debtor] = (splitDebt[creditor][debtor] || 0) + debtAmount;
        splitDebt[debtor][creditor] = (splitDebt[debtor][creditor] || 0) - debtAmount;

        totalDebts[creditor] -= debtAmount;
        totalDebts[debtor] += debtAmount;
    }

    Object.keys(splitDebt).forEach(key => {
        if (!splitDebt[key] || Object.keys(splitDebt[key]).length === 0) {
            delete splitDebt[key];
        }
    });
    
    return splitDebt;
}

export { splitExpense }