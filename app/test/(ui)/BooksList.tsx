import Link from 'next/link';

export async function getTodos() {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/1/todos"
    )

    if (!res.ok) throw Error;

    const data = await res.json();

    return data;
}

export async function BooksList() {
    const data = await getTodos()

    return (
        <ul className="bg-slate-100 p-6 flex flex-col w-full mt-5">
            {data.map((page: {
                userId: string,
                id: string,
                title: string,
                completed: boolean
            }) => (
                <li key={page.id} className="my-4">
                    <Link  className="bg-slate-300 p-2 px-6 rounded-lg text-white w-full inline-block" href={`/test/isr/${page.id}`}>
                        Page {page.id}
                    </Link>
                </li>
            ))}
        </ul>
    )
}