import React, {
  useState,
  createContext,
  useContext,
  Children,
  cloneElement,
  useReducer,
  useRef,
} from "react";
import { Switch } from "./switch";

// Versiion 1:
// The Compound Components Pattern enables you to provide a set of
// components that implicitly share state for a simple yet powerful declarative API for reusable components:
// export function Toggle({ children }) {
//   console.log("children", children);
//   const [on, setOn] = useState(false);
//   const toggle = () => setOn(!on);

//   return Children.map(children, (child) => {
//     return typeof child.type === "string"
//       ? child
//       : cloneElement(child, { on, toggle });
//   });
// }

// export const ToggleOn = ({ on, children }) => {
//   return on ? children : null;
// };

// export const ToggleOff = ({ on, children }) => {
//   return on ? null : children;
// };

// export const ToggleButton = ({ on, toggle, ...props }) => {
//   return <Switch on={on} onClick={toggle} {...props} />;
// };

// Version 2:
// The Flexible Compound Components Pattern only differs from the
// previous exercise in that it uses React context. You should use this version of
// the pattern more often.

// const ToggleContext = createContext();
// ToggleContext.displayName = "ToggleContext";

// export function Toggle({ children }) {
//   const [on, setOn] = useState(false);
//   const toggle = () => setOn(!on);
//   return (
//     <ToggleContext.Provider value={{ on, toggle }}>
//       {children}
//     </ToggleContext.Provider>
//   );
// }

// function useToggle() {
//   return useContext(ToggleContext);
// }

// export function ToggleOn({ children }) {
//   const { on } = useToggle();
//   return on ? children : null;
// }

// export function ToggleOff({ children }) {
//   const { on } = useToggle();
//   return on ? null : children;
// }

// export function ToggleButton({ ...props }) {
//   const { on, toggle } = useToggle();
//   return <Switch on={on} onClick={toggle} {...props} />;
// }

// version 3:
// The Prop Collections and Getters Pattern allows your hook to
// support common use cases for UI elements people build with your hook.

// export function useToggle() {
//   const [on, setOn] = React.useState(false);
//   const toggle = () => setOn(!on);

//   return {
//     on,
//     toggle,
//     togglerProps: {
//       "aria-pressed": on,
//       onClick: toggle,
//     },
//   };
// }
// Version 4: The State Reducer Pattern

const callAll =
  (...fns) =>
  (...args) =>
    fns.forEach((fn) => fn?.(...args));

function toggleReducer(state, { type, initialState }) {
  switch (type) {
    case "toggle": {
      return { on: !state.on };
    }
    case "reset": {
      return initialState;
    }
    default: {
      throw new Error(`Unsupported type: ${type}`);
    }
  }
}

export function useToggle({ initialOn = false, reducer = toggleReducer } = {}) {
  const { current: initialState } = useRef({ on: initialOn });
  const [state, dispatch] = useReducer(reducer, initialState);
  const { on } = state;

  const toggle = () => dispatch({ type: "toggle" });
  const reset = () => dispatch({ type: "reset", initialState });

  function getTogglerProps({ onClick, ...props } = {}) {
    return {
      "aria-pressed": on,
      onClick: callAll(onClick, toggle),
      ...props,
    };
  }

  function getResetterProps({ onClick, ...props } = {}) {
    return {
      onClick: callAll(onClick, reset),
      ...props,
    };
  }

  return {
    on,
    reset,
    toggle,
    getTogglerProps,
    getResetterProps,
  };
}
