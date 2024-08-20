import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('Student editable table', () => {
  it('renders the form inputs and buttons correctly', () => {
    render(<App />);

    const nameInput = screen.getByPlaceholderText('Enter Students Name');
    expect(nameInput).toBeInTheDocument();

    const ageInput = screen.getByPlaceholderText('Enter Students Age');
    expect(ageInput).toBeInTheDocument();

    const jobInput = screen.getByPlaceholderText('Enter Students Job');
    expect(jobInput).toBeInTheDocument();

    const scoreInput = screen.getByPlaceholderText('Enter Students Score');
    expect(scoreInput).toBeInTheDocument();

    const saveButton = screen.getByText(/Save/i);
    expect(saveButton).toBeInTheDocument();

    const clearButton = screen.getByText(/Clear/i);
    expect(clearButton).toBeInTheDocument();
    const nameFilterInput = screen.getByPlaceholderText('Write name to filter');
    expect(nameFilterInput).toBeInTheDocument();

    const minScoreFilterInput = screen.getByPlaceholderText('Enter minimum score');
    expect(minScoreFilterInput).toBeInTheDocument();

    const maxScoreFilterInput = screen.getByPlaceholderText('Enter maximum score');
    expect(maxScoreFilterInput).toBeInTheDocument();
  });

  test('submits the form and adds a new student', () => {
    render(<App />);
  
    fireEvent.change(screen.getByPlaceholderText('Enter Students Name'), { target: { value: 'Raman' } });
    fireEvent.change(screen.getByPlaceholderText('Enter Students Age'), { target: { value: '25' } });
    fireEvent.change(screen.getByPlaceholderText('Enter Students Job'), { target: { value: 'Developer' } });
    fireEvent.change(screen.getByPlaceholderText('Enter Students Score'), { target: { value: '85' } });
  
    fireEvent.click(screen.getByText(/Save/i));
  
    expect(screen.getByText((content, element) => {
      return element.tagName.toLowerCase() === 'td' && content.includes('Raman');
    })).toBeInTheDocument();
  
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
    expect(screen.getByText('85')).toBeInTheDocument();
  });

  test('clears the form inputs when the Clear button is clicked', () => {
    render(<App />);
  
    fireEvent.change(screen.getByPlaceholderText('Enter Students Name'), { target: { value: 'Raman' } });
    fireEvent.change(screen.getByPlaceholderText('Enter Students Age'), { target: { value: '30' } });
    fireEvent.change(screen.getByPlaceholderText('Enter Students Job'), { target: { value: 'Designer' } });
    fireEvent.change(screen.getByPlaceholderText('Enter Students Score'), { target: { value: '90' } });
    fireEvent.click(screen.getByText(/Clear/i));  
    expect(screen.getByPlaceholderText('Enter Students Name').value).toBe('');
    expect(screen.getByPlaceholderText('Enter Students Age').value).toBe('0');
    expect(screen.getByPlaceholderText('Enter Students Job').value).toBe('');
    expect(screen.getByPlaceholderText('Enter Students Score').value).toBe('0');
  });
});
