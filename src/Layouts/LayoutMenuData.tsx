// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Navdata = () => {
//   const role = "user"; // This would come from auth in real app
//   const navigate = useNavigate();

//   // ✅ Use one state object for toggles
//   const [sections, setSections] = useState({
//     aadharpanservices: false,
//     bankservices: false,
//     kybservices: false,
//     digitalkycservices: false,
//     otherdocservices: false,
//     telecomservices: false,
//     isutilitybillservices: false,
//     myaccount: false,
//     developerapi: false,
//     productManagement: false,
//     userManagement: false,
//     settingManagement: false,
//     accountManagement: false,
//     messageManagement: false,
//     currentState: "dashboard",
//   });

//   // ✅ Explicit role mapping for all main & sub menu items
//   const roleAccess = {
//     dashboard: ["admin", "user"],

//     aadharpanservices: ["user"],
//     aadharokyc: ["user"],
//     pan: ["user"],

//     bankservices: ["user"],
//     pennydrop: ["user"],

//     kybservices: ["user"],
//     pantogstin: ["user"],
//     cinmca: ["user"],
//     gstin: ["user"],

//     digitalkycservices: ["user"],
//     facecheck: ["user"],
//     livelinesscheck: ["user"],
//     namematch: ["user"],
//     reversegeo: ["user"],

//     otherdocservices: ["user"],
//     drivinglic: ["user"],
//     voterid: ["user"],
//     passport: ["user"],
//     employment360: ["user"],
//     vehiclerc: ["user"],
//     mobile360: ["user"],

//     telecomservices: ["user"],
//     numberlookup: ["user"],
//     specialoffer: ["user"],
//     prepaidtariff: ["user"],
//     dthcustomer: ["user"],
//     dthtariff: ["user"],

//     utilitybillservices: ["user"],
//     broadband: ["user"],
//     cabletv: ["user"],
//     clubsassoci: ["user"],
//     creditcard: ["user"],
//     donation: ["user"],
//     electricity: ["user"],
//     fastag: ["user"],
//     gas: ["user"],
//     hospitalpath: ["user"],
//     housingsociety: ["user"],
//     insurance: ["user"],
//     landlinepostpaid: ["user"],
//     loanrepayment: ["user"],
//     lpggas: ["user"],
//     postpaid: ["user"],
//     muncipalservices: ["user"],
//     rental: ["user"],
//     subscription: ["user"],
//     water: ["user"],

//     myaccount: ["user"],
//     statement: ["user"],
//     paymentreport: ["user"],

//     developerapi: ["user"],
//     tokenip: ["user"],

//     productManagement: ["admin"],
//     productCategory: ["admin"],
//     products: ["admin"],
//     productPricing: ["admin"],

//     userManagement: ["admin"],
//     userList: ["admin"],

//     settingManagement: ["admin"],
//     addApis: ["admin"],
//     serviceSwitching: ["admin"],

//     accountManagement: ["admin"],
//     wallettransfer: ["admin"],

//     messageManagement: ["admin"],
//     addMessageApis: ["admin"],
//     sendMessage: ["admin"],
//     messageSignature: ["admin"],
//     messageContents: ["admin"],
//     messageLogs: ["admin"],
//   };

//   function updateIconSidebar(e) {
//     if (e?.target?.getAttribute("sub-items")) {
//       const ul = document.getElementById("two-column-menu");
//       const iconItems = ul?.querySelectorAll(".nav-icon.active") || [];
//       iconItems.forEach((item) => {
//         item.classList.remove("active");
//         const id = item.getAttribute("sub-items");
//         const getID = document.getElementById(id);
//         if (getID) getID.classList.remove("show");
//       });
//     }
//   }

//   useEffect(() => {
//     document.body.classList.remove("twocolumn-panel");

//     // Close all other sections when currentState changes
//     setSections((prev) => {
//       const updated = { ...prev };
//       Object.keys(updated).forEach((key) => {
//         if (key !== prev.currentState && key !== "currentState") {
//           updated[key] = false;
//         }
//       });
//       return updated;
//     });
//   }, [sections.currentState]);

//   const menuItems: any = [
//     {
//       label: "Menu",
//       isHeader: true,
//     },
//     {
//       label: "Dashboards",
//       isHeader: true,
//       icon: "mdi mdi-speedometer",
//       link: role === "user" ? "/user-dashboard" : "/admin-dashboard",
//       id: "dashboard",
//     },

