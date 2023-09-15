export function useScreenSize () {
    return {
        screenSize: {
            type: Array,
            default: ['lg']
        }
    }
}

export function getScreenSize (screenSize) {
    if (screenSize.includes('xl')) {
        return 'xl'
    }

    if (screenSize.includes('lg')) {
        return 'lg'
    }

    if (screenSize.includes('md')) {
        return 'md'
    }

    if (screenSize.includes('sm')) {
        return 'sm'
    }

    if (screenSize.includes('xs')) {
        return 'xs'
    }
}