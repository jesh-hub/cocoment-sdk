import { createContext } from 'react';
import { User } from 'firebase/auth';

export const PageIdContext = createContext<string | null>(null);

export const UserContext = createContext<User | null>(null);
