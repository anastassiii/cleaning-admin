import { useAuthStore } from "../../store/authStore";
import { getGreeting } from "../../utils/getGreeting";
import { useEffect } from "react";
import { calculateOrderPrice } from "../../utils/orderCalculations";

const ClientDashboard = () => {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    if (!user) return null;
    useEffect(() => {
    const testPrice = calculateOrderPrice(
        "STANDARD",
        2,                // rooms
        1,                // bathrooms
        ["OVEN", "WINDOWS"], 
        1,                // additionalHours
        "SALE10"
    );

    console.log("Test price:", testPrice);
    }, []);

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
                <div>➕ Новый заказ</div>
                <div>📦 Мои заказы</div>
                <div>🎁 Реферальная программа</div>
            </div>

            {/* Greeting */}
            <div style={{ marginTop: "30px" }}>
                <h2>
                {getGreeting()}, {user.email}
                </h2>
            </div>

            {/* Create order CTA */}
            <div style={{ marginTop: "20px" }}>
                <button style={{ width: "100%", padding: "20px" }}>
                ➕ Оформить заказ
                </button>
            </div>

            {/* Footer buttons */}
            <div style={{ marginTop: "40px", display: "flex", gap: "10px" }}>
                <button>Редактировать аккаунт</button>
                <button onClick={logout}>Выйти</button>
            </div>
        </div>
    )
}

export default ClientDashboard;