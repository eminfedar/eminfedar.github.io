import React from 'react'
import { Link } from 'gatsby'
import SocialLogos from './SocialLogos'

const Footer = () =>
    <footer className="site-footer outer">
        <div className="site-footer-content inner">
            <section className="copyright">
                <Link to="/">eminfedar.com</Link> | Emin Fedar Kişisel Bloğu
            </section>
            <nav>
                <SocialLogos />
            </nav>
        </div>
    </footer>

export default Footer
