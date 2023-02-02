import React, {
  useState,
  createContext,
  useContext,
  Children,
  cloneElement,
} from "react";
import { Switch } from "./switch";

// Versiion 1:
// The Compound Components Pattern enables you to provide a set of
// components that implicitly share state for a simple yet powerful declarative API for reusable components:
export function Toggle({ children }) {
  console.log("children", children);
  const [on, setOn] = useState(false);
  const toggle = () => setOn(!on);

  return Children.map(children, (child) => {
    return typeof child.type === "string"
      ? child
      : cloneElement(child, { on, toggle });
  });
}

export const ToggleOn = ({ on, children }) => {
  return on ? children : null;
};

export const ToggleOff = ({ on, children }) => {
  return on ? null : children;
};

export const ToggleButton = ({ on, toggle, ...props }) => {
  return <Switch on={on} onClick={toggle} {...props} />;
};

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
