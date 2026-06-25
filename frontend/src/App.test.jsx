import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App Component', () => {
  it('renders landing page header', () => {
    render(<App />);
    expect(screen.getAllByText(/Moriah Tech Labs/i).length).toBeGreaterThan(0);
  });
});
