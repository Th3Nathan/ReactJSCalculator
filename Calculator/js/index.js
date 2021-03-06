"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "0",
      operator: "",
      firstNumber: "",
      waiting: "no",
      divisor: "",
      subtractor: "",
    };
  }
  
  addNum(num){
    const { display, waiting } = this.state
    num = String(num)
    if (waiting === "yes"){
      this.setState({
        display : num,
        waiting : "no"
      })
    }  
    else if (display == "0" && num =="0"){
    this.setState({
      display: display
    })
    }    
    else  if (display == "0"){
    this.setState({
      display: num
    })
    }       
    else {
    this.setState({
      display: display + num
    })
    }   
  }
  

  addDecimal(){
   const { display, waiting } = this.state
   if (waiting == "yes"){
     this.setState({
       display: ".",
       waiting: "no"
     })
   }
   
   else if (display.indexOf(".") == -1)
      this.setState({
      display: display + "."
    })
  }
  
  clear(){
    this.setState({
      display: "0",
      waiting: "no",
      firstNumber: "",
      operator: ""
      
    })
  }
  
  negative(){
    const { display } = this.state
    var strDisplay = String(display)
    
    if(strDisplay[0] == "-")
      this.setState({
      display: strDisplay.substr(1)
      })
    else 
     this.setState({
     display: "-" + strDisplay
     })
  }
  
  percent(){
    const { display, operator, firstNumber, waiting} = this.state
    this.setState({
    display: display/100,
    operator: "",
    firstNumber: "",
    waiting: "no"
    })
  }
  
  initializeOperator(operator){
    const { display, waiting } = this.state
    this.setState({
      waiting: "yes",
      operator: operator,
      firstNumber: parseFloat(display)
    })
  }
  
  evaluate(){
    const { display, firstNumber, operator, divisor, subtractor } = this.state
    var current = parseFloat(display);
    var held = parseFloat(firstNumber);
    

    if(firstNumber && operator == "÷"){
      this.setState({
        divisor: current,
        display: held/current,
        firstNumber: ""
      })
    }
    
     else if (operator == "÷"){
      this.setState({
        display: display / divisor
     })
     }   
     else  if (firstNumber && operator == "x"){
     this.setState({
        display: current * held,
             
     })
     }
     else if(firstNumber && operator == "-"){
      this.setState({
        subtractor: current,
        display: held - current,
        firstNumber: ""
      })
      }  
      else if (operator == "-"){
      this.setState({
        display: display - subtractor
      })
      } 
      else  if (firstNumber && operator == "+"){
      this.setState({
        display: held + current,          
      })
    }       
  }
  

  render() {
    const { display, operator, firstNumber, waiting} = this.state
    
if (String(display).length > 10){
  this.setState({
    display: String(display).substr(0, 10)
  })
}

    
return (
<div>
<h1>ReactJS Calculator</h1>
<div className="calculator">
  <div className="display"><h2 className="result">{display}</h2></div>
  <div className="keypad">
    <div className="nonOperators">
      <div className="functions">
        <button onClick={() =>this.clear()} className="clear function">AC</button>
        <button onClick={() =>this.negative()} className="plus_minus function">±</button>
        <button onClick={() =>this.percent()} className="percent function">%</button>
      </div>
      <div className = "digits">
        <button onClick={() =>this.addNum(1)} className="digit-1 digit">1</button>
        <button onClick={() =>this.addNum(2)} className="digit-2 digit">2</button>
        <button onClick={() =>this.addNum(3)} className="digit-3 digit">3</button>
        <button onClick={() =>this.addNum(4)} className="digit-4 digit">4</button>
        <button onClick={() =>this.addNum(5)} className="digit-5 digit">5</button>
        <button onClick={() =>this.addNum(6)} className="digit-6 digit">6</button>
        <button onClick={() =>this.addNum(7)} className="digit-7 digit">7</button>
        <button onClick={() =>this.addNum(8)} className="digit-8 digit">8</button>
        <button onClick={() =>this.addNum(9)} className="digit-9 digit">9</button>
        <button onClick={() =>this.addNum(0)} className="digit-0 digit digit_wide">0</button>
        <button onClick={() =>this.addDecimal()} className="decimal digit">.</button>
      </div>
    </div>
    <div className="operators">
      <button onClick={() =>this.initializeOperator("÷")} className="divide operator">÷</button>
      <button onClick={() =>this.initializeOperator("x")} className="multiply operator">x</button>
      <button onClick={() =>this.initializeOperator("-")} className="subtract operator">-</button>
      <button onClick={() =>this.initializeOperator("+")} className="add operator">+</button>
      <button onClick={() =>this.evaluate()} className="equals operator">=</button>
    </div>
  </div>   
  </div>    
  </div>
)}
}

ReactDOM.render(
<Calculator />, document.getElementById('container'))
