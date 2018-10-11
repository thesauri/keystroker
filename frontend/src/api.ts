import Participant from "../../common/Participant";
import Success from "../../common/Success";

const postData = (url: string, data: object): Promise<Success> => {
    const params: RequestInit = {
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        method: "POST",
    };
    return fetch(url, params)
        .then(response => response.json())
        .then(json => {
            if (json.error === undefined) {
                const result: Success = json;
                return Promise.resolve(result);
            } else {
                return Promise.reject(json.error);
            }
        });
}

export const createParticipant = (participant: Participant): Promise<string> =>
    postData("/participant", participant)
        .then(success => success.message)
        .catch(error => Promise.reject(error));