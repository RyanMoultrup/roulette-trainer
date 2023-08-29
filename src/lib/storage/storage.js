export default {
    store (key, value) {
        if (typeof value === 'object') {
            return localStorage.setItem(key, JSON.stringify(value));
        }
        return localStorage.setItem(key, value);
    },
    read (key) {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (e) {
            return localStorage.getItem(key);
        }
    },
    remove (key) {
        localStorage.removeItem(key);
    },
    clear (excludedKeys = []) {
        const allKeys = Object.keys(localStorage);
        allKeys.forEach(key => {
            const shouldKeep = excludedKeys.some(k => {
                const isWildcard = k.endsWith('*');
                if (!isWildcard) return key === k;
                const wildcard = k.slice(0, -1);
                return key.startsWith(wildcard);
            });
            if (!shouldKeep) {
                localStorage.removeItem(key);
            }
        });
    }
};
