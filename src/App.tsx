import { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from './components/NavBar/NavBar';
import { Banner } from './components/Banner/Banner';
import { Mint } from './components/Mint/Mint';
import { Gallery } from './components/Gallery/Gallery';
import { init } from './fhevmjs';
import Footer from './components/Footer/Footer';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MetaMaskAlertModal } from './components/MetaMaskAlert'




function App() {
  const [, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [showMetaMaskModal, setShowMetaMaskModal] = useState<boolean>(false);

  useEffect(() => {
    // Check for MetaMask or any Web3 provider
    if (typeof window.ethereum === 'undefined') {
      setShowMetaMaskModal(true);
    }
  }, []);


  useEffect(() => {
    init()
      .then(() => {
        setIsInitialized(true);
        setIsLoading(false);
      })
      .catch((e) => {
        setError('Failed to initialize the application.');
        setIsLoading(false);
        console.error(e);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (showMetaMaskModal) {
    return <MetaMaskAlertModal />;
  }


  return (

    <Router>

      <div >
        <ToastContainer
          position="top-right"
          autoClose={7000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ zIndex: 9999 }}
        />

        <NavBar />
        <Banner />
        <Mint />
        <Gallery />

        <Footer githubUrl='https://github.com/El-hacen21/zama_bounty/' />
      </div>

    </Router>
  );
}

export default App;
