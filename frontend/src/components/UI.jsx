import { motion } from "framer-motion";

// Reusable Loader Component
export const Loader = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12",
  };

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} rounded-full border-2 border-slate-200 border-t-sky-600 animate-spin`}
      />
    </div>
  );
};

// Reusable Skeleton Components
export const PostSkeleton = () => (
  <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-5 animate-pulse">
    {/* User Info Skeleton */}
    <div className="flex items-center gap-3 mb-4">
      <div className="h-10 w-10 rounded-full bg-slate-200" />
      <div className="flex-1">
        <div className="h-4 bg-slate-200 rounded w-24 mb-2" />
        <div className="h-3 bg-slate-200 rounded w-16" />
      </div>
    </div>

    {/* Image Skeleton */}
    <div className="h-64 bg-slate-200 rounded-2xl mb-4" />

    {/* Content Skeleton */}
    <div className="space-y-2 mb-4">
      <div className="h-4 bg-slate-200 rounded w-full" />
      <div className="h-4 bg-slate-200 rounded w-3/4" />
    </div>

    {/* Actions Skeleton */}
    <div className="flex items-center gap-6">
      <div className="h-5 w-12 bg-slate-200 rounded" />
    </div>
  </div>
);

export const ProfileSkeleton = () => (
  <div className="max-w-2xl mx-auto">
    <div className="bg-white border border-slate-200 rounded-3xl p-6 mb-6 shadow-sm animate-pulse">
      <div className="flex items-center gap-5">
        <div className="h-20 w-20 rounded-full bg-slate-200" />
        <div className="flex-1 space-y-2">
          <div className="h-6 bg-slate-200 rounded w-32" />
          <div className="h-4 bg-slate-200 rounded w-48" />
        </div>
        <div className="h-10 w-20 bg-slate-200 rounded-xl" />
      </div>
    </div>
  </div>
);

export const CommentSkeleton = () => (
  <div className="bg-slate-50 px-4 py-3 rounded-xl animate-pulse">
    <div className="flex items-center gap-3 mb-2">
      <div className="h-8 w-8 rounded-full bg-slate-200" />
      <div className="h-4 bg-slate-200 rounded w-20" />
    </div>
    <div className="h-3 bg-slate-200 rounded w-3/4" />
  </div>
);

// Reusable Empty State Component
export const EmptyState = ({
  icon,
  title,
  description,
  action,
  className = "",
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className={`text-center py-12 ${className}`}
  >
    {icon && <div className="mx-auto mb-4 text-6xl text-slate-300">{icon}</div>}
    <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
    {description && (
      <p className="text-slate-500 mb-4 max-w-sm mx-auto">{description}</p>
    )}
    {action}
  </motion.div>
);

// Page Transition Wrapper
export const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

// Fade In Animation
export const FadeIn = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

// Scale Button Animation
export const ScaleButton = ({
  children,
  onClick,
  disabled = false,
  className = "",
  ...props
}) => (
  <motion.button
    whileTap={{ scale: disabled ? 1 : 0.95 }}
    whileHover={{ scale: disabled ? 1 : 1.02 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
    onClick={onClick}
    disabled={disabled}
    className={`${disabled ? "cursor-not-allowed" : "cursor-pointer"} ${className}`}
    {...props}
  >
    {children}
  </motion.button>
);

// Modal Animation
export const ModalAnimation = ({ children, isOpen }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: isOpen ? 1 : 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 py-6"
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: isOpen ? 1 : 0.9, opacity: isOpen ? 1 : 0 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-full max-w-md rounded-3xl bg-white shadow-2xl ring-1 ring-black/10 overflow-hidden"
    >
      {children}
    </motion.div>
  </motion.div>
);
