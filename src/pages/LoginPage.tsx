import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const mockUsers = [
  { id: 1, name: "Иван", email: "ivan@mail.com", role: "CLIENT" },
  { id: 2, name: "Анна", email: "anna@mail.com", role: "ADMIN" },
  { id: 3, name: "Сергей", email: "sergey@mail.com", role: "CLEANER" },
];

const LoginPage = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = (user) => {
    login(user);
    navigate("/dashboard"); // сразу редирект после логина
  };

  return (
    <div>
      <h2>Login (mock)</h2>
      {mockUsers.map((user) => (
        <button key={user.id} onClick={() => handleLogin(user)}>
          Войти как {user.name} ({user.role})
        </button>
      ))}
    </div>
  );
};

export default LoginPage;
