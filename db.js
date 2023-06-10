const expenses = []
let currentLimit = 0

function pushExpense(expense) {
    expenses.push(expense)
}

function getExpenses() {
    return [...expenses]
}

function setLimit(limit) {
    currentLimit = limit
}

function getLimit() {
    return currentLimit
}

module.exports = {
    pushExpense,
    getExpenses,
    setLimit,
    getLimit,
}
