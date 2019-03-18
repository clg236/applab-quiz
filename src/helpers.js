export function isPopulated(value) {
    if (!value || Object.keys(value).length === 0) {
        return true;
    }

    return Object.values(value).filter(v => typeof v == 'object').length > 0;
}