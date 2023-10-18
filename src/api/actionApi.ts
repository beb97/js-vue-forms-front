import Action from "@/model/Action";
import httpClient from "./httpClient";

const END_POINT = "/action/";

const getAll = () => httpClient.get<Action[]>(END_POINT);
const get = (id: string) => httpClient.get<Action>(END_POINT + id);
const post = (contenu: Action) => httpClient.post(END_POINT, contenu);
const remove = (id: string) => httpClient.delete(END_POINT + id);
const put = (id: string, contenu: Action) => httpClient.put(END_POINT + id, contenu);
const patch = (id: string, contenu: Action) => httpClient.patch(END_POINT + id, contenu);

export { getAll, get, post, remove, put, patch };
