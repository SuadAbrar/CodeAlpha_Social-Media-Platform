import { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success", duration = 4000) => {
    const id = Date.now();
    const toast = { id, message, type };

    setToasts((prev) => [...prev, toast]);

    // Auto remove after duration
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

const ToastContainer = ({ toasts, removeToast }) => (
  <div className="fixed top-4 right-4 z-50 space-y-2">
    <AnimatePresence>
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </AnimatePresence>
  </div>
);

const Toast = ({ toast, onRemove }) => {
  const { id, message, type } = toast;

  const typeStyles = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    warning: "bg-yellow-500 text-white",
    info: "bg-blue-500 text-white",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.3 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.5, transition: { duration: 0.2 } }}
      className={`px-4 py-3 rounded-xl shadow-lg ${typeStyles[type]} flex items-center gap-3 min-w-75 max-w-md`}
    >
      <span className="flex-1 text-sm font-medium">{message}</span>
      <button
        onClick={() => onRemove(id)}
        className="text-white/80 hover:text-white transition-colors"
      >
        ✕
      </button>
    </motion.div>
  );
};
