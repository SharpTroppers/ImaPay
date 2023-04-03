import axios from "axios"


export interface User {
  id: number,
  date: string,
  type: string
  valor: number,
}

const api = axios.create({
    baseURL: "http://localhost:3333"
})

export const renderUsers = (): Promise<User[]> => {
    return api.get<User[]>("/users").then(response => response.data)
}

export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`)
}