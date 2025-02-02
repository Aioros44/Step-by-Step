import { Link } from "react-router-dom";

function Card({ model, images, totalPrice, id }) {
  // console.log(model)
  return (
    <div className="card  w-96 bg-base-100  shadow-xl m-5">
      <Link to={`/home/${id}`}>
        <figure className="cursor-pointer">
          <img width={"180px"} src={images} alt="Shoes" />
        </figure>
      </Link>
      <div className="card-body text-left justify-between ">
        <h2 className="card-title min-h-8">{model}</h2>
        <div className="card-actions">
          <span className="font-bold text-xl  ">{`$${totalPrice}`}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
