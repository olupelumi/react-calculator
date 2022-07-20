import {useReducer} from 'react'

import DigitButton from './DigitButton';

import './App.css';



export const ACTIONS = {
  INSERT_DIGIT: "insert-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: 'clear',
  DELETE_DIGIT: "delete-digit", 
  EVALUATE: 'evaluate',
}

const reducer = (state, {type,payload}) =>
{
  // The second argument here is an action. One that is made up of a type and a payload
  // action = {type, payload}
  switch(type) {
    case ACTIONS.INSERT_DIGIT: return {...state, current_operand: `${state.current_operand || ""}${payload.digit}`}
    case ACTIONS.CHOOSE_OPERATION : return state
    case ACTIONS.CLEAR : return state
    case ACTIONS.DELETE_DIGIT : return state
    case ACTIONS.EVALUATE : return state
    default: return state
  }
}

function App() {
  const [{current_operand, previous_operand, operation}, dispatch] = useReducer(reducer, {current_operand: "", previous_operand: ""})
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
    <button className="span-two">
        {/* classname is "span-two" because this will span two columns */}
         AC 
         </button>
      <button> DEL </button>
      <button> ÷ </button>
      <button 
      onClick={() => dispatch({type: "insert1", payload: "1"})}
      > 1 </button>
      <DigitButton digit={2} dispatch={dispatch}/>
      <DigitButton digit={3} dispatch={dispatch}/>
      <button> * </button>
      <DigitButton digit={4} dispatch={dispatch}/>
      <DigitButton digit={5} dispatch={dispatch}/>
      <DigitButton digit={6} dispatch={dispatch}/>
      <button> + </button>
      <DigitButton digit={7} dispatch={dispatch}/>
      <DigitButton digit={8} dispatch={dispatch}/>
      <DigitButton digit={9} dispatch={dispatch}/>
      <button> - </button>
      <button> . </button>
      <DigitButton digit={0} dispatch={dispatch}/>
      <button className="span-two"> = </button>
   </div>
  );
}

export default App;
