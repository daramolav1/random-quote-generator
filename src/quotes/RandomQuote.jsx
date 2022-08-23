import { useState, useEffect } from "react";

export default function RandomQuote() {
  const [quotes, setQuotes] = useState({});
  const [currentQuote, setCurrentQuote] = useState({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadQuotes() {
      const response = await fetch(
        "https://quotes.stormconsultancy.co.uk/quotes.json"
      );
      const quotesFromAPI = await response.json();
      setQuotes(quotesFromAPI);
      document.body.style.backgroundColor = "#eee";
    }
    loadQuotes();
  }, []);

  useEffect(() => {
    function loadCurrentQuote() {
      setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length + 1)]);
    }
    loadCurrentQuote();
  }, [quotes]);

  const randomId = Math.floor(Math.random() * quotes.length + 1);

  const handleCopyQuote = () => {
    navigator.clipboard.writeText(`${currentQuote.quote}`);
    setCopied(true);
  };

  const handleNewQuote = () => {
    setCurrentQuote(quotes[randomId]);
    setCopied(false);
  };

  if (currentQuote) {
    return (
      <div className="container mt-5">
        <h1 className="text-center mb-5">Random Quote Generator</h1>
        <div className="card">
          <div className="card-body">
            <p>{currentQuote.quote}</p>
            <p>- {currentQuote.author}</p>
            <div className="d-flex justify-content-between">
              {copied ? (
                <p className="text-success">Quote copied to clipboard</p>
              ) : (
                <button className="btn" onClick={handleCopyQuote}>
                  <i className="bi-clipboard"></i>
                </button>
              )}
              <button className="btn" onClick={handleNewQuote}>
                <i className="bi-arrow-clockwise"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
