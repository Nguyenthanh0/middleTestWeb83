import User from "../model/userModel.js";
import Post from "../model/postModel.js";
import Comment from "../model/commentModel.js";

//Buổi 4
//bài 1: Viết API việc đăng ký user, với userName, email; email là duy nhất
export const regisUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!email || !password || !username) {
      res.status(404).send("Email and password are required");
    }

    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();

    res.status(200).json({
      Message: "User create succesfully",
      user: newUser.toObject({ versionKey: false }),
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//bài 2 :Viết API cho phép user tạo bài post (thêm bài post).
export const createPost = async (req, res) => {
  try {
    const { userId, content, isPublic } = req.body;

    if (!userId || !content) {
      return res.status(400).json({ error: "userId and content are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newPost = new Post({
      userId,
      content,
      isPublic: isPublic !== undefined ? isPublic : true, // Mặc định là công khai
    });

    await newPost.save();

    res.status(201).json({
      message: "Post created successfully",
      post: newPost.toObject({ versionKey: false }),
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "There was an error creating the post" });
  }
};

//Bai 3
//Viết API cho phép user chỉnh sửa lại bài post (chỉ user tạo bài viết mới được phép chỉnh sửa).
export const fixPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, content, isPublic } = req.body;

    if (!userId || !content) {
      res.status(400).json("userId or content are required");
    }

    const post = await Post.findById(id);

    if (!post) {
      res.status(404).send("This Post is not exist");
    }

    // Check author
    if (post.userId.toString() !== userId) {
      return res.status(403).json({ message: "You can't change this Post" });
    }

    // update post
    post.content = content;
    post.isPublic = isPublic !== undefined ? isPublic : post.isPublic;
    post.updatedAt = new Date().toISOString();

    await post.save();

    res.status(200).json({
      message: "Post updated successfully",
      post,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "There was an error creating the post" });
  }
};
// Bài 4
//Viết API cho phép user được comment vào bài post.
export const createComment = async (req, res) => {
  try {
    const { content, userId, postId } = req.body;
    if (!userId || !content || !postId) {
      res.status(400).json("userId , content or postId are required");
    }

    const user = await User.findById(userId);
    const post = await Post.findById(postId);
    if (!user) {
      res.status(403).send("Unauthorized");
    }
    if (!post) {
      res.status(404).send("this post doesn't exist");
    }

    const comment = new Comment({
      userId,
      postId,
      content,
      createdAt: new Date().toISOString(), // Thêm thời gian tạo
    });

    await comment.save();

    res.status(200).json({
      message: "Create comment successfully",
      comment,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "There was an error creating the post" });
  }
};

//Bài 5
//Viết API cho phép user chỉnh sửa comment (chỉ user tạo comment mới được sửa).
export const fixComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, postId, content } = req.body;
    if (!userId || !content || !postId) {
      res.status(400).json("userId , content or postId are required");
    }

    const comment = await Comment.findById(id);

    if (
      comment.userId.toString() !== userId &&
      comment.postId.toString() !== postId
    ) {
      return res.status(403).json({ message: "You can't change this Comment" });
    }
    if (!comment) {
      res.status(404).send("this comment doesn't exist");
    }

    comment.content = content;
    comment.updatedAt = new Date().toISOString();

    await comment.save();

    res.status(200).json({
      message: "Update comment successfully",
      comment,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "There was an error creating the post" });
  }
};

//Bài 6
//Viết API lấy tất cả comment của một bài post.
export const getCommentsByPostId = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post does not exist" });
    }

    // Tìm tất cả các comment của bài post theo postId
    const comments = await Comment.find({ postId });
    // .populate(
    //   "userId",
    //   "username"
    // ); // Populate để lấy thêm thông tin user nếu cần

    // Trả về danh sách các comment
    res.status(200).json({
      message: "Comments fetched successfully",
      comments,
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "There was an error fetching the comments" });
  }
};
