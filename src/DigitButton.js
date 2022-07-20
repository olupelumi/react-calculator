import React from "react"
import { ACTIONS } from "./App"

export default function DigitButton ({digit, dispatch}) {
    return (
    <button onClick={()=>dispatch({type: ACTIONS.INSERT_DIGIT, payload: {digit: digit}})}>
        {digit}
    </button> )
}