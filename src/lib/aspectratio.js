function getCommonDenominator(a, b) {
    return b === 0 ? a : getCommonDenominator(b, a % b);
}

export function aspectRatio (width, height) {
    const divisor = getCommonDenominator(width, height)

    const simplifiedWidth = width / divisor;
    const simplifiedHeight = height / divisor;

    return {
        width: width / divisor,
        height: height / divisor
    }
}