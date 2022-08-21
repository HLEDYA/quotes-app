import QuoteForm from "../components/quotes/QuoteForm";
import { useHistory } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";
import { Fragment } from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { useState } from "react";

const NewQuote = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const { sendRequest, status } = useHttp(addQuote, true);

  const addQuoteHandler = (quoteData) => {
    console.log(quoteData);
    setIsLoading(true);
    sendRequest(quoteData);
  };

  if (status === "completed") {
    setIsLoading(false);
    history.push("/quotes");
  }

  return (
    <Fragment>
      {isLoading && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      <QuoteForm onAddQuote={addQuoteHandler} />
    </Fragment>
  );
};
export default NewQuote;
