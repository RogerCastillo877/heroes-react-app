import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../auth/context/AuthContext";
import { PrivateRoute } from "../../routers/PrivateRoute";

describe('should test Privte route', () => {

  test('should display children if user is authenticate', () => {

    Storage.prototype.setItem = jest.fn()

    const contexValue = {
      logged: true,
      user: {
        name: 'Juan',
        id: '456'
      }
    };

    render(
      <AuthContext.Provider value={ contexValue }>
        <MemoryRouter initialEntries={['/search?q=batman']}>
          <PrivateRoute>
            <h1>Private Route</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect( screen.getByText('Private Route') ).toBeTruthy();
    expect( localStorage.setItem ).toHaveBeenCalledWith( "lastPath", "/search?q=batman");
  });
})