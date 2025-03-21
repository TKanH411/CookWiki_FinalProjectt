export const STATUS_LIST = {
    DRAFT: "Draft",
    PENDING: "Pending",
    PUBLISHED: "Published",
    REJECTED: "Rejected"
}

export const parseColorStatus = (status) => {
    let statusColor, color = "#364153";
    switch (status?.toUpperCase()) {
        case STATUS_LIST.DRAFT.toUpperCase():
            statusColor = "#b0bec5"; // Light Blue Grey
            color = "#ffffff"; // White
            break;
        case STATUS_LIST.PENDING.toUpperCase():
            statusColor = "#ffeb3b"; // Bright Yellow
            break;
        case STATUS_LIST.PUBLISHED.toUpperCase():
            statusColor = "#4caf50"; // Green
            color = "#dadada"; // White
            break;
        case STATUS_LIST.REJECTED.toUpperCase():
            statusColor = "#f44336"; // Red
            color = "#dadada"; // White
            break;
        default:
            statusColor = "#ffffff"; // White
            break;
    }

    return {statusColor, color};
}

export function formatDate(dateString) {
    const date = new Date(dateString);
    // Lấy ngày, tháng, năm và đảm bảo có 2 chữ số cho ngày và tháng
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}