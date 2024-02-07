import { useForm, useFieldArray } from 'react-hook-form';

import { useRouter } from 'next/router';
import api from '../services/api';
interface IFormInput {
    nome: string;
    idade: number;
    telefones: { numero: string }[];
}

export function Form() {
    const router = useRouter();
    const { register, handleSubmit, control, formState: { errors } } = useForm<IFormInput>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "telefones"
    });

    const onSubmit = (data: IFormInput) => {
        const apiData = {
            CONTATO: {
                NOME: data.nome,
                IDADE: data.idade,
            },
            TELEFONES: data.telefones.map(t => ({ NUMERO: t.numero })),
        };
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
            <input {...register("nome", { required: true })} placeholder="Nome*" className="mb-2 p-2 border rounded" />
            {errors.nome && <span className="text-red-500">Este campo é obrigatório</span>}

            <input {...register("idade", { required: true })} type="number" placeholder="Idade*" className="mb-2 p-2 border rounded" />
            {errors.idade && <span className="text-red-500">Este campo é obrigatório</span>}

            {fields.map((item, index) => (
                <div key={item.id} className='flex flex-col'>
                    <div className="flex items-center">
                        <input
                            {...register(`telefones.${index}.numero`, { required: true, maxLength: { value: 16, message: "O número do telefone não pode ter mais de 16 dígitos" } })}
                            defaultValue={item.numero} // make sure to set up defaultValue
                            placeholder="Telefone*"
                            className="mb-2 p-2 border rounded flex-grow"
                        />

                        <button type="button" onClick={() => remove(index)} className="ml-2 p-2 bg-red-500 text-white rounded">Remover</button>
                    </div>

                    {errors.telefones?.[index]?.numero?.message && (
                        <span className="text-red-500">{errors.telefones?.[index]?.numero?.message}</span>
                    )}
                </div>
            ))}
            <button type="button" onClick={() => append({ numero: "" })} className="mb-2 p-2 bg-zinc-600 text-white rounded">Adicionar telefone</button>

            <input type="submit" value="Enviar" className="p-2 bg-zinc-600 text-white rounded cursor-pointer" />
        </form>
    );
}
