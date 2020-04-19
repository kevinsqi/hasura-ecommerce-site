import React from 'react';
import './App.css';

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

function App() {
  const { loading, error, data } = useQuery(gql`
    query getWishlists {
      users(where: {id: {_eq: 1}}) {
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
            }
          }
        }
      }
    }
  `);

  if (error) {
    return <div>An error occurred</div>;
  }

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      {JSON.stringify(data)}
    </div>
  );
}

export default App;
