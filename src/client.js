import { useState, useEffect } from 'react';
import { GraphQLClient } from 'graphql-request';

export const BASE_URL =
    process.env.NODE_ENV === 'production'
        ? 'https://geopins-demo.herokuapp.com/graphql'
        : 'https://geopins-demo.herokuapp.com/graphql'
// : 'http://localhost:4000/graphql'

export const useClient = () => {
    const [idToken, setIdToken] = useState('');

    useEffect(() => {
        const token = window.gapi.auth2
            .getAuthInstance()
            .currentUser
            .get()
            .getAuthResponse()
            .id_token;
        setIdToken(token);
    }, []);

    return new GraphQLClient(BASE_URL, {
        headers: { authorization: idToken }
    });
    // return new GraphQLClient(
    //     {
    //         url: BASE_URL,
    //         fetchOptions: {
    //             mode: 'no-cors'
    //         }
    //     }, {
    //         headers: { authorization: idToken }
    //     }
    // );
}