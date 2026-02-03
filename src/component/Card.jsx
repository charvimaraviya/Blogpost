
import "./Card.css";

const Card = (props) => {
  const loggedINUserData = JSON.parse(localStorage.getItem("loginData")) || {}
return (
    <>
      <div className="card-container">
        <div className="icon-center" onClick={props.onRedirect}>
          <img src={props.image ? props.image : `https://picsum.photos/id/${props.id}/500/300`} alt="" />
        </div>
        <div className="card-contain">
          <h2>{props.title}</h2>
          <p>{props.body.length > 100 ? props.body.substring(0,100) + "..." : props.body}</p>
        </div>

       
        {loggedINUserData ?.role === "admin" ? (
              <div className="btn-main">
                <button className="btn1" onClick={props.onEdit}>Edit</button>
                <button className="btn2" onClick={props.onDelete}>Delete</button>
              </div>
       ) : <></> }
      </div>
      
    </>
  );
};
export default Card;
