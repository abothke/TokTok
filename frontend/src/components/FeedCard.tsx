import { addLike } from "@/lib/api";
import { useState } from "react";
import FeedHeader from "./FeedHeader";
import { Store, useStore, Post } from "@/zustand";
import "./animations.css";
import { useNavigate } from "react-router-dom";

const FeedCard = ({ post }: { post: Post }) => {
  const { user, loadCurrentUserData } = useStore() as Store;
  const [isLiked, setIsLiked] = useState(post.likes.includes(user!._id));
  const [isClicked, setIsClicked] = useState(false);

  const navigate = useNavigate();

  const navigateToPost = (id) => {
    navigate(`/post/${id}`);
  };

  const handleLike = async () => {
    setIsClicked(!isLiked);
    setIsLiked(!isLiked);
    await addLike(post._id, user!._id);
    loadCurrentUserData();
  };

  return (
    <>
      <section className="m-3">
        <FeedHeader key={post._id} profile={post.authorId} />
        <img className=" min-w-full rounded-3xl" src={post.imageUrl} alt="" />
        <div className="m-3 flex">
          <div className="flex m-3">
            <button onClick={handleLike}>
              <img
                className={
                  post?.likes.includes(user!._id) ? "jello-horizontal" : ""
                }
                src={
                  post.likes.includes(user!._id)
                    ? "./img/liked.svg"
                    : "./img/favorites.svg"
                }
                alt=""
              />
            </button>
            <p className="m-2 min-w-6">{post?.likes.length}</p>
          </div>
          <div className="flex m-3">
            <button
              onClick={() => {
                navigateToPost(post._id);
              }}
            >
              <img src="./img/comment.svg" alt="" />
            </button>
            <p className="m-2">{post?.comments.length}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeedCard;
