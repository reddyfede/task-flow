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

export async function create(data) {
  const URL = BASE_URL + '/tasks/create/';

  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const res = await fetch(`${URL}`, config);
  console.log(res.status === 201)
  if (res.status === 201) {
    return res.json({'msg':'Task created successfully'});
  } else {
    throw new Error("Invalid Request");
  }
}