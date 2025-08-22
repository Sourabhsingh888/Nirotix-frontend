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

const authProtectedRoutes = [
  // 🔹 Append role-specific fallback
  ...roleFallbackRoutes(role),

  //Dashboard Route
  {
    path: "/admin-dashboard",
    component: <DashboardPage />,
    allowedRoles: ["admin"],
  },

  // Unauthorized
  {
    path: "/unauthorized",
    component: <Unauthorized />,
    allowedRoles: ["admin", "user"], // both can see unauthorized page
  },

  // Redirects for unknown paths (role-specific)
  // {
  //   path: "*",
  //   component: <RoleRedirect />,
  //   allowedRoles: ["admin", "user"], // fallback for both
  // },

  // Management section

  //Product Management Route
  {
    path: "/product-management/category",
    component: <ProductCategoryPage />,
    allowedRoles: ["admin"],
  },
  {
    path: "/product-management/products",
    component: <ProductsPage />,
    allowedRoles: ["admin"],
  },
  {
    path: "/product-management/product-pricing",
    component: <ProductPricingPage />,
    allowedRoles: ["admin"],
  },

  //User Management Route
  {
    path: "/user-management/user-list",
    component: <UserListPage />,
    allowedRoles: ["admin"],
  },

  //Setting Management Route
  {
    path: "/setting-management/add-apis",
    component: <AddAPIsPage />,
    allowedRoles: ["admin"],
  },
  {
    path: "/setting-management/service-switching",
    component: <ServiceSwitichingPage />,
    allowedRoles: ["admin"],
  },

  //Account Management Route
  {
    path: "/account-management/wallet",
    component: <WalletTransferPage />,
    allowedRoles: ["admin"],
  },

  // MSG section

  //MSG Management Route
  {
    path: "/msg-management/add-msg",
    component: <AddMessagePage />,
    allowedRoles: ["admin"],
  },
  {
    path: "/msg-management/send-msg",
    component: <SendMessagePage />,
    allowedRoles: ["admin"],
  },
  {
    path: "/msg-management/msg-signature",
    component: <MessageSignaturePage />,
    allowedRoles: ["admin"],
  },
  {
    path: "/msg-management/msg-contents",
    component: <MessageContentsPage />,
    allowedRoles: ["admin"],
  },
  {
    path: "/msg-management/msg-logs",
    component: <MessageLogsPage />,
    allowedRoles: ["admin"],
  },

  // ============================== User related Routes  ===============================

  //Dashboard Route
  {
    path: "/user-dashboard",
    component: <UserDashboardPage />,
    allowedRoles: ["user"],
  },

  // ============================== Services ===============================

  // AadharPan
  {
    path: "/services/aadhar",
    component: <AadharOKYC />,
    allowedRoles: ["user"],
  },
  {
    path: "/services/pan",
    component: <Pan />,
    allowedRoles: ["user"],
  },

  // Bank Account
  {
    path: "/services/bank/pennydrop",
    component: <PennyDrop />,
    allowedRoles: ["user"],
  },

  // Digital kyc
  {
    path: "/services/digital-kyc/facematch",
    component: <FaceMatch />,
    allowedRoles: ["user"],
  },
  {
    path: "/services/digital-kyc/liveliness",
    component: <LivelinessCheck />,
    allowedRoles: ["user"],
  },
  {
    path: "/services/digital-kyc/namematch",
    component: <NameMatch />,
    allowedRoles: ["user"],
  },
  {
    path: "/services/digital-kyc/geo-coading",
    component: <ReverseGeocoading />,
    allowedRoles: ["user"],
  },

  // Kyb(know you business)
  {
    path: "/services/kyb/cin-mca-lookup",
    component: <CinMcaLookup />,
    allowedRoles: ["user"],
  },
  { path: "/services/kyb/gstin", component: <Gstin />, allowedRoles: ["user"] },
  {
    path: "/services/kyb/pan-gstin",
    component: <PanToGistin />,
    allowedRoles: ["user"],
  },

  // Other Offical docs
  {
    path: "/services/other-docs/driving-license",
    component: <DrivingLicense />,
  },
  {
    path: "/services/other-docs/emp",
    component: <Employment360 />,
    allowedRoles: ["user"],
  },
  {
    path: "/services/other-docs/mobile",
    component: <Mobile360 />,
    allowedRoles: ["user"],
  },
  {
    path: "/services/other-docs/passport",
    component: <Passport />,
    allowedRoles: ["user"],
  },
  {
    path: "/services/other-docs/vehicle-rc",
    component: <VehicleRc />,
    allowedRoles: ["user"],
  },
  {
    path: "/services/other-docs/voterid",
    component: <VoterID />,
    allowedRoles: ["user"],
  },

  // Telecome Intelligence
  {
    path: "/services/telecom/dth-customer-info",
    component: <DTHCustomerInfo />,
    allowedRoles: ["user"],
  },
  {
    path: "/services/telecom/dth-tariffplans",
    component: <DTHTariffPlans />,
    allowedRoles: ["user"],
  },
  {
    path: "/services/telecom/lookup",
    component: <NumberLookup />,
    allowedRoles: ["user"],
  },
  {
    path: "/services/telecom/prepaid-tariffplans",
    component: <PrepaidTariffPlans />,
    allowedRoles: ["user"],
  },
  {
    path: "/services/telecom/special-offer",
    component: <SpecialOffercheck />,
    allowedRoles: ["user"],
  },

  // Utility Bill Intelligence
  {
    path: "/services/utility/broadband",
    component: <BroadbandPostpaid />,
    allowedRoles: ["user"],
  },
  {
    path: "/services/utility/cable",
    component: <CableTV />,
    allowedRoles: ["user"],
  },
  {
    path: "/services/utility/club-assoc",
    component: <ClubsAssociations />,
    allowedRoles: ["user"],
  },
  {
    path: "/services/utility/credit-card",
    component: <CreditCard />,
    allowedRoles: ["user"],
  },
  {
    path: "/services/utility/donation",
    component: <Donation />,
    allowedRoles: ["user"],
  },
  {
    path: "/services/utility/electricity",
    component: <Electricity />,
    allowedRoles: ["user"],
  },
  {
    path: "/services/utility/fastag",
    component: <FASTag />,
    allowedRoles: ["user"],
  },
  { path: "/services/utility/gas", component: <Gas />, allowedRoles: ["user"] },
  {
    path: "/services/utility/hospital",
    component: <HospitalPathology />,
    allowedRoles: ["user"],
  },
  {
    path: "/services/utility/housing",
    component: <HousingSociety />,
    allowedRoles: ["user"],
  },
  {
    path: "/services/utility/insurance",
    component: <Insurance />,
    allowedRoles: ["user"],
  },
  {
    path: "/services/utility/landline",
    component: <LandlinePostpaid />,
    allowedRoles: ["user"],
  },
  {
    path: "/services/utility/loan-repayment",
    component: <LoanRepayment />,
    allowedRoles: ["user"],
  },
  {
    path: "/services/utility/lpg",
    component: <LPGGas />,
    allowedRoles: ["user"],
  },
  {
    path: "/services/utility/muncipal-serivices",
    component: <MunicipalServices />,
    allowedRoles: ["user"],
  },
  {
    path: "/services/utility/postpaid",
    component: <Postpaid />,
    allowedRoles: ["user"],
  },
  {
    path: "/services/utility/rental",
    component: <Rental />,
    allowedRoles: ["user"],
  },
  {
    path: "/services/utility/subscription",
    component: <Subscription />,
    allowedRoles: ["user"],
  },
  {
    path: "/services/utility/water",
    component: <Water />,
    allowedRoles: ["user"],
  },

  // ============================== Account ===============================

  // My account
  {
    path: "/account/myaccount/payment-report",
    component: <PaymentReport />,
    allowedRoles: ["user"],
  },
  {
    path: "/account/myaccount/statement",
    component: <Statement />,
    allowedRoles: ["user"],
  },

  // Developer api
  {
    path: "/account/developer/token-ip",
    component: <TokenAndIP />,
    allowedRoles: ["user"],
  },

  // {
  //   path: "/",
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
