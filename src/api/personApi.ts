import Person from "@/model/Person";
import httpClient from "./httpClient";

const END_POINT = "/person/";

const getAll = () => httpClient.get<Person[]>(END_POINT);
const get = (id: string) => httpClient.get<Person>(END_POINT + id);
const post = (contenu: Person) => httpClient.post(END_POINT, contenu);
const remove = (id: string) => httpClient.delete(END_POINT + id);
const put = (id: string, contenu: Person) => httpClient.put(END_POINT + id, contenu);
const patch = (id: string, contenu: Person) => httpClient.patch(END_POINT + id, contenu);

export { getAll, get, post, remove, put, patch };
