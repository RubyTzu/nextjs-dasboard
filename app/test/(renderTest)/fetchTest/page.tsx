import { TestAddButton } from "./(ui)/TestButtons";
import { GroupsList, UsresList, ExpensesList } from "./(ui)/Lists"

export default async function Page() {

    return (
        <div className="m-10">
            <div className="z-10 fixed top-0 left-0 flex justify-center items-center bg-primary-100 w-full h-20">
                <TestAddButton />
            </div>
            <h1 className="mt-28">Server Side Rendering Page</h1>
            <p>This Page On Every Request fetch:</p>
            <br />
            <div>
                <GroupsList />
                <ExpensesList />
                <UsresList />
            </div>
        </div>
    );
}
