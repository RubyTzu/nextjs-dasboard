// {
// groupId,
// groupType,
// name,
// membersIds,
// url,
//   }: {
// groupId: string;
// groupType: 'travel' | 'health' | 'games' | 'other';
// name: string;
// membersIds: string[];
// url: string;
//   }

//groups
const groups = [
  {
    groupId: 'g1',
    groupType: 'travel',
    name: 'group Travel',
    membersIds: ['u1', 'u2', 'u3', 'u4', 'u5', 'u6', 'u7', 'u8', 'u9', 'u10'],
    url: 'https://shareGroup1',
  },
  {
    groupId: 'g2',
    groupType: 'health',
    name: 'group Health',
    membersIds: ['u1', 'u3', 'u4'],
    url: 'https://shareGroup2',
  },
  {
    groupId: 'g3',
    groupType: 'other',
    name: 'group Other',
    membersIds: ['u2', 'u3', 'u6', 'u7', '10'],
    url: 'https://shareGroup3',
  },
  {
    groupId: 'g4',
    groupType: 'games',
    name: 'group Games',
    membersIds: ['u1', 'u2', 'u4', 'u8'],
    url: 'https://shareGroup4',
  },
  {
    groupId: 'g5',
    groupType: 'travel',
    name: 'group Travel 2',
    membersIds: ['u3', 'u4', 'u5', 'u7', 'u9', '10'],
    url: 'https://shareGroup5',
  },
  {
    groupId: 'g6',
    groupType: 'health',
    name: 'group Health 2',
    membersIds: ['u4', 'u5', 'u6'],
    url: 'https://shareGroup6',
  },
  {
    groupId: 'g7',
    groupType: 'other',
    name: 'group Other 2',
    membersIds: ['u1', 'u5', 'u6'],
    url: 'https://shareGroup7',
  },
  {
    groupId: 'g8',
    groupType: 'games',
    name: 'group Games 2',
    membersIds: ['u3', 'u4', 'u6', 'u8'],
    url: 'https://shareGroup8',
  },
  {
    groupId: 'g9',
    groupType: 'travel',
    name: 'group Travel 3',
    membersIds: ['u1', 'u2', 'u3', 'u7', 'u9', 'u10'],
    url: 'https://shareGroup9',
  },
  {
    groupId: 'g10',
    groupType: 'health',
    name: 'group Health 3',
    membersIds: ['u2', 'u3', 'u4'],
    url: 'https://shareGroup10',
  },
  {
    groupId: 'g11',
    groupType: 'other',
    name: 'group Other 3',
    membersIds: ['u1', 'u3', 'u5', 'u7', 'u8', 'u9', 'u10'],
    url: 'https://shareGroup11',
  },
  {
    groupId: 'g12',
    groupType: 'games',
    name: 'group Games 3',
    membersIds: ['u2', 'u4', 'u6'],
    url: 'https://shareGroup12',
  },
];

const group = {
  groupId: 'g1',
  groupType: 'travel',
  name: 'group 1',
  membersIds: ['u1', 'u2', 'u3', 'u4'],
  url: 'https://shareGroup1',
};

const exampleGroup = ['name', 'group_type', 'country_code', 'users'];

//expenses
const expenses = [
  {
    groupId: 'g1',
    expenseId: 'e1',
    expenseType: 'food',
    cost: 210,
    date: '2024/5/28',
    event: '燒鳥肌肉串',
    payerId: 'u1',
    sharersIds: ['u1', 'u2'],
  },
  {
    groupId: 'g1',
    expenseId: 'e2',
    expenseType: 'food',
    cost: 50,
    date: '2024/5/28',
    event: '手工醃蘿波',
    payerId: 'u1',
    sharersIds: ['u2', 'u3', 'u4'],
  },
  {
    groupId: 'g1',
    expenseId: 'e3',
    expenseType: 'food',
    cost: 150,
    date: '2024/5/28',
    event: '豆腐沙拉',
    payerId: 'u1',
    sharersIds: ['u2', 'u3', 'u4'],
  },
  {
    groupId: 'g1',
    expenseId: 'e4',
    expenseType: 'food',
    cost: 180,
    date: '2024/5/28',
    event: '炭烤玉米筍',
    payerId: 'u1',
    sharersIds: ['u2', 'u3', 'u4'],
  },
  {
    groupId: 'g1',
    expenseId: 'e5',
    expenseType: 'food',
    cost: 120,
    date: '2024/5/28',
    event: '節瓜',
    payerId: 'u1',
    sharersIds: ['u2', 'u3', 'u4'],
  },
  {
    groupId: 'g1',
    expenseId: 'e6',
    expenseType: 'food',
    cost: 180,
    date: '2024/5/28',
    event: '山藥',
    payerId: 'u1',
    sharersIds: ['u1', 'u2', 'u3'],
  },
  {
    groupId: 'g1',
    expenseId: 'e7',
    expenseType: 'food',
    cost: 120,
    date: '2024/5/28',
    event: '杏苞菇',
    payerId: 'u1',
    sharersIds: ['u2', 'u3', 'u4'],
  },
  {
    groupId: 'g1',
    expenseId: 'e8',
    expenseType: 'food',
    cost: 140,
    date: '2024/5/28',
    event: '娃娃菜',
    payerId: 'u1',
    sharersIds: ['u2', 'u3', 'u4'],
  },
  {
    groupId: 'g1',
    expenseId: 'e9',
    expenseType: 'food',
    cost: 140,
    date: '2024/5/28',
    event: '茄子',
    payerId: 'u1',
    sharersIds: ['u2', 'u3', 'u4'],
  },
  {
    groupId: 'g1',
    expenseId: 'e10',
    expenseType: 'food',
    cost: 150,
    date: '2024/5/28',
    event: '炸豆腐',
    payerId: 'u1',
    sharersIds: ['u2', 'u3', 'u4'],
  },
  {
    groupId: 'g1',
    expenseId: 'e11',
    expenseType: 'food',
    cost: 100,
    date: '2024/5/28',
    event: '青蔥豚煎餃',
    payerId: 'u1',
    sharersIds: ['u1'],
  },
  {
    groupId: 'g1',
    expenseId: 'e12',
    expenseType: 'food',
    cost: 100,
    date: '2024/5/28',
    event: '韭菜豚煎餃',
    payerId: 'u1',
    sharersIds: ['u2'],
  },
  {
    groupId: 'g1',
    expenseId: 'e13',
    expenseType: 'food',
    cost: 120,
    date: '2024/5/28',
    event: '綜合煎餃',
    payerId: 'u1',
    sharersIds: ['u4'],
  },
  {
    groupId: 'g1',
    expenseId: 'e14',
    expenseType: 'drink',
    cost: 340,
    date: '2024/5/28',
    event: '葡萄沙瓦',
    payerId: 'u1',
    sharersIds: ['u2', 'u3'],
  },
  {
    groupId: 'g1',
    expenseId: 'e15',
    expenseType: 'drink',
    cost: 180,
    date: '2024/5/28',
    event: '荔枝沙瓦',
    payerId: 'u1',
    sharersIds: ['u4'],
  },
  {
    groupId: 'g1',
    expenseId: 'e16',
    expenseType: 'drink',
    cost: 80,
    date: '2024/5/28',
    event: '可爾必思',
    payerId: 'u1',
    sharersIds: ['u1'],
  },
];

