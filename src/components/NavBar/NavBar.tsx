import './NavBar.css'
import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { HashLink } from 'react-router-hash-link';
import { Connect } from "../Connect/Connect";
import HowItWorksModal from '../HowItWorks/HowITWorks';



export const NavBar = () => {
  const [activeLink, setActiveLink] = useState<string>('home');
  const [scrolled, setScrolled] = useState<boolean>(false);

  // Effect to handle user scroll and set the navbar style
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Function to update active navigation link based on user interaction
  const onUpdateActiveLink = (value: string) => {
    setActiveLink(value);
  };


  const [showHowItWorksModal, setShowHowItWorksModal] = useState<boolean>(false);

  const toggleHowItWorksModal = () => setShowHowItWorksModal(!showHowItWorksModal);

  const baseUrl = process.env.VITE_APP_BASE_URL || '/';

  return (
    <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
      <Container>
        {/* <Navbar.Brand href="/">
            <h1>DRM using Zama</h1> 
        </Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={HashLink}
              to={`${baseUrl}#home`}
              className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'}
              onClick={() => onUpdateActiveLink('home')}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={HashLink}
              to={`${baseUrl}#mint`}
              className={activeLink === 'mint' ? 'active navbar-link' : 'navbar-link'}
              onClick={() => onUpdateActiveLink('mint')}
            >
              Mint
            </Nav.Link>
            <Nav.Link
              as={HashLink}
              to={`${baseUrl}#gallery`}
              className={activeLink === 'gallery' ? 'active navbar-link' : 'navbar-link'}
              onClick={() => onUpdateActiveLink('gallery')}
            >
              Gallery
            </Nav.Link>
            
            <Nav.Link
              as={HashLink}
              to="/#mint"
              className={activeLink === 'ho' ? 'active navbar-link' : 'navbar-link'}
              onClick={() => {
                onUpdateActiveLink('skills');
                toggleHowItWorksModal(); // Open modal on click
              }}
            >
              How it Works
            </Nav.Link>

            <Nav.Link
              className="navbar-link"
            >
              <Connect>
                {() => (
                  <>
                    {/* Connected: {account.substring(0, 5)}...{account.substring(account.length - 4)} */}
                  </>
                )}
              </Connect>
            </Nav.Link>
          </Nav>

        </Navbar.Collapse>

        <HowItWorksModal show={showHowItWorksModal} onHide={toggleHowItWorksModal} />
      </Container>
    </Navbar>
  );
};
