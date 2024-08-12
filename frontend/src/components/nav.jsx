import "../styles/nav.css"

function Navbar() {

    
    return (
        <nav className="navbar">
            This is the Navbar
            <div>
                <a href="/" className="nav-links">Home</a>
                <a href="/logout" className="nav-links">Log Out</a>
            </div>
            
        </nav>
    )
}

export default Navbar;