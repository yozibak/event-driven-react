import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app', () => {
  render(<App />);
  const el = screen.getByText(/Event Driven React/i);
  expect(el).toBeInTheDocument();
});
