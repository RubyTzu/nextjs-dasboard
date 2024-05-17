async function getTodo() {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/2");

    if (!res.ok) throw Error;

    const data = await res.json();

    return data;
}

export default async function Page() {
    console.log('RENDERING SSG-PAGE');
    
    const data = await getTodo();

    return (
        <div className="text-center">
            <h1 className="text-[40px]">Static Site Generation Page</h1>
            <p>This Page Rendering On Build Time</p>
            <p>fetched data: {data.title}</p>
        </div>
    );
}