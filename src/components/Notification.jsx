import React from "react";
import { useState } from "react";

export default function Notification(props) {
  const { color, position = "bottom-8 right-14", children } = props;
  const [show, setShow] = useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 2000);
  }, [show]);

  if (!show) return null;

  return (
    <>
      <div
        className={`${color} ${position} flex items-center justify-center gap-2 rounded absolute bottom-8 right-14 px-6 py-2 `}
      >
        {children}
      </div>
    </>
  );
}
