import { IoStatsChart } from "react-icons/io5";
import styles from "./box.module.css";

interface IBoxProps {
  title: string;
  value: string;
}

const Box = async ({ title, value }: IBoxProps) => {
  return (
    <div className={styles.box}>
      <span>{value}</span>
      <div>
        <p>{title}</p>
        <IoStatsChart className={styles.box_chart_icon} />
      </div>
    </div>
  );
};

export default Box;
