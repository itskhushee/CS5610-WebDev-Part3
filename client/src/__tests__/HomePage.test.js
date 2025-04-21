// client/src/__tests__/HomePage.test.js
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Home from '../pages/HomePage';

describe('HomePage', () => {
  test('renders hero heading', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(
      screen.getByText(/Your Personal Finance Tracker!/i)
    ).toBeInTheDocument();
  });

  test('renders Login and Register links', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });
});
