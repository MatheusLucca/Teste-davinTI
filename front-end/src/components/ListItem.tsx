import { Pen, Trash } from '../app/icons'
import querystring from 'querystring';
import { useRouter } from 'next/navigation';
import { DeleteModal } from './DeleteModal';
import { useState } from 'react';


export interface Contact {
    id: number;
    nome: string;
    idade: number;
    telefones: string[];
}

interface ListItemProps {
    contact: Contact;
    onDelete: (id: number) => void;
}

export function ListItem({ contact, onDelete }: ListItemProps) {
   
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    const handleEdit = () => {
        // navigate to the form page with the contact id as a query parameter
        router.push(`/formulario?${querystring.stringify({ id: contact.id })}`);
    };

    const handleDelete = () => {
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        onDelete(contact.id);
        setIsModalOpen(false);
    };
  
    const cancelDelete = () => {
      setIsModalOpen(false);
    };
    return (
        <li className="w-full bg-blue-300 mb-5 flex justify-start p-4 gap-16">

            <div className="flex w-full gap-28">
                <div className='flex flex-1 gap-1'>
                    <h3>Nome: </h3>
                    <h3>{contact.nome}</h3>
                </div>
                <div className='flex flex-1 gap-1'>
                    <h3>Idade: </h3>
                    <h3>{contact.idade} anos</h3>
                </div>
                <div className='flex flex-1 gap-1'>
                    <h3>Telefones: </h3>
                    <h3>{contact.telefones}</h3>   
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <button class="inline-block rounded bg-primary px-6 pb-2 
                pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] 
                transition duration-150 ease-in-out hover:bg-primary-600"
                    data-te-toggle="tooltip" data-te-placement="top" data-te-ripple-init data-te-ripple-color="light" title="Editar" onClick={handleEdit}>
                    <Pen />
                </button>
                <button class="inline-block rounded bg-primary px-6 pb-2 
                pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] 
                transition duration-150 ease-in-out hover:bg-primary-600" 
                    data-te-toggle="tooltip" data-te-placement="top" data-te-ripple-init data-te-ripple-color="light" title="Excluir"
                    onClick={handleDelete}>
                    <Trash />
                </button>
                <DeleteModal 
                    isOpen={isModalOpen}
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
            </div>
        </li>
    );
}