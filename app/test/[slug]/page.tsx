import { useRouter } from 'next/router'

async function getTodo() {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/2`, {
        cache: "force-cache",
    });

    if (!response.ok) throw Error;

    const data = await response.json();

    return data;
}

export default async function Page() {
    // const router = useRouter()
    const data = await getTodo();

    return (
        // <p>Post: {router.query.slug}</p>
        <p>fetch data: {data.title}</p>
    )
}

