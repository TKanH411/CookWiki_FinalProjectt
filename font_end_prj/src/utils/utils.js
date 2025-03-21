export const objectToFormData = (obj) => {
    const formData = new FormData();

    Object.entries(obj).forEach(([key, value]) => {
        if (value instanceof File) {
            formData.append(key, value);
        } else if (Array.isArray(value)) {
            value.forEach((item, index) => {
                formData.append(`${key}[${index}]`, item);
            });
        } else if (typeof value === "object" && value !== null) {
            formData.append(key, JSON.stringify(value));
        } else {
            formData.append(key, String(value));
        }
    });

    return formData;
};

export function formatDate(dateString) {
    const date = new Date(dateString);
    // Lấy ngày, tháng, năm và đảm bảo có 2 chữ số cho ngày và tháng
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}