import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { SearchScreen } from "../../../components/search/SearchScreen";

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

describe('should test searchScreen.js', () => {

  beforeEach( () => jest.clearAllMocks() );

  test('should display properly with default values', () => {

    const { container } = render(
      <MemoryRouter>
        <SearchScreen />
      </MemoryRouter>
    )

    expect( container ).toMatchSnapshot();
  });

  test('should display to batman and input value of querySting', () => {

    render(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <SearchScreen />
      </MemoryRouter>
    )

    const input = screen.getByRole('textbox');
    expect( input.value ).toBe('batman');

    const img = screen.getByRole('img');
    expect( img.src ).toContain('/assets/dc-batman.jpg')

    // const alert = screen.getByLabelText('alert-danger');
    // expect( alert.style.display ).toBe('none');
  });

  test('should display an error if don\'t find a hero (batman123)', () => {

    render(
      <MemoryRouter initialEntries={['/search?q=batman123']}>
        <SearchScreen />
      </MemoryRouter>
    )

    const alert = screen.getByLabelText('alert-danger');
    expect( alert.style.display ).toBe('');
  });

  test('should call navigate to the new screen', () => {

    const inputValue = 'superman';

    render(
      <MemoryRouter initialEntries={['/search?q=batman123']}>
        <SearchScreen />
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox');
    fireEvent.change( input, { target: { name: 'searchText', value: inputValue } });
    
    const form = screen.getByLabelText('form');
    fireEvent.submit( form );

    expect( mockedUseNavigate ).toHaveBeenCalledWith(`?q=${ inputValue }`);
  });
});
