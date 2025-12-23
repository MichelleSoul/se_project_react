
const baseUrl = "http://localhost:3001";

export function checkResponse(res) {
	return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

// Public
function getItems() {
	return fetch(`${baseUrl}/items`).then(checkResponse);
}

// Auth protected
function addItems({ _id, name, weather, imageUrl }) {
	const token = localStorage.getItem("jwt");

	return fetch(`${baseUrl}/items`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ _id, name, weather, imageUrl }),
	}).then((res) => {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Error: ${res.status}`);
	});
}

function deleteItems(_id) {
	const token = localStorage.getItem("jwt");

	return fetch(`${baseUrl}/items/${_id}`, {
		method: "DELETE",
		headers: {
			authorization: `Bearer ${token}`,
		},
	}).then((res) => {
		if (res.ok) {
			return true;
		}
		return Promise.reject(`Error: ${res.status}`);
	});
}

function updateUserProfile({ name, avatar }) {
	const token = localStorage.getItem("jwt");

	return fetch(`${baseUrl}/users/me`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ name, avatar }),
	}).then(checkResponse);
}

function addCardLike(id) {
	const token = localStorage.getItem("jwt");

	return fetch(`${baseUrl}/items/${id}/likes`, {
		method: "PUT",
		headers: {
			authorization: `Bearer ${token}`,
		},
	}).then(checkResponse);
}

function removeCardLike(id) {
	const token = localStorage.getItem("jwt");

	return fetch(`${baseUrl}/items/${id}/likes`, {
		method: "DELETE",
		headers: {
			authorization: `Bearer ${token}`,
		},
	}).then(checkResponse);
}


export { getItems, addItems, deleteItems, updateUserProfile, addCardLike, removeCardLike };
