import { PLAN_DATA } from '../constants';

class LocalStoragePlans {
  static storePlanData(plans: PlanPayment) {
    try {
      localStorage.setItem(PLAN_DATA, JSON.stringify(plans));
    } catch (error) {
      console.error('Error saving data to localStorage plans:', error);
    }
  }

  static getPlanData() {
    try {
      const form = localStorage.getItem(PLAN_DATA);
      return form ? JSON.parse(form) : null;
    } catch (error) {
      console.error('Error retrieving data from localStorage plans:', error);
      return null;
    }
  }

  static removePlanData() {
    try {
      localStorage.removeItem(PLAN_DATA);
    } catch (error) {
      console.error('Error removing data from localStorage plans:', error);
    }
  }
}

export { LocalStoragePlans };
