import axios from 'axios';

import User from '../interfaces/user';

export const getAllUsers = () =>
  axios
    .get<User[]>('/users')
    .then(({ data: users }: { data: User[] }) => users);

export const getUser = (userId: number | string) =>
  axios
    .get<User>(`/user/${userId}`)
    .then(({ data: user }: { data: User }) => user);
