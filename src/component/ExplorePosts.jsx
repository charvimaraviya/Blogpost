import { useEffect, useState } from 'react';
import './ExplorePosts.css';
import { FaSearch } from "react-icons/fa";
import Card from "../component/Card";
import { Pagination } from './Pagination';
import { toast } from 'react-toastify';
import Confirmationmodal from './Confirmationmodel';

const ExplorePost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filteredPosts, setFilteredPosts] = useState ([]);
  const [form, setForm] = useState("");
  const [postId, setPostId] = useState("");
  const [showModel, setShowModel] = useState(false);

  const [currentPage ,setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  // const postsPerPage = 9;

  const [error, setError] = useState({});
  const [FormData, setFormData] = useState({
    title: "",
    body: "",
  });

  const handelChange = (key, value) => {
    setFormData({
      ...FormData,
      [key]: value
    });
  };

  const handleSearch =(e) => {
    const value = e.target.value;
    setSearch(value);
    setCurrentPage(1); //reset page on search
    const result = posts.filter((item) => 
      item.title.toLowerCase().includes(value.toLowerCase()) || item.body.toLowerCase().includes(value.toLowerCase())
    );
    console.log({result});

    setFilteredPosts(result);
    
  };

  const fetchData = async () => {
    const response = await fetch ("https://696b4b79624d7ddccaa0bd60.mockapi.io/CreatePost",{
      method: "GET"
    })
    console.log({ response });
    if(!response.ok) {
      alert("Somthing went wronge!!!");
      return;
    }
    const data = await response.json()
    const reverseData = [...data].reverse();
    console.log({ data });
    setPosts(data);
    setFilteredPosts(reverseData)
    setLoading(false);
  }
  useEffect(() => {
    console.log("UseEffect Running...");
    fetchData()
  },[]);

  //pagination calaulation (NO new list state)
  const startIndex = (currentPage - 1) * postsPerPage;  //(1-1*0 = 0)
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  console.log({startIndex,totalPages});

  const handleSubmit  = async (e) => {
    e.preventDefault();
    const newErrors = {};
      if (!FormData.title.trim()) newErrors.title = "Title is required";
      if (!FormData.body.trim()) newErrors.body = "Body is required";

      if (Object.keys(newErrors).length > 0) {
        setError(newErrors);
        return;
      }

    try{
      setLoading(true);
      const url = postId ? `https://696b4b79624d7ddccaa0bd60.mockapi.io/CreatePost/${postId}` : "https://696b4b79624d7ddccaa0bd60.mockapi.io/CreatePost" ;
      const method = postId ? "PUT" : "POST";
      const response = await fetch ( url,
        {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: FormData.title,
            image: postId ? FormData.image : `https://picsum.photos/seed/${Date.now()}/300/200`,
            body: FormData.body
          }),
        }
      );

      if(!response.ok) {
        toast.error("Invalid Request");
        return;
      }

      const data = await response.json();
      console.log("Post Added:",data);
      alert( postId ? "Post Updated successfully" : "Post Added successfully");
      fetchData();
      setFormData({ 
        title: "", 
        body: "", 
      }); 
      setForm(false);
    }catch(error){
      console.error("Error:",error.message);
    } finally {
      setLoading(false);
    }
  }

  const postDataGetById = async (id) => {
    try{
      setLoading(true);
      setPostId(id);
      const response = await fetch(
        `https://696b4b79624d7ddccaa0bd60.mockapi.io/CreatePost/${id}`,{ method: "GET" }
      );
      if(!response.ok){
        toast.error("Failed to fetch post by Id");
      }
      const data = await response.json();
      setFormData({
        title: data.title || "",
        body: data.body || "",
        image: data.image || ""
      });
      setForm(true);
    } catch (error) {
      console.error("GET BY ID API Errror:",error.message);
    } finally {
      setLoading(false)
    }
  }

  const openDeleteModel = (id) => {
    setPostId(id);
    setShowModel(true);
  };

  const deletePostById = async () => {
    try{
      setLoading(true);
      const response = await fetch(
        `https://696b4b79624d7ddccaa0bd60.mockapi.io/CreatePost/${postId}`,
        { 
          method: "DELETE" 
        }
      );
      if(!response.ok){
        toast.error("Failed to delete post");
      }
      await response.json();
      alert("Post deleted successfully");
      setShowModel(false);
      setPostId(null);
      //Refresh list
      fetchData();
    } catch (error) {
      console.error("DELETE API Errror:",error.message);
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
    <div >
      <div className="explore-container">
        <h2>Explore Posts</h2>

        <div className="search-box">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search item" value={search} onChange={handleSearch}/>
        </div>
      </div>

      <button className='create-btn' type='button' onClick={() => setForm(true)}>Create Form</button>

      {form && (
      <form className='explore-form' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Enter Title'
          value={FormData.title}
          onChange={(e) => handelChange("title", e.target.value)}
        />
        {error.title && <span className="error">{error.title}</span>}

        <input
          type='text'
          placeholder='Enter Body'
          value={FormData.body}
          onChange={(e) => handelChange("body", e.target.value)}
        />
        {error.body && <span className="error">{error.body}</span>}

        <div className='explore-btn'>
          {postId ? <button className='sub-btn' type='submit'>Update</button> 
                  : <button className='sub-btn' type='submit'>Submit</button>}
          <button className='can-btn' type='button' onClick={() => setForm(false)}>Canael</button>
        </div>

      </form>
      )}

      {loading ? (
        <h1 style={{ textAlign: "center" }}>Loading...</h1>
      ) : (
        <div className='explore-card'>
          {filteredPosts.slice(startIndex, startIndex + postsPerPage).map((item) => (
            <Card 
              key={item.id} 
              title={item.title} 
              body={item.body} 
              id={item.id}
              onDelete={() => openDeleteModel(item?.id)}
              onEdit={() => postDataGetById (item.id)} 
              from="explore" />
          ))}
        </div>
      )}
    </div>

    <div>
      <Pagination 
        currentPage = {currentPage}
        totalPages = {totalPages}
        onPrev = {() => setCurrentPage((p) => p - 1)}
        onNext = {() => setCurrentPage((p) => p + 1)}
        onPostsPerPageChange={(value) => {
          setPostsPerPage(value);
          setCurrentPage(1);
        }}
      />
    </div>

    {showModel && (
        <Confirmationmodal
          title="Delete?"
          desc="You are about to log out, are you sure?"
          onClose={() => {setShowModel (false); setPostId(null) }}
          onConfirm={deletePostById}
          confirmBtnText="Delete"
        />
      )}
    </>
  );
}
export default ExplorePost;

