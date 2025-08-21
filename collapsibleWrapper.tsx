import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

export const CollapsibleWrapper = ({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: ReactNode;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          layout
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: "auto", // Animate to the natural height of the content
            opacity: 1,
            transition: {
              height: { duration: 0.4, ease: "easeInOut" },
              opacity: { duration: 0.25, delay: 0.15 },
            },
          }}
          exit={{
            height: 0,
            opacity: 0,
            transition: {
              height: { duration: 0.4, ease: "easeInOut" },
              opacity: { duration: 0.25 },
            },
          }}
          style={{ overflow: "hidden" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
