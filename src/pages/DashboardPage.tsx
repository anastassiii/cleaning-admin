import { useAuthStore } from "../store/authStore";
import AdminDashboard from "../modules/admin/AdminDashboard";
import CleanerDashboard from "../modules/cleaner/CleanerDashboard";
import ClientDashboard from "../modules/client/ClientDashboard";

const DashboardPage = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  switch (user.role) {
    case "ADMIN":
      return <AdminDashboard />;
    case "CLEANER":
      return <CleanerDashboard />;
    case "CLIENT":
      return <ClientDashboard />;
    default:
      return null;
  }
}

export default DashboardPage;
