import Link from 'next/link';
export function Header() {
    return (
        <header className="w-full bg-zinc-800 flex justify-center">
            <div className="flex max-w-[1200px] w-full">
                <nav className="flex justify-between items-center p-3 text-white w-full">
                    <div className="flex items-center space-x-4">
                        <h1 className="text-2xl font-bold">Teste davinTI Crud Contatos</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link href="/">
                            LISTAGEM
                        </Link>
                        <Link href="/formulario">
                            CADASTRO
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}