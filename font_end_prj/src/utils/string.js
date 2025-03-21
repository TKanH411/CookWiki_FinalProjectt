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