const STORAGE_KEY = 'LH_STORAGE_KEY'

// Check !expired

export function isTokenExpired(exp: number) {
    if(!exp) return true;

    if(Date.now()>= exp * 1000) {
        return false;
    } 
    return true;
    
}

// 1. Reading the access token from storage

export function readAccessToken() { 
    // MUST BE ON CLIENT ENV
    if (typeof window == "undefined") return null;

    const ls = localStorage || window.localStorage;

    if(!ls) {
        throw new Error("Local Storage not available")
    }

    const data = ls.getItem(STORAGE_KEY)
    
    if(!data) return null;

    return JSON.parse(data) as {
        accessToken: string,
        refreshToken: string,
        exp: number;
    }
}

// 2. Setting the access token in storage

export function setAccessToken(
    accessToken: string, 
    refreshToken: string,
) {
    // 1. Parse the JWT token to get the expiration date

    const { exp } = parseJwt(accessToken)

    // 2. Set all three variables inside local storage using the storage key

    const ls = localStorage || window.localStorage;

    if(!ls) {
        throw new Error("Local Storage not available")
    }

    ls.setItem(STORAGE_KEY, JSON.stringify({ accessToken, refreshToken, exp }));
}

// 3. Parse the JWT toekn that comes back and extract the exp date field

export function parseJwt(token: string) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    var jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
            })
            .join("")
    )
            return JSON.parse(jsonPayload)
}