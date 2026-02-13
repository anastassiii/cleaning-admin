import { useState, useMemo } from "react";
import type { NewOrderForm } from "../types/order";
import { calculateOrderPrice, calculateDuration } from "../utils/orderCalculations";
import type { ExtraOption, CleaningType } from "../types/order";
import { initialState } from "../types/order";
import { v4 as uuid } from "uuid";
import { useOrderStore } from "../store/orderStore";
import { useAuthStore } from "../store/authStore";

const NewOrderPage = () => {
  const [order, setOrder] = useState<NewOrderForm>(initialState);
  const user = useAuthStore((state) => state.user);
  const addOrder = useOrderStore((state) => state.addOrder)

  // Универсальный сеттер поля
  const updateField = <K extends keyof NewOrderForm>(
    field: K,
    value: NewOrderForm[K]
  ) => {
    setOrder((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Переключатель extras
  const toggleExtra = (extra: ExtraOption) => {
    setOrder((prev) => ({
      ...prev,
      extras: prev.extras.includes(extra)
        ? prev.extras.filter((e) => e !== extra)
        : [...prev.extras, extra],
    }));
  };

  const [errors, serErrors] = useState<Record<keyof NewOrderForm, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (order.rooms < 1) newErrors.rooms = "Количество комнат должно быть ≥ 1";
    if (order.bathrooms < 1) newErrors.bathrooms = "Количество санузлов должно быть ≥ 1";
    if (order.date) newErrors.date = "Выберите дату";
    if (!order.time) newErrors.time = "Выберите время";
    if (!order.address) newErrors.address = "Введите адрес";

    serErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  const totalPrice = useMemo(() => {
    return calculateOrderPrice(
      order.type,
      order.rooms,
      order.bathrooms,
      order.extras,
      order.additionalHours,
      order.promoCode
    );
  }, [order]);

  const duration = useMemo(() => {
    return calculateDuration(
      order.rooms,
      order.bathrooms,
      order.additionalHours
    );
  }, [order]);

  const ordersStore = useOrderStore();

  const handleSubmit = () => {
    if (!user) return;

    const newOrder: Order = {
        id: uuid(),
        clientId: user.id,
        type: order.type,
        rooms: order.rooms,
        bathrooms: order.bathrooms,
        extras: order.extras,
        additionalHours: order.additionalHours,
        date: order.date,
        time: order.time,
        address: order.address,
        paymentMethod: order.paymentMethod,
        promoCode: order.promoCode,
        price: totalPrice,
        duration: duration,
        status: "CREATED"
    }

    addOrder(newOrder);
    setOrder(initialState)
  }

  console.log("ORDER:", order);
  console.log("PRICE:", totalPrice);
  console.log("DURATION:", duration);

  return (
    <div style={{ display: "flex", gap: "40px", padding: "20px" }}>
        
        {/* LEFT SIDE */}
        <div style={{ flex: 2 }}>
        <h2>Новый заказ</h2>

        {/* Тип уборки */}
        <div>
            <label>Тип уборки:</label>
            <select
            value={order.type}
            onChange={(e) =>
                updateField("type", e.target.value as CleaningType)
            }
            >
            <option value="STANDARD">Standard</option>
            <option value="DEEP">Deep</option>
            <option value="AFTER_RENOVATION">After renovation</option>
            </select>
        </div>

        {/* Комнаты */}
        <div>
            <label>Комнаты:</label>
            <input
            type="number"
            value={order.rooms}
            min={1}
            onChange={(e) =>
                updateField("rooms", Number(e.target.value))
            }
            />
        </div>

        {/* Санузлы */}
        <div>
            <label>Санузлы:</label>
            <input
            type="number"
            value={order.bathrooms}
            min={1}
            onChange={(e) =>
                updateField("bathrooms", Number(e.target.value))
            }
            />
        </div>

        {/* Доп услуги */}
        <div>
            <h4>Дополнительные услуги:</h4>

            <label>
            <input
                type="checkbox"
                checked={order.extras.includes("OVEN")}
                onChange={() => toggleExtra("OVEN")}
            />
            Помыть духовку
            </label>

            <label>
            <input
                type="checkbox"
                checked={order.extras.includes("WINDOWS")}
                onChange={() => toggleExtra("WINDOWS")}
            />
            Помыть окна
            </label>
        </div>

        {/* Доп часы */}
        <div>
            <label>Дополнительные часы:</label>
            <input
            type="number"
            value={order.additionalHours}
            min={0}
            onChange={(e) =>
                updateField("additionalHours", Number(e.target.value))
            }
            />
        </div>

        {/* Промокод */}
        <div>
            <label>Промокод:</label>
            <input
            type="text"
            value={order.promoCode}
            onChange={(e) =>
                updateField("promoCode", e.target.value)
            }
            />
        </div>

        {/* Адрес */}
        <div>
        <label>Адрес:</label>
        <input
            type="text"
            value={order.address}
            onChange={(e) => updateField("address", e.target.value)}
        />
        {errors.address && <p style={{ color: "red" }}>{errors.address}</p>}
        </div>

        {/* Дата */}
        <div>
        <label>Дата:</label>
        <input
            type="date"
            value={order.date}
            onChange={(e) => updateField("date", e.target.value)}
        />
        {errors.date && <p style={{ color: "red" }}>{errors.date}</p>}
        </div>

        {/* Время */}
        <div>
        <label>Время:</label>
        <input
            type="time"
            value={order.time}
            onChange={(e) => updateField("time", e.target.value)}
        />
        {errors.time && <p style={{ color: "red" }}>{errors.time}</p>}
        </div>

        </div>

        {/* RIGHT SIDE */}
        <div style={{ flex: 1, border: "1px solid #ccc", padding: "20px" }}>
        <h3>Итого</h3>
        <p>Стоимость: {totalPrice} €</p>
        <p>Длительность: {duration} ч.</p>
        <button onClick={handleSubmit}>Оформить заказ</button>
        </div>

    </div>
    );
};


export default NewOrderPage;
