//get groups
async function getGroups() {
    const res = await fetch("http://localhost:3000/groups/", {
        cache: "no-store",
    });

    if (!res.ok) throw Error;

    const data = await res.json();

    return data;
}

//get expenses
async function getExpenses() {
    const res = await fetch("http://localhost:3000/expenses", {
        cache: "no-store",
    });

    if (!res.ok) throw Error;

    const data = await res.json();

    return data;
}

//get userInfos
async function getUserInfos() {
    const res = await fetch("http://localhost:3000/usersInfo", {
        cache: "no-store",
    });

    if (!res.ok) throw Error;

    const data = await res.json();

    return data;
}

//add group
async function addGroup(payload: any) {
    const { id, groupType, name, membersIds } = payload
    let url = `http://localhost:3000/groups/`

    let body = {
        "id": id,
        "groupType": groupType,
        "name": name,
        "membersIds": membersIds
    }

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        cache: "no-store",
    })

    if (!res.ok) throw Error;

}

//delete group
async function deleteGroup(id: any) {
    let url = `http://localhost:3000/groups/${id}`

    const res = await fetch(url, { method: 'DELETE' })

    if (!res.ok) throw Error;

}

//change group
async function changeGroup(payload: any) {
    const { id, groupType, name, membersIds } = payload
    let url = `http://localhost:3000/groups/${id}`

    let body = {
        "id": id,
        "groupType": groupType,
        "name": name,
        "membersIds": membersIds
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

export { getGroups, getExpenses, getUserInfos, addGroup, deleteGroup, changeGroup }