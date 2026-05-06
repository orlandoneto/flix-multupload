import { FORM_DATA } from '../../utils/constants';

class LocalStorageForm {
  static storeFormData(form: Form) {
    try {
      localStorage.setItem(FORM_DATA, JSON.stringify(form));
    } catch (error) {
      console.error('Error saving data to localStorage form:', error);
    }
  }

  static getFormData() {
    try {
      const form = localStorage.getItem(FORM_DATA);
      return form ? JSON.parse(form) : null;
    } catch (error) {
      console.error('Error retrieving data from localStorage form:', error);
      return null;
    }
  }

  static removeFormData() {
    try {
      localStorage.removeItem(FORM_DATA);
    } catch (error) {
      console.error('Error removing data from localStorage form:', error);
    }
  }
}

export { LocalStorageForm };
