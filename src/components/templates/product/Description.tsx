const Description = ({
  productName,
  longDescription,
}: {
  productName: string;
  longDescription: string;
}) => {
  return (
    <div>
      <p>توضیحات :</p>
      <hr />
      <h3>{productName}</h3>

      <p>{longDescription}</p>
    </div>
  );
};

export default Description;
