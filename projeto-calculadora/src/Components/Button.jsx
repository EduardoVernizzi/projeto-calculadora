import { StrictMode } from "react";
import './Button.css';

export default props =>

  <button className={`btn ${props.className || ''}`} onClick={e => props.click && props.click(props.label)  }>
    {props.label}
  </button>