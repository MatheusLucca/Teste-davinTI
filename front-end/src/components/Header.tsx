export function Header() {
    return (
        <header className="w-full">
            <nav className="flex justify-between ps-48 pe-96 items-center p-3 bg-zinc-800 text-white">
                <div className="flex items-center space-x-4">
                    <h1 className="text-2xl font-bold">Teste davinTI Crud Contatos</h1>
                </div>
                <div className="flex items-center space-x-4">
                    <a href="#" className="hover:underline">
                        Listagem
                    </a>
                    <a href="#" className="hover:underline">
                        Cadastro
                    </a>
                </div>
            </nav>
        </header>
    );
}