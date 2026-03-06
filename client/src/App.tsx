import './App.css'
import ThemeProvider from './contexts/theme.context'
import UserProvider from './contexts/user-context'
import Router from './router/Index'

function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </UserProvider>
  )
}

export default App
