import Participant from "../../common/Participant";
import Success from "../../common/Success";
import Login from './common/Login';

const postData = (url: string, data: object): Promise<Success> => {
    const params: RequestInit = {
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        method: "POST",
    };
    return fetch(url, params)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                return response.json().then((error) => {
                    if (error.error) {
                        return Promise.reject(error.error)
                    } else {
                        return Promise.reject("Unable to process the request. Please let me know so that I can investigate the issue.");
                    }
                });
            }
        })
        .then(json => {
            if (json.error === undefined) {
                try {
                    const result: Success = json;
                    return Promise.resolve(result);
                } catch (error) {
                    return Promise.reject("Unable to process the request. Please let me know so that I can investigate the issue.");
                }
            } else {
                return Promise.reject(json.error);
            }
        });
}

export const createParticipant = (participant: Participant): Promise<string> =>
    postData("/participant", participant)
        .then(success => success.message)
        .catch(error => Promise.reject(error));

export const attemptPasswordLogin = (login: Login): Promise<string> =>
    postData("/login", login)
        .then(success => success.message)
        .catch(error => Promise.reject(error));

export const attemptPatternLogin = (email: string, pattern: number[]): Promise<string> =>
    postData("/pattern", { email, pattern })
        .then(success => success.message)
        .catch(error => Promise.reject(error));
