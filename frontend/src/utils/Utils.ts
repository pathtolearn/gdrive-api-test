export const getNewState = (state, newState) => {
    return Object.assign({}, state, newState);
}

export const getParamsAsUrl = (params): string => {
    let parameterizedUrl: string = "";
    for(let key in params) {
        if(params[key]) {
            parameterizedUrl += `${key}=${params[key]}&`;
        }
    }
    return parameterizedUrl;
}