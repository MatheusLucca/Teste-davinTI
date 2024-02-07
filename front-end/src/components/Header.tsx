import Link from 'next/link';
export function Header() {
    return (
        <header className="w-full bg-zinc-800 flex justify-center">
            <div className="flex max-w-[1200px] w-full">
                <nav className="flex justify-between items-center p-3 text-white w-full">
                    <div className="flex items-center space-x-4">
                        <h1 className="text-2xl font-bold">Teste davinTI</h1>
                    </div>
                    <div className="flex items-center space-x-4 tracking-widest">
                        <Link href="/" className="link hover:text-slate-300 transition-colors duration-300 ease-in-out">
                            HOME
                        </Link>
                        <Link href="/formulario" className="link hover:text-slate-300 transition-colors duration-300 ease-in-out">
                            CADASTRO
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}