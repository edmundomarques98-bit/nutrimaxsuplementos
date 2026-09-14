import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './product-photos.css';

const productPhotos = [
  { label: 'Creatina Adaptogen 300 g', file: 'creatina-adaptogen.webp' },
  { label: 'Tasty Whey Adaptogen Original 900 g', file: 'tasty-whey-adaptogen.webp' },
  { label: 'Rage XL pré-treino Uva Silvestre', file: 'rage-xl.webp' },
  { label: 'Ultraminic multivitamínico Evorox', file: 'ultraminic.webp' },
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
          <img
            className="product-photo"
            src={`./resources/products/${productPhotos[index].file}`}
            alt={productPhotos[index].label}
            width={960}
            height={960}
            loading="lazy"
            decoding="async"
          />,
          host,
        ),
      )}
    </>
  );
}
