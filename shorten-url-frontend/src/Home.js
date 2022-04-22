import "./App.css";
import { useEffect, useState } from "react";
import { format } from "date-fns";

function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [error, setError] = useState(false);
  const [generatedUrlList, setGeneratedUrlList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchALLData();
  }, []);

  async function fetchALLData() {
    try {
      setLoading(true);
      let response = await fetch(`http://127.0.0.1:8000/getAllGeneratedURL`);
      console.log(response);

      setLoading(false);
      if (response.status == 200) {
        let jsonData = await response.json();
        console.log(jsonData.data);
        setGeneratedUrlList(jsonData.data);
      }
    } catch (err) {
      setLoading(false);
    }
  }

  async function GenerateShortUrl(original_url) {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          original_url: original_url,
        }),
      };

      console.log("aefawe");
      let response = await fetch(
        `http://127.0.0.1:8000/generatNewURL`,
        requestOptions
      );
      return response;
    } catch (err) {
      return err;
    }
  }

  return (
    <div className="App flex-container">
      <div className="w-50 m-auto">
        <h1 className="mt-4">Shorten URL creator</h1>
        <div className="mt-4 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <div className="d-flex">
            <input
              className="w-75 form-control"
              type="text"
              style={{ color: "#002F4B", fontWeight: "500" }}
              required
              value={originalUrl}
              placeholder="https://some.domain.com/some-path-to/somewhere"
              onChange={(e) => {
                setError(false);
                setOriginalUrl(e.target.value);
              }}
            />
            <button
              disabled={loading}
              className="w-25 p-3"
              onClick={async (e) => {
                e.preventDefault();
                if (originalUrl == "") {
                  setError(true);
                } else {
                  console.log(originalUrl);
                  setOriginalUrl("");
                  var generatedURL = await GenerateShortUrl(originalUrl);
                  fetchALLData();
                }
              }}
            >
              Submit
            </button>
          </div>

          {error ? (
            <p style={{ color: "red", textAlign: "start", fontSize: 20 }}>
              field is required!!
            </p>
          ) : (
            <></>
          )}

          <div className="mt-4 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 p-0">
            {loading ? (
              <h3>Loading...</h3>
            ) : generatedUrlList.length == 0 ? (
              <h3>No previous record found!!!</h3>
            ) : (
              <></>
            )}
            {generatedUrlList.length > 0 ? (
              generatedUrlList.map((obj, index) => (
                <div
                  style={{ border: "1px solid #dde1e5" }}
                  className="d-flex bd-highlight mt-2  w-100 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 p-1 "
                >
                  <div style={{ width: "90%" }}>
                    <div
                      className="px-2 w-100 bd-highlight text-justify"
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "80ch",
                      }}
                    >
                      <b>{obj.original_url}</b>
                    </div>
                    <div className="px-2 mt-3 w-100 bd-highlight text-justify">
                      <b>Generated URL:</b>
                      <a href={`${obj.shortener_link}`}>
                        {"http://localhost:3000/" + obj.shortener_link}
                      </a>
                    </div>
                    <div className="px-2 pt-2 w-100 bd-highlight text-justify">
                      {format(new Date(obj.created_on), "yyyy-MM-dd HH:mm a")}
                    </div>
                  </div>

                  <button
                    style={{ width: "10%" }}
                    className="btn btn-primary"
                    onClick={(e) => {
                      window.open(
                        "http://localhost:3000/" + obj.shortener_link
                      );
                    }}
                  >
                    GO
                  </button>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
