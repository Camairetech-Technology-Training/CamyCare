import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoDark from '../../images/logo/logo-dark.svg';
import Logo from '../../images/logo/logo.svg';

const SignUp: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    pharmacyName: '',
    contactNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    setTimeout(() => {
      setQrCodeUrl('https://via.placeholder.com/200?text=QR+Code');
      setStep(2);
    }, 1000);
  };

  const handleGoBack = () => {
    setStep(1);
    setQrCodeUrl('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="w-full max-w-4xl rounded-lg border border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark p-6 sm:p-10">
        <div className="flex flex-wrap items-center">
          {/* Left Panel */}
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-8 px-6 text-center">
              <Link className="mb-6 inline-block" to="/">
                <img className="hidden dark:block" src={Logo} alt="Logo" />
                <img className="dark:hidden" src={LogoDark} alt="Logo" />
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Join our pharmacy network to manage your store efficiently and provide top-notch care to your customers.
              </p>
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-full xl:w-1/2">
            <div className="p-4 sm:p-8">
              {step === 1 ? (
                <>
                  <h2 className="mb-4 text-2xl font-bold text-black dark:text-white sm:text-3xl">
                    Pharmacy Sign Up
                  </h2>
                  <form onSubmit={handleFormSubmit}>
                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-medium text-black dark:text-white">
                        Pharmacy Name
                      </label>
                      <input
                        type="text"
                        name="pharmacyName"
                        value={formData.pharmacyName}
                        onChange={handleInputChange}
                        placeholder="Enter pharmacy name"
                        className="w-full rounded-lg border border-stroke bg-transparent py-3 px-4 text-sm text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-medium text-black dark:text-white">
                        Contact Number
                      </label>
                      <input
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        placeholder="Enter contact number"
                        className="w-full rounded-lg border border-stroke bg-transparent py-3 px-4 text-sm text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-medium text-black dark:text-white">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Create a password"
                        className="w-full rounded-lg border border-stroke bg-transparent py-3 px-4 text-sm text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-medium text-black dark:text-white">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Re-enter your password"
                        className="w-full rounded-lg border border-stroke bg-transparent py-3 px-4 text-sm text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-lg bg-primary py-3 text-sm font-medium text-white hover:bg-primary-dark focus:outline-none"
                    >
                      Proceed to Step 2
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <h2 className="mb-4 text-2xl font-bold text-black dark:text-white sm:text-3xl">
                    Scan QR Code
                  </h2>
                  <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                    Use your WhatsApp to scan the QR code below for authentication.
                  </p>
                  <div className="flex items-center justify-center mb-4">
                    {qrCodeUrl ? (
                      <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48" />
                    ) : (
                      <p>Loading QR Code...</p>
                    )}
                  </div>
                  <button
                    onClick={handleGoBack}
                    className="w-full rounded-lg bg-secondary py-3 text-sm font-medium text-black hover:bg-secondary-dark focus:outline-none"
                  >
                    Go Back to Step 1
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