//     {
//       label: "Services",
//       isHeader: true,
//       id: "services-header",
//       role: "user",
//     },
//     {
//       id: "aadharpanservices",
//       label: "Aadhar / PAN",
//       icon: "ri-id-card-line",
//       link: "/#",
//       click: (e: any) => {
//         e.preventDefault();
//         setSections((prev) => ({
//           ...prev,
//           aadharpanservices: !prev.aadharpanservices,
//           currentState: "aadharpanservices",
//         }));
//         updateIconSidebar(e);
//       },
//       stateVariables: sections.aadharpanservices,
//       subItems: [
//         { id: "aadharokyc", label: "Aadhar OKYC", link: "/services/aadhar" },
//         { id: "pan", label: "PAN", link: "/services/pan" },
//       ],
//     },
//     {
//       id: "bankservices",
//       label: "Bank Account",
//       icon: "ri-bank-line",
//       link: "/#",
//       click: (e: any) => {
//         e.preventDefault();
//         setSections((prev) => ({
//           ...prev,
//           bankservices: !prev.bankservices,
//           currentState: "bankservices",
//         }));
//         updateIconSidebar(e);
//       },
//       stateVariables: sections.bankservices,
//       subItems: [
//         {
//           id: "pennydrop",
//           label: "Penny Drop",
//           link: "/services/bank/pennydrop",
//         },
//       ],
//     },
//     {
//       id: "kybservices",
//       label: "KYB (Know Your Business)",
//       icon: "ri-questionnaire-line",
//       link: "/#",
//       click: (e: any) => {
//         e.preventDefault();
//         setSections((prev) => ({
//           ...prev,
//           kybservices: !prev.kybservices,
//           currentState: "kybservices",
//         }));

//         updateIconSidebar(e);
//       },
//       stateVariables: sections.kybservices,
//       subItems: [
//         {
//           id: "pantogstin",
//           label: "PAN to GSTIN",
//           link: "/services/kyb/pan-gstin",
//         },
//         {
//           id: "cinmca",
//           label: "CIN / MCA Lookup",
//           link: "/services/kyb/cin-mca-lookup",
//         },
//         { id: "gstin", label: "GSTIN", link: "/services/kyb/gstin" },
//       ],
//     },

