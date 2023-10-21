import Head from "next/head"
const Layout = ({ children }) => {
    return (
        <div>
            <Head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous" />
                <header>
                    <nav class="navbar navbar-expand-lg navbar-light bg-light">
                        <div class="container-fluid">
                            <a class="navbar-brand" href="#">Navbar</a>
                            <span>cart</span>
                            <span>{}</span>
                        </div>
                    </nav>
                    <br/>
                </header>
            </Head>
            <main>
                {children}
            </main>
            <footer className="flex justify-center">
                created by Afif@Mansib
            </footer>
        </div>
    )
}

export default Layout