import { create } from 'zustand';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  favourite: boolean;
}

interface ContactStore {
  contacts: Contact[];
  fetchContacts: () => Promise<void>;
}

export const useContactStore = create<ContactStore>((set) => ({
  contacts: [],
  fetchContacts: async () => {
    try {
      const response = await fetch('/db.json');
      const data = await response.json();
      set({ contacts: data.contacts });
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  },
}));
