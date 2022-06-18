import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../auth/context/AuthContext";
import { AppRouter } from "../../routers/AppRouter";

describe('first test AppRouter', () => {

  test('should display login page if user is not authenticate', () => {
    
    const contextValue = {
      logged: false
    };

    render(
      // <MemoryRouter initialEntries={['/marvel']}>
        <AuthContext.Provider value={ contextValue }>
          <AppRouter />
        </AuthContext.Provider>
      // </MemoryRouter>
    );
    
    expect( screen.getAllByText('Login').length ).toBe(1);
  });

  test('should display Marvel component if user is auth', () => {

    const contextValue = {
      logged: true,
      user: {
        name: 'Lucho',
        id: '456'
      }
    };

    render(
      <AuthContext.Provider value={ contextValue }>
        <AppRouter />
      </AuthContext.Provider>
    );

    expect( screen.getAllByText('MarvelScreen').length ).toBeGreaterThanOrEqual(1);
  });
});