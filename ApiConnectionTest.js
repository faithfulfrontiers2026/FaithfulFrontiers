
import { useEffect, useState } from "react";
import { checkHealth } from "../services/api";

export default function ApiConnectionTest() {
  const [status, setStatus] = useState("Checking API...");

  useEffect(() => {
    checkHealth()
      .then((data) => {
        setStatus(`API Status: ${data.status}`);
      })
      .catch((error) => {
        setStatus(`API Error: ${error.message}`);
      });
  }, []);

  return (
    <div>
      <h3>Backend Connection</h3>
      <p>{status}</p>
    </div>
  );
}
