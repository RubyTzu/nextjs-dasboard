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

//add expense
async function addExpense(payload: any) {
  let url = `http://localhost:3000/expense/`;

  let body = {
    ...payload
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

async function changeUserGroup(payload: any) {
  const { id } = payload;
  let url = `http://localhost:3000/user/${id}`;

  let body = { ...payload }

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  });

  if (!res.ok) throw Error;
}

// change group
async function changeGroup(payload: any) {
  const { id } = payload
  let url = `http://localhost:3000/group/${id}`

  let body = { ...payload }

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

async function changeExpense(payload: any) { 
  const { id } = payload
  let url = `http://localhost:3000/expense/${id}`

  let body = { ...payload }

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

//for json-server adoptable userId
async function getExpensesforAdoptUser() {
  const res = await fetch(`http://localhost:3000/expense/`, {
    cache: 'no-store',
  });

  if (!res.ok) throw Error;

  const data = await res.json();

  return data;
}

async function deleteUser(id: string) { 
  let url = `http://localhost:3000/user/${id}`;

  const res = await fetch(url, { method: 'DELETE' });

  if (!res.ok) throw Error;
}

// delete group
async function deleteGroup(id: string) {
  let url = `http://localhost:3000/group/${id}`;

  const res = await fetch(url, { method: 'DELETE' });

  if (!res.ok) throw Error;
}

async function deleteExpense(id: string) { 
  let url = `http://localhost:3000/expense/${id}`;

  const res = await fetch(url, { method: 'DELETE' });

  if (!res.ok) throw Error;
}

export {
  getUser,
  getGroup,
  getExpense,
  addGroup,
  changeUserGroup,
  addExpense,
  changeGroup,
  changeExpense,
  deleteUser,
  deleteGroup,
  deleteExpense,
  getExpensesforAdoptUser
};