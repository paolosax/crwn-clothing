import React from 'react';

import './collection-preview.styles.scss';

import CollectionItem from '../collection-item/collection-item.component';

const CollectionPreview = ({ title, items }) => (
  <div className='collection-preview'>
    <h1 className='title'>{title.toUpperCase()}</h1>
    <div className='preview'>
      {/* 
        nota (lezione 74): ricordarsi che allo stato attuale, che ogni volta che il component
        CollectionPreview viene renderizzato, la chimata alla funzione con il loop viene 
        chiamata ogni volta e potrebbe comportare un costo in termini di prestazioni.
        Vedremo come gestire la cosa più tardi
      */}
      {items
        .filter((item, idx) => idx < 4)
        .map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
    </div>
  </div>
);

export default CollectionPreview;
