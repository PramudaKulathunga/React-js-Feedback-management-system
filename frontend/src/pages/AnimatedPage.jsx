import { motion } from "framer-motion";

const animation = {
    initial: { opacity: 0.7 },
    animate: { opacity: 1},
    exit: { opacity: 0.7 }
};

const AnimatedPage = ({ children }) => {
    return (
        <motion.div
            variants={animation}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 1 }}>{children}
        </motion.div>
    );
}

export default AnimatedPage