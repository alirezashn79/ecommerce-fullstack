import React from "react";

const MoreInfoes = ({
  smell,
  weight,
  suitableFor,
}: {
  smell: string;
  weight: number;
  suitableFor: string;
}) => {
  return (
    <div>
      <p>اطلاعات بیشتر :</p>
      <hr />
      <main>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>وزن</p>
          <p>{weight}</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>بو</p>
          <p>{smell}</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p>مناسب برای</p>
          <p>{suitableFor}</p>
        </div>
      </main>
    </div>
  );
};

export default MoreInfoes;
