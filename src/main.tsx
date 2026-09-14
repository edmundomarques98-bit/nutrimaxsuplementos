import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import ScrollStory from './ScrollStory';
import ProductPhotos from './ProductPhotos';
import './index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
        <ProductPhotos />
        <ScrollStory />
    </StrictMode>
);
