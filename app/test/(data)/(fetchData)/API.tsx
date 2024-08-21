import { Group } from "../(sharedFunction)/types";

//new user API
async function getUser(id: string) {
  const res = await fetch(`http://localhost:3000/user/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) throw Error;

  const data = await res.json();

  return data;
}

//new group API
async function getGroup(id: string) {
  const res = await fetch(`http://localhost:3000/group/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) throw Error;

  const data = await res.json();

  return data;
}



//get expense
async function getExpense(id: string) {
  const res = await fetch(`http://localhost:3000/expense/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) throw Error;

  const data = await res.json();

  return data;
}

//add group
async function addGroup(payload: any) {
  const { id, name, picture, creatorId, expenses, users } = payload;
  let url = `http://localhost:3000/group/`;

  let body = {
    id: id,
    name: name,
    picture: picture,
    creatorId: creatorId,
    expenses: expenses,
    users: users,
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  });

  if (!res.ok) throw Error;
}

async function addExpense(payload: any) {}

// change group
async function changeGroup(payload: any) {
    const { id, users } = payload
    let url = `http://localhost:3000/group/${id}`

    let body = {
        ...payload,
        "users": users,
    }

    const res = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        cache: "no-store",
    })

    if (!res.ok) throw Error;

}

async function changeExpense(payload: any) {}

async function deleteUser(groupId: string, userId:string) {}

// delete group
async function deleteGroup(id: string) {
  let url = `http://localhost:3000/group/${id}`;

  const res = await fetch(url, { method: 'DELETE' });

  if (!res.ok) throw Error;
}

async function deleteExpense(groupId: string, expenseId: string) {}

export {
  getUser,
  getGroup,
  getExpense,
  addGroup,
  addExpense,
  changeExpense,
  deleteUser,
  deleteGroup,
  deleteExpense,
};