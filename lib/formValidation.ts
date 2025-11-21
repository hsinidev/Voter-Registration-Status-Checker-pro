import { RegistrationFormData, FormErrors } from '../types';

export const validateForm = (formData: RegistrationFormData): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.firstName.trim()) {
    errors.firstName = 'First name is required.';
  } else if (formData.firstName.length < 2) {
    errors.firstName = 'First name must be at least 2 characters.';
  }

  if (!formData.lastName.trim()) {
    errors.lastName = 'Last name is required.';
  } else if (formData.lastName.length < 2) {
    errors.lastName = 'Last name must be at least 2 characters.';
  }

  if (!formData.dob) {
    errors.dob = 'Date of birth is required.';
  } else {
    const today = new Date();
    const birthDate = new Date(formData.dob);
    
    // Set hours to 0 to avoid timezone issues affecting the date comparison
    today.setHours(0, 0, 0, 0);
    birthDate.setHours(0, 0, 0, 0);

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (birthDate > today) {
        errors.dob = 'Date of birth cannot be in the future.';
    } else if (age < 18) {
        errors.dob = 'You must be at least 18 years old to vote.';
    }
  }

  if (!formData.streetAddress.trim()) {
    errors.streetAddress = 'Street address is required.';
  }

  if (!formData.city.trim()) {
    errors.city = 'City is required.';
  }

  if (!formData.state) {
    errors.state = 'State is required.';
  }

  if (!formData.zipCode.trim()) {
    errors.zipCode = 'Zip code is required.';
  } else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
    errors.zipCode = 'Invalid zip code format.';
  }

  return errors;
};
