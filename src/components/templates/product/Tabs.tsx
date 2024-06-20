"use client";
import { useState } from "react";
import Comments from "./Comments";
import Description from "./Description";
import MoreInfoes from "./MoreInfoes";
import styles from "./tabs.module.css";
import { IFComment } from "types/auth";
const Tabs = ({
  comments,
  productName,
  longDescription,
  smell,
  weight,
  suitableFor,
}: {
  comments: IFComment[];
  productName: string;
  longDescription: string;
  smell: string;
  weight: number;
  suitableFor: string;
}) => {
  const [tab, setTab] = useState("description");
  return (
    <div data-aos="fade-left" className={styles.tabs}>
      <input
        onClick={() => setTab("description")}
        type="radio"
        id="description"
        name="tab-control"
        defaultChecked={tab === "description" && true}
      />
      <input
        onClick={() => setTab("moreInfoes")}
        type="radio"
        id="moreInfoes"
        name="tab-control"
        defaultChecked={tab == "moreInfoes" && true}
      />
      <input
        onClick={() => setTab("comments")}
        type="radio"
        id="comments"
        name="tab-control"
        defaultChecked={tab == "comments" && true}
      />
      <ul>
        <li title="Features">
          <label htmlFor="description" role="button">
            {" "}
            توضیحات{" "}
          </label>
        </li>
        <li title="Delivery Contents">
          <label htmlFor="moreInfoes" role="button">
            {" "}
            اطلاعات بیشتر{" "}
          </label>
        </li>
        <li title="Shipping">
          <label htmlFor="comments" role="button">
            {" "}
            نظرات ({comments.length}){" "}
          </label>
        </li>
      </ul>

      <div className={styles.contents}>
        <section className={styles.tabs_content}>
          <Description
            productName={productName}
            longDescription={longDescription}
          />
        </section>
        <section className={styles.tabs_content}>
          <MoreInfoes smell={smell} weight={weight} suitableFor={suitableFor} />
        </section>
        <section className={styles.tabs_content}>
          <Comments productName={productName} comments={comments} />
        </section>
      </div>
    </div>
  );
};

export default Tabs;
