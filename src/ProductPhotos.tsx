import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import productSprite from './productSprite';
import './product-photos.css';

const productPhotos = [
  { label: 'Creatina Adaptogen', position: '0% 0%' },
  { label: 'Tasty Whey Adaptogen', position: '100% 0%' },
  { label: 'Rage XL pré-treino', position: '0% 100%' },
  { label: 'Ultraminic multivitamínico', position: '100% 100%' },
];

export default function ProductPhotos() {
  const [hosts, setHosts] = useState<HTMLElement[]>([]);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.mini-product')).slice(0, 4);
    nodes.forEach((node) => node.classList.add('photo-ready'));
    setHosts(nodes);

    return () => {
      nodes.forEach((node) => node.classList.remove('photo-ready'));
    };
  }, []);

  return (
    <>
      {hosts.map((host, index) =>
        createPortal(
          <div
            className="product-photo"
            role="img"
            aria-label={productPhotos[index]?.label ?? 'Produto Nutrimax'}
            style={{
              backgroundImage: `url(${productSprite})`,
              backgroundPosition: productPhotos[index]?.position ?? '0% 0%',
            }}
          />,
          host,
        ),
      )}
    </>
  );
}
