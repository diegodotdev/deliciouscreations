export const parentVariants = {
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const childVariants = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
    },
  },
};
