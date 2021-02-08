export default function localStorage() {
    if (typeof localStorage !== 'undefined') {
        try {
            localStorage.setItem('verify', 'confirm');
            if (localStorage.getItem('verify') === 'confirm') {
                localStorage.removeItem('verify');
                //localStorage is enabled
                return true;
            } else {
                //localStorage is disabled
                return false;
            }
        } catch(e) {
            //localStorage is disabled
            return false;
        }
    } else {
        //localStorage is not available
        return false;
    }
}