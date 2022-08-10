import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

import { fetchUser } from '../utils/fetch';

import '../css/Home.css';

function Home() {
  const [searchBar, setSearchBar] = useState('');

  const checkUser = async () => {
    const user = await fetchUser(searchBar);

    if (!searchBar) {
      return alert('informe um nome de usuário válido do github');
    }

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
    <div className='main-home'>
      <div className='main-div'>
        <h2 className='home-title'>Buscar Repositório no github</h2>
        <div className='div-search'>
          <input
            type='text'
            name=''
            id=''
            className='form-control input-search'
            onChange={(e) => setSearchBar(e.target.value)}
            value={searchBar}
            data-testid='search-input'
          />
        </div>
        <Button
          variant='dark'
          onClick={checkUser}
          className='btn-search'
          data-testid='search-button'
        >
          &#x1F50E;Buscar
        </Button>
      </div>
    </div>
  );
}

export default Home;