// {
//     groupId,
//     expenseId,
//     expenseType,
//     cost,
//     date,
//     event,
//     payerId,
//     sharersIds
// }: {
//     groupId: string;
//     expenseId: string;
//     expenseType: 'food' | 'drink' | 'transport' | 'stay' | 'shopping' | 'entertainment' | 'other';
//     cost: string;
//     date: string;
//     event: string;
//     payerId: string;
//     sharersIds: string[];
// }

const expense = {
  groupId: 'g1',
  expenseId: 'e1',
  expenseType: 'food',
  cost: 210,
  date: '2024/5/28',
  event: '燒鳥肌肉串',
  payerId: 'u1',
  sharersIds: ['u1', 'u2'],
};

// const exampleExpense = {
//     description,
//     group_id,
//     payment: false,
//     cost: amount,
//     date,
//     users: [
//         {
//             user_id: from,
//             paid_share: amount,
//         },
//         {
//             user_id: to,
//             owed_share: amount,
//         },
//     ],
// }

//member
const membersIds = ['u1', 'u2', 'u3', 'u4', 'u5', 'u6'];

//Person Info
const usersInfo = [
  {
    userId: 'u1',
    displayName: 'a',
    pictureUrl: 'https://cdn2.thecatapi.com/images/a4v.jpg',
    groups: [],
  },
  {
    userId: 'u2',
    displayName: 'b',
    pictureUrl: 'https://images.dog.ceo/breeds/spaniel-welsh/n02102177_803.jpg',
    groups: [],
  },
  {
    userId: 'u3',
    displayName: 'c',
    pictureUrl: 'https://cdn2.thecatapi.com/images/O7FnoegHR.jpg',
    groups: [],
  },
  {
    userId: 'u4',
    displayName: 'd',
    pictureUrl:
      'https://images.dog.ceo/breeds/terrier-sealyham/n02095889_1044.jpg',
    groups: [],
  },
  {
    userId: 'u5',
    displayName: 'e',
    pictureUrl: 'https://cdn2.thecatapi.com/images/cib.jpg',
    groups: [],
  },
  {
    userId: 'u6',
    displayName: 'f',
    pictureUrl:
      'https://images.dog.ceo/breeds/terrier-patterdale/Patterdale.jpg',
    groups: [],
  },
  {
    userId: 'u7',
    displayName: 'g',
    pictureUrl: 'https://cdn2.thecatapi.com/images/edb.jpg',
    groups: [],
  },
  {
    userId: 'u8',
    displayName: 'h',
    pictureUrl:
      'https://images.dog.ceo/breeds/poodle-medium/WhatsApp_Image_2022-08-06_at_4.48.38_PM.jpg',
    groups: [],
  },
  {
    userId: 'u9',
    displayName: 'i',
    pictureUrl: 'https://cdn2.thecatapi.com/images/bo5.jpg',
    groups: [],
  },
  {
    userId: 'u10',
    displayName: 'j',
    pictureUrl:
      'https://images.dog.ceo/breeds/hound-english/n02089973_1303.jpg',
    groups: [],
  },
];

const user = (id) =>
  usersInfo.filter((user) => {
    return user.userId === id;
  })[0];

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
];

export { groups, expenses, usersInfo };
