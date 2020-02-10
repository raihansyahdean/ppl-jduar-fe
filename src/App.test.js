import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders hello world page', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Hello World!/i);
  expect(linkElement).toBeInTheDocument();
});
