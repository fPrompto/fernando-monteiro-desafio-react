import React from 'react';
import { screen } from '@testing-library/react';

import renderWithRouter from './utils/renderWithRouter';

import Home from '../pages/Home';

describe('Testa a página Home', () => {
  test('Verifica se o campo de busca é carregado', () => {
    renderWithRouter(<Home />);

    const searchInput = screen.getByTestId('search-input');

    expect(searchInput).toBeInTheDocument();
  });

  test('Verifica se o botão de busca é carregado', () => {
    renderWithRouter(<Home />);

    const searchButton = screen.getByTestId('search-button');

    expect(searchButton).toBeInTheDocument();
  });
});
