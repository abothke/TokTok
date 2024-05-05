import { Comment } from "../comment/comment.model.js";
import { User } from "../user/user.model.js";
import { Post } from "./post.model.js";
import { uploadImage } from "../utils/uploadImage.js";

export const getPosts = async (req, res) => {
  const posts = await Post.find().sort({ date: -1 }).populate("authorId");
  res.json(posts);
};

export const getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
};

export const getPostsByUserId = async (req, res) => {
  const post = await Post.find({ authorId: req.params.userId }).sort({
    date: -1,
  });
  res.json(post);
};

export const getCommentsByPost = async (req, res) => {
  const post = await Post.findById(req.params.id).populate("comments");
  if (!post) res.status(401).json({ message: "Post not found" });
  res.json(post.comments);
};

export const createPost = async (req, res) => {
  const { caption, location } = req.body;
  const { userId } = req.params;
  const response = await uploadImage(req.file.buffer);
  const imageUrl = response.secure_url;
  console.log(imageUrl);
  const user = await User.findById(userId);
  const newPost = new Post({
    caption,
    imageUrl,
    username: user.username,
    authorId: userId,
    location,
  });
  await newPost.save();
  if (!newPost) {
    res.json({ message: "Post not created" });
  }
  res.json(newPost);
};

export const addComment = async (req, res) => {
  const { id, userId } = req.params;
  const { content } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newComment = new Comment({
      content,
      username: user.username,
      authorId: userId,
    });

    await newComment.save();
    const updatedPost = await Post.findByIdAndUpdate(
      { _id: id },
      { $push: { comments: newComment } },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ message: "Comment added", post: updatedPost });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Failed to add comment" });
  }
};
export const deletePost = async (req, res) => {
  const { id, userId } = req.params;
  const post = await Post.findById(id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  if (post.authorId.toString() !== userId) {
    return res
      .status(403)
      .json({ message: "Unauthorized to delete this post" });
  }

  const deletedPost = await Post.findByIdAndDelete(id);
  if (!deletedPost) {
    return res.status(401).json({ message: "Post not deleted" });
  }

  res.json(deletedPost);
};

export const deleteComment = async (req, res) => {
  const { postId, commentId, userId } = req.params;

  const comment = await Comment.findById(commentId);
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  if (comment.authorId.toString() !== userId) {
    return res
      .status(403)
      .json({ message: "Unauthorized to delete this comment" });
  }

  const deletedComment = await Comment.findByIdAndDelete(commentId);
  if (!deletedComment) {
    return res.status(401).json({ message: "Comment not deleted" });
  }

  const updatePost = await Post.findByIdAndUpdate(
    { _id: postId },
    { $pull: { comments: commentId } }
  );
  if (!updatePost) {
    return res.status(401).json({ message: "Comment not deleted from post" });
  }

  res.json(updatePost);
};

export const like = async (req, res) => {
  const { postId, userId } = req.params;
  const post = await Post.findById({ _id: postId });
  if (post.likes.includes(userId)) {
    await Post.findByIdAndUpdate({ _id: postId }, { $pull: { likes: userId } });
  } else {
    await Post.findByIdAndUpdate({ _id: postId }, { $push: { likes: userId } });
  }
  res.json(post);
};
