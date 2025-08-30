import React from "react";
import { Navigate } from "react-router-dom";

//  ================================== Login pages ===============================

import Login from "../pages/Auth/Login";
import Unauthorized from "../pages/Auth/unauthorized/Unauthorized";

//  ================================== Admin Related pages ===============================



//  ================================== Menu ===============================

//Dashboard
import DashboardPage from "../pages/Admin/dashboard/Dashboard";


//  ================================== Management Section ===============================

//Product Management
import ProductCategoryPage from "../pages/Admin/productManagement/ProductCategory";
import ProductsPage from "../pages/Admin/productManagement/Products";
import ProductPricingPage from "../pages/Admin/productManagement/ProductPricing";

//User Management
import UserListPage from "../pages/Admin/userManagement/UserList";

//Setting Management
import AddAPIsPage from "../pages/Admin/settingManagement/AddAPIs";
import ServiceSwitichingPage from "../pages/Admin/settingManagement/ServiceSwitiching";

//Account Management
import WalletTransferPage from "../pages/Admin/accountManagement/WalletTransfer";


//  ================================== MSG Section ===============================

//MSG Management
import AddMessagePage from "../pages/Admin/messageManagement/MessageAPI";
import SendMessagePage from "../pages/Admin/messageManagement/SendMessage";
import MessageSignaturePage from "../pages/Admin/messageManagement/MessageSignature";
import MessageContentsPage from "../pages/Admin/messageManagement/MessageContents";
import MessageLogsPage from "../pages/Admin/messageManagement/MessageLogs";





//  ================================== User Related pages ===============================


//  ================================== Menu ===============================

//Dashboard
import UserDashboardPage from "../pages/users/dashboard/UserDashboard";

//  ================================== Services ===============================

// Aadhar pan
import AadharOKYC from "../pages/users/services/aadharPan/AadharOKYC";
import Pan from "../pages/users/services/aadharPan/Pan";


// Bank Account
import PennyDrop from "../pages/users/services/bankAccount/PennyDrop";


// Digital Kyc
import FaceMatch from "../pages/users/services/digitalKyc/FaceMatch";
import LivelinessCheck from "../pages/users/services/digitalKyc/LivelinessCheck";
import NameMatch from "../pages/users/services/digitalKyc/NameMatch";
import ReverseGeocoading from "../pages/users/services/digitalKyc/ReverseGeocoading";


// Kyb (know your business)
import CinMcaLookup from "../pages/users/services/kyb/CinMcaLookup";
import Gstin from "../pages/users/services/kyb/Gstin";
import PanToGistin from "../pages/users/services/kyb/PanToGistin";


// Other offical Docs
import DrivingLicense from "../pages/users/services/otherOfficaldocs/DrivingLicense";
import Employment360 from "../pages/users/services/otherOfficaldocs/Employment360";
import Mobile360 from "../pages/users/services/otherOfficaldocs/Mobile360";
import Passport from "../pages/users/services/otherOfficaldocs/Passport";
import VehicleRc from "../pages/users/services/otherOfficaldocs/VehicleRc";
import VoterID from "../pages/users/services/otherOfficaldocs/VoterID";


// Telecom Intelligence
import DTHCustomerInfo from "../pages/users/services/telecomIntelligence/DTHCustomerInfo";
import DTHTariffPlans from "../pages/users/services/telecomIntelligence/DTHTariffPlans";
import NumberLookup from "../pages/users/services/telecomIntelligence/NumberLookup";
import PrepaidTariffPlans from "../pages/users/services/telecomIntelligence/PrepaidTariffPlans";
import SpecialOffercheck from "../pages/users/services/telecomIntelligence/SpecialOffercheck";


