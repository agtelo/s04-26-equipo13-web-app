export function formatDate(date: string | Date): string {

    const dateObj = typeof date === "string" ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) {
        return "Invalid date";
    }

    const monthDayFormatter = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
    });

    const timeParts = dateObj.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    const monthDay = monthDayFormatter.format(dateObj);

    return `${monthDay.toUpperCase()}, ${timeParts}`;
}