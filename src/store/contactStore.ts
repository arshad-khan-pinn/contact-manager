import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import { create } from "zustand";

const BASE_URL = "http://localhost:3001";

// Create a new QueryClient instance
const queryClient = new QueryClient();

// Function to fetch contacts with pagination and search
const fetchContacts = async (page: number, limit: number) => {
  const url = `${BASE_URL}/contacts?_page=${page}&_per_page=${limit}`;
  console.log("URL: ", url);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch contacts: ${response.status}`);
  }
  const responseData = await response.json();
  const data = responseData.data;
  const totalCount = responseData.items;
  const totalPages = Math.ceil(totalCount / limit);

  console.log("Data: ", data);
  console.log("Total pages: ", totalPages);

  return { data, totalPages };
};

// Function to add a new contact
const addContact = async (contact: Omit<Contact, "id">) => {
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
const updateContact = async (contact: Contact) => {
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
const deleteContact = async (id: number) => {
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

// Define the Contact interface
export type Contact = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  favourite: boolean;
};

interface ContactStore {
  selectedContact: Contact | null;
  setSelectedContact: (contact: Contact) => void;
  clearSelectedContact: () => void;
}

export const useContactStore = create<ContactStore>((set) => ({
  selectedContact: null,
  setSelectedContact: (contact: Contact) => set({ selectedContact: contact }),
  clearSelectedContact: () => set({ selectedContact: null }),
}));

// Hook to use the fetched contacts
export const useContacts = (page: number, limit: number, search: string) => {
  return useQuery({
    queryKey: ["contacts", page, limit, search],
    queryFn: () => fetchContacts(page, limit, search),
  });
};

// Hook to add a new contact
export const useAddContact = () => {
  return useMutation({
    mutationFn: addContact,
    onSuccess: () => {
      // Invalidate the contacts query to refetch data
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
};

// Hook to update a contact
export const useUpdateContact = () => {
  return useMutation({
    mutationFn: updateContact,
    onSuccess: () => {
      // Invalidate the contacts query to refetch data
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
};

// Hook to delete a contact
export const useDeleteContact = () => {
  return useMutation({
    mutationFn: deleteContact,
    onSuccess: () => {
      // Invalidate the contacts query to refetch data
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      queryClient.removeQueries({ queryKey: ["contacts"] });
    },
  });
};
