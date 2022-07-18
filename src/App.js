import './App.css';

function App() {
  return (
   <div className="calculator-grid">
    <div className="output">
      {/* In 5 + 6 = 11, 5 and 6 are both operands */}
      <div className = "previous-operand">
        667*447
      </div>
      <div className = "current-operand"> 
      {/* Number we're in the act of typing out */}
      </div>
    </div>
    <button className="span-two">
        {/* classname is "span-two" because this will span two columns */}
         AC 
         </button>
      <button> DEL </button>
      <button> ÷ </button>
      <button> 1 </button>
      <button> 2 </button>
      <button> 3 </button>
      <button> * </button>
      <button> 4 </button>
      <button> 5 </button>
      <button> 6 </button>
      <button> + </button>
      <button> 7 </button>
      <button> 8 </button>
      <button> 9 </button>
      <button> - </button>
      <button> . </button>
      <button> 0 </button>
      <button className="span-two"> = </button>


   </div>
  );
}

export default App;
