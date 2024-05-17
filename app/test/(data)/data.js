//groups
const groups = [
    {
        groupId: "g1",
        groupType: "travel",
        name: "group 1",
        members: [],
        url: "https://shareGroup1",
    },
    {
        groupId: "g2",
        groupType: "travel",
        name: "group 2",
        members: [],
        url: "https://shareGroup2",
    }
]

const group = {
    groupId: "g1",
    groupType: "travel",
    name: "group 1",
    members: [],
    url: "https://shareGroup1",
}

const exampleGroup = ['name', 'group_type', 'country_code', 'users']

//expenses
const expenses = [
    {
        groupId: "g1",
        expenseId: "e1",
        expenseType: "food",
        cost: 1000,
        date: '2024/5/15',
        event: "expense 1",
        payer: {
            userId: "u1",
            displayName: "a"
        },
        sharers: [
            {
                userId: "u1",
                displayName: "a"
            },
            {
                userId: "u2",
                displayName: "b"
            },
            {
                userId: "u3",
                displayName: "c"
            },
        ],
    },
    {
        groupId: "g1",
        expenseId: "e2",
        expenseType: "food",
        cost: 2000,
        date: '2024/5/15',
        event: "expense 2",
        payer: {
            userId: "u1",
            displayName: "a"
        },
        sharers: [
            {
                userId: "u1",
                displayName: "a"
            },
            {
                userId: "u2",
                displayName: "b"
            },
            {
                userId: "u3",
                displayName: "c"
            },
        ],
    }
]

const expense = {
    groupId: "g1",
    expenseId: "e1",
    expenseType: "food",
    cost: 1000,
    date: '2024/5/15',
    event: "expense 1",
    payer: {
        userId: "u1",
        displayName: "a"
    },
    sharers: [
        {
            userId: "u1",
            displayName: "a"
        },
        {
            userId: "u2",
            displayName: "b"
        },
        {
            userId: "u3",
            displayName: "c"
        },
    ],
}

const exampleExpense = {
    description,
    group_id,
    payment: false,
    cost: amount,
    date,
    users: [
        {
            user_id: from,
            paid_share: amount,
        },
        {
            user_id: to,
            owed_share: amount,
        },
    ],
}

//member
const members = [
    {
        userId: "u1",
        displayName: "a",
        isAdmin: true,
    },
    {
        userId: "u2",
        displayName: "b",
        isAdmin: false,
    },
    {
        userId: "u3",
        displayName: "c",
        isAdmin: false,
    },
    {
        userId: "u4",
        displayName: "d",
        isAdmin: false,
    }
]

const member = {
    userId: "u1",
    displayName: "a",
    isAdmin: true,
}

//Person Info
const personInfo = {
    userId: "u1",
    displayName: "a",
    pictureUrl: "https://groupImage1",
    groups: [],
}

const exampleUser = [
    'first_name',
    'last_name',
    'email',
    'password',
    'locale',
    'date_format',
    'default_currency',
    'default_group_id',
    'notification_settings',
]