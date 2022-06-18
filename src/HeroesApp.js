import { AuthProvider } from "./auth/context/AuthProvider"
import { AppRouter } from "./routers/AppRouter"


export const HeroesApp = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}
