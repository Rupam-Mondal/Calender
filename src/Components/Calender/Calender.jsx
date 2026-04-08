import { useState } from "react";
import CalendarHeader from "./CalenderHeader";

export default function Calender(){
    const [currentDate, setCurrentDate] = useState(new Date());
    return (
        <>
            <div className="max-w-md mx-auto bg-white shadow-xl rounded-xl overflow-hidden flex flex-col">
                <CalendarHeader currentDate={currentDate} />
            </div>
        </>
    )
}