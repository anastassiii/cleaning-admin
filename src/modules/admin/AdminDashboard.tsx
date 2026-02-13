import { useOrderStore } from "../../store/orderStore";
import { useAuthStore } from "../../store/authStore";
import type { OrderStatus } from "../../types/order";

// Карта следующего статуса
const nextStatusMap: Record<OrderStatus, OrderStatus | null> = {
  CREATED: "CONFIRMED",
  CONFIRMED: "ASSIGNED",
  ASSIGNED: "IN_PROGRESS",
  IN_PROGRESS: "COMPLETED",
  COMPLETED: null,
  CANCELLED: null,
};

// Цвета для статусов
const statusColors: Record<OrderStatus, string> = {
  CREATED: "gray",
  CONFIRMED: "blue",
  ASSIGNED: "orange",
  IN_PROGRESS: "purple",
  COMPLETED: "green",
  CANCELLED: "red",
};

const AdminDashboard = () => {
  const orders = useOrderStore((state) => state.orders);
  const updateOrderStatus = useOrderStore((state) => state.updateOrderStatus);
  const user = useAuthStore((state) => state.user);

  if (!user) return null; // Если нет залогиненного пользователя, ничего не показываем

  const handleStatusChange = (id: number, nextStatus: OrderStatus) => {
    const success = updateOrderStatus(id, nextStatus, user.role);
    console.log(`Order ${id} → ${nextStatus}:`, success ? "OK" : "FAILED");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Админ панель</h2>

      {orders.length === 0 && <p>Заказов пока нет</p>}

      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            border: "1px solid #ccc",
            marginBottom: "10px",
            padding: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <p><strong>ID:</strong> {order.id}</p>
            <p>
              <strong>Статус:</strong>{" "}
              <span style={{ color: statusColors[order.status] || "black" }}>
                {order.status}
              </span>
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            {/* Кнопка продвинуть статус */}
            {nextStatusMap[order.status] && order.status !== "CANCELLED" && (
              <button
                onClick={() =>
                  handleStatusChange(order.id, nextStatusMap[order.status]!)
                }
              >
                Продвинуть → {nextStatusMap[order.status]}
              </button>
            )}

            {/* Кнопка отмены */}
            {order.status !== "CANCELLED" && order.status !== "COMPLETED" && (
              <button
                style={{ backgroundColor: "red", color: "white" }}
                onClick={() => handleStatusChange(order.id, "CANCELLED")}
              >
                Отменить
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
