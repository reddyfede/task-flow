const BASE_URL = import.meta.env.VITE_BASE_URL

export async function index(data) {
  const URL = BASE_URL + '/tasks/';
  const config = {
    method: "GET",
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


export async function show(id) {
  const URL = `${BASE_URL}/${id}`;
  const config = {
    method: "GET",
  };
  const res = await fetch(URL, config);
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid Request");
  }
}

export async function showTeam(id) {
  const URL = `${BASE_URL}/tasks/team/${id}`;
  const config = {
    method: "GET",
  };
  const res = await fetch(URL, config);
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid Request");
  }
}

export async function update(id, data) {
  const URL = BASE_URL + `/tasks/${id}/update/`

  const config = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const res = await fetch(URL, config);
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid Request");
  }
}

  export async function updateAssignment(taskId, empId) {
    const URL = BASE_URL + `/tasks/${taskId}/assign/${empId}/`
  
    const config = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    };
  
  const res = await fetch(URL, config);
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid Request");
  }
}

export async function destroy(id) {
  const URL = BASE_URL + `/tasks/${id}/delete/`
  const config = {
    method: "DELETE",
  };
  const res = await fetch(URL, config);
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid Request");
  }
}