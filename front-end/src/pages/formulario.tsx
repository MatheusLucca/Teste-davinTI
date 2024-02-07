import React from 'react';
import { Form } from '../components/Form';
import { Header } from '@/components/Header';
import "../app/globals.css";

export default function Formulario() {
    return (
        <div className="bg-gray-300">
            <main className='h-screen flex flex-col'>
                <Header />
                <div className='w-full flex justify-center p-5'>
                    <div className='max-w-[1200px] w-full flex flex-col gap-5'>
                        <h1 className='text-2xl text-center'>Formulário</h1>
                        <Form />
                    </div>

                </div>
            </main>
        </div>
    );
}

