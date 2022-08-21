import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "../comments/CommentsList";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();

  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);

  useEffect(() => {
    sendRequest(params.qid);
  }, [params.qid, sendRequest]);

  const addedCommentHandler = useCallback(() => {
    console.log("addedCommentHandler called");
    sendRequest(params.qid);
    setIsAddingComment(false);
  }, [sendRequest, params.qid]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  let comments;
  if (status === "pending") {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === "completed" && loadedComments && loadedComments.length > 0) {
    comments = <CommentsList comments={loadedComments} />;
  } else {
    comments = <p className="centered">No comments were added yet!</p>;
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {isAddingComment && (
        <NewCommentForm qid={params.qid} onAddedComment={addedCommentHandler} />
      )}
      {comments}
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
    </section>
  );
};

export default Comments;
