
import React, { useState, useCallback } from 'react';
import { RegistrationFormData, FormErrors } from '../types';
import { validateForm } from '../lib/formValidation';
import { US_STATES } from '../constants';

const InfoTooltip: React.FC<{ text: string }> = ({ text }) => (
  <div className="group relative inline-block ml-2">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 hover:text-blue-400 cursor-help transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-black text-xs text-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 text-center border border-gray-700">
      {text}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black"></div>
    </div>
  </div>
);

const RegistrationCheckerUI: React.FC = () => {
  const initialFormState: RegistrationFormData = {
    firstName: '',
    lastName: '',
    dob: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
  };
  const [formData, setFormData] = useState<RegistrationFormData>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if(errors[name as keyof FormErrors]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof FormErrors];
        return newErrors;
      });
    }
  }, [errors]);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    
    // Mark all as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => ({...acc, [key]: true}), {});
    setTouched(allTouched);

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 1500);
    }
  };
  
  const handleReset = () => {
    setFormData(initialFormState);
    setErrors({});
    setTouched({});
    setIsSubmitted(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://doodax.com");
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const shareUrl = "https://doodax.com";
  const shareText = "Check your voter registration status instantly with this secure tool. #VoteReady";

  const FormInput: React.FC<{ 
    name: keyof RegistrationFormData, 
    label: string, 
    type?: string, 
    error?: string, 
    autoComplete?: string,
    tooltip?: string 
  }> = ({ name, label, type = "text", error, autoComplete, tooltip }) => {
    const isTouched = touched[name];
    const isValid = isTouched && !error && formData[name].length > 0;

    return (
      <div className="relative">
        <div className="flex items-center mb-1">
            <label htmlFor={name} className="block text-sm font-medium text-gray-300">{label}</label>
            {tooltip && <InfoTooltip text={tooltip} />}
        </div>
        <div className="relative">
            <input
                type={type}
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete={autoComplete}
                className={`block w-full bg-gray-700/50 border ${
                    error ? 'border-red-500 ring-1 ring-red-500' : 
                    isValid ? 'border-green-500/50 bg-green-900/10' : 'border-gray-600'
                } rounded-lg shadow-sm py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all duration-200`}
            />
            {isValid && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none animate-fade-in">
                    <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            )}
        </div>
        {error && <p className="mt-1 text-xs text-red-400 text-left animate-fade-in">{error}</p>}
      </div>
    );
  };

  if (isSubmitted) {
    return (
        <div className="max-w-3xl mx-auto bg-gray-800/60 backdrop-blur-xl rounded-2xl shadow-2xl p-8 md:p-12 text-center border border-gray-700/50 relative overflow-hidden">
            {/* Success Decoration */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500"></div>
            
            <div className="inline-flex items-center justify-center p-4 bg-green-500/10 rounded-full mb-6 ring-1 ring-green-500/30">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-2">Ready for Verification</h2>
            <p className="text-gray-300 mb-8 max-w-lg mx-auto">
                We've prepared your information. To protect your privacy, the final verification happens on your state's official secure portal.
            </p>

            <div className="bg-gray-900/50 rounded-xl p-6 mb-8 border border-gray-700 text-left">
                <h3 className="text-brand-gold font-bold text-sm uppercase tracking-wider mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                    Your Voting Action Plan
                </h3>
                <ul className="space-y-3">
                    <li className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full border-2 border-blue-500 text-blue-500 font-bold text-xs mr-3 mt-0.5">1</div>
                        <span className="text-gray-300 text-sm">Click the button below to verify your status on the <strong>{formData.state}</strong> portal.</span>
                    </li>
                    <li className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full border-2 border-gray-600 text-gray-500 font-bold text-xs mr-3 mt-0.5">2</div>
                        <span className="text-gray-300 text-sm">Confirm your polling location and hours of operation.</span>
                    </li>
                    <li className="flex items-start">
                        <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full border-2 border-gray-600 text-gray-500 font-bold text-xs mr-3 mt-0.5">3</div>
                        <span className="text-gray-300 text-sm">Research candidates and prepare your sample ballot.</span>
                    </li>
                </ul>
            </div>

            <a 
                href={`https://www.google.com/search?q=official+voter+registration+lookup+${formData.state}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto inline-flex justify-center items-center bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transform hover:-translate-y-1"
            >
                <span>Go to Official {formData.state} Portal</span>
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </a>

            <div className="mt-10 pt-8 border-t border-gray-700/50">
                <p className="text-sm text-gray-400 mb-4">Voting is contagious. Inspire others to check their status.</p>
                <div className="flex flex-wrap justify-center gap-3">
                    <button onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank')} className="bg-[#1DA1F2] hover:bg-[#1a91da] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                        Twitter
                    </button>
                    <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')} className="bg-[#4267B2] hover:bg-[#365899] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        Facebook
                    </button>
                    <button onClick={handleCopyLink} className={`bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center ${copySuccess ? 'text-green-400' : ''}`}>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                        {copySuccess ? 'Copied!' : 'Copy Link'}
                    </button>
                </div>
            </div>

            <button
                onClick={handleReset}
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                title="Reset Form"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-10 border border-gray-700 text-left relative z-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-red-400">Enter Your Details</h2>
        <p className="mt-2 text-gray-400">Information is used locally to generate your correct state link.</p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-6">
          <fieldset className="border-t border-gray-700 pt-6">
            <legend className="text-lg font-semibold text-blue-300 px-2 -ml-2 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                Personal Information
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <FormInput name="firstName" label="First Name" error={errors.firstName} autoComplete="given-name" />
              <FormInput name="lastName" label="Last Name" error={errors.lastName} autoComplete="family-name" />
              <div className="md:col-span-2">
                 <FormInput 
                    name="dob" 
                    label="Date of Birth" 
                    type="date" 
                    error={errors.dob} 
                    autoComplete="bday" 
                    tooltip="Required to verify age eligibility (18+)."
                 />
              </div>
            </div>
          </fieldset>

          <fieldset className="border-t border-gray-700 pt-6">
            <legend className="text-lg font-semibold text-red-300 px-2 -ml-2 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                Residential Address
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="md:col-span-2">
                    <FormInput 
                        name="streetAddress" 
                        label="Street Address" 
                        error={errors.streetAddress} 
                        autoComplete="street-address"
                        tooltip="Your precinct is determined by your physical residence, not your mailing address."
                    />
                </div>
                <FormInput name="city" label="City" error={errors.city} autoComplete="address-level2" />
                
                <div className="relative">
                    <div className="flex items-center mb-1">
                        <label htmlFor="state" className="block text-sm font-medium text-gray-300">State</label>
                    </div>
                    <select
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`block w-full bg-gray-700/50 border ${errors.state ? 'border-red-500 ring-1 ring-red-500' : touched.state && formData.state ? 'border-green-500/50 bg-green-900/10' : 'border-gray-600'} rounded-lg shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all`}
                    >
                      <option value="">Select a State</option>
                      {US_STATES.map(state => <option key={state} value={state}>{state}</option>)}
                    </select>
                    {errors.state && <p className="mt-1 text-xs text-red-400">{errors.state}</p>}
                </div>

                <div className="md:col-span-2">
                    <FormInput name="zipCode" label="Zip Code" error={errors.zipCode} autoComplete="postal-code" />
                </div>
            </div>
          </fieldset>
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] text-base font-bold text-white bg-gradient-to-r from-brand-blue to-blue-800 hover:from-blue-700 hover:to-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900 transition-all duration-300 disabled:bg-gray-600 disabled:from-gray-600 disabled:shadow-none transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Securely...
                </>
              ) : 'Check Registration Status'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegistrationCheckerUI;
