
export interface RegistrationFormData {
  firstName: string;
  lastName: string;
  dob: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
}

export type FormErrors = Partial<Record<keyof RegistrationFormData, string>>;

export type ModalType = 'about' | 'contact' | 'guide' | 'privacy' | 'terms' | 'dmca';
