import { useAuthStore } from "../../store/authStore";
import { useOrderStore } from "../../store/orderStore";
import { getGreeting } from "../../utils/getGreeting";
import { Link } from "react-router-dom";

const ClientDashboard = () => {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const orders = useOrderStore((state) => state.orders);

    const activeOrders = orders.filter(
        (order) =>
            order.clientId === user.id &&
            order.status !== "COMPLETED" &&
            order.status !== "CANCELLED"
    )

    if (!user) return null;
    if (user.role !== "CLIENT") return null;

    return (
        <div style={{ padding: "20px" }}>

            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>LOGO</div>
                <div>
                    <button>CHAT</button>
                    <button>🔔</button>
                </div>
            </div>

            {/* Menu */}
            <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                <div>👤 Мой профиль</div>
                <Link to="/new-order">➕ Новый заказ</Link>
                <Link to="/my-orders">📦 Мои заказы</Link>
                <div>🎁 Реферальная программа</div>
            </div>

            {/* Greeting */}
            <div style={{ marginTop: "30px" }}>
                <h2>
                {getGreeting()}, {user.name}
                </h2>
            </div>

            {/* Create order CTA */}
            <div style={{ marginTop: "20px" }}>
                <Link to="/new-order"><button style={{ width: "100%", padding: "20px" }}>
                ➕ Оформить заказ
                </button></Link>
            </div>
            {activeOrders.length > 0 && (
                <div style={{ marginTop: "30px" }}>
                    <h3>Активный заказ</h3>
                    <p>Статус: {activeOrders[0].status}</p>
                    <p>Дата: {activeOrders[0].date}</p>
                </div>
            )}

            {/* Footer buttons */}
            <div style={{ marginTop: "40px", display: "flex", gap: "10px" }}>
                <button>Редактировать аккаунт</button>
                <button onClick={logout}>Выйти</button>
            </div>
        </div>
    )
}

export default ClientDashboard;