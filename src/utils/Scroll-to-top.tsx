"use client";

import { MdKeyboardArrowUp } from "react-icons/md";
import styles from "@/styles/ScrollToTop.module.css";
import { useWindowScroll } from "@uidotdev/usehooks";

const ScrollToTop = () => {
  const [{ y }, scrollTo] = useWindowScroll();
  return (
    <button
      onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
      className={!y || y < 120 ? styles.button : styles.buttonVisible}
    >
      <MdKeyboardArrowUp />
    </button>
  );
};

export default ScrollToTop;
