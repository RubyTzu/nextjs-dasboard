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

const user2 = {
  "id": "u1",
  "lineId": "linIdu1", //++
  "name": "a",
  "picture": "https://cdn2.thecatapi.com/images/a4v.jpg",
  "groups": [
      {
          "id": "g1",
          "name": "5月聚餐",
          "picture": "other"
      },
      {
          "id": "g2",
          "name": "2024 Japan",
          "picture": "travel"
      },
      {
          "id": "g3",
          "name": "fruits and drinks",
          "picture": "other"
      },
      {
          "id": "g4",
          "name": "新年新希望",
          "picture": "health"
      },
      {
          "id": "g5",
          "name": "新年新希望123",
          "picture": "health"
      },
      {
          "id": "g6",
          "name": "新年新希望456",
          "picture": "health"
      },
      {
          "id": "g7",
          "name": "group Other 2",
          "picture": "other"
      },
      {
          "id": "g9",
          "name": "group Travel 3",
          "picture": "travel"
      },
      {
          "id": "g11",
          "name": "group Other 3",
          "picture": "other"
      }
  ]
}

// /api/group/{groupId}
const group = {
  id: 'g0',
  name: "Let's Chill",
  picture: 'https://',
  creatorId: "u1",
  expenses: [
      {
          id: 0,
          name: 'Dinner',
          amount: 100,
          date: '2021-06-02T00:00:00.000Z',
          category: "food",
          note: 'Some message',
          payerId: 'u0',
          sharers: [
              {
                  id: "u1",
                  amount: 105
              }
          ]
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

const group2 = {
  "id": "g1",
  "name": "5月聚餐", //++
  "picture": "other", //++
  "creatorId": "u1", //++
  "expenses": [ //==
      {
          "id": "e1",
          "name": "燒鳥肌肉串",
          "amount": 210,
          "date": "2024-05-28T00:00:00.000Z",//==
          "category": "food",
          "payerId": "u1",
          "sharers": [
              {
                  "id": "u1",
                  "amount": 105
              },
              {
                  "id": "u2",
                  "amount": 105
              }
          ],
          "note": "",
          "createBy": "u1",//--
          "createAt": "2024/5/28",//--
          "updateBy": "u1",//--
          "updateAt": "2024/5/28"//--
      }
  ],
  "users": [
      {
          "id": "u1",
          "name": "a",
          "picture": "https://cdn2.thecatapi.com/images/a4v.jpg"
      },
      {
          "id": "u2",
          "name": "b",
          "picture": "https://images.dog.ceo/breeds/spaniel-welsh/n02102177_803.jpg"
      },
      {
          "id": "u3",
          "name": "c",
          "picture": "https://cdn2.thecatapi.com/images/O7FnoegHR.jpg"
      },
      {
          "id": "u4",
          "name": "d",
          "picture": "https://images.dog.ceo/breeds/terrier-sealyham/n02095889_1044.jpg"
      }
  ]
}

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

const expense2 = {
  "id": "e1",
  "groupId": "g3", //++
  "name": "燒鳥肌肉串",
  "amount": 210,
  "date": "2024-06-04T17:18:15.063Z", //==
  "category": "food",
  "creatorId": "u1", //++
  "payerId": "u1",
  "sharers": [
      {
          "id": "u1",
          "amount": 105
      },
      {
          "id": "u2",
          "amount": 105
      }
  ],
  "note": "",
  "createBy": "u1", //--
  "createAt": "2024-06-04T17:18:15.063Z", //==
  "updateBy": "u1", //--
  "updateAt": "2024-06-04T17:18:15.063Z", //==
  "historys": [
      {
          "editedAt": "2024-06-04T17:18:15.063Z",
          "editorId": "u1"
      }
  ] //++
}

//
const expenseConsole = {
  "id": "e1",
  "name": "燒鳥肌肉串",
  "amount": 210,
  "date": "2024/5/28",
  "category": "food",
  "payerId": "u1",
  "sharers": [
      {
          "id": "u1",
          "amount": 105
      },
      {
          "id": "u2",
          "amount": 105
      }
  ],
  "note": "",
  "createBy": "u1",
  "createAt": "2024/5/28",
  "updateBy": "u1",
  "updateAt": "2024/5/28"
}