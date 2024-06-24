// Loading animation
const shimmer =
    'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function UsersBarSkeleton() {
    return (
        <>
            <div className={`mt-16 ${shimmer} relative overflow-hidden flex items-center justify-center gap-2 pt-8 pb-5 border-b-[2px]`}>
                        <div className="shadow rounded-full max-w-full bg-gray-100 align-middle border-none object-cover h-11 w-11" />
                        <div className="shadow rounded-full max-w-full bg-gray-100 align-middle border-none object-cover h-11 w-11" />
                        <div className="shadow rounded-full max-w-full bg-gray-100 align-middle border-none object-cover h-11 w-11" />
                        <div className="shadow rounded-full max-w-full bg-gray-100 align-middle border-none object-cover h-11 w-11" />
                        <div className="shadow rounded-full max-w-full bg-gray-100 align-middle border-none object-cover h-11 w-11" />
            </div>

        </>
    );
}
export function ExpenseSkeleton() {
    return (
        <>
         <div className={`${shimmer} z-10 fixed flex w-full items-center justify-between bg-highlight-50 px-5 py-4 text-white`}>
         <h1 className="text-lg">loading...</h1>
         </div>
        </>
    );
}