//     {
//       id: "digitalkycservices",
//       label: "Regulated Digital KYC",
//       icon: "ri-account-circle-line",
//       link: "/#",
//       click: (e: any) => {
//         e.preventDefault();
//         setSections((prev) => ({
//           ...prev,
//           digitalkycservices: !prev.digitalkycservices,
//           currentState: "digitalkycservices",
//         }));
//         updateIconSidebar(e);
//       },
//       stateVariables: sections.digitalkycservices,
//       subItems: [
//         {
//           id: "facecheck",
//           label: "Face Check",
//           link: "/services/digital-kyc/facematch",
//         },
//         {
//           id: "livelinesscheck",
//           label: "Liveliness Check",
//           link: "/services/digital-kyc/liveliness",
//         },
//         {
//           id: "namematch",
//           label: "Name Match",
//           link: "/services/digital-kyc/namematch",
//         },
//         {
//           id: "reversegeo",
//           label: "Reverse Geocoading",
//           link: "/services/digital-kyc/geo-coading",
//         },
//       ],
//     },
//     {
//       id: "otherdocservices",
//       label: "Other Official Docs",
//       icon: "ri-folder-4-line",
//       link: "/#",
//       click: (e: any) => {
//         e.preventDefault();
//         setSections((prev) => ({
//           ...prev,
//           otherdocservices: !prev.otherdocservices,
//           currentState: "otherdocservices",
//         }));
//         updateIconSidebar(e);
//       },
//       stateVariables: sections.otherdocservices,
//       subItems: [
//         {
//           id: "drivinglic",
//           label: "Driving License",
//           link: "/services/other-docs/driving-license",
//         },
//         {
//           id: "voterid",
//           label: "Voter ID",
//           link: "/services/other-docs/voterid",
//         },
//         {
//           id: "passport",
//           label: "Passport",
//           link: "/services/other-docs/passport",
//         },
//         {
//           id: "employment360",
//           label: "Employment 360",
//           link: "/services/other-docs/emp",
//         },
//         {
//           id: "vehiclerc",
//           label: "Vehicle RC",
//           link: "/services/other-docs/vehicle-rc",
//         },
//         {
//           id: "mobile360",
//           label: "Mobile 360",
//           link: "/services/other-docs/mobile",
//         },
//       ],
//     },
//     {
//       id: "telecomservices",
//       label: "Telecom Intelligence",
//       icon: "ri-wifi-line",
//       link: "/#",
//       click: (e: any) => {
//         e.preventDefault();
//         setSections((prev) => ({
//           ...prev,
//           telecomservices: !prev.telecomservices,
//           currentState: "telecomservices",
//         }));
//         updateIconSidebar(e);
//       },
//       stateVariables: sections.telecomservices,
//       subItems: [
//         {
//           id: "numberlooklup",
//           label: "Number Lookup",
//           link: "/services/telecom/lookup",
//         },
//         {
//           id: "specialoffer",
//           label: "Special Offer Check",
//           link: "/services/telecom/special-offer",
//         },
//         {
//           id: "prepaidtariff",
//           label: "Prepaid Tariff Plans",
//           link: "/services/telecom/prepaid-tariffplans",
//         },
//         {
//           id: "dthcustomer",
//           label: "DTH Customer Info",
//           link: "/services/telecom/dth-customer-info",
//         },
//         {
//           id: "dthtariff",
//           label: "DTH Tariff Plans",
//           link: "/services/telecom/dth-tariffplans",
//         },
//       ],
//     },
//     {
//       id: "utilitybillservices",
//       label: "Utility Bill Intelligence",
//       icon: "ri-lightbulb-line",
//       link: "/#",
//       click: (e: any) => {
//         e.preventDefault();
//         setSections((prev) => ({
//           ...prev,
//           utilitybillservices: !prev.utilitybillservices,
//           currentState: "utilitybillservices",
//         }));
//         updateIconSidebar(e);
//       },
//       stateVariables: sections.utilitybillservices,
//       subItems: [
//         {
//           id: "broadband",
//           label: "Broadband Postpaid",
//           link: "/services/utility/broadband",
//         },
//         { id: "cabletv", label: "Cable TV", link: "/services/utility/cable" },
//         {
//           id: "clubsassoci",
//           label: "Clubs & Associations",
//           link: "/services/utility/club-assoc",
//         },
//         {
//           id: "creditcard",
//           label: "Credit Card",
//           link: "/services/utility/credit-card",
//         },
//         {
//           id: "donation",
//           label: "Donation",
//           link: "/services/utility/donation",
//         },
//         {
//           id: "electricity",
//           label: "Electricity",
//           link: "/services/utility/electricity",
//         },
//         { id: "fastag", label: "FASTag", link: "/services/utility/fastag" },
//         { id: "gas", label: "Gas", link: "/services/utility/gas" },
//         {
//           id: "hospitalpath",
//           label: "Hospital & Pathology",
//           link: "/services/utility/hospital",
//         },
//         {
//           id: "housingsociety",
//           label: "Housing Society",
//           link: "/services/utility/housing",
//         },
//         {
//           id: "insurance",
//           label: "Insurance",
//           link: "/services/utility/insurance",
//         },
//         {
//           id: "landlinepostpaid",
//           label: "Landline Postpaid",
//           link: "/services/utility/landline",
//         },
//         {
//           id: "loanrepayment",
//           label: "Loan Repayment",
//           link: "/services/utility/loan-repayment",
//         },
//         { id: "lpggas", label: "LPG Gas", link: "/services/utility/lpg" },
//         {
//           id: "postpaid",
//           label: "Postpaid",
//           link: "/services/utility/postpaid",
//         },
//         {
//           id: "muncipalservices",
//           label: "Muncipal Services",
//           link: "/services/utility/muncipal-serivices",
//         },
//         { id: "rental", label: "Rental", link: "/services/utility/rental" },
//         {
//           id: "subscription",
//           label: "Subscription",
//           link: "/services/utility/subscription",
//         },
//         { id: "water", label: "Water", link: "/services/utility/water" },
//       ],
//     },

//     {
//       label: "Account",
//       isHeader: true,
//       id: "services-header",
//       role: "user",
//     },
//     {
//       id: "myaccount",
//       label: "My Account",
//       icon: "ri-wallet-3-line",
//       link: "/#",
//       click: function (e: any) {
//         e.preventDefault();
//         setSections((prev) => ({
//           ...prev,
//           myaccount: !prev.myaccount,
//           currentState: "myaccount",
//         }));
//         updateIconSidebar(e);
//       },
//       stateVariables: sections.myaccount,
//       subItems: [
//         {
//           id: "statement",
//           label: "Statement",
//           link: "/account/myaccount/statement",
//         },
//         {
//           id: "paymentreport",
//           label: "Payment Report",
//           link: "/account/myaccount/payment-report",
//         },
//       ],
//     },

