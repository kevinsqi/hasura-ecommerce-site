import React from 'react';
import './App.css';

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

function App() {
  const { loading, error, data } = useQuery(gql`
    query getWishlists {
      users(where: { id: { _eq: 1 } }) {
        id
        email
        wishlists {
          id
          name
          wishlist_products {
            product {
              id
              name
              price
              image_url
            }
          }
        }
      }
    }
  `);

  if (error) {
    return <div>An error occurred</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const user = data.users[0];
  return (
    <div>
      <div>{user.email}</div>
      {user.wishlists.map((wishlist) => (
        <Wishlist item={wishlist} />
      ))}
    </div>
  );
}

function Wishlist({ item }) {
  const { name } = item;
  return (
    <div>
      <h2>{name}</h2>
      <ul>
        {item.wishlist_products.map((item) => (
          <Product item={item} />
        ))}
      </ul>
    </div>
  );
}

function Product({ item }) {
  const { name, price, image_url } = item.product;
  return (
    <div style={{ width: 200 }}>
      <img src={image_url} alt={name} style={{ width: '100%' }} />
      <div>
        <strong>{name}</strong>
      </div>
      <div>{price}</div>
    </div>
  );
}

export default App;
