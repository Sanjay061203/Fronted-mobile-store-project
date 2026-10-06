import { useEffect } from "react";

function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  return (
    <div className={`toast-notification ${type}`}>
      <span>{message}</span>
      <button onClick={onClose}>×</button>
    </div>
  );
}

export default Toast;