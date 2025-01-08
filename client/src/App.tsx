import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import { TodoPage } from './pages/TodoPage';
import { AuthProvider } from './context/authContext';
import SignupPage from './pages/SignupPage';
import { TodoProvider } from './context/todoContext';

function App() {
 
  return (
    <div>
           <AuthProvider>
            <TodoProvider>
           <BrowserRouter>
              <Routes>
                <Route path='/'  element={<LoginPage />} />
                <Route path='/todos'  element={<TodoPage />} />
                <Route path='/signup'  element={<SignupPage />} />
              </Routes>
           </BrowserRouter>  
           </TodoProvider>
           </AuthProvider> 
    </div>
  )
}

export default App
