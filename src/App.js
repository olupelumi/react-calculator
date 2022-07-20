import {useReducer} from 'react'

import DigitButton from './DigitButton';

import './App.css';



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
      // If we have a leading 0, we don't need to add more 0s.
      if (payload.digit === "0" && state.current_operand === "0") {return state}
      // We can't have more than one decimal
      if (payload.digit === "." && state.current_operand.includes(".")) {return state}
      return {...state, current_operand: `${state.current_operand || ""}${payload.digit}`}
    case ACTIONS.CHOOSE_OPERATION : return state
    case ACTIONS.CLEAR : return state
    case ACTIONS.DELETE_DIGIT : return state
    case ACTIONS.EVALUATE : return state
    case ACTIONS.CLEAR: return {}
    default: return state
  }
}

function App() {
  const [{current_operand, previous_operand, operation}, dispatch] = useReducer(reducer, {current_operand: "", previous_operand: "", operation:""})
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
      <button> ÷ </button>
      <DigitButton digit="1" dispatch={dispatch}/>
      <DigitButton digit="2" dispatch={dispatch}/>
      <DigitButton digit="3" dispatch={dispatch}/>
      <button> * </button>
      <DigitButton digit="4" dispatch={dispatch}/>
      <DigitButton digit="5" dispatch={dispatch}/>
      <DigitButton digit="6" dispatch={dispatch}/>
      <button> + </button>
      <DigitButton digit="7" dispatch={dispatch}/>
      <DigitButton digit="8" dispatch={dispatch}/>
      <DigitButton digit="9" dispatch={dispatch}/>
      <button> - </button>
      <DigitButton digit="." dispatch={dispatch}/>
      <DigitButton digit="0" dispatch={dispatch}/>
      <button className="span-two"> = </button>
   </div>
  );
}

export default App;
