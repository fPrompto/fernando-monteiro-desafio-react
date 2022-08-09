import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

function Home() {
  const [searchBar, setSearchBar] = useState('');

  const fetch = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `https://api.github.com/users/${searchBar}`,
      });
  
      return response.data;
    } catch (_e) {
      return {};
    }
  };

  const checkUser = async () => {  
    const user = await fetch();

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
