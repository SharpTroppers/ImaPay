import { useEffect, useState } from 'react';
import { renderUsers, deleteUser } from '../service';



export interface User {
  id: number,
  date: string,
  type: string
  valor: number,
}

const useUser = () => {
    const [userList, setUsers] = useState<User[]>([] as User[])

    useEffect(() => {
        renderUsers().then(users => setUsers(users))
    },[])
    
  return {
    userList,

  };
}

export default useUser;