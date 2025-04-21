// client/src/__tests__/LoginPage.test.js
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Login from '../pages/LoginPage';

describe('LoginPage', () => {
  test('renders username and password inputs and login button', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    // placeholders
    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    // submit button
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });
});
