export let fechaUltimaPeticion = null;
export function authHeader() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjMxOTkiLCJuYmYiOjE3NDM1MDMxNDIsImV4cCI6MTc0MzUwNjc0MiwiaWF0IjoxNzQzNTAzMTQyLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0L1dlYkFQSV9iZEVSUCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3QvV2ViQVBJX2JkRVJQIn0.IpzNhXAqb5rUNJYM3VGsdc47ShZPSBrW2OQ5-le3qtk";
  if (token != null) {
    return { Authorization: "Bearer " + token };
  } else {
    return {};
  }
}

export function requestOptions(method, body = null) {
  fechaUltimaPeticion = new Date();
  let result = { method: method, headers: authHeader() };

  if (body != null) {
    result.headers["Content-Type"] = "application/json";
    result.body = JSON.stringify(body);
  }
  return result;
}

export function handleResponse(response) {
  return response.text().then((text) => {
    if (response.status == 401) {
      //Unauthorized
      console.info("LOGOUT");
      getStore().dispatch({ type: authConstants.LOGOUT });
    } else if (!response.ok) {
      console.info("FETCH ERROR CODE => " + response.status);
      return Promise.reject(text);
    }
    const data = text && JSON.parse(text);
    return data;
  });
}

export function errorHandler(error) {
  if (error.httpStatus === 401) {
    //authActions.logout()
  }
}

export function patchRequestHandler(obj) {
  let result = [];

  Object.keys(obj).forEach((key) => {
    var value = obj[key];
    result.push({
      op: "replace",
      path: "/" + key,
      value: value,
    });
  });

  return result;
}

export async function fetchWithTimeout(url, options, timeout = 10000) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("timeout")), timeout)
    ),
  ]);
}
