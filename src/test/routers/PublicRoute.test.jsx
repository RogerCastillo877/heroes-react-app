import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../auth/context/AuthContext";
import { PublicRoute } from "../../routers/PublicRoute";

describe('should test PublicRoute.jsx', () => {

  test('should display children if user is not authenticate', () => {

    const contexValue = { logged: false };

    render(
      <AuthContext.Provider value={ contexValue }>
        <PublicRoute>
          <h1>Children</h1>
        </PublicRoute>
      </AuthContext.Provider>
    );

    expect( screen.getByText('Children') ).toBeTruthy();
  });

  test('should navigate if user is authenticate', () => {

    const contexValue = {
      logged: true,
      user: {
        name: 'Juan',
        id: '123'
      }
    };

    render(
      <AuthContext.Provider value={ contexValue }>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route path='login' element={
              <PublicRoute>
                <h1>Public Route</h1>
              </PublicRoute>
            } />
            <Route  path='/marvel' element={<h1>Marvel Page</h1>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect( screen.getByText('Marvel Page') ).toBeTruthy();
  });
});