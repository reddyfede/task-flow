const BASE_URL = import.meta.env.VITE_BASE_URL

export async function index(data) {
  const URL = BASE_URL + '/tasks/';
  
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify(data),
  };

  const res = await fetch(URL, config);

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid Request");
  }
}