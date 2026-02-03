import { useEffect, useState } from "react";
import "./Createformpost.css";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Lottie from 'react-lottie-player';
import loader from "../assets/images/loader.json";

export default function Createpost() {
  const [loading, setLoading] = useState(false);
  const [createPostFormData, setCreatePostFormData] = useState({
    title: "",
    body: "",
    image: "",
  });
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location, "Location Value");
  const editPostId = location.state?.id || null;

  console.log({ editPostId });

  const handelChange = (field, value) => {
    console.log({ field, value });
    // clear error msg when value is input
    setError((e) => ({ ...e, [field]: "" }));
    // store form value in state
    setCreatePostFormData({ ...createPostFormData, [field]: value });
  };
  console.log("editPostId", editPostId);

  //automatically fill data in form(useEffect used to perform side effect)
  useEffect(() => {
    if (!editPostId) return;
    const posts = JSON.parse(localStorage.getItem("postData")) || [];
    const postToEdit = posts.find((p) => p.id === editPostId);
    console.log(postToEdit, "Post data");
    if (postToEdit) {
      setCreatePostFormData({
        title: postToEdit.title,
        body: postToEdit.body,
        image: postToEdit.image,
      });
    }
  }, [editPostId]);

  console.log("createPostFormData", createPostFormData);

  const handleImageChange = (file) => {
    if (!file) return;
    console.log({ file });

    // file upload validation
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      setError((e) => ({
        ...e,
        image: "Only JPG,JPEG,PNG Images are allowed",
      }));
      return;
    }

    // convert the image in base64 code
    const reader = new FileReader();
    reader.onloadend = () => {
      setCreatePostFormData({ ...createPostFormData, image: reader.result });
      setError((e) => ({ ...e, image: "" }));
    };
    reader.readAsDataURL(file);
  };

  console.log(createPostFormData.image);

  const handleSubmit = (e) => {
    e.preventDefault();

    // validation
    const newErrors = {};
    if (!createPostFormData.title.trim()) newErrors.title = "Title is required";
    if (!createPostFormData.body.trim()) newErrors.body = "Body is required";
    if (!createPostFormData.image) newErrors.image = "Image is required";
    setError(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setLoading(true); // loader start

    setTimeout(() => {
      const existingPosts = JSON.parse(localStorage.getItem("postData")) || [];

      if (editPostId) {
        const updatedPosts = existingPosts.map((p) =>
          p.id === editPostId ? { ...p, ...createPostFormData } : p
        );
        localStorage.setItem("postData", JSON.stringify(updatedPosts));
        toast.success("Post updated successfully");
      } else {
        const updatedPosts = [
          ...existingPosts,
          { id: uuidv4(), ...createPostFormData },
        ];
        localStorage.setItem("postData", JSON.stringify(updatedPosts));
        toast.success("Post added successfully");
      }

      setLoading(false); // loader stop
      navigate("/"); // navigate AFTER operation complete
    }, 2500);
  };
  return (
    <>
      {loading && (
        <div className="loader-wrapper">
          <Lottie
            loop
            animationData={loader}
            play
            style={{
              width: 300,
              height: 300,
            }}
          />
          <p>Loading posts...</p>
        </div>
      )}
      <div className="main-container">
        <h1>{editPostId ? "Edit This Post" : "Let's Create New Post"}</h1>

        <form className="post-container" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Title"
            value={createPostFormData.title}
            onChange={(e) => handelChange("title", e.target.value)}
          />
          {error.title && <span className="error">{error.title}</span>}

          <textarea
            type="text"
            placeholder="Enter Body"
            rows={5}
            value={createPostFormData.body}
            onChange={(e) => handelChange("body", e.target.value)}
          />
          {error.body && <span className="error">{error.body}</span>}
          <input
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            onChange={(e) => handleImageChange(e.target.files[0])}
          />
          {error.image && <span className="error">{error.image}</span>}

          {createPostFormData.image && <img src={createPostFormData.image} />}

          {/* button change text */}
          <div className="post-btn">
            {editPostId ? (
              <button
                type="button"
                className="btn-post-cancel"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
            ) : (
              ""
            )}
            <button className="btn-post">
              {editPostId ? "Update Post" : "Add Post"}
            </button>
          </div>
          <ToastContainer />
        </form>
      </div>
    </>
  );
}
