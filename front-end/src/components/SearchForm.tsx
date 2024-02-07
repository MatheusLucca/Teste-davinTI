import { useState } from 'react';
import api from '../services/api';
import { MagnifyingGlass } from '../app/icons'

interface SearchFormProps {
  setContacts: (contatos: any) => void;
}

export function SearchForm({ setContacts }: SearchFormProps) {
  const [searchField, setSearchField] = useState('nome');
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    if (searchText.trim() === '') {
      api.get('/contatos').then(response => setContacts(response.data))
        .catch(error => console.error('Failed to search contacts:', error));
    }
    api.get(`/contatos/${searchField}/${searchText}`)
      .then(response => setContacts(response.data))
      .catch(error => console.error('Failed to search contacts:', error));
  };



  return (
    <form onSubmit={e => { e.preventDefault(); handleSearch(); }} className='flex gap-4'>
      <label htmlFor="searchField" className='font-bold text-2xl'>Pesquisar por:</label>
      <select value={searchField} onChange={e => setSearchField(e.target.value)} className='rounded p-2'>
        <option value="nome">Nome</option>
        <option value="idade">Idade</option>
        <option value="telefones.numero">Telefone</option>
      </select>
      <input type="text" value={searchText} onChange={e => setSearchText(e.target.value)} className='rounded' />
      <button className="inline-block rounded bg-zinc-400 px-6 pb-2 
                pt-2.5 text-xs font-medium uppercase flex items-center gap-1 hover:bg-zinc-500 transition-colors duration-300 ease-in-out"><p>Pesquisar</p> <MagnifyingGlass />
                   
      </button>
    </form>
  );
}