import { render, screen } from '@testing-library/react';
import RetroQuest from './app/RetroQuest';

test('renders learn react link', () => {
  render(<RetroQuest />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
