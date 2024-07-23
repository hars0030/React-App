import { useEffect } from "react";

export default function FeedbackBar({ msg, onTimeOut }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onTimeOut("clear");
    }, 4000);
    return () => {
      clearTimeout(timer);
    };
  }, [msg]);

  return (
    <>
      <h3 className="w-full bg-green-400 text-black p-6">
        {msg === "wrongKeyword"
          ? "No matching locations"
          : "You have the maximum locations. Please remove one before adding another"}
      </h3>
    </>
  );
}
