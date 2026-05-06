import { designflixApi } from '../api/designflix-api';

interface OtpRequest {
  email: string;
}

interface VerifyOtpRequest extends OtpRequest {
  otp: string;
}

export async function sendOtp({ email }: OtpRequest) {
  const response = await designflixApi.get(`/otps/send`, {
    params: {
      email
    },
  });
  return response.data;
}

export async function verifyOtp({ email, otp }: VerifyOtpRequest) {
  const response = await designflixApi.get(`/otps/verify`, {
    params: {
      email,
      otp
    },
  });
  return response.data;
}
