import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/pharmacy_staff/pharmacy/Authentification/SignIn';
import SignUp from './pages/pharmacy_staff/pharmacy/Authentification/SignUp';
import PrescriptionAdd from './components/Prescriptions/AddPrescription';
import PrescriptionView from './pages/pharmacy_staff/prescriptions/ViewPrescriptions';
import PatientView from './pages/pharmacy_staff/patients/ViewPatients';
import PatientPrescriptions from './pages/pharmacy_staff/patients/PatientPrescriptions';
import DefaultLayout from './layout/DefaultLayout';
import Profile from './pages/Profile';
import { UserProvider } from './context/UserContext';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Routes that should not use the default layout
  const isAuthRoute = pathname.startsWith('/auth');

  return loading ? (
    <Loader />
  ) : (
    <UserProvider>
      <>
        {isAuthRoute ? (
          <Routes>
            {/* Authentication Routes */}
            <Route
              path="/auth/signin"
              element={
                <>
                  <PageTitle title="Signin | CamyCare" />
                  <SignIn />
                </>
              }
            />
            <Route
              path="/auth/signup"
              element={
                <>
                  <PageTitle title="Signup | CamyCare" />
                  <SignUp />
                </>
              }
            />
          </Routes>
        ) : (
          <DefaultLayout>
            <Routes>
              {/* Dashboard and Main App Routes */}
              <Route
                index
                element={
                  <>
                    <PageTitle title="CamyCare - Medication Reminder Admin Dashboard" />
                    <PrescriptionView />
                  </>
                }
              />
              {/* Prescription Routes */}
              <Route
                path="/prescriptions/add"
                element={
                  <>
                    <PageTitle title="Add Prescription | CamyCare" />
                    <PrescriptionAdd
                      isModalOpen={false}
                      setIsModalOpen={function (_open: boolean): void {
                        throw new Error('Function not implemented.');
                      }}
                    />
                  </>
                }
              />
              <Route
                path="/prescriptions/view"
                element={
                  <>
                    <PageTitle title="View Prescriptions | CamyCare" />
                    <PrescriptionView />
                  </>
                }
              />
              {/* Patient Routes */}
              <Route
                path="/patients/view"
                element={
                  <>
                    <PageTitle title="View Patients | CamyCare" />
                    <PatientView />
                  </>
                }
              />
              <Route
                path="/patients/prescriptions/:patientId"
                element={
                  <>
                    <PageTitle title="Patient Prescriptions | CamyCare" />
                    <PatientPrescriptions prescriptions={[]} />
                  </>
                }
              />
              {/* Profile Route */}
              <Route
                path="/profile"
                element={
                  <>
                    <PageTitle title="Profile | CamyCare" />
                    <Profile />
                  </>
                }
              />
            </Routes>
          </DefaultLayout>
        )}
      </>
    </UserProvider>
  );
}

export default App;
