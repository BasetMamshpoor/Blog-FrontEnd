import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

function Token() {
    const cookie = Cookies.get('authTokens')

    const authTokens = cookie ? JSON.parse(cookie) : null

    const user = authTokens ? jwtDecode(authTokens?.access) : null

    return { authTokens, user }
}

export default Token