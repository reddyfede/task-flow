const BASE_URL = import.meta.env.VITE_BASE_URL

export async function create(data) {
  const URL = BASE_URL + '/team/create/';
  const config = {
    method: "POST",
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

export async function update(id,data) {
  const URL = `${BASE_URL}/team/${id}/update/`;
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

export async function destroy(id) {
  const URL = `${BASE_URL}/team/${id}/delete/`;
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

export async function addUser(teamId,userId) {
  const URL = `${BASE_URL}/team/${teamId}/add_user/${userId}/`;
  const config = {
    method: "PUT",
  };
  const res = await fetch(URL, config);
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid Request");
  }
}

export async function removeUser(teamId,userId) {
  const URL = `${BASE_URL}/team/${teamId}/remove_user/${userId}/`;
  const config = {
    method: "PUT",
  };
  const res = await fetch(URL, config);
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Invalid Request");
  }
}