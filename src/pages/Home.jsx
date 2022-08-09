import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

import { fetchUser } from '../utils/fetch';

function Home() {
  const [searchBar, setSearchBar] = useState('');

  const checkUser = async () => {  
    const user = await fetchUser(searchBar);

    if (user.login) {
      console.log('username OK!')
      return window.location.href = `/user/${searchBar}`;
    }

    return alert('Usuário não encontrado no github. Verifique se você digitou o nome corretamente');
  };

  useEffect(() => { 
    console.log('searchBar =>', searchBar);
  });

  return (
    <div>
      <h1>Home</h1>
      <input
        type='text'
        name=''
        id=''
        className='form-control'
        onChange={(e) => setSearchBar(e.target.value)}
        value={searchBar}
      />
      <Button
        variant='dark'
        onClick={checkUser}
      >
        Buscar
      </Button>
    </div>
  );
}

export default Home;