//     {
//       id: "developerapi",
//       label: "Developer API",
//       icon: "ri-code-s-slash-line",
//       link: "/#",
//       click: function (e: any) {
//         e.preventDefault();
//         setSections((prev) => ({
//           ...prev,
//           developerapi: !prev.developerapi,
//           currentState: "developerapi",
//         }));
//         updateIconSidebar(e);
//       },
//       stateVariables: sections.developerapi,
//       subItems: [
//         {
//           id: "tokenip",
//           label: "Token & IP",
//           link: "/account/developer/token-ip",
//         },
//       ],
//     },

//     {
//       label: "Management Section",
//       isHeader: true,
//       id: "management-header",
//       role: "admin",
//     },
//     {
//       id: "productManagement",
//       label: "Product Management",
//       icon: "ri-file-list-3-line",
//       link: "/#",
//       click: function (e: any) {
//         e.preventDefault();
//         setSections((prev) => ({
//           ...prev,
//           productManagement: !prev.productManagement,
//           currentState: "productManagement",
//         }));
//         updateIconSidebar(e);
//       },
//       stateVariables: sections.productManagement,
//       subItems: [
//         {
//           id: "productCategory",
//           label: "Product Category",
//           link: "/product-management/category",
//         },
//         {
//           id: "products",
//           label: "Products",
//           link: "/product-management/products",
//         },
//         {
//           id: "productPricing",
//           label: "Product Pricing",
//           link: "/product-management/product-pricing",
//         },
//       ],
//     },
//     {
//       id: "userManagement",
//       label: "User Management",
//       icon: "ri-user-2-fill",
//       link: "/#",
//       click: function (e: any) {
//         e.preventDefault();
//         setSections((prev) => ({
//           ...prev,
//           userManagement: !prev.userManagement,
//           currentState: "userManagement",
//         }));
//         updateIconSidebar(e);
//       },
//       stateVariables: sections.userManagement,
//       subItems: [
//         {
//           id: "userList",
//           label: "User List",
//           link: "/user-management/user-list",
//         },
//       ],
//     },
//     {
//       id: "settingManagement",
//       label: "Setting Management",
//       icon: "ri-settings-4-line",
//       link: "/#",
//       click: function (e: any) {
//         e.preventDefault();
//         setSections((prev) => ({
//           ...prev,
//           settingManagement: !prev.settingManagement,
//           currentState: "settingManagement",
//         }));
//         updateIconSidebar(e);
//       },
//       stateVariables: sections.settingManagement,
//       subItems: [
//         {
//           id: "addAPIs",
//           label: "Add API(s)",
//           link: "/setting-management/add-apis",
//         },
//         {
//           id: "serviceSwitching",
//           label: "Service Switching",
//           link: "/setting-management/service-switching",
//         },
//       ],
//     },
//     {
//       id: "accountManagement",
//       label: "Account Management",
//       icon: "ri-wallet-3-line",
//       link: "/#",
//       click: function (e: any) {
//         e.preventDefault();
//         setSections((prev) => ({
//           ...prev,
//           accountManagement: !prev.accountManagement,
//           currentState: "accountManagement",
//         }));
//         updateIconSidebar(e);
//       },
//       stateVariables: sections.accountManagement,
//       subItems: [
//         {
//           id: "walletTransfer",
//           label: "Wallet Transfer",
//           link: "/account-management/wallet",
//         },
//       ],
//     },
//     {
//       label: "Message Section",
//       isHeader: true,
//       id: "message-header",
//       role: "admin",
//     },
//     {
//       id: "messageManagement",
//       label: "MSG Management",
//       icon: "ri-message-2-line",
//       link: "/#",
//       click: function (e: any) {
//         e.preventDefault();
//         setSections((prev) => ({
//           ...prev,
//           messageManagement: !prev.messageManagement,
//           currentState: "messageManagement",
//         }));
//         updateIconSidebar(e);
//       },
//       stateVariables: sections.messageManagement,
//       subItems: [
//         {
//           id: "addMessageAPIs",
//           label: "Add Message API(s)",
//           link: "/msg-management/add-msg",
//         },
//         {
//           id: "sendMessage",
//           label: "Send Message",
//           link: "/msg-management/send-msg",
//         },
//         {
//           id: "messageSignature",
//           label: "Message Signature",
//           link: "/msg-management/msg-signature",
//         },
//         {
//           id: "messageContents",
//           label: "Message Contents",
//           link: "/msg-management/msg-contents",
//         },
//         {
//           id: "messageLogs",
//           label: "Message Logs",
//           link: "/msg-management/msg-logs",
//         },
//       ],
//     },
//   ];

