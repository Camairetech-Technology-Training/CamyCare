import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import PrescriptionAdd from './components/Prescriptions/AddPrescription';
import PrescriptionView from './pages/pharmacy_staff/prescriptions/ViewPrescriptions';
import PatientView from './pages/pharmacy_staff/patients/ViewPatients';
import PatientPrescriptions from './pages/pharmacy_staff/patients/PatientPrescriptions';
import DefaultLayout from './layout/DefaultLayout';
import { Prescription } from './types/entities';
import Profile from './pages/Profile';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="CamyCare - Medication Reminder Admin Dashboard" />
              <PrescriptionView />
            </>
          }
        />
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

        {/* Prescription Routes */}
        <Route
          path="/prescriptions/add"
          element={
            <>
              <PageTitle title="Add Prescription | CamyCare" />
              <PrescriptionAdd addPrescription={function (_prescription: Prescription): void {
                throw new Error('Function not implemented.');
              } } closeModal={function (): void {
                throw new Error('Function not implemented.');
              } } />
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
  );
}

export default App;