// Utility Bill Intelligence
import BroadbandPostpaid from "../pages/users/services/utilityBillIntelligence/BroadbandPostpaid";
import CableTV from "../pages/users/services/utilityBillIntelligence/CableTV";
import ClubsAssociations from "../pages/users/services/utilityBillIntelligence/ClubsAssociations";
import CreditCard from "../pages/users/services/utilityBillIntelligence/CreditCard";
import Donation from "../pages/users/services/utilityBillIntelligence/Donation";
import Electricity from "../pages/users/services/utilityBillIntelligence/Electricity";
import FASTag from "../pages/users/services/utilityBillIntelligence/FASTag";
import Gas from "../pages/users/services/utilityBillIntelligence/Gas";
import HospitalPathology from "../pages/users/services/utilityBillIntelligence/HospitalPathology";
import HousingSociety from "../pages/users/services/utilityBillIntelligence/HousingSociety";
import Insurance from "../pages/users/services/utilityBillIntelligence/Insurance";
import LandlinePostpaid from "../pages/users/services/utilityBillIntelligence/LandlinePostpaid";
import LoanRepayment from "../pages/users/services/utilityBillIntelligence/LoanRepayment";
import LPGGas from "../pages/users/services/utilityBillIntelligence/LPGGas";
import MunicipalServices from "../pages/users/services/utilityBillIntelligence/MunicipalServices";
import Postpaid from "../pages/users/services/utilityBillIntelligence/Postpaid";
import Rental from "../pages/users/services/utilityBillIntelligence/Rental";
import Subscription from "../pages/users/services/utilityBillIntelligence/Subscription";
import Water from "../pages/users/services/utilityBillIntelligence/Water";


//  ================================== Account ===============================

// Myaccount
import Statement from "../pages/users/account/myAccount/Statement";
import PaymentReport from "../pages/users/account/myAccount/PaymentReport";

// Developer api
import TokenAndIP from "../pages/users/account/developerAPI/TokenAndIP";


// ✅ Get role from sessionStorage
let role: string | null = null;
try {
  const storedAuth = sessionStorage.getItem("authUser");
  if (storedAuth) {
    const parsed = JSON.parse(storedAuth);
    role = parsed?.user?.role || parsed?.role || null;

  }
} catch (err) {
  console.error("Error parsing authUser from sessionStorage", err);
}


// 🔹 Fallback routes based on role
const roleFallbackRoutes = (role: string) => {
  if (role === "admin") {
    return [
      { path: "/", exact: true, component: <Navigate to="/admin-dashboard" /> },
      { path: "*", component: <Navigate to="/admin-dashboard" /> },
    ];
  }
  if (role === "user") {
    return [
      { path: "/", exact: true, component: <Navigate to="/user-dashboard" /> },
      { path: "*", component: <Navigate to="/user-dashboard" /> },
    ];
  }
  return [{ path: "*", component: <Navigate to="/login" /> }];

};

// ============================== Admin related Routes  ===============================

//Dashboard Route
const adminRoutes = [
  { path: "/admin-dashboard", component: <DashboardPage /> },


  //Product Management Route
  {
    path: "/product-management/category",
    component: <ProductCategoryPage />,
  },
  {
    path: "/product-management/products",
    component: <ProductsPage />,
  },
  {
    path: "/product-management/product-pricing",
    component: <ProductPricingPage />,
  },

  // User Management Route
  {
    path: "/user-management/user-list",
    component: <UserListPage />,
  },

  //Setting Management Route
  {
    path: "/setting-management/add-apis",
    component: <AddAPIsPage />,
  },
  {
    path: "/setting-management/service-switching",
    component: <ServiceSwitichingPage />,
  },

  //Account Management Route
  {
    path: "/account-management/wallet",
    component: <WalletTransferPage />,
  },

  // MSG section

  //MSG Management Route
  {
    path: "/msg-management/add-msg",
    component: <AddMessagePage />,
  },
  {
    path: "/msg-management/send-msg",
    component: <SendMessagePage />,
  },
  {
    path: "/msg-management/msg-signature",
    component: <MessageSignaturePage />,
  },
  {
    path: "/msg-management/msg-contents",
    component: <MessageContentsPage />,
  },
  {
    path: "/msg-management/msg-logs",
    component: <MessageLogsPage />,
  },

];

// ============================== User related Routes  ===============================

