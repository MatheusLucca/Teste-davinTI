
"use client";
import { useEffect, useState } from 'react';
import api from '../services/api';
import { Contact, ListItem } from "./ListItem";

export function List() {
    const [contacts, setContacts] = useState([] as Contact[]);

    useEffect(() => {
      api.get('/contatos')
        .then((response: any) => setContacts(response.data));
    }, []);

    const handleDelete = async (id: number) => {
        try {
          await api.delete(`/contato/${id}`);
          setContacts(contacts.filter(contact => contact.id !== id));
        } catch (error) {
          console.error('Failed to delete contact:', error);
        }
      };

    return(
        <div className="w-full flex justify-center">
        <div className="max-w-[1200px] w-full p-5">
          <h2>Listagem de Contatos</h2>

          
          <ul className="">
            {contacts.map(contact => (
              <ListItem key={contact.id} contact={contact} onDelete={handleDelete} />
            ))}
          </ul>
        </div>
      </div>
    )

    }