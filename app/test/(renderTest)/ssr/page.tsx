async function getTodo() {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
        cache: "no-store",
    });

    if(!res.ok) throw Error;

    const data = await res.json();

    return data;
}

export default async function SSRPage() {
    console.log('RENDERING SSR_PAGE');

    const data = await getTodo();

    return (
        <div>
            <h1>Server Side Rendering Page</h1>
            <p>This Page On Every Request</p>
            <p>fetched data: {data.title}</p>
        </div>
    );
}