import { filterExpense } from "@/app/test/(data)/(sharedFunction)/totalDebts";

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

interface SplitExpenseResult {
    [userId: string]: {
        [expenseId: string]: number;
    };
}

function splitExpense(expenses: Expense[]): SplitExpenseResult {
    let { totalDebts } = filterExpense(expenses)
    const splitDebt: SplitExpenseResult = {};

    // Helper function to find the user with maximum positive debt and maximum negative debt
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

    // Process until all debts are settled
    while (Object.values(totalDebts).some(amount => Math.abs(amount) > 0.01)) {
        const { creditor, debtor } = getMaxDebtorCreditor(totalDebts);

        if (!creditor || !debtor) {
            break; // Exit loop if there's no valid creditor or debtor
        }

        // Compute the amount to settle
        const debtAmount = Math.min(totalDebts[creditor], -totalDebts[debtor]);

        // Initialize splitDebt for creditor and debtor if not already done
        if (!splitDebt[creditor]) splitDebt[creditor] = {};
        if (!splitDebt[debtor]) splitDebt[debtor] = {};

        // Record the debt
        splitDebt[creditor][debtor] = (splitDebt[creditor][debtor] || 0) + debtAmount;
        splitDebt[debtor][creditor] = (splitDebt[debtor][creditor] || 0) - debtAmount;

        // Update the total debts
        totalDebts[creditor] -= debtAmount;
        totalDebts[debtor] += debtAmount;
    }

    // Remove entries with undefined keys
    Object.keys(splitDebt).forEach(key => {
        if (!splitDebt[key] || Object.keys(splitDebt[key]).length === 0) {
            delete splitDebt[key];
        }
    });
    
    return splitDebt;
}


// function splitExpense(expenses: Expense[]): SplitExpenseResult {
//     let { totalDebts } = filterExpense(expenses)

//     //split debt initial
//     let newTotalDebts: any = { ...totalDebts }
//     let splitDebt: any = {}
//     let bigCreditor: any = Object.keys(newTotalDebts)[0] //最大債務主
//     let bigDebtor: any = Object.keys(newTotalDebts)[0] //最大債務人

//     //count current debt amount
//     const reducer = (acc: any, cur: any) => {
//         return acc + Math.abs(cur)
//     }

//     //While there are still debt amount, it keep chasing the debt
//     while (Object.values(newTotalDebts).reduce(reducer, 0) as any > 0) {
//         for (const p of Object.keys(newTotalDebts)) {
//             if (newTotalDebts[p] > newTotalDebts[bigCreditor]) {
//                 bigCreditor = p
//             } else if (newTotalDebts[p] < newTotalDebts[bigDebtor]) {
//                 bigDebtor = p
//             }
//         }
//         // console.log('')
//         // console.log('--- bigCreditor ---')
//         // console.log(bigCreditor)
//         // console.log('--- bigCreditor end --- ')
//         // console.log('')
//         // console.log('--- bigDebtor ---')
//         // console.log(bigDebtor)
//         // console.log('--- bigDebtor end --- ')
//         // console.log('')
//         //Current maximum debt amount
//         const debtAmount = Math.min(newTotalDebts[bigCreditor], -newTotalDebts[bigDebtor])

//         if (Object.keys(splitDebt).includes(bigCreditor)) {
//             splitDebt[bigCreditor][bigDebtor] = debtAmount
//         } else {
//             splitDebt[bigCreditor] = {}
//             splitDebt[bigCreditor][bigDebtor] = debtAmount
//         }

//         if (Object.keys(splitDebt).includes(bigDebtor)) {
//             splitDebt[bigDebtor][bigCreditor] = -debtAmount
//         } else {
//             splitDebt[bigDebtor] = {}
//             splitDebt[bigDebtor][bigCreditor] = -debtAmount
//         }

//         newTotalDebts[bigCreditor] -= debtAmount
//         newTotalDebts[bigDebtor] += debtAmount
//     }

//     return splitDebt
// }

export { splitExpense }