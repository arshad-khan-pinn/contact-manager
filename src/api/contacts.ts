import { Contact } from "../store/contactStore";

// Function to fetch contacts with pagination and search
const BASE_URL = "http://localhost:3001";

export const fetchContacts = async (page: number, limit: number, search: string = "") => {
  const url = `${BASE_URL}/contacts?_page=${page}&_limit=${limit}&name_like=${search}&_sort=name&_order=asc`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch contacts: ${response.status}`);
  }
  const responseData = await response.json();
  const data = responseData;

  const dataLength = async () => {
    const response = await fetch(`${BASE_URL}/contacts`);
    const responseData = await response.json();
    return responseData.length;
  };
  const totalCount = await dataLength();
  const totalPages = Math.ceil(totalCount / limit);

  console.log("Data: ", data);
  console.log("Total pages: ", totalPages);

  return { data, totalPages };
};

// Function to add a new contact
export const addContact = async (contact: Omit<Contact, "id">) => {
  const response = await fetch(`${BASE_URL}/contacts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });
  console.log("Response: ", response);
  console.log("Response status: ", response.status);
  if (!response.ok) {
    throw new Error(`Failed to add contact: ${response.status}`);
  }
  const data = await response.json();
  console.log("Response data: ", data);
  return data;
};

// Function to update a contact
export const updateContact = async (contact: Contact) => {
  const url = `${BASE_URL}/contacts/${contact.id}`;
  console.log("Update URL: ", url);
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });
  console.log("Response: ", response);
  console.log("Response status: ", response.status);
  if (!response.ok) {
    throw new Error(`Failed to update contact: ${response.status}`);
  }
  if (response.status === 204) {
    return null;
  }
  const data = await response.json();
  console.log("Response data: ", data);
  return data;
};

// Function to delete a contact
export const deleteContact = async (id: number) => {
  const url = `${BASE_URL}/contacts/${id}`;
  console.log("Delete URL: ", url);
  const response = await fetch(url, {
    method: "DELETE",
  });
  console.log("Response: ", response);
  console.log("Response status: ", response.status);
  if (!response.ok) {
    throw new Error(`Failed to delete contact: ${response.status}`);
  }
  if (response.status === 204) {
    return null;
  }
  const data = await response.json();
  console.log("Response data: ", data);
  return data;
};

export const fetchfavoriteContact = async (page: number, limit: number) => {
  const url = `${BASE_URL}/contacts?favourite=true&_page=${page}&_limit=${limit}&_sort=name&_order=asc`;
  console.log("Favorite URL: ", url);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch favorite contacts: ${response.status}`);
  }
  const responseData = await response.json();
  const data = responseData;

  const dataLength = async () => {
    const response = await fetch(`${BASE_URL}/contacts?favourite=true`);
    const responseData = await response.json();
    return responseData.length;
  };
  const totalCount = await dataLength();
  const totalPages = Math.ceil(totalCount / limit);

  console.log("Favorite Data: ", data);
  console.log("Favorite Total pages: ", totalPages);

  return { data, totalPages };
};
