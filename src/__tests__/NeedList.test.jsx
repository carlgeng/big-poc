import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NeedList from '../components/needs/NeedList';

test('renders NeedList with no needs', () => {
  render(
    <MemoryRouter>
      <NeedList needs={[]} loading={false} error={null} />
    </MemoryRouter>
  );
  expect(screen.getByText(/暂无临床需求/i)).toBeInTheDocument();
});