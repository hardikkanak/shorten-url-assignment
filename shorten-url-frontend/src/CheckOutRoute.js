import "./App.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function CheckOutRoute() {
  let { code } = useParams();
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchSingleData(code);
  }, []);

  async function fetchSingleData(shortener_link) {
    setMessage("Loading");
    let response = await fetch(
      `http://127.0.0.1:8000/getLongURLFromGenerated/${shortener_link}`
    );

    if (response.status == 200) {
      let jsonData = await response.json();

      if (jsonData.status == 1) {
        window.location.replace(jsonData.data.original_url);
      } else {
        console.log(jsonData.message);
        setMessage(jsonData.message);
      }
    }
  }

  return <div className="App flex-container w-75">{<h1>{message}</h1>}</div>;
}

export default CheckOutRoute;
