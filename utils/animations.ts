export const popupAnimation = {
  initial: {
    opacity: 0,
    scale: 0.8,
    left: "50%",
    translateX: "-50%",
    top: "50%",
    translateY: "-50%",
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.8,
  },
  transition: { duration: 0.42, ease: "easeInOut" },
};

export const popupBackgroundAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.21, ease: "easeInOut" },
};

export const appearanceAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.42, ease: "easeInOut" },
};

export const topAppearanceAnimation = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: "auto" },
  exit: { opacity: 0, height: 0 },
  transition: { duration: 0.42, ease: "easeInOut" },
};

export const leftAppearanceAnimation = {
  initial: { opacity: 0, right: -1000 },
  animate: { opacity: 1, right: 0 },
  exit: { opacity: 0, right: -1000 },
  transition: { duration: 0.42, ease: "easeInOut" },
};

export const rightAppearanceAnimation = {
  initial: { opacity: 0, left: -1000 },
  animate: { opacity: 1, left: 0 },
  exit: { opacity: 0, left: -1000 },
  transition: { duration: 0.42, ease: "easeInOut" },
};

export const collapseAnimation = {
  initial: { height: 0, opacity: 0 },
  animate: { height: "auto", opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.42, ease: "easeInOut" },
};

export const brandAnimation = (idx: number) => {
  const isEven = idx % 2 === 0;

  return {
    initial: { opacity: 0, y: isEven ? 21 : -21 },
    animate: { opacity: 1, y: 0 }, // opacity должен быть 1
    transition: {
      duration: 0.42,
      ease: "easeInOut",
      delay: 0.1 * idx, // Общая задержка применяется ко всем свойствам
    },
    viewport: { once: true },
  };
};
