//import next & react
import { useEffect, useId, useRef, useState } from 'react';
//import ui
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
//impoert other
import { CaptionProps, DayPicker, useNavigation } from "react-day-picker";
import { format, isValid, parse } from 'date-fns';
import { zhTW } from "date-fns/locale";

function CustomCaptionComponent(props: CaptionProps & { dialogRef: React.RefObject<HTMLDialogElement> } & { handleDayPickerSelect: any } & { originDate: any }) {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
  return (
    <div className="flex flex-col border-t-rounded-lg">
      <div className="py-2 px-5 flex justify-between items-center bg-highlight-60 rounded-t-lg">
        <div
          className="w-9 text-sm"
          onClick={() => {
            props.handleDayPickerSelect(props.originDate)
            props.dialogRef.current?.close()
          }}
        >取消</div>
        <div className="text-normal">選擇日期</div>
        <div className="w-9" />
      </div>
      <div className="py-4 px-14 flex justify-between items-center border-b border-grey-calendar">
        <button
          disabled={!previousMonth}
          onClick={() => previousMonth && goToMonth(previousMonth)}
        >
          <ChevronLeftIcon className="w-5 h-5 stroke-2" />
        </button>
        <h2>{format(props.displayMonth, "yyyy年M月")}</h2>
        <button
          disabled={!nextMonth}
          onClick={() => nextMonth && goToMonth(nextMonth)}
        >
          <ChevronRightIcon className="w-5 h-5 stroke-2" />
        </button>
      </div>
    </div>
  );
}

export default function DatePickerButton({ date }: { date: any }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogId = useId();
  const headerId = useId();

  //待研究
  // Hold the month in state to control the calendar when the input changes
  const [month, setMonth] = useState(new Date());

  // Hold the selected date in state
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(date);

  // Hold the input value in state
  const [inputValue, setInputValue] = useState(format(date, "yyyy/MM/dd"));

  // Hold the last saved date in state
  const [lastSavedDate, setLastSavedDate] = useState<Date | undefined>(date);

  const toggleDialog = () => dialogRef.current?.showModal();
  /**
     * Function to handle the DayPicker select event: update the input value and
     * the selected date, and set the month.
     */
  const handleDayPickerSelect = (date: any) => {
    if (!date) {
      setInputValue("");
      setSelectedDate(undefined);
    } else {
      setSelectedDate(date);
      setInputValue(format(date, "yyyy/MM/dd"));
    }
  };

  /**
     * Handle the input change event: parse the input value to a date, update the
     * selected date and set the month.
     */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // keep the input value in sync

    const parsedDate = parse(e.target.value, "yyyy/MM/dd", new Date());

    if (isValid(parsedDate)) {
      setSelectedDate(parsedDate);
      setMonth(parsedDate);
    } else {
      setSelectedDate(undefined);
    }
  };

  return (
    <>
      <input
        className="w-[100px] border-0 rounded-full bg-neutrals-20 px-2 py-[1px] text-sm"
        id="date-input"
        type="text"
        onChange={handleInputChange}
        onClick={toggleDialog}
        value={inputValue}
        placeholder="yyyy/MM/dd"
        aria-controls={dialogId}
        aria-haspopup="dialog"
        aria-expanded={dialogRef.current ? "true" : "false"}
        aria-label="Open calendar to choose booking date"
      />
      <dialog
        role="dialog"
        ref={dialogRef}
        id={dialogId}
        aria-modal
        className="mx-5 bg-white z-20 rounded-lg"
        aria-labelledby={headerId}
      >
        <DayPicker
          locale={zhTW}
          weekStartsOn={0}
          components={{
            Caption: (props: CaptionProps) => <CustomCaptionComponent {...props} dialogRef={dialogRef} originDate={lastSavedDate} handleDayPickerSelect={handleDayPickerSelect} /> // 傳遞 dialogRef 給 CustomCaptionComponent
          }}
          className="mx-5 bg-white z-20 rounded-lg"
          classNames={{
            table: "py-5 flex flex-col items-center w-full border-collapse",
            head_row: "flex font-medium text-gray-900",
            head_cell: "m-1 w-9 font-normal text-sm",
            row: "flex w-full mt-1",
            cell: "text-gray-600 rounded-full h-9 w-9 text-center text-sm p-0 m-1 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-full last:[&:has([aria-selected])]:rounded-r-full focus-within:relative focus-within:z-20",
            day: "h-9 w-9 p-0 font-normal",
            day_range_end: "day-range-end",
            day_selected:
              "rounded-full bg-highlight-60 text-black hover:bg-highlight-60 hover:text-black focus:bg-highlight-60 focus:text-black",
            day_today: "rounded-full font-[600] text-gray-900",
            day_outside:
              "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
            day_disabled: "text-gray-500 opacity-50",
            day_hidden: "invisible",
          }}
          month={month}
          onMonthChange={setMonth}
          initialFocus
          mode="single"
          selected={selectedDate}
          onSelect={handleDayPickerSelect}
          showOutsideDays
          // fixedWeeks
          required
        />
        <div className="p-5 bg-highlight-20 rounded-lg"
          onClick={() => {
            setLastSavedDate(selectedDate); // Save selected date
            dialogRef.current?.close()
          }}
        >儲存</div>
      </dialog>
    </>)
}