export const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    },
    exit: {
        opacity: 0,
        y: -30,
        transition: {
            duration: 0.5,
            ease: "easeIn"
        }
    }
};

export const staggerChildren = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

export const cardHover = {
    rest: { scale: 1 },
    hover: {
        scale: 1.02,
        transition: {
            duration: 0.3,
            ease: "easeInOut"
        }
    }
};
