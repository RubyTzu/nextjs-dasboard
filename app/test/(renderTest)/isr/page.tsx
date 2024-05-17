async function getTodo() {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos/2', {
        next: { revalidate: 10 },
    });

    if (!res.ok) throw Error;

    const data = await res.json();

    return data;
}

export default async function Page() {
    const data = await getTodo();

    return (
        <div>
            <h1>Incremental Static Regeneration Page</h1>
            <p>ISR 可以想成是 SSG + Revalidate 的實踐結果</p>
            <p>fetched data: {data.title}</p>
        </div>
    );
}