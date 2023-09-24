// const BASE_URL = import.meta.env.VITE_BASE_URL
const BASE_URL = 'http://localhost:8000'
// const TASKS_URL = BASE_URL+"/tasks"

export async function index() {
  const res = await fetch(BASE_URL, {
    method: "GET",
  });
  
  if (res.ok) {
    return res.json();
  } else {
    return new Error("Invalid Request");
  }
}


export async function update(task) {
  const URL = `${BASE_URL}/update/`;
  
  const config = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  };

  const res = await fetch(URL, config);

  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid Request");
  }
}