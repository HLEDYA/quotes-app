import QuoteList from "../components/quotes/QuoteList";
import { Fragment, useEffect } from "react";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";

const AllQuotes = () => {
  const {
    sendRequest,
    data: allQuotesData,
    status,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest(getAllQuotes);
  }, [sendRequest]);

  console.log("status:" + status + " error:" + error);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (
    status === "completed" &&
    allQuotesData !== null &&
    allQuotesData.length > 0
  ) {
    return (
      <Fragment>
        <h1>All Quotes</h1>
        <QuoteList quotes={allQuotesData} />
      </Fragment>
    );
  }

  if (error) {
    return (
      <div className="centered">
        <h1>{error}</h1>
      </div>
    );
  }

  return <NoQuotesFound />;
};
export default AllQuotes;
