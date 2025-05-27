import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: 'pending' | 'active' | 'ended';
  text: string;
}

export function StatusBadge({ status, text }: StatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case 'pending':
        return {
          badge: 'bg-gray-100 text-gray-600',
          dot: 'bg-gray-400'
        };
      case 'active':
        return {
          badge: 'bg-emerald-100 text-emerald-600',
          dot: 'bg-emerald-400 animate-pulse-glow'
        };
      case 'ended':
        return {
          badge: 'bg-red-100 text-red-600',
          dot: 'bg-red-400'
        };
    }
  };

  const styles = getStatusStyles();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "inline-flex items-center space-x-2 px-4 py-2 rounded-full",
        styles.badge
      )}
    >
      <div className={cn("w-2 h-2 rounded-full", styles.dot)} />
      <span className="text-sm font-medium">{text}</span>
    </motion.div>
  );
}
