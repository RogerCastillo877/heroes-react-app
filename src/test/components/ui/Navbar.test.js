import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../auth/context/AuthContext";
import { Navbar } from "../../../components/ui/Navbar";

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate
}));

describe('first test Nabvar.js', () => {

  const contextValue = {
    logged: true,
    user: {
      name: 'Luis'
    },
    logout: jest.fn()
  };

  beforeEach( () => jest.clearAllMocks() );

  test('should display usename that user auth', () => {

    render(
      <AuthContext.Provider value={ contextValue }>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect( screen.getByText('Luis') ).toBeTruthy();
  });
  
  test('should simulate logout action and navigate when button is clicked', () => {

    render(
      <AuthContext.Provider value={ contextValue }>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const logoutBtn = screen.getByRole('button');
    fireEvent.click( logoutBtn );
    
    expect( contextValue.logout ).toHaveBeenCalled();
    expect( mockedUseNavigate ).toHaveBeenCalledWith("/login", {"replace": true});
  });
});