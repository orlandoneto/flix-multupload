declare interface User {
  token?: string;
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  photo?: string;
  cpf?: string;
  phone?: string;
  countryCode?: number;
  privacyPolicy?: number;
  status?: string;
  planType?: number;
  isResetPassword?: number;
  createdAt?: string;
  updatedAt?: string;
  isLogged?: boolean;
  contributor?: number;
  acceptTerms?: number;
  userType?: string;
  url?: string;
  statusUpdate?: number;
  total_uploads?: number;
  success?: boolean;
  chavePix?: string;
}

interface AuthData {
  token: string;
  user: User;
  isLogged: boolean;
}

declare interface Credentials {
  email: string;
  password: string;
}

declare interface ResetPasswordResponse {
  message: string;
  sent: {
    accepted: string[];
    rejected: string[];
    envelopeTime: number;
    messageTime: number;
    messageSize: number;
    response: string;
    envelope: {
      from: string;
      to: string[];
    };
    messageId: string;
  };
}

declare interface Form {
  acceptTerms: boolean;
  countryCode: string;
  email: string;
  fullName: string;
  password: string;
  passwordConfirmation: string;
  whatsapp: string;
}

declare interface PlanPayment {
  planId: string;
  planName: string;
  planPrice: string;
  planTitle: string;
}

declare interface Plan {
  id: number;
  plan_name: string;
  count_downloads: number;
  current_count_downloads: number;
}

declare interface UserPlan {
  id: number;
  user_id: number;
  plan_id: number;
  stripe_customer_id: string;
  mercadopago_customer_id: string;
  createdAt: string;
  updatedAt: string;
  plans?: Plan;
  user?: User;
}

declare interface ApiResponse {
  data: UserPlan[];
}

interface UserPlanResponse {
  data: UserPlan[] | null;
}
