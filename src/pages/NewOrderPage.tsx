import { useState, useMemo } from "react";
import type { NewOrderForm } from "../types/order";
import { calculateOrderPrice, calculateDuration } from "../utils/orderCalculations";
import type { ExtraOption, CleaningType } from "../types/order";
import { initialState } from "../types/order";

const NewOrderPage = () => {
  const [order, setOrder] = useState<NewOrderForm>(initialState);

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

        </div>

        {/* RIGHT SIDE */}
        <div style={{ flex: 1, border: "1px solid #ccc", padding: "20px" }}>
        <h3>Итого</h3>
        <p>Стоимость: {totalPrice} €</p>
        <p>Длительность: {duration} ч.</p>
        </div>

    </div>
    );
};

export default NewOrderPage;
