export const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) return "Доброе утро";
    if (hour >= 12 && hour < 18) return "Добрый день";
    return "Добрый вечер";
}