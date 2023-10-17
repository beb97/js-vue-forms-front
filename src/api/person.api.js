import httpClient from "./httpClient";

const END_POINT = "/person/";

const getAll = () => httpClient.get(END_POINT);
const get = (id) => httpClient.get(END_POINT + id);
const post = (contenu) => httpClient.post(END_POINT, contenu);
const remove = (id) => httpClient.delete(END_POINT + id);
const put = (id, contenu) => httpClient.put(END_POINT + id, contenu);
const patch = (id, contenu) => httpClient.patch(END_POINT + id, contenu);

export { getAll, get, post, remove, put, patch };
