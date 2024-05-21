import Navbar from "@/app/test/(ui)/Navbar";

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
    // console.log(todos.length)
    // console.log(todos[0])
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

    return (
        <div className="">
           <Navbar />
           <div className="bg-slate-100 mt-20">
                <div className="p-10 md:w-[768px] mx-auto">
                    <h1 className="text-2xl font-bold">{data.id}.<br/> Incremental Static Regeneration + Dynamic Route Page</h1>
                    <p className="mt-3 text-md font-light">
                        ISR 可以想成是 SSG + Revalidate 的實踐結果，若使用者在 url 輸入的 route 事已經預先透過 generateStaticParams build 好的就會直接回傳 html 檔，若是沒 build 過的路徑，就會 builld 好以後回傳。
                    </p>
                </div>
            </div>
            <div className="p-10 flex flex-col justify-center items-start md:w-[768px] mx-auto">
                <p className="pb-6">userId: <br /><span className="text-sm font-light text-[#888]">{data.userId}</span></p>
                <p className="pb-6">id: <br /><span className="text-sm font-light text-[#888]">{data.id}</span></p>
                <p className="pb-6">title: <br /><span className="text-sm font-light text-[#888]">{data.title}</span></p>
                <p className="pb-6">completed:
                    <br /><span className="text-sm font-light text-[#888]">{data.completed ? "O" : "X"}</span>
                </p>
            </div>

        </div>
    )
}