import { Component } from "react";
import "./Calculator.css";
import Button from "../Components/Button";
import Display from "../Components/Display";

const inicialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
  isDarkMode: false,
};

export default class Calculator extends Component {
  state = { ...inicialState };

  constructor(props) {
    super(props);
    this.clearMemory = this.clearMemory.bind(this);
    this.setOperation = this.setOperation.bind(this);
    this.addDigit = this.addDigit.bind(this);
    this.toggleDarkMode = this.toggleDarkMode.bind(this);
  }

  clearMemory() {
    this.setState({ ...inicialState, isDarkMode: this.state.isDarkMode });
  }

  toggleDarkMode() {
    this.setState(({ isDarkMode }) => ({ isDarkMode: !isDarkMode }));
  }

  setOperation(operation) {
    const { current, values, operation: currentOperation, clearDisplay } = this.state;

    if (operation === "±") {
      const newValues = [...values];
      newValues[current] = newValues[current] * -1;
      this.setState({
        displayValue: newValues[current],
        values: newValues,
      });
      return;
    }

    if (operation === "%") {
      this.setState({
        operation: "%",
        current: 1,
        clearDisplay: true,
      });
      return;
    }

    if (current === 0) {
      this.setState({
        operation,
        current: 1,
        clearDisplay: true,
      });
      return;
    }

    let result;

    if (!clearDisplay) {
      if (currentOperation === "%") {
        result = (values[0] * values[1]) / 100;
      } else {
        const opMap = {
          "÷": "/",
          "x": "*",
          "+": "+",
          "-": "-",
        };
        const operator = opMap[currentOperation];
        try {
          result = eval(`${values[0]} ${operator} ${values[1]}`);
        } catch {
          result = values[0];
        }
      }

      if (!Number.isInteger(result)) {
        result = parseFloat(result.toFixed(4));
      }

      const newValues = [result, 0];

      this.setState({
        displayValue: result,
        values: newValues,
        operation: operation === "=" ? null : operation,
        current: operation === "=" ? 0 : 1,
        clearDisplay: true,
      });
    } else {
      this.setState({ operation });
    }
  }

  addDigit(n) {
    if (n === "." && this.state.displayValue.includes(".")) return;

    const clearDisplay =
      this.state.displayValue === "0" || this.state.clearDisplay;

    const currentValue = clearDisplay ? "" : this.state.displayValue;

    const displayValue = currentValue + n;

    this.setState({ displayValue, clearDisplay: false });

    if (n !== ".") {
      const i = this.state.current;
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];
      values[i] = newValue;
      this.setState({ values });
    }
  }

  render() {
    const themeClass = this.state.isDarkMode ? "dark-mode" : "light-mode";

    return (
      <div className={`app-container ${themeClass}`}>
        <h1 className="title">Calculadora - Módulo React</h1>
        <div className="calculator">
          <Display value={this.state.displayValue} isDarkMode={this.state.isDarkMode} />
          <Button label="AC" click={this.clearMemory} />
          <Button label="±" click={this.setOperation} />
          <Button label="%" click={this.setOperation} />
          <Button className="btn-operation" label="÷" click={this.setOperation} />
          <Button label="7" click={this.addDigit} />
          <Button label="8" click={this.addDigit} />
          <Button label="9" click={this.addDigit} />
          <Button className="btn-operation" label="x" click={this.setOperation} />
          <Button label="4" click={this.addDigit} />
          <Button label="5" click={this.addDigit} />
          <Button label="6" click={this.addDigit} />
          <Button className="btn-operation" label="-" click={this.setOperation} />
          <Button label="1" click={this.addDigit} />
          <Button label="2" click={this.addDigit} />
          <Button label="3" click={this.addDigit} />
          <Button className="btn-operation" label="+" click={this.setOperation} />
          <Button label={this.state.isDarkMode ? "☀️" : "🌚"} click={this.toggleDarkMode} />
          <Button label="0" click={this.addDigit} />
          <Button label="." click={this.addDigit} />
          <Button className="btn-operation" label="=" click={this.setOperation} />
        </div>
        <div className="footer">
          <p>© 2025 Carlos Eduardo Vernizzi. Todos os direitos reservados.</p>
        </div>
      </div>
    );
  }
}
