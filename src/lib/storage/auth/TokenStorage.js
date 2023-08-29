import Storage from '@/lib/storage/storage';
import jwtDecode from "jwt-decode";

const PREFIX = 'auth.';

 export const storeToken = token => {
    Storage.store(`${PREFIX}_token`, token);
}
export const readToken = () => {
    return Storage.read(`${PREFIX}_token`);
}

export const removeToken = () => {
    Storage.remove(`${PREFIX}_token`);
}

export const getUserIdFromToken = () => {
    const decoded = jwtDecode(readToken().substring(7))
    return decoded.sub
}

export default { storeToken, readToken, removeToken }