//   // 1️⃣ Filter items based on role
//   const filteredMenuItems = menuItems
//     .filter((item) => {
//       // If item has an id and a role restriction, check role
//       if (item.id && roleAccess[item.id]) {
//         return roleAccess[item.id].includes(role);
//       }
//       return true; // For headers or unrestricted items
//     })
//     .map((item) => {
//       // 2️⃣ Filter sub-items if present
//       if (item.subItems) {
//         return {
//           ...item,
//           subItems: item.subItems.filter((sub) => {
//             if (sub.id && roleAccess[sub.id]) {
//               return roleAccess[sub.id].includes(role);
//             }
//             return true;
//           }),
//         };
//       }
//       return item;
//     });

//   // 3️⃣ Render the filtered items
//   return (
//     <div className="sidebar">
//       {filteredMenuItems.map((item) => {
//         if (item.isHeader) {
//           // Render section header
//           return (
//             <h4 key={item.id || item.label} className="sidebar-header">
//               {item.label}
//             </h4>
//           );
//         }

//         // Render menu items
//         return (
//           <div key={item.id} className="sidebar-item">
//             <div
//               className="sidebar-link"
//               onClick={item.click ? (e) => item.click(e) : undefined}
//             >
//               {item.icon && <i className={item.icon}></i>}
//               <span>{item.label}</span>
//             </div>

//             {/* Render sub-items if any */}
//             {item.subItems && item.subItems.length > 0 && (
//               <ul className="sidebar-submenu">
//                 {item.subItems.map((sub) => (
//                   <li key={sub.id}>
//                     <a href={sub.link}>{sub.label}</a>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// };
// export default Navdata;



// LayoutMenuData.ts
import { useState } from "react";

// Example role access mapping
const roleAccess: Record<string, string[]> = {
    dashboard: ["admin", "user"],

    serviceheader: ["user"],
    aadharpanservices: ["user"],
    aadharokyc: ["user"],
    pan: ["user"],

    bankservices: ["user"],
    pennydrop: ["user"],

    kybservices: ["user"],
    pantogstin: ["user"],
    cinmca: ["user"],
    gstin: ["user"],

    digitalkycservices: ["user"],
    facecheck: ["user"],
    livelinesscheck: ["user"],
    namematch: ["user"],
    reversegeo: ["user"],

    otherdocservices: ["user"],
    drivinglic: ["user"],
    voterid: ["user"],
    passport: ["user"],
    employment360: ["user"],
    vehiclerc: ["user"],
    mobile360: ["user"],

    telecomservices: ["user"],
    numberlookup: ["user"],
    specialoffer: ["user"],
    prepaidtariff: ["user"],
    dthcustomer: ["user"],
    dthtariff: ["user"],

    utilitybillservices: ["user"],
    broadband: ["user"],
    cabletv: ["user"],
    clubsassoci: ["user"],
    creditcard: ["user"],
    donation: ["user"],
    electricity: ["user"],
    fastag: ["user"],
    gas: ["user"],
    hospitalpath: ["user"],
    housingsociety: ["user"],
    insurance: ["user"],
    landlinepostpaid: ["user"],
    loanrepayment: ["user"],
    lpggas: ["user"],
    postpaid: ["user"],
    muncipalservices: ["user"],
    rental: ["user"],
    subscription: ["user"],
    water: ["user"],
    
  myaccount: ["user"],
  statement: ["user"],
  paymentreport: ["user"],

  developerapi: ["user"],
  tokenip: ["user"],

    managementheader: ["admin"],
    productManagement: ["admin"],
    productCategory: ["admin"],
    products: ["admin"],
    productPricing: ["admin"],

    userManagement: ["admin"],
    userList: ["admin"],

    settingManagement: ["admin"],
    addApis: ["admin"],
    serviceSwitching: ["admin"],

    accountManagement: ["admin"],
    wallettransfer: ["admin"],


    messageheader: ["admin"],
    messageManagement: ["admin"],
    addMessageApis: ["admin"],
    sendMessage: ["admin"],
    messageSignature: ["admin"],
    messageContents: ["admin"],
    messageLogs: ["admin"],
};

