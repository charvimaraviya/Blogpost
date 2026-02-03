import './Footer.css';

export function Footer() {

    const currentYear = new Date().getFullYear();

    return(
        <>
            <footer className="footer-wrapper">
                <h3> © { currentYear } All right are reseved Blogpost</h3>
            </footer>
        </>
    )
}
export default Footer;