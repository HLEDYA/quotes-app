import QuoteList from "../components/quotes/QuoteList";
import { Fragment } from "react";

const AllQuotes = () => {
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

  return (
    <Fragment>
      <h1>All Quotes</h1>
      <QuoteList quotes={DUMMY_QUOTES} />
    </Fragment>
  );
};
export default AllQuotes;
