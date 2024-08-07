// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function UsersBarSkeleton() {
  return (
    <>
      <div
        className={`mt-16 ${shimmer} relative flex items-center justify-center gap-2 overflow-hidden border-b-[2px] pb-5 pt-8`}
      >
        <div className="h-11 w-11 max-w-full rounded-full border-none bg-gray-100 object-cover align-middle shadow" />
        <div className="h-11 w-11 max-w-full rounded-full border-none bg-gray-100 object-cover align-middle shadow" />
        <div className="h-11 w-11 max-w-full rounded-full border-none bg-gray-100 object-cover align-middle shadow" />
        <div className="h-11 w-11 max-w-full rounded-full border-none bg-gray-100 object-cover align-middle shadow" />
        <div className="h-11 w-11 max-w-full rounded-full border-none bg-gray-100 object-cover align-middle shadow" />
      </div>
    </>
  );
}


export function BalanceSkeleton() {
  return (
    <>
      <div
        className={`${shimmer} fixed z-10 flex w-full items-center justify-between bg-highlight-50 px-5 py-4 text-white`}
      >
        <h1 className="text-lg">loading...</h1>
      </div>
    </>
  );
}

export function ExpenseSkeleton() {
  return (
    <>
      <div
        className={`${shimmer} fixed z-10 flex w-full items-center justify-between bg-highlight-50 px-5 py-4 text-white`}
      >
        <h1 className="text-lg">loading...</h1>
      </div>
    </>
  );
}
