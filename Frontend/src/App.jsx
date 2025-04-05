import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import Contact from './Pages/Contact';
import Services from './Pages/Services';
import Mission from './Pages/Mission';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Gallery from './Pages/Gallery';
import ParishDirectory from './Pages/ParishDirectory';
import Donation from './Pages/Donation';
import DonatorsList from './Pages/DonatorsList';
import AdminDashboard from './Components/AdminDashboard';
import UserNavbar from './Components/UserNavbar';
import UserHome from './Pages/UserHome';
import Settings from './Pages/Settings';
import Reports from './Pages/Reports';
import QuizForm from './Pages/QuizForm';
import AccountantNavbar from './Components/AccountantNavbar';
import AccountantHome from './Pages/AccountantHome';
import BalanceSheet from './Pages/BalanceSheet';
import ExpenseManagement from './Pages/ExpenseManagement';
import IncomeStatements from './Pages/IncomeStatements';
import DonationTracking from './Pages/DonationTracking';
import BudgetPlanning from './Pages/BudgetPlanning';
import AdminLogin from './Pages/AdminLogin';
import ResetPassword from './Pages/ResetPassword';
import AccountantLogin from './Pages/AccountantLogin';
import HFooter from './Components/HFooter';
import Donation2 from './Pages/Donation2';
import AdminReports from './Pages/AdminReports';
import QuizResult from './Pages/QuizResult';
import AddPetition from './Pages/AddPetition';
import ViewPetitions from './Pages/ViewPetitions';
import MemberDetails from './Pages/MemberDetails';
import ImageGalleryUpload from './Pages/ImageGalleryUpload';
import VicarDashboard from './Components/VicarDashboard';
import VicarLogin from './Pages/VicarLogin';
import ParishList from './Pages/ParishList';
import QuizForms from './Pages/QuizForms';
import Virtualid from './Pages/VirtualID';
import BloodDonationPage from './Pages/BloodDonationPage';
import FamilyUnitForm from './Pages/FamilyUnitForm';
import PastVicars from './Pages/Past Vicars.jsx';
import Profile from './Pages/Profile.jsx';
import ViewBloodDonationPage from './Pages/ViewBloodDonationPage.jsx';
import FamilyUnitView from './Pages/FamilyUnitView.jsx';
import FinancialReport from './Pages/FinancialReports';
import VerifyUsers from './Pages/VerifyUsers.jsx';
// import ParishMemberPage from './Pages/ParishMemberPage.jsx';
// import BloodDonationList from './Pages/BloodDonationList';

// New Vicar Pages
// import VicarPetitions from './Pages/VicarPetitions';
// import VicarReports from './Pages/VicarReports';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><Navbar/><Home /><HFooter/></>} />
        <Route path="/contact" element={<><Navbar/><Contact /><Footer/></>} />
        <Route path="/services" element={<><Navbar/><Services /><Footer/></>} />
        <Route path="/mission" element={<><Navbar/><Mission /><Footer/></>} />
        <Route path="/login" element={<><Navbar/><Login /><Footer/></>} />
        <Route path="/signup" element={<><Navbar/><SignUp /><Footer/></>} />
        <Route path="/gallery" element={<><Navbar/><Gallery /><Footer/></>} />
        <Route path="/image" element={<><Navbar/><ImageGalleryUpload /><Footer/></>} />
        <Route path="/parish-directory" element={<><Navbar/><ParishDirectory /><Footer/></>} />
        <Route path="/parish-list" element={<><ParishList /></>} />
        {/* <Route path="/parish-member" element={<><ParishMemberPage /></>} /> */}


        <Route path="/past-vicars" element={<><Navbar/><PastVicars /><Footer/></>} />




        <Route path="/member/:id" element={<MemberDetails/>} />
        <Route path="/donation" element={<><Navbar/><Donation /><Footer/></>} />
        <Route path="/donators-list" element={<><Navbar/><DonatorsList /><Footer/></>} />
        <Route path="/Donation2" element={<><UserNavbar/><Donation2/><Footer/></>} />
        <Route path="/blood-donation" element={<><UserNavbar/><BloodDonationPage/><Footer/></>} />
        {/* <Route path="/blood-donationlist" element={<><UserNavbar/><BloodDonationList/><Footer/></>} /> */}

        <Route path="/view-blooddonation" element={<><UserNavbar/><ViewBloodDonationPage/><Footer/></>} />


        {/* User Routes */}
        <Route path="/user-home" element={<><UserNavbar/><UserHome /><Footer/></>} />
        <Route path="/profile" element={<><UserNavbar/><Profile/><Footer/></>} />
        <Route path="/settings" element={<><UserNavbar/><Settings/><Footer/></>} />
        <Route path="/virtualid" element={<><UserNavbar/><Virtualid/><Footer/></>} />
        <Route path="/reports" element={<><UserNavbar/><Reports/><Footer/></>} />
        <Route path="/quiz-form" element={<><UserNavbar/><QuizForm/><Footer/></>} />
        <Route path="/quiz-forms" element={<><UserNavbar/><QuizForms/><Footer/></>} />


        <Route path="/adminreports" element={<><UserNavbar/><AdminReports/><Footer/></>} />
        <Route path="/quiz-result" element={<><QuizResult/></>} />
        <Route path="/add" element={<><UserNavbar/><AddPetition /><Footer/></>} />
        <Route path="/view" element={<><UserNavbar/><ViewPetitions /><Footer/></>} />

        {/* Admin Routes */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/family-unit" element={<FamilyUnitForm />} />
        <Route path="/view-family-unit" element={<FamilyUnitView />} />
        <Route path="/verify-users" element={<VerifyUsers />} />




        {/* Accountant Routes */}
        <Route path="/accountant-login" element={<AccountantLogin />} />
        <Route path="/accountant-home" element={<><AccountantNavbar/><AccountantHome/><Footer/></>} />
        <Route path="/balance-sheet" element={<><AccountantNavbar/><BalanceSheet/><Footer/></>} />
        <Route path="/expense-management" element={<><AccountantNavbar/><ExpenseManagement/><Footer/></>} />
        <Route path="/income-statements" element={<><AccountantNavbar/><IncomeStatements/><Footer/></>} />
        <Route path="/financial-reports" element={<><AccountantNavbar/><FinancialReport/><Footer/></>} />
        <Route path="/donation-tracking" element={<><AccountantNavbar/><DonationTracking/><Footer/></>} />
        <Route path="/budget-planning" element={<><AccountantNavbar/><BudgetPlanning/><Footer/></>} />

        {/* Vicar Routes */}
        <Route path="/vicar-dashboard" element={<VicarDashboard />} />
<Route path="/view" element={<ViewPetitions />} />
<Route path="/vicar-login" element={<VicarLogin />} />

</Routes>
    </BrowserRouter>
  );
}

export default App;
