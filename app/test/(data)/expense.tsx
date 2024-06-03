import { expenses } from '@/app/test/(data)/data';

function findExpenseGroupId(currPageExpenseId: any) {
    let groupId = ""
    for (let expense of expenses) {
        if (!expense) return
        if (expense.id === currPageExpenseId) {
            groupId = expense.groupId
            break
        }
    }

    return groupId
}

export { findExpenseGroupId }