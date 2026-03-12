export function validateName(nome) {
    if (!nome || nome.trim().length === 0) {
        return { isValid: false, error: "Name can not be empty" };
    }
    if (nome.length > 100) {
        return { isValid: false, error: "Name can not have more than 100 characters" };
    }
    return { isValid: true };
}

export function validateQuantity(quantity) {
    if (isNaN(quantity) || quantity <= 0) {
        return { isValid: false, error: "Quantity must be a positive number" };
    }
    if (quantity > 9999) {
        return { isValid: false, error: "Quantity must not be greater than 9999" };
    }
    return { isValid: true };
}

export function validateUnitPrice(unitPrice) {
    if (isNaN(unitPrice) || unitPrice < 0) {
        return { isValid: false, error: "Unit price must be a positive number" };
    }
    if (unitPrice > 99999) {
        return { isValid: false, error: "Unit price must not be greater than R$ 99.999,00" };
    }
    return { isValid: true };
}