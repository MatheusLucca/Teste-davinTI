import { useForm, useFieldArray } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import api from '../services/api';
import { Contact } from "./ListItem";
interface IFormInput {
    nome: string;
    idade: number;
    telefones: { numero: string }[];
}

export function Form() {
    const router = useRouter();
    const [contato, setContato] = useState<Contact>();
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm<IFormInput>();
    const { fields, append, remove, } = useFieldArray({
        control,
        name: "telefones"
    });
 
    useEffect(() => {
      if (router.query.id) {
        // fetch the contact data from the API
        api.get(`/contato/${router.query.id}`)
          .then(response => {
            setContato(response.data[0]);
            const tel = response.data[0].telefones.replace(/,/g, '').split(' ');
            const telArray = tel.map((t: string) => ({ numero: t }));
            append(telArray);
            reset(response.data[0]);
          })
          .catch(error => {
            console.log(error);
          });
      }
    }, [router.query.id]);

    const onSubmit = (data: IFormInput) => {
        const apiData = {
            CONTATO: {
                ID: router.query.id ?? null,
                NOME: data.nome,
                IDADE: data.idade,
            },
            TELEFONES: data.telefones.map(t => ({ NUMERO: t.numero })),
        };
        if (router.query.id) {
            api.put(`/contato/${router.query.id}`, apiData)
                .then(response => {
                    router.push('/');
                })
                .catch(error => {
                    console.log(error);
                });
            return;
        }
        api.post('/contatos', apiData)
            .then(response => {
                router.push('/');
            })
            .catch(error => {
                console.log(error);
            });
        
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-72 m-auto">
            <input {...register("nome", { required: true })} placeholder="Nome*" className="mb-2 p-2 border rounded" defaultValue={contato?.nome} />
            {errors.nome && <span className="text-red-500 font-bold text-lg">Este campo é obrigatório</span>}

            <input {...register("idade", { required: true })} type="number" placeholder="Idade*" className="mb-2 p-2 border rounded" defaultValue={contato?.idade} />
            {errors.idade && <span className="text-red-500 font-bold text-lg">Este campo é obrigatório</span>}

            {fields.map((item, index) => (
                <div key={item.id} className='flex flex-col'>
                    <div className="flex items-center">
                        <input
                            {...register(`telefones.${index}.numero`, { required: true, maxLength: { value: 16, message: "O número do telefone não pode ter mais de 16 dígitos" } })}
                            defaultValue={item.numero}
                            placeholder="Telefone*"
                            className="mb-2 p-2 border rounded flex-grow"
                        />

                        <button type="button" onClick={() => remove(index)} className="ml-2 p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300 ease-in-out">Remover</button>
                    </div>

                    {errors.telefones?.[index]?.numero?.message && (
                        <span className="text-red-500 font-bold text-lg">{errors.telefones?.[index]?.numero?.message}</span>
                    )}
                </div>
            ))}
            <button type="button" onClick={() => append({ numero: "" })} className="mb-2 p-2 bg-zinc-500 text-white rounded cursor-pointer hover:bg-zinc-600 uppercase font-semibold transition-colors duration-300 ease-in-out">Adicionar telefone</button>
            
            <input type="submit" value="Enviar" className="p-2 bg-zinc-500 text-white rounded cursor-pointer hover:bg-zinc-600 uppercase font-semibold transition-colors duration-300 ease-in-out" />
        </form>
    );
}