export default function navdata(role: "user" | "admin") {
  const [sections, setSections] = useState({
    aadharpanservices: false,
    bankservices: false,
    kybservices: false,
    digitalkycservices: false,
    otherdocservices: false,
    telecomservices: false,
    isutilitybillservices: false,
    myaccount: false,
    developerapi: false,
    productManagement: false,
    userManagement: false,
    settingManagement: false,
    accountManagement: false,
    messageManagement: false,
    currentState: "",
  });

    function updateIconSidebar(e) {
      if (e?.target?.getAttribute("sub-items")) {
        const ul = document.getElementById("two-column-menu");
        const iconItems = ul?.querySelectorAll(".nav-icon.active") || [];
        iconItems.forEach((item) => {
          item.classList.remove("active");
          const id = item.getAttribute("sub-items");
          const getID = document.getElementById(id);
          if (getID) getID.classList.remove("show");
        });
      }
    }

  const toggleSection = (sectionName: string) => {
    setSections((prev) => {
      const resetSections: any = {};
      Object.keys(prev).forEach((key) => {
        if (key !== "currentState") {
          resetSections[key] = false;
        }
      });
      return {
        ...resetSections,
        [sectionName]: !prev[sectionName],
        currentState: sectionName,
      };
    });
  };

  // Original full menu array
  const menuItems = [
    // ----- USER -----

    {
      label: "Menu",
      isHeader: true,
    },
    {
      label: "Dashboards",
      icon: "mdi mdi-speedometer",
      link: role === "user" ? "/user-dashboard" : "/admin-dashboard",
      id: "dashboard",
    },

    {
      label: "Services",
      isHeader: true,
      id: "services-header",
      role: "user",
    },
    {
      id: "aadharpanservices",
      label: "Aadhar / PAN",
      icon: "ri-id-card-line",
      link: "/#",
      click: (e: any) => {
        e.preventDefault();
        setSections((prev) => ({
          ...prev,
          aadharpanservices: !prev.aadharpanservices,
          currentState: "aadharpanservices",
        }));
        updateIconSidebar(e);
      },
      stateVariables: sections.aadharpanservices,
      subItems: [
        { id: "aadharokyc", label: "Aadhar OKYC", link: "/services/aadhar" },
        { id: "pan", label: "PAN", link: "/services/pan" },
      ],
    },
    {
      id: "bankservices",
      label: "Bank Account",
      icon: "ri-bank-line",
      link: "/#",
      click: (e: any) => {
        e.preventDefault();
        setSections((prev) => ({
          ...prev,
          bankservices: !prev.bankservices,
          currentState: "bankservices",
        }));
        updateIconSidebar(e);
      },
      stateVariables: sections.bankservices,
      subItems: [
        {
          id: "pennydrop",
          label: "Penny Drop",
          link: "/services/bank/pennydrop",
        },
      ],
    },
    {
      id: "kybservices",
      label: "KYB (Know Your Business)",
      icon: "ri-questionnaire-line",
      link: "/#",
      click: (e: any) => {
        e.preventDefault();
        setSections((prev) => ({
          ...prev,
          kybservices: !prev.kybservices,
          currentState: "kybservices",
        }));

        updateIconSidebar(e);
      },
      stateVariables: sections.kybservices,
      subItems: [
        {
          id: "pantogstin",
          label: "PAN to GSTIN",
          link: "/services/kyb/pan-gstin",
        },
        {
          id: "cinmca",
          label: "CIN / MCA Lookup",
          link: "/services/kyb/cin-mca-lookup",
        },
        { id: "gstin", label: "GSTIN", link: "/services/kyb/gstin" },
      ],
    },

    {
      id: "digitalkycservices",
      label: "Regulated Digital KYC",
      icon: "ri-account-circle-line",
      link: "/#",
      click: (e: any) => {
        e.preventDefault();
        setSections((prev) => ({
          ...prev,
          digitalkycservices: !prev.digitalkycservices,
          currentState: "digitalkycservices",
        }));
        updateIconSidebar(e);
      },
      stateVariables: sections.digitalkycservices,
      subItems: [
        {
          id: "facecheck",
          label: "Face Check",
          link: "/services/digital-kyc/facematch",
        },
        {
          id: "livelinesscheck",
          label: "Liveliness Check",
          link: "/services/digital-kyc/liveliness",
        },
        {
          id: "namematch",
          label: "Name Match",
          link: "/services/digital-kyc/namematch",
        },
        {
          id: "reversegeo",
          label: "Reverse Geocoading",
          link: "/services/digital-kyc/geo-coading",
        },
      ],
    },
    {
      id: "otherdocservices",
      label: "Other Official Docs",
      icon: "ri-folder-4-line",
      link: "/#",
      click: (e: any) => {
        e.preventDefault();
        setSections((prev) => ({
          ...prev,
          otherdocservices: !prev.otherdocservices,
          currentState: "otherdocservices",
        }));
        updateIconSidebar(e);
      },
      stateVariables: sections.otherdocservices,
      subItems: [
        {
          id: "drivinglic",
          label: "Driving License",
          link: "/services/other-docs/driving-license",
        },
        {
          id: "voterid",
          label: "Voter ID",
          link: "/services/other-docs/voterid",
        },
        {
          id: "passport",
          label: "Passport",
          link: "/services/other-docs/passport",
        },
        {
          id: "employment360",
          label: "Employment 360",
          link: "/services/other-docs/emp",
        },
        {
          id: "vehiclerc",
          label: "Vehicle RC",
          link: "/services/other-docs/vehicle-rc",
        },
        {
          id: "mobile360",
          label: "Mobile 360",
          link: "/services/other-docs/mobile",
        },
      ],
    },
    {
      id: "telecomservices",
      label: "Telecom Intelligence",
      icon: "ri-wifi-line",
      link: "/#",
      click: (e: any) => {
        e.preventDefault();
        setSections((prev) => ({
          ...prev,
          telecomservices: !prev.telecomservices,
          currentState: "telecomservices",
        }));
        updateIconSidebar(e);
      },
      stateVariables: sections.telecomservices,
      subItems: [
        {
          id: "numberlooklup",
          label: "Number Lookup",
          link: "/services/telecom/lookup",
        },
        {
          id: "specialoffer",
          label: "Special Offer Check",
          link: "/services/telecom/special-offer",
        },
        {
          id: "prepaidtariff",
          label: "Prepaid Tariff Plans",
          link: "/services/telecom/prepaid-tariffplans",
        },
        {
          id: "dthcustomer",
          label: "DTH Customer Info",
          link: "/services/telecom/dth-customer-info",
        },
        {
          id: "dthtariff",
          label: "DTH Tariff Plans",
          link: "/services/telecom/dth-tariffplans",
        },
      ],
    },
    {
      id: "utilitybillservices",
      label: "Utility Bill Intelligence",
      icon: "ri-lightbulb-line",
      link: "/#",
      click: (e: any) => {
        e.preventDefault();
        setSections((prev) => ({
          ...prev,
          utilitybillservices: !prev.utilitybillservices,
          currentState: "utilitybillservices",
        }));
        updateIconSidebar(e);
      },
      stateVariables: sections.utilitybillservices,
      subItems: [
        {
          id: "broadband",
          label: "Broadband Postpaid",
          link: "/services/utility/broadband",
        },
        { id: "cabletv", label: "Cable TV", link: "/services/utility/cable" },
        {
          id: "clubsassoci",
          label: "Clubs & Associations",
          link: "/services/utility/club-assoc",
        },
        {
          id: "creditcard",
          label: "Credit Card",
          link: "/services/utility/credit-card",
        },
        {
          id: "donation",
          label: "Donation",
          link: "/services/utility/donation",
        },
        {
          id: "electricity",
          label: "Electricity",
          link: "/services/utility/electricity",
        },
        { id: "fastag", label: "FASTag", link: "/services/utility/fastag" },
        { id: "gas", label: "Gas", link: "/services/utility/gas" },
        {
          id: "hospitalpath",
          label: "Hospital & Pathology",
          link: "/services/utility/hospital",
        },
        {
          id: "housingsociety",
          label: "Housing Society",
          link: "/services/utility/housing",
        },
        {
          id: "insurance",
          label: "Insurance",
          link: "/services/utility/insurance",
        },
        {
          id: "landlinepostpaid",
          label: "Landline Postpaid",
          link: "/services/utility/landline",
        },
        {
          id: "loanrepayment",
          label: "Loan Repayment",
          link: "/services/utility/loan-repayment",
        },
        { id: "lpggas", label: "LPG Gas", link: "/services/utility/lpg" },
        {
          id: "postpaid",
          label: "Postpaid",
          link: "/services/utility/postpaid",
        },
        {
          id: "muncipalservices",
          label: "Muncipal Services",
          link: "/services/utility/muncipal-serivices",
        },
        { id: "rental", label: "Rental", link: "/services/utility/rental" },
        {
          id: "subscription",
          label: "Subscription",
          link: "/services/utility/subscription",
        },
        { id: "water", label: "Water", link: "/services/utility/water" },
      ],
    },

    {
      label: "Account",
      isHeader: true,
      id: "services-header",
      role: "user",
    },
    {
      id: "myaccount",
      label: "My Account",
      icon: "ri-wallet-3-line",
      link: "/#",
      click: (e: any) => {
        e.preventDefault();
        toggleSection("myaccount");
        updateIconSidebar(e);
      },
      stateVariables: sections.myaccount,
      subItems: [
        {
          id: "statement",
          label: "Statement",
          link: "/account/myaccount/statement",
        },
        {
          id: "paymentreport",
          label: "Payment Report",
          link: "/account/myaccount/payment-report",
        },
      ],
    },
    {
      id: "developerapi",
      label: "Developer API",
      icon: "ri-code-s-slash-line",
      link: "/#",
      click: (e: any) => {
        e.preventDefault();
        toggleSection("developerapi");
        updateIconSidebar(e);
      },
      stateVariables: sections.developerapi,
      subItems: [
        {
          id: "tokenip",
          label: "Token & IP",
          link: "/account/developer/token-ip",
        },
      ],
    },

    // ----- ADMIN -----
    {
      label: "Management Section",
      isHeader: true,
      id: "management-header",
      role: "admin",
    },
    {
      id: "productManagement",
      label: "Product Management",
      icon: "ri-file-list-3-line",
      link: "/#",
      click: function (e: any) {
        e.preventDefault();
        setSections((prev) => ({
          ...prev,
          productManagement: !prev.productManagement,
          currentState: "productManagement",
        }));
        updateIconSidebar(e);
      },
      stateVariables: sections.productManagement,
      subItems: [
        {
          id: "productCategory",
          label: "Product Category",
          link: "/product-management/category",
        },
        {
          id: "products",
          label: "Products",
          link: "/product-management/products",
        },
        {
          id: "productPricing",
          label: "Product Pricing",
          link: "/product-management/product-pricing",
        },
      ],
    },
    {
      id: "userManagement",
      label: "User Management",
      icon: "ri-user-2-fill",
      link: "/#",
      click: function (e: any) {
        e.preventDefault();
        setSections((prev) => ({
          ...prev,
          userManagement: !prev.userManagement,
          currentState: "userManagement",
        }));
        updateIconSidebar(e);
      },
      stateVariables: sections.userManagement,
      subItems: [
        {
          id: "userList",
          label: "User List",
          link: "/user-management/user-list",
        },
      ],
    },
    {
      id: "settingManagement",
      label: "Setting Management",
      icon: "ri-settings-4-line",
      link: "/#",
      click: function (e: any) {
        e.preventDefault();
        setSections((prev) => ({
          ...prev,
          settingManagement: !prev.settingManagement,
          currentState: "settingManagement",
        }));
        updateIconSidebar(e);
      },
      stateVariables: sections.settingManagement,
      subItems: [
        {
          id: "addAPIs",
          label: "Add API(s)",
          link: "/setting-management/add-apis",
        },
        {
          id: "serviceSwitching",
          label: "Service Switching",
          link: "/setting-management/service-switching",
        },
      ],
    },
    {
      id: "accountManagement",
      label: "Account Management",
      icon: "ri-wallet-3-line",
      link: "/#",
      click: function (e: any) {
        e.preventDefault();
        setSections((prev) => ({
          ...prev,
          accountManagement: !prev.accountManagement,
          currentState: "accountManagement",
        }));
        updateIconSidebar(e);
      },
      stateVariables: sections.accountManagement,
      subItems: [
        {
          id: "walletTransfer",
          label: "Wallet Transfer",
          link: "/account-management/wallet",
        },
      ],
    },

    {
      label: "Message Section",
      isHeader: true,
      id: "message-header",
      role: "admin",
    },
        {
          id: "messageManagement",
          label: "MSG Management",
          icon: "ri-message-2-line",
          link: "/#",
          click: function (e: any) {
            e.preventDefault();
            setSections((prev) => ({
              ...prev,
              messageManagement: !prev.messageManagement,
              currentState: "messageManagement",
            }));
            updateIconSidebar(e);
          },
          stateVariables: sections.messageManagement,
          subItems: [
            {
              id: "addMessageAPIs",
              label: "Add Message API(s)",
              link: "/msg-management/add-msg",
            },
            {
              id: "sendMessage",
              label: "Send Message",
              link: "/msg-management/send-msg",
            },
            {
              id: "messageSignature",
              label: "Message Signature",
              link: "/msg-management/msg-signature",
            },
            {
              id: "messageContents",
              label: "Message Contents",
              link: "/msg-management/msg-contents",
            },
            {
              id: "messageLogs",
              label: "Message Logs",
              link: "/msg-management/msg-logs",
            },
          ],
        },
  ];

  // Role-based filtering
  const filteredMenuItems = menuItems
    .filter((item) => {
      if (item.id && roleAccess[item.id]) {
        return roleAccess[item.id].includes(role);
      }
      return true; // headers or items without role restriction
    })
    .map((item) => {
      if (item.subItems) {
        return {
          ...item,
          subItems: item.subItems.filter((sub) => {
            if (sub.id && roleAccess[sub.id]) {
              return roleAccess[sub.id].includes(role);
            }
            return true;
          }),
        };
      }
      return item;
    });

  return filteredMenuItems;
}