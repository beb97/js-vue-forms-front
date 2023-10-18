import Structure from "@/model/Structure";
import httpClient from "./httpClient";

const END_POINT = "/structure/";

const getAll = () => httpClient.get<Structure[]>(END_POINT);
const get = (id: string) => httpClient.get<Structure>(END_POINT + id);
const post = (contenu: Structure) => httpClient.post(END_POINT, contenu);
const remove = (id: string) => httpClient.delete(END_POINT + id);
const put = (id: string, contenu: Structure) => httpClient.put(END_POINT + id, contenu);
const patch = (id: string, contenu: Structure) => httpClient.patch(END_POINT + id, contenu);

export { getAll, get, post, remove, put, patch };
