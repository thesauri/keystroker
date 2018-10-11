import { query } from "./db";
import Participant from "../../../common/Participant";
import { QueryResult } from "pg";

export const createParticipant = (participant: Participant): Promise<QueryResult> => {
    return query(
        "INSERT INTO Participant(email, password, pattern, toc_accepted) VALUES ($1, $2, $3, $4);",
        [participant.email, participant.password, JSON.stringify(participant.pattern), participant.toc_accepted]
    );
}
