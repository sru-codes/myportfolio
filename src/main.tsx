import { StrictMode, useCallback, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import IntroLoader from './components/IntroLoader';
import './index.css';

// ORIGINAL (preserved, not deleted — disabled by comment):
// import {StrictMode} from 'react';
// import {createRoot} from 'react-dom/client';
// import App from './App.tsx';
// import './index.css';
//
// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// );

function Root() {
  const [introComplete, setIntroComplete] = useState(false);
  const handleIntroComplete = useCallback(() => setIntroComplete(true), []);

  return (
    <>
      {!introComplete && <IntroLoader onComplete={handleIntroComplete} />}
      {introComplete && <App />}
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
