
const API_BASE_URL =
  "https://pp9z4yaz68.execute-api.us-east-2.amazonaws.com";

/**
 * Sends requests to Faithful Frontiers API Gateway.
 */
async function apiRequest(endpoint, options = {}) {
  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers
      }
    }
  );

  let result;

  try {
    result = await response.json();
  } catch {
    throw new Error("Invalid response from backend");
  }

  if (!response.ok) {
    throw new Error(
      result.error?.message ||
      result.message ||
      `API request failed: ${response.status}`
    );
  }

  return result.data;
}

// GET /health
export function checkHealth() {
  return apiRequest("/health");
}

// GET /destinations
export function getDestinations() {
  return apiRequest("/destinations");
}

// GET /destinations/{id}
export function getDestination(id) {
  return apiRequest(
    `/destinations/${encodeURIComponent(id)}`
  );
}

// POST /trips
export function createTrip(tripData) {
  return apiRequest("/trips", {
    method: "POST",
    body: JSON.stringify(tripData)
  });
}

// GET /trips/{id}
export function getTrip(id) {
  return apiRequest(
    `/trips/${encodeURIComponent(id)}`
  );
}
