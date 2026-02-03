import logo from "../assets/images/rajsthan.jpg";
import logo1 from "../assets/images/delhi.jpg";
import logo2 from "../assets/images/mumbai.jpg";
import logo3 from "../assets/images/kedarnath.jpg";
import logo4 from "../assets/images/shimala.jpg";
import logo5 from "../assets/images/kerla.jpg";
import Card from "../component/Card";
import Confirmationmodal from "../component/Confirmationmodel";
import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Snowfall from 'react-snowfall'
import Lottie from 'react-lottie-player';
import nodata from "../assets/images/NoData.json";
import scroll from "../assets/images/scroll.png"
import ModeContext from "../context/ModeContext";

/*  const Place = [ 
    {
      title: "Rajsthan",
      desc: "Rajasthan, India's largest state by area, is the Land of Kings in the northwest, famous for its vast Thar Desert, majestic forts and palaces (like Jaipur's Hawa Mahal), vibrant culture, colorful textiles, rich history of valor, spicy cuisine (Dal Baati Churma), and unique festivals, all encapsulated by its welcoming slogan, Padharo Mhare Desh ",
      image: logo,
    },
    {
      title: "Delhi",
      desc: "Delhi, India's capital, is a historic metropolis blending ancient monuments with modern vibrancy, serving as the nation's political heart and a major cultural hub, known for its rich history under various empires (Mughal, British), iconic sites like Red Fort & Qutub Minar, diverse cuisine, bustling markets, and efficient metro system",
      image: logo1,
    },
    {
      title: "Mumbai",
      desc: "Mumbai, India's financial capital and Maharashtra's capital, is a bustling coastal metropolis known as the heart of Bollywood, a major trade hub, and a city of contrasts with both glamour and significant poverty ",
      image: logo2,
    },
    {
      title: "Kedarnath",
      desc: "Kedarnath is a highly revered Hindu pilgrimage site in the Garhwal Himalayas, Uttarakhand, home to an ancient, massive stone temple dedicated to Lord Shiva, one of the 12 Jyotirlingas",
      image: logo3,
    },
    {
      title: "Shimla",
      desc: "Shimla is the capital of Himachal Pradesh, a popular tourist destination known as the Queen of the Hills",
      image: logo4,
    },
    {
      title: "Kerala",
      desc: "Kerala, India's God's Own Country, is a southwestern coastal state known for its lush backwaters, spice plantations, high literacy, and unique culture, blending tropical beauty with progressive development and rich traditions like Kathakali dance and Kalaripayattu martial arts, attracting tourists with its serene beaches, tea gardens, and vibrant heritage",
      image: logo5,
    },
  ]; */

export function HomePage() {
  /* const [PostData,setPostData] = useState([]); */
  const ctx = useContext(ModeContext);
  const [showModel, setShowModel] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const navigate = useNavigate();
  const allPostData = JSON.parse(localStorage.getItem("postData")) || [];
  console.log(allPostData);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if(element){
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openDeleteModal = (index) => {
    console.log(index, "Index");
    setSelectedIndex(index);
    setShowModel(true);
  };

  const clickHandler = (id) => {
    navigate(`/posts/${id}`);
  };

  const confirmDelete = () => {
    const updatedPostData = allPostData.filter((_, i) => i !== selectedIndex);
    console.log(updatedPostData, "UpdatedData");
    /* setPostData(updatedPostData); */
    localStorage.setItem("postData", JSON.stringify(updatedPostData));
    setShowModel(false);
  };

  const handleEdit = (id) => {
    console.log({ id });
    //pass data from one page to another
    navigate("/new-post", { state: { id } });
  }

  return (
   
      <div className={`container-home ${ctx.mode}`}>
      {/* <h1>Home Page</h1> */}
      <span id="top"></span>

      <h1>Created Post</h1>
      <div className="card">
        {allPostData.length === 0 ? (
          <Lottie
            loop
            animationData={nodata}
            play
            style={{
              width: 300,
              height: 300,
            }}
          />
        ) : (
          allPostData.map((item, index) => {
            console.log("item", item);

            return (
              <Card
                title={item.title}
                body={item.body}
                image={item.image}
                onDelete={() => openDeleteModal(index)}
                onRedirect={() => clickHandler(item.id)}
                onEdit={() => handleEdit(item.id)}
              />
            );
          })
        )}
        <img src={scroll} className="scroll-arrow" onClick={() => { scrollToSection('top') }} />
        <Snowfall color="#071c2e" snowflakeCount={100} />
      </div>
      {showModel && (
        <Confirmationmodal
          title="Delete Post"
          desc="Are you sure, you want to delete this post?"
          onClose={() => setShowModel(false)}
          onConfirm={confirmDelete}
          confirmBtnText="Delete"
        />
      )}
      </div>
    
  );
}
