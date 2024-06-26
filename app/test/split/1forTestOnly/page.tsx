'use client'
//import react
import { useState } from 'react';

import { CalculatorAndInput } from "../../(ui)/Calculator";

export default function Page() {
    const [showKeyboard, setShowKeyboard] = useState(false);
    
    return(
        <CalculatorAndInput amount={"3000"} showKeyboard={showKeyboard} setShowKeyboard={setShowKeyboard} />
    )
}