import { Fragment, useEffect } from "react";
import { Route, useParams, Link, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

const QuoteDetail = () => {
  const params = useParams();
  const match = useRouteMatch();
  console.log(match);

  const {
    sendRequest,
    data: quoteData,
    status,
    error,
  } = useHttp(getSingleQuote, true);
  console.log("qid:" + params.qid);

  useEffect(() => {
    sendRequest(params.qid);
  }, []);

  console.log("status:" + status + " error:" + error);

  if (status === "pending") {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Fragment>
        <p1>Error while receiving quote</p1>
        <p1>{error}</p1>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <HighlightedQuote text={quoteData.text} author={quoteData.author} />

      <Route path={`${match.path}`} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>

      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};
export default QuoteDetail;
