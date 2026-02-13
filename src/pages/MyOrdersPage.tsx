import { useOrderStore } from "../store/orderStore";
import { useAuthStore } from "../store/authStore";

const MyOrdersPage = () => {
  const user = useAuthStore((state) => state.user);
  const orders = useOrderStore((state) => state.orders);

  if (!user) return null;

  const clientOrders = orders.filter(
    (order) => order.clientId === user.id
  );

  const updateOrderStatus = useOrderStore(
    (state) => state.updateOrderStatus
  )

  return (
    <div style={{ padding: "20px" }}>
      <h2>Мои заказы</h2>

      {clientOrders.length === 0 && <p>Заказов пока нет</p>}

      {clientOrders.map((order) => (
        <div
          key={order.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "10px",
          }}
        >
          <p><strong>Тип:</strong> {order.type}</p>
          <p><strong>Дата:</strong> {order.date} {order.time}</p>
          <p><strong>Адрес:</strong> {order.address}</p>
          <p><strong>Стоимость:</strong> {order.price} €</p>
          <p><strong>Статус:</strong> {order.status}</p>
          {order.status === "CREATED" && (
            <button onClick={() => updateOrderStatus(order.id, "CANCELLED")}>
              Отменить заказ
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyOrdersPage;
