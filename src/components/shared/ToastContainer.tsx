// ToastContainer.tsx
import React from "react";

interface ToastMessage {
  id: number;
  type: "success" | "error" | "info";
  message: string;
}

interface Props {
  toasts: ToastMessage[];
  removeToast: (id: number) => void;
}

const ToastContainer: React.FC<Props> = ({ toasts, removeToast }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      {toasts.map(({ id, type, message }) => (
        <div
          key={id}
          onClick={() => removeToast(id)}
          style={{
            cursor: "pointer",
            padding: "10px 20px",
            borderRadius: 4,
            color: "#fff",
            minWidth: 200,
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            backgroundColor: type === "success" ? "green" : type === "error" ? "red" : "gray",
          }}
        >
          {message}
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
