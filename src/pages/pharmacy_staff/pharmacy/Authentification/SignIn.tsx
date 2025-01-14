import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoDark from '../../../../images/logo/logo-dark.svg';
import Logo from '../../../../images/logo/logo.svg';
import { loginPharmacy } from '../../../../services/pharmacyService';
import { useUser } from '../../../../context/UserContext';

const SignIn: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const { setPharmacyData } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const phoneRegex = /^6\d{8}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setError('Phone number must be 9 digits long and start with 6.');
      return;
    }
  
    const formattedPhoneNumber = `+237${phoneNumber}`;
  
    const data = {
      phoneNumber: formattedPhoneNumber,
      password,
    };
  
    try {
      const response = await loginPharmacy(data);
      console.log(response);
  
      setPharmacyData(response);
      navigate('/prescriptions/view');
    } catch (error: any) {
      console.error('Login error:', error);
      setError('Invalid credentials or server issue.');
    }
  };  

  return (
    <>
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
                <span className="mb-1.5 block font-medium">Start for free</span>
                <h2 className="mb-4 text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Sign In to CamyCare
                </h2>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Phone Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter your phone number"
                        className="w-full rounded-lg border border-stroke bg-transparent py-3 px-4 text-sm text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="Enter your password"
                        className="w-full rounded-lg border border-stroke bg-transparent py-3 px-4 text-sm text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-lg bg-primary py-3 text-sm font-medium text-white hover:bg-primary-dark focus:outline-none"
                  >
                    Sign In
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p>
                    Don’t have any account?{' '}
                    <Link to="/auth/signup" className="text-primary">
                      Sign Up
                    </Link>
                  </p>
                </div>

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
