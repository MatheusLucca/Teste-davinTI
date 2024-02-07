
"use client";
import { useEffect, useState } from 'react';
import api from '../services/api';
import { Contact, ListItem } from "./ListItem";
import { SearchForm } from './SearchForm';

export function List() {
    const [contacts, setContacts] = useState([] as Contact[]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      api.get('/contatos')
        .then((response: any) => {	
          setContacts(response.data);
          setIsLoading(false);
        })
    }, []);

    const handleDelete = async (id: number) => {
        try {
          await api.delete(`/contato/${id}`);
          setContacts(contacts.filter(contact => contact.id !== id));
        } catch (error) {
          console.error('Failed to delete contact:', error);
        }
      };
    
    if (isLoading) {
      return (
        <div className='w-full h-full flex justify-center items-center'>
          <h2 className='font-bold text-2xl uppercase'>Carregando...</h2>
        </div>
      )
    }
    
    return(
        <div className="w-full flex justify-center">
        <div className="max-w-[1200px] w-full p-5">
          <div className='flex justify-between max-w-[900px] mb-4'>
            <h2 className='font-bold text-2xl'>Listagem de Contatos</h2>
            <SearchForm setContacts={setContacts} isLoading={isLoading} setIsLoading={setIsLoading} />
          </div>
          <ul className="">
            {contacts.length === 0 ? <h3 className='font-bold text-2xl'>Nenhum contato encontrado.</h3> : null}
            {contacts.map(contact => (
              <ListItem key={contact.id} contact={contact} onDelete={handleDelete} />
            ))}
          </ul>
        </div>
      </div>
    )

    }