import { Fragment } from "react";
import { Route, useParams, Link } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";

const DUMMY_QUOTES = [
  {
    id: "q1",
    author: "Oscar Wilde",
    text: "Be yourself, everybody else is taken.",
  },
  {
    id: "q2",
    author: "Albert Einstein",
    text: "There are only two ways to live your life. One is as though nothing is a miracle. The other is as though everything is a miracle.",
  },
];

const QuoteDetail = () => {
  const params = useParams();
  const quote = DUMMY_QUOTES.find((quote) => quote.id === params.qid);
  if (!quote) {
    return <p>No Quote found!</p>;
  }
  return (
    <Fragment>
      {/* <HighlightedQuote text={quote.text} author={quote.author} /> */}
      <h1>{quote.text}</h1>
      <p1>{quote.author}</p1>

      <Route path={`/quotes/${quote.id}`} exact>
        <div className="centered">
          <Link className="btn--flat" to={`/quotes/${quote.id}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>

      <Route path={`/quotes/${quote.id}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};
export default QuoteDetail;