//Dashboard Route
const userRoutes = [
  {
    path: "/user-dashboard",
    component: <UserDashboardPage />,
  },

  // ============================== Services ===============================

  // AadharPan
  {
    path: "/services/aadhaar-okyc",
    component: <AadharOKYC />,
  },
  {
    path: "/services/pan",
    component: <Pan />,
  },

  // Bank Account
  {
    path: "/services/penny-drop",
    component: <PennyDrop />,
  },

  // Digital kyc
  {
    path: "/services/face-match",
    component: <FaceMatch />,
  },
  {
    path: "/services/liveliness-check",
    component: <LivelinessCheck />,
  },
  {
    path: "/services/name-match",
    component: <NameMatch />,
  },
  {
    path: "/services/reverse-geocoding",
    component: <ReverseGeocoading />,
  },

  // Kyb(know you business)
  {
    path: "/services/cin-mca-lookup",
    component: <CinMcaLookup />,
  },
  { path: "/services/kyb/gstin", component: <Gstin /> },
  {
    path: "/services/pan-gstin",
    component: <PanToGistin />,
  },

  // Other Offical docs
  {
    path: "/services/driving-license",
    component: <DrivingLicense />,
  },
  {
    path: "/services/employment-360",
    component: <Employment360 />,
  },
  {
    path: "/services/mobile-360",
    component: <Mobile360 />,
  },
  {
    path: "/services/passport",
    component: <Passport />,
  },
  {
    path: "/services/vehicle-rc",
    component: <VehicleRc />,
  },
  {
    path: "/services/voter-id",
    component: <VoterID />,
  },

  // Telecome Intelligence
  {
    path: "/services/dth-customer-info",
    component: <DTHCustomerInfo />,
  },
  {
    path: "/services/dth-tariff-plans",
    component: <DTHTariffPlans />,
  },
  {
    path: "/services/number-lookup",
    component: <NumberLookup />,
  },
  {
    path: "/services/prepaid-tariff-plans",
    component: <PrepaidTariffPlans />,
  },
  {
    path: "/services/special-offer-check",
    component: <SpecialOffercheck />,
  },

  // Utility Bill Intelligence
  {
    path: "/services/broadband-postpaid",
    component: <BroadbandPostpaid />,
  },
  {
    path: "/services/cable-tv",
    component: <CableTV />,
  },
  {
    path: "/services/club-associations",
    component: <ClubsAssociations />,
  },
  {
    path: "/services/credit-card",
    component: <CreditCard />,
  },
  {
    path: "/services/donation",
    component: <Donation />,
  },
  {
    path: "/services/electricity",
    component: <Electricity />,
  },
  {
    path: "/services/fastag",
    component: <FASTag />,
  },
  { path: "/services/gas", component: <Gas />, },
  {
    path: "/services/hospital-pathology",
    component: <HospitalPathology />,
  },
  {
    path: "/services/housing-society",
    component: <HousingSociety />,
  },
  {
    path: "/services/insurance",
    component: <Insurance />,
  },
  {
    path: "/services/landline-postpaid",
    component: <LandlinePostpaid />,
  },
  {
    path: "/services/loan-repayment",
    component: <LoanRepayment />,
  },
  {
    path: "/services/lpg-gas",
    component: <LPGGas />,
  },
  {
    path: "/services/municipal-services",
    component: <MunicipalServices />,
  },
  {
    path: "/services/postpaid",
    component: <Postpaid />,
  },
  {
    path: "/services/rental",
    component: <Rental />,
  },
  {
    path: "/services/subscription",
    component: <Subscription />,
  },
  {
    path: "/services/water",
    component: <Water />,
  },

  // ============================== Account ===============================

  // My account
  {
    path: "/account/myaccount/payment-report",
    component: <PaymentReport />,
  },
  {
    path: "/account/myaccount/statement",
    component: <Statement />,
  },

  // Developer api
  {
    path: "/account/developer/token-ip",
    component: <TokenAndIP />,
  },
];




const authProtectedRoutes = [
  // 🔹 Append role-specific fallback
  ...roleFallbackRoutes(role),

  ...adminRoutes.map((r) => ({ ...r, allowedRoles: ["admin"] })),
  ...userRoutes.map((r) => ({ ...r, allowedRoles: ["user"] })),

  // Unauthorized
  {
    path: "/unauthorized",
    component: <Unauthorized />,
    allowedRoles: ["admin", "user"], 
  },

  // Redirects for unknown paths (role-specific)
  // {
  //   path: "*",
  //   component: <RoleRedirect />,
  //   allowedRoles: ["admin", "user"], // fallback for both
  // },

  // {
  //   path: "*",
  //   component: <RoleRedirect />,
  //   allowedRoles: ["admin", "user"], // fallback for both
  // },

  //   p

  // {ath: "/",
  //   exact: true,
  //   component: <Navigate to="/user-dashboard" />,
  // },
  // { path: "*", component: <Navigate to="/user-dashboard" /> },
];

const publicRoutes = [
  // Authentication Page

  //  ================================== Login route ===============================

  { path: "/login", component: <Login /> },
  // { path: "/logout", component: <Logout /> },

];

export { authProtectedRoutes, publicRoutes };
