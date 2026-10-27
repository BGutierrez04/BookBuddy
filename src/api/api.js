const BASE_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

export async function getBooks() {
  const response = await fetch(`${BASE_URL}/books`);

  if (!response.ok) {
    throw new Error("Unable to get books.");
  }

  return response.json();
}

export async function getBook(id) {
  const response = await fetch(`${BASE_URL}/books/${id}`);

  if (!response.ok) {
    throw new Error("Unable to get book details.");
  }

  return response.json();
}

export async function registerUser(userData) {
  const response = await fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Registration failed.");
  }

  return result;
}

export async function loginUser(userData) {
  const response = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Login failed.");
  }

  return result;
}

export async function getAccount(token) {
  const response = await fetch(`${BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Unable to load account.");
  }

  return response.json();
}

export async function reserveBook(bookId, token) {
  const response = await fetch(`${BASE_URL}/reservations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      bookId: Number(bookId),
    }),
  });

  if (!response.ok) {
    throw new Error("Unable to reserve this book.");
  }

  return response.json();
}

export async function returnBook(reservationId, token) {
  const response = await fetch(`${BASE_URL}/reservations/${reservationId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Unable to return this book.");
  }
}
