import "./App.css";
import { Toggle, ToggleOn, ToggleOff, ToggleButton, useToggle } from "./toggle";
import { Switch } from "./switch";

// Version 1
function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <span> Hello</span>
        <ToggleButton />
      </Toggle>
    </div>
  );
}

// Version 2
// function App() {
//   return (
//     <div>
//       <Toggle>
//         <ToggleOn>The button is on</ToggleOn>
//         <ToggleOff>The button is off</ToggleOff>
//         <div>
//           <ToggleButton />
//         </div>
//       </Toggle>
//     </div>
//   );
// }

// Version 3
// function App() {
//   const { on, togglerProps } = useToggle();
//   return (
//     <div>
//       <Switch on={on} {...togglerProps} />
//       <hr />
//       <button aria-label="custom-button" {...togglerProps}>
//         {on ? "on" : "off"}
//       </button>
//     </div>
//   );
// }

export default App;
