import React from 'react'
import { Link } from 'gatsby'
import SocialLogos from './SocialLogos'

const Nav = () => 
    <nav className="site-nav">
        <div className="site-nav-left">
            <a className="site-nav-logo" href="/">Emin Fedar</a>
            <ul className="nav" role="menu">
                <li role="menuitem">
                    <Link to="/">
                        Ana Sayfa
                    </Link>
                </li>
                <li role="menuitem">
                    <Link to="/tags">
                        Kategoriler
                    </Link>
                </li>
            </ul>
        </div>
        <div className="site-nav-right">
            <SocialLogos />
        </div>
    </nav>

export default Nav
