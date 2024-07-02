// GET /api/user/{userId}
const user = {
  id: 'u0',
  lineId: 'linId0',
  name: 'user 0',
  picture: 'https://',
  groups: [
    {
      id: 'g0',
      name: "Let's Chill",
      picture: 'https://',
    },
  ],
};

// /api/group/{groupId} 目前改到第一組而已
const group = {
  id: 'g0',
  name: "Let's Chill",
  picture: 'https://',
  creatorId: 'u0',
  expenses: [
    {
      id: 0,
      name: 'Dinner',
      amount: 100,
      date: '2021-06-02T00:00:00.000Z',
      note: 'Some message',
      payerId: 'u0',
    },
  ],
  users: [
    {
      id: 'u11',
      name: 'user 11',
      picture: 'https://',
    },
    {
      id: 'u12',
      name: 'user 12',
      picture: 'https://',
    },
    {
      id: 'u0',
      name: 'user 0',
      picture: 'https://',
    },
  ],
};

// /api/group/{groupId}/expense/{expenseId}
const expense = {
  id: 1,
  name: 'Dinner',
  category: 'Food',
  amount: 100,
  date: '2021-06-02T00:00:00.000Z',
  note: 'Some message',
  groupId: 'g0',
  creatorId: 'u0',
  payerId: 'u0',
  createdAt: '2024-07-01T17:18:15.063Z',
  updatedAt: '2024-07-01T17:18:15.063Z',
  sharers: [
    { id: 'u0', amount: 20 },
    { id: 'u1', amount: 80 },
  ],
  historys: [
    {
      editedAt: '2024-07-01T17:18:15.063Z',
      editorId: 'u1',
    },
  ],
};
