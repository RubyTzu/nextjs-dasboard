async function getTodo(id: string) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        next: { revalidate: 10 },
    }
    );

    if (!res.ok) throw Error;

    const data = (await res.json()) as Todo;
    return data;
}

type Todo = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
};

export async function generateStaticParams() {
    const todos: Todo[] = await fetch("https://jsonplaceholder.typicode.com/users/1/todos"
    ).then((res) => res.json());

    const ids = todos.map(({ id }) => ({
        id: id.toString(),
    }));
    // console.log(ids)
    return ids;
}

type Props = {
    params: {
        id: string;
    };
};

export default async function ISR_TODO_Page({ params }: Props) {
    const data = await getTodo(params.id);
console.log(params)
    return (
        <div>
            <h1>Incremental Static Regeneration + Dynamic Route Page</h1>
            <p>
                ISR 可以想成是 SSG + Revalidate 的實踐結果，若使用者在 url 輸入的 route 事已經預先透過 generateStaticParams build 好的就會直接回傳 html 檔，若是沒 build 過的路徑，就會 builld 好以後回傳。
            </p>
            <p>fetched data: {data.title}</p>
        </div>
    )
}