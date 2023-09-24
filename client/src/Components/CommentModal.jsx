import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const CommentModal = ({ makeComment, post, setShowComment }) => {
  return (
    <div
      style={{
        border: "1px solid black",
        width: "50%",
        height: "40%",
        backgroundColor: "beige",
        borderRadius: "10px",
      }}
    >
      <h4>kaushal</h4>
      <AiOutlineClose onClick={() => setShowComment(false)} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          makeComment(e.target[0].value, post._id);
        }}
      >
        <input
          type="text"
          placeholder="comment here..."
          style={{
            width: "100%",
          }}
        />
      </form>
      {/* {post.comments.map((record) => {
        return (
          <h6>
            <span>{record.commentedBy.name}</span>
            {record.text}
          </h6>
        );
      })} */}
    </div>
  );
};

export default CommentModal;
