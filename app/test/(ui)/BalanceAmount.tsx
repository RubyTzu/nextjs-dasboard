
export default function BalanceAmount() {
const finalAmount = "1,950"


  return (
    <div className="mt-16 flex flex-col items-center justify-center border-b-grey-userBar border-b-[1px] pb-6 pt-6">
    <div className="text-sm text-neutrals-70 leading-5">個人總花費</div>
    <div className="text-xl text-highlight-50">${finalAmount}</div>
  </div>
  );
}