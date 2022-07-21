import {useReducer} from 'react'

import DigitButton from './DigitButton';

import './App.css';
import OperationButton from './OperationButton';



export const ACTIONS = {
  INSERT_DIGIT: "insert-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: 'clear',
  DELETE_DIGIT: "delete-digit", 
  EVALUATE: 'evaluate',
  CLEAR: 'clear',
}

const reducer = (state, {type,payload}) =>
{
  // The second argument here is an action. One that is made up of a type and a payload
  // action = {type, payload}
  switch(type) {
    case ACTIONS.INSERT_DIGIT: 
      // If we just pressed the equal sign to evaluate a previous operand <operation> operand
      if (state.just_evaluated) {
        // nullify the current operand
        return {
          ...state,
          current_operand: payload.digit,
          just_evaluated: false,
        }
      }
      // If we have a leading 0, we don't need to add more 0s.
      if (payload.digit === "0" && state.current_operand === "0") {return state}
      // We can't have more than one decimal
      if (payload.digit === "." && state.current_operand.includes(".")) {return state}
      return {...state, current_operand: `${state.current_operand || ""}${payload.digit}`}
    case ACTIONS.CHOOSE_OPERATION :
      // No current or previous operand to do an operation on
      if (state.current_operand == null && state.previous_operand == null){ 
        return state
      }
      // There's a current operand but no previous operand so we want to move the current operand to previous operand
      if (state.current_operand != null && state.previous_operand == null) {
        return {
          ...state, 
          operation: payload.operation,
          previous_operand: state.current_operand,
          current_operand: null,
        }
      }

      // There's a previous operand but no current operand so we want to change the operation
      if (state.previous_operand != null && state.current_operand == null) {
        return {
          ...state,
          operation: payload.operation,
        }

      }

      // If there is a current operand and a previous operand and an existing operation already, evaluate and add this new operation
      return {
        ...state, 
        previous_operand: evaluate(state), 
        current_operand: null,
        operation: payload.operation,
      }
    case ACTIONS.DELETE_DIGIT : return state
    case ACTIONS.EVALUATE : 
      // Do we have all the information to evaluate?
      if (state.operation == null  || state.current_operand == null || state.previous_operand == null) {
        return state
      }
      return {
        ...state,
        just_evaluated: true, 
        current_operand: evaluate(state),
        previous_operand: null,
        operation: null,
      }
    case ACTIONS.CLEAR: 
      return {}
    default: return state
  }
}

function evaluate({previous_operand, current_operand, operation}) {
  const prev = parseFloat(previous_operand)
  const curr = parseFloat(current_operand)
  // if (isNaN(prev) || isNaN(curr)) {
  //   return ""
  // }
  let answer = ""
  // console.log("op", operation)
  switch (operation) {
    case "+": // yada
      answer = prev + curr
      break
    case "-": // yada
      answer = prev - curr
      break

    case "*": // yada
      answer = prev * curr
      break

    case "÷": // yada
      answer = prev / curr
      break
  }
  return answer.toString()
}
function App() {
  const [{current_operand, previous_operand, operation}, dispatch] = useReducer(reducer, {current_operand: null, previous_operand: null, operation:null})
  return (
   <div className="calculator-grid">
    <div className="output">
      {/* In 5 + 6 = 11, 5 and 6 are both operands */}
      <div className = "previous-operand">
        {previous_operand} {operation}
      </div>
      <div className = "current-operand"> 
      {/* Number we're in the act of typing out */}
      {current_operand}
      </div>
    </div>
      <button className="span-two" onClick={() => dispatch({type: ACTIONS.CLEAR})}>
        {/* classname is "span-two" because this will span two columns */}
         AC 
      </button>
      <button> DEL </button>
      <OperationButton operation="÷" dispatch={dispatch}/>
      <DigitButton digit="1" dispatch={dispatch}/>
      <DigitButton digit="2" dispatch={dispatch}/>
      <DigitButton digit="3" dispatch={dispatch}/>
      <OperationButton operation="*" dispatch={dispatch}/>
      <DigitButton digit="4" dispatch={dispatch}/>
      <DigitButton digit="5" dispatch={dispatch}/>
      <DigitButton digit="6" dispatch={dispatch}/>
      <OperationButton operation="+" dispatch={dispatch}/>
      <DigitButton digit="7" dispatch={dispatch}/>
      <DigitButton digit="8" dispatch={dispatch}/>
      <DigitButton digit="9" dispatch={dispatch}/>
      <OperationButton operation="-" dispatch={dispatch}/>
      <DigitButton digit="." dispatch={dispatch}/>
      <DigitButton digit="0" dispatch={dispatch}/>
      <button className="span-two" onClick={()=> dispatch({type: ACTIONS.EVALUATE})}> = </button>
   </div>
  );
}

export default App;
