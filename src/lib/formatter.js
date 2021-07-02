const formatter = new Intl.NumberFormat();

const money = function (value) {
    if (value >= 0) {
        return `$${formatter.format(value)}`;
    } else {
        value = value * -1;
        return `- $${formatter.format(value)}`;
    }
};

const number = function (value) {
    return formatter.format(value);
};

export default { money, number };
