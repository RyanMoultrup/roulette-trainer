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

const dateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);

    // Use the built-in toLocaleString method with US options
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

export default { money, number, dateTime };
