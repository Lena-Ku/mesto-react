import React from 'react';
import profileAvatar from '../images/profile__avatar.jpg';

export const initialUser = {
    name: 'Жак-Ив Кусто',
    about: 'Исследователь океана',
    avatar: profileAvatar
  }

export const CurrentUserContext = React.createContext();