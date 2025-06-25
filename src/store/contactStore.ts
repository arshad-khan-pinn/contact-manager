import { useQuery, useMutation, QueryClient, useQueryClient } from "@tanstack/react-query";
import { create } from "zustand";
import { addContact, deleteContact, fetchContacts, fetchfavoriteContact, updateContact } from "../api/contacts";

// Create a new QueryClient instance
const queryClient = new QueryClient();

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
  showFavoritesOnly: boolean;
  setShowFavoritesOnly: (showFavoritesOnly: boolean) => void;
}

export const useContactStore = create<ContactStore>((set) => ({
  selectedContact: null,
  setSelectedContact: (contact: Contact) => set({ selectedContact: contact }),
  clearSelectedContact: () => set({ selectedContact: null }),
  showFavoritesOnly: false,
  setShowFavoritesOnly: (showFavoritesOnly: boolean) => set({ showFavoritesOnly }),
}));

// Hook to use the fetched contacts
export const useContacts = ({ page, limit, search }: { page: number; limit: number; search: string }) => {
  const showFavoritesOnly = useContactStore((state) => state.showFavoritesOnly);
  return useQuery({
    queryKey: ["contacts", page, limit, showFavoritesOnly, search],
    queryFn: () => {
      if (showFavoritesOnly) {
        return fetchfavoriteContact(page, limit);
      } else {
        return fetchContacts(page, limit, search);
      }
    },
    staleTime: 0,
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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateContact,
    onSuccess: (updatedContact) => {
      // Update all queries that start with 'contacts'
      const queries = queryClient.getQueryCache().findAll({ queryKey: ['contacts'] });

      queries.forEach(({ queryKey }) => {
        queryClient.setQueryData(queryKey, (oldData: any) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            data: oldData.data.map((c: Contact) =>
              c.id === updatedContact.id ? updatedContact : c
            ),
          };
        });
      });
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
