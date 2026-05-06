import { APP_USER } from '../constants';

class LocalStorageUser {
  static storeUserData(user: User) {
    try {
      localStorage.setItem(APP_USER, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving data to localStorage user:', error);
    }
  }

  static getUserData() {
    try {
      const user = localStorage.getItem(APP_USER);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error retrieving data from localStorage user:', error);
      return null;
    }
  }

  static removeUserData() {
    try {
      localStorage.removeItem(APP_USER);
    } catch (error) {
      console.error('Error removing data from localStorage user:', error);
    }
  }
}

export { LocalStorageUser };
