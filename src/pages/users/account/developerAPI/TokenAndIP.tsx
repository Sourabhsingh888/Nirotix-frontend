// import React, { useState } from "react";
// import {
//   Button,
//   Card,
//   CardBody,
//   CardHeader,
//   Col,
//   Container,
//   Input,
//   Row,
//   Table,
// } from "reactstrap";
// import BreadCrumb from "../../../../Components/Common/BreadCrumb";
// import AddIPAddressModal from "../../../../Components/modal/user/user-sub_modal/AddIPAddressModal";

// const TokenApi = () => {
//   document.title = "Token API";

//       const [isModalOpen, setIsModalOpen] = useState(false);
//       const toggleModal = () => setIsModalOpen(!isModalOpen);

//   return (
//     <div className="page-content">
//       <Container fluid>
//         <BreadCrumb title="Token & IP" pageTitle="Developer API" />
//         {/* Webhooks Section */}
//         <Card className="mb-4">
//           <CardHeader className="border-bottom-dashed">
//             <h5 className="fw-bold text-uppercase">Webhooks</h5>
//           </CardHeader>
//           <CardBody>
//             <div className="mb-3 mt-3">
//               <label className="form-label">
//                 Enter Webhook URL{" "}
//                 <span className="text-danger">(Please don't put (?) mark)</span>
//               </label>
//               <div className="d-flex gap-2">
//                 <Input type="text" placeholder="Enter webhook URL" />
//                 <Button color="primary">Update</Button>
//               </div>
//             </div>
//           </CardBody>
//         </Card>

//         {/* API KEYS Section */}
//         <Card className="mb-4">
//           <CardHeader className="d-flex justify-content-between align-items-center border-bottom-dashed mb-3">
//             <h5 className="fw-bold text-uppercase mb-0">API Keys</h5>
//             <Button color="success" size="sm">
//               Re-generate Key
//             </Button>
//           </CardHeader>
//           <CardBody className="pt-0 mt-2">
//             <div className="table-responsive">
//               <Table className="align-middle table-bordered text-center mb-0">
//                 <thead className="table-light">
//                   <tr>
//                     <th>#</th>
//                     <th>Token</th>
//                     <th>Date & Time</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>2</td>
//                     <td className="text-break">
//                       dcf53035999425abe455c38152ee5af27601b21e709feeb1e5d7a3eeab3bcc1c
//                     </td>
//                     <td>
//                       29-07-2025 <br />
//                       <small className="text-muted">10:54:48 AM</small>
//                     </td>
//                     <td>
//                       <span className="badge bg-light text-danger">
//                         Click to Activate
//                       </span>
//                     </td>
//                   </tr>
//                 </tbody>
//               </Table>
//             </div>
//           </CardBody>
//         </Card>

//         {/* White Listed IP Section */}
//         <Card>
//           <CardHeader className="d-flex justify-content-between align-items-center border-bottom-dashed mb-3">
//             <div>
//               <h5 className="fw-bold text-uppercase mb-0">White Listed IP</h5>
//               <small className="text-danger">Only 3 IP White Listed</small>
//             </div>
//             <Button color="info" size="sm" onClick={toggleModal}>
//               <i className="ri-add-line align-middle" /> Add IP
//             </Button>
//           </CardHeader>
//           <AddIPAddressModal isOpen={isModalOpen} toggle={toggleModal} />
//           <CardBody className="pt-0">
//             <div className="table-responsive">
//               <Table className="align-middle table-bordered text-center mb-0">
//                 <thead className="table-light">
//                   <tr>
//                     <th>#</th>
//                     <th>IP Address</th>
//                     <th>Date & Time</th>
//                     <th>Status</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>41</td>
//                     <td>103.174.103.54</td>
//                     <td>
//                       26-05-2025 <br />
//                       <small className="text-muted">18:17:00 PM</small>
//                     </td>
//                     <td>
//                       <span className="badge bg-light text-danger">
//                         Click to Activate
//                       </span>
//                     </td>
//                     <td>
//                       <i className="ri-delete-bin-6-line text-danger" />
//                     </td>
//                   </tr>
//                 </tbody>
//               </Table>
//             </div>
//           </CardBody>
//         </Card>
//       </Container>
//     </div>
//   );
// };

// export default TokenApi;
















// import React, { useEffect, useState } from "react";
// import {
//   Button,
//   Card,
//   CardBody,
//   CardHeader,
//   Container,
//   Table,
// } from "reactstrap";
// import BreadCrumb from "../../../../Components/Common/BreadCrumb";
// import AddIPAddressModal from "../../../../Components/modal/user/user-sub_modal/AddIPAddressModal";
// import {getWhitelistedIpApi, deleteWhitelistedIpApi } from "../../../../slices/whitelistSlice/thunk"; // apna thunk path change karo

// const TokenApi = () => {
//   document.title = "Token API";

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [ipList, setIpList] = useState<any[]>([]);
//   const toggleModal = () => setIsModalOpen(!isModalOpen);

//   // 🔹 ye tum login user ke redux se nikalna (abhi hardcoded hai)
//   const userId = 10;

//   // Fetch IP List
//   const fetchIpList = async () => {
//     try {
//       const res = await getWhitelistedIpApi(userId);
//       setIpList(res.data); // <- backend se data array aana chahiye
//     } catch (err) {
//       console.error("Failed to fetch IP list", err);
//     }
//   };

//   // Delete IP
//   const handleDelete = async (id: number) => {
//     try {
//       await deleteWhitelistedIpApi(id);
//       fetchIpList(); // refresh after delete
//     } catch (err) {
//       console.error("Failed to delete IP", err);
//     }
//   };

//   useEffect(() => {
//     fetchIpList();
//   }, []);

//   return (
//     <div className="page-content">
//       <Container fluid>
//         <BreadCrumb title="Token & IP" pageTitle="Developer API" />

//         {/* White Listed IP Section */}
//         <Card>
//           <CardHeader className="d-flex justify-content-between align-items-center border-bottom-dashed mb-3">
//             <div>
//               <h5 className="fw-bold text-uppercase mb-0">White Listed IP</h5>
//               <small className="text-danger">Only 3 IP White Listed</small>
//             </div>
//             <Button color="info" size="sm" onClick={toggleModal}>
//               <i className="ri-add-line align-middle" /> Add IP
//             </Button>
//           </CardHeader>
//           <AddIPAddressModal
//             isOpen={isModalOpen}
//             toggle={toggleModal}
//             onSuccess={fetchIpList} // ✅ Add hone ke baad list refresh
//           />
//           <CardBody className="pt-0">
//             <div className="table-responsive">
//               <Table className="align-middle table-bordered text-center mb-0">
//                 <thead className="table-light">
//                   <tr>
//                     <th>#</th>
//                     <th>IP Address</th>
//                     <th>Date & Time</th>
//                     <th>Status</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {ipList.length > 0 ? (
//                     ipList.map((ip, index) => (
//                       <tr key={ip.id}>
//                         <td>{index + 1}</td>
//                         <td>{ip.ip_address}</td>
//                         <td>
//                           {ip.created_at}
//                           <br />
//                           <small className="text-muted">{ip.updated_at}</small>
//                         </td>
//                         <td>
//                           <span
//                             className={`badge bg-light ${
//                               ip.status === "Active"
//                                 ? "text-success"
//                                 : "text-danger"
//                             }`}
//                           >
//                             {ip.status}
//                           </span>
//                         </td>
//                         <td>
//                           <i
//                             className="ri-delete-bin-6-line text-danger"
//                             style={{ cursor: "pointer" }}
//                             onClick={() => handleDelete(ip.id)}
//                           />
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan={5}>No IPs found</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </Table>
//             </div>
//           </CardBody>
//         </Card>
//       </Container>
//     </div>
//   );
// };

// export default TokenApi;
















// import React, { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   Button,
//   Card,
//   CardBody,
//   CardHeader,
//   Container,
//   Input,
//   Table,
//   Spinner,
// } from "reactstrap";
// import BreadCrumb from "../../../../Components/Common/BreadCrumb";
// import AddIPAddressModal from "../../../../Components/modal/user/user-sub_modal/AddIPAddressModal";
// import { RootState } from "../../../../Store";
// import { getWhitelistedIpApi, deleteWhitelistedIpApi } from "../../../../slices/whitelistSlice/thunk";
// import { updateWebhookApi, getWebhookApi } from "../../../../slices/webhook/thunk"; // ✅ getWebhookApi import

// const TokenApi = () => {
//   document.title = "Token API";

//   const dispatch = useDispatch();
//   const { list: ipList } = useSelector((state: RootState) => state.WhitelistApi);
//   const { url: webhookUrl, fetchState: webhookState } = useSelector(
//     (state: RootState) => state.WebhookApi
//   );

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newWebhook, setNewWebhook] = useState("");
//   const toggleModal = () => setIsModalOpen(!isModalOpen);

//   // Fetch IPs & Webhook on component mount
//   useEffect(() => {
//     dispatch(getWhitelistedIpApi());
//     dispatch(getWebhookApi()); // ✅ Webhook get API call
//   }, [dispatch]);

//   // Set initial webhook input when URL is fetched
//   useEffect(() => {
//     setNewWebhook(webhookUrl || "");
//   }, [webhookUrl]);

//   // Delete IP handler
//   const handleDelete = (id: number | string) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "Once deleted, you will not be able to recover this IP!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#20c997",
//       cancelButtonColor: "#f46a6a",
//       confirmButtonText: "Yes, delete it!",
//       cancelButtonText: "Cancel",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         dispatch(deleteWhitelistedIpApi(id)).then(() => {
//           Swal.fire({
//             icon: "success",
//             title: "Deleted!",
//             text: "IP deleted successfully.",
//             timer: 2000,
//             showConfirmButton: false,
//           });
//           dispatch(getWhitelistedIpApi());
//         });
//       }
//     });
//   };

//   // Update Webhook handler
//   const handleUpdateWebhook = () => {
//     if (!newWebhook.trim()) return;
//     dispatch(updateWebhookApi({ url: newWebhook }));
//   };

//   return (
//     <div className="page-content">
//       <Container fluid>
//         <BreadCrumb title="Token & IP" pageTitle="Developer API" />

//         {/* Webhooks Section */}
//         <Card className="mb-4">
//           <CardHeader className="border-bottom-dashed">
//             <h5 className="fw-bold text-uppercase">Webhooks</h5>
//           </CardHeader>
//           <CardBody>
//             <div className="mb-3 mt-3">
//               <label className="form-label">
//                 Enter Webhook URL{" "}
//                 <span className="text-danger">(Please don't put (?) mark)</span>
//               </label>
//               <div className="d-flex gap-2">
//                 <Input
//                   type="text"
//                   placeholder="Enter webhook URL"
//                   value={newWebhook}
//                   onChange={(e) => setNewWebhook(e.target.value)}
//                   disabled={webhookState.loading}
//                 />
//                 <Button color="primary" onClick={handleUpdateWebhook}>
//                   {webhookState.loading ? <Spinner size="sm" /> : "Update"}
//                 </Button>
//               </div>
//             </div>
//           </CardBody>
//         </Card>

//         {/* API KEYS Section */}
//         <Card className="mb-4">
//           <CardHeader className="d-flex justify-content-between align-items-center border-bottom-dashed mb-3">
//             <h5 className="fw-bold text-uppercase mb-0">API Keys</h5>
//             <Button color="success" size="sm">
//               Re-generate Key
//             </Button>
//           </CardHeader>
//           <CardBody className="pt-0 mt-2">
//             <div className="table-responsive">
//               <Table className="align-middle table-bordered text-center mb-0">
//                 <thead className="table-light">
//                   <tr>
//                     <th>#</th>
//                     <th>Token</th>
//                     <th>Date & Time</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>2</td>
//                     <td className="text-break">
//                       dcf53035999425abe455c38152ee5af27601b21e709feeb1e5d7a3eeab3bcc1c
//                     </td>
//                     <td>
//                       29-07-2025 <br />
//                       <small className="text-muted">10:54:48 AM</small>
//                     </td>
//                     <td>
//                       <span className="badge bg-light text-danger">
//                         Click to Activate
//                       </span>
//                     </td>
//                   </tr>
//                 </tbody>
//               </Table>
//             </div>
//           </CardBody>
//         </Card>

//         {/* White Listed IP Section */}
//         <Card>
//           <CardHeader className="d-flex justify-content-between align-items-center border-bottom-dashed mb-3">
//             <div>
//               <h5 className="fw-bold text-uppercase mb-0">White Listed IP</h5>
//               <small className="text-danger">Only 3 IP White Listed</small>
//             </div>
//             <Button color="info" size="sm" onClick={toggleModal}>
//               <i className="ri-add-line align-middle" /> Add IP
//             </Button>
//           </CardHeader>
//           <AddIPAddressModal isOpen={isModalOpen} toggle={toggleModal} />
//           <CardBody className="pt-0">
//             <div className="table-responsive">
//               <Table className="align-middle table-bordered text-center mb-0">
//                 <thead className="table-light">
//                   <tr>
//                     <th>#</th>
//                     <th>IP Address</th>
//                     <th>Date & Time</th>
//                     <th>Status</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {ipList && ipList.length > 0 ? (
//                     ipList.map((ip, index) => (
//                       <tr key={ip.id}>
//                         <td>{index + 1}</td>
//                         <td>{ip.ip_address}</td>
//                         <td>
//                           {new Date(ip.created_at).toLocaleDateString()} <br />
//                           <small className="text-muted">
//                             {new Date(ip.created_at).toLocaleTimeString()}
//                           </small>
//                         </td>
//                         <td>
//                           <span
//                             className={`badge ${
//                               ip.status === "Active"
//                                 ? "bg-success"
//                                 : "bg-light text-danger"
//                             }`}
//                           >
//                             {ip.status === "Active"
//                               ? "Active"
//                               : "Click to Activate"}
//                           </span>
//                         </td>
//                         <td>
//                           <i
//                             className="ri-delete-bin-6-line text-danger"
//                             style={{ cursor: "pointer" }}
//                             onClick={() => handleDelete(ip.id)}
//                           />
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan={5}>No IPs found.</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </Table>
//             </div>
//           </CardBody>
//         </Card>
//       </Container>
//     </div>
//   );
// };

// export default TokenApi;


// import React, { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import { useDispatch, useSelector } from "react-redux";
// // import OtpModal from "./addIP_modalform/otp_model";   // ✅ sahi import path

// import {
//   Button,
//   Card,
//   CardBody,
//   CardHeader,
//   Container,
//   Input,
//   Table,
//   Spinner,
// } from "reactstrap";
// import BreadCrumb from "../../../../Components/Common/BreadCrumb";
// import AddIPAddressModal from "../../../../Components/modal/user/user-sub_modal/AddIPAddressModal";
// // import OtpModal from "../../../../Components/modal/user/user-sub_modal/OtpModal";  // 🔹 import OTP modal
// import OtpModal from "./addIP_modalform/otp_model"; 

// import { RootState } from "../../../../Store";
// import { getWhitelistedIpApi, deleteWhitelistedIpApi } from "../../../../slices/whitelistSlice/thunk";
// import { updateWebhookApi } from "../../../../slices/webhook/thunk";

// const TokenApi = () => {
//   document.title = "Token API";

//   const dispatch = useDispatch();
//   const { list: ipList } = useSelector((state: RootState) => state.WhitelistApi);
//   const { url: webhookUrl, fetchState: webhookState } = useSelector(
//     (state: RootState) => state.WebhookApi
//   );

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);  // 🔹 OTP modal state
//   const [selectedIp, setSelectedIp] = useState<any>(null);       // 🔹 Store selected IP row
//   const [newWebhook, setNewWebhook] = useState("");
//   const toggleModal = () => setIsModalOpen(!isModalOpen);
//   const toggleOtpModal = () => setIsOtpModalOpen(!isOtpModalOpen);

//   // Fetch IPs & Webhook on component mount
//   useEffect(() => {
//     dispatch(getWhitelistedIpApi());
//   }, [dispatch]);

//   // Set initial webhook input when URL is fetched
//   useEffect(() => {
//     setNewWebhook(webhookUrl || ""); 
//   }, [webhookUrl]);

//   // Delete IP handler
//   const handleDelete = (id: number | string) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "Once deleted, you will not be able to recover this IP!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#20c997",
//       cancelButtonColor: "#f46a6a",
//       confirmButtonText: "Yes, delete it!",
//       cancelButtonText: "Cancel",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         dispatch(deleteWhitelistedIpApi(id)).then(() => {
//           Swal.fire({
//             icon: "success",
//             title: "Deleted!",
//             text: "IP deleted successfully.",
//             timer: 2000,
//             showConfirmButton: false,
//           });
//           dispatch(getWhitelistedIpApi());
//         });
//       }
//     });
//   };

//   // Update Webhook handler
//   const handleUpdateWebhook = () => {
//     if (!newWebhook.trim()) return;
//     dispatch(updateWebhookApi({ url: newWebhook }));
//   };

//   // 🔹 Handle status click → open OTP modal
//   const handleActivateClick = (ip: any) => {
//     setSelectedIp(ip);
//     setIsOtpModalOpen(true);
//   };

//   return (
//     <div className="page-content">
//       <Container fluid>
//         <BreadCrumb title="Token & IP" pageTitle="Developer API" />

//         {/* Webhooks Section */}
//         <Card className="mb-4">
//           <CardHeader className="border-bottom-dashed">
//             <h5 className="fw-bold text-uppercase">Webhooks</h5>
//           </CardHeader>
//           <CardBody>
//             <div className="mb-3 mt-3">
//               <label className="form-label">
//                 Enter Webhook URL{" "}
//                 <span className="text-danger">(Please don't put (?) mark)</span>
//               </label>
//               <div className="d-flex gap-2">
//                 <Input
//                   type="text"
//                   placeholder="Enter webhook URL"
//                   value={newWebhook}
//                   onChange={(e) => setNewWebhook(e.target.value)}
//                   disabled={webhookState.loading}
//                 />
//                 <Button color="primary" onClick={handleUpdateWebhook} >
//                   {webhookState.loading ? <Spinner size="sm" /> : "Update"}
//                 </Button>
//               </div>
//             </div>
//           </CardBody>
//         </Card>





        
//         {/* API KEYS Section */}
//         <Card className="mb-4">
//           <CardHeader className="d-flex justify-content-between align-items-center border-bottom-dashed mb-3">
//             <h5 className="fw-bold text-uppercase mb-0">API Keys</h5>            <Button color="success" size="sm">
//               Re-generate Key
//             </Button>
//           </CardHeader>           <CardBody className="pt-0 mt-2">
//            <div className="table-responsive">
//                <Table className="align-middle table-bordered text-center mb-0">
//                 <thead className="table-light">
//                   <tr>
//                     <th>#</th>
//                     <th>Token</th>
//                     <th>Date & Time</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>2</td>
//                     <td className="text-break">
//                       dcf53035999425abe455c38152ee5af27601b21e709feeb1e5d7a3eeab3bcc1c
//                     </td>
//                     <td>
//                        29-07-2025 <br />                       <small className="text-muted">10:54:48 AM</small>
//                     </td>                     <td>                      <span className="badge bg-light text-danger">
//                        Click to Activate
//                       </span>
//                     </td>
//                   </tr>
//                  </tbody>
//                </Table>
//              </div>
//          </CardBody>
//          </Card>

//         {/* White Listed IP Section */}
//         <Card>
//           <CardHeader className="d-flex justify-content-between align-items-center border-bottom-dashed mb-3">
//             <div>
//               <h5 className="fw-bold text-uppercase mb-0">White Listed IP</h5>
//               <small className="text-danger">Only 3 IP White Listed</small>
//             </div>
//             <Button color="info" size="sm" onClick={toggleModal}>
//               <i className="ri-add-line align-middle" /> Add IP
//             </Button>
//           </CardHeader>
//           <AddIPAddressModal isOpen={isModalOpen} toggle={toggleModal} />
//           <CardBody className="pt-0">
//             <div className="table-responsive">
//               <Table className="align-middle table-bordered text-center mb-0">
//                 <thead className="table-light">
//                   <tr>
//                     <th>#</th>
//                     <th>IP Address</th>
//                     <th>Date & Time</th>
//                     <th>Status</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {ipList && ipList.length > 0 ? (
//                     ipList.map((ip, index) => (
//                       <tr key={ip.id}>
//                         <td>{index + 1}</td>
//                         <td>{ip.ip_address}</td>
//                         <td>
//                           {new Date(ip.created_at).toLocaleDateString()} <br />
//                           <small className="text-muted">
//                             {new Date(ip.created_at).toLocaleTimeString()}
//                           </small>
//                         </td>
//                         <td>
//                           <span
//                             className={`badge ${
//                               ip.status === "Active"
//                                 ? "bg-success"
//                                 : "bg-light text-danger"
//                             }`}
//                             style={{ cursor: "pointer" }}
//                             onClick={() => handleActivateClick(ip)}  // 🔹 OPEN OTP MODAL
//                           >
//                             {ip.status === "Active"
//                               ? "Active"
//                               : "Click to Activate"}
//                           </span>
//                         </td>
//                         <td>
//                           <i
//                             className="ri-delete-bin-6-line text-danger"
//                             style={{ cursor: "pointer" }}
//                             onClick={() => handleDelete(ip.id)}
//                           />
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan={5}>No IPs found.</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </Table>
//             </div>
//           </CardBody>
//         </Card>
//       </Container>

//       {/* 🔹 OTP Modal */}
//       {/* {isOtpModalOpen && (
//         <OtpModal
//           isOpen={isOtpModalOpen}
//           toggle={toggleOtpModal}
//           mobile="97*****683"
//           onSuccess={() => {
//             console.log("OTP Verified for IP:", selectedIp);
//             // yaha aap dispatch karke IP activate kar sakte ho
//           }}
//         />
//       )} */}
//     </div>
//   );
// };

// export default TokenApi;






















// import React, { useEffect, useState, useRef } from "react";
// import Swal from "sweetalert2";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   Button,
//   Card,
//   CardBody,
//   CardHeader,
//   Container,
//   Input,
//   Table,
//   Spinner,
// } from "reactstrap";
// import BreadCrumb from "../../../../Components/Common/BreadCrumb";
// import AddIPAddressModal from "../../../../Components/modal/user/user-sub_modal/AddIPAddressModal";
// import OtpModal from "../../../../Components/modal/user/user-sub_modal/OtpModals"; // import OTP modal
// import { RootState, AppDispatch } from "../../../../Store";
// import TokenIpSkeletonRow from "../../../../Components/Common/SkeletonWrapper";
// // API imports
// import {
//   getWhitelistedIpApi,
//   deleteWhitelistedIpApi,
// } from "../../../../slices/whitelistSlice/thunk";
// import {
//   updateWebhookApi,
//   getWebhookApi,
// } from "../../../../slices/webhook/thunk";
// import {
//   // getApiKeysApi,
//   addApiKeyApi,
//   getApiKeysApi,
// } from "../../../../slices/apiKeyToken/thunk";

// const TokenApi = () => {
//   document.title = "Token API";

//   const dispatch = useDispatch<AppDispatch>();

//   // Whitelist state
// // Whitelist state
// const { list: ipList, loading: whitelistLoading } = useSelector(
//   (state: RootState) => state.WhitelistApi
// );

//   // Webhook state
//   const { url: webhookUrl, fetchState: webhookState } = useSelector(
//     (state: RootState) => state.WebhookApi
//   );

//   // API Keys state
//   const { keys, loading: apiKeyLoading } = useSelector(
//     (state: RootState) => state.ApiKeyToken
//   );

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isOtpOpen, setIsOtpOpen] = useState(false); // OTP modal state
//   const [newWebhook, setNewWebhook] = useState("");
//   const toggleModal = () => setIsModalOpen(!isModalOpen);
//   const toggleOtpModal = () => setIsOtpOpen(!isOtpOpen);

//   const fetchOnce = useRef(false);
//   useEffect(() => {
//     if (fetchOnce.current) return;
//     fetchOnce.current = true;
//     dispatch(getWebhookApi());
//     dispatch(getWhitelistedIpApi());
//     dispatch(getApiKeysApi());
//   }, [dispatch]);

//   // Set initial webhook input
//   useEffect(() => {
//     setNewWebhook(webhookUrl || "");
//   }, [webhookUrl]);

//   // Delete IP handler
//   const handleDelete = (id: number | string) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "Once deleted, you will not be able to recover this IP!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#20c997",
//       cancelButtonColor: "#f46a6a",
//       confirmButtonText: "Yes, delete it!",
//       cancelButtonText: "Cancel",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         dispatch(deleteWhitelistedIpApi(id)).then(() => {
//           Swal.fire({
//             icon: "success",
//             title: "Deleted!",
//             text: "IP deleted successfully.",
//             timer: 2000,
//             showConfirmButton: false,
//           });
//           dispatch(getWhitelistedIpApi());
//         });
//       }
//     });
//   };

//   // Update Webhook handler
//   const handleUpdateWebhook = () => {
//     if (!newWebhook.trim()) return;
//     dispatch(updateWebhookApi({ url: newWebhook }));
//   };

//   // Generate New API Key
//   const handleGenerateKey = () => {
//    dispatch(addApiKeyApi({ token_type: "api" }))
//   .then(() => {
//     dispatch(getApiKeysApi()); // refresh list so only latest key shows
//   });

//   };

//   // **Open OTP modal on Click to Activate**
//   const handleActivateClick = (keyId: string | number) => {
//     // Here you can optionally store keyId if needed
//     toggleOtpModal();
//   };

//   return (
//     <div className="page-content">
//       <Container fluid>
//         <BreadCrumb title="Token & IP" pageTitle="Developer API" />

//         {/* Webhooks Section */}
//         <Card className="mb-4">
//           <CardHeader className="border-bottom-dashed">
//             <h5 className="fw-bold text-uppercase">Webhooks</h5>
//           </CardHeader>
//           <CardBody>
//             <div className="mb-3 mt-3">
//               <label className="form-label">
//                 Enter Webhook URL{" "}
//                 <span className="text-danger">(Please don't put (?) mark)</span>
//               </label>
//               <div className="d-flex gap-2">
//                 <Input
//                   type="text"
//                   placeholder="Enter webhook URL"
//                   value={newWebhook}
//                   onChange={(e) => setNewWebhook(e.target.value)}
//                   disabled={webhookState.loading}
//                 />
//                 <Button color="primary" onClick={handleUpdateWebhook}>
//                   {webhookState.loading ? <Spinner size="sm" /> : "Update"}
//                 </Button>
//               </div>
//             </div>
//           </CardBody>
//         </Card>

//         {/* API KEYS Section */}
//         <Card className="mb-4">
//           <CardHeader className="d-flex justify-content-between align-items-center border-bottom-dashed mb-3">
//             <h5 className="fw-bold text-uppercase mb-0">API Keys</h5>
//             <Button color="success" size="sm" onClick={handleGenerateKey}>
//               {apiKeyLoading ? <Spinner size="sm" /> : "Re-generate Key"}
//             </Button>
//           </CardHeader>
//           <CardBody className="pt-0 mt-2">
//             <div className="table-responsive">
//               <Table className="align-middle table-bordered text-center mb-0">
//                 <thead className="table-light">
//                   <tr>
//                     <th>#</th>
//                     <th>Token</th>
//                     <th>Date & Time</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                    {/* API Keys Skeleton */}
//   {apiKeyLoading ? (
//     <TokenIpSkeletonRow
//       type="table"
//       columns={["#", "Token", "Date & Time", "Status"]}
//       rows={5}
//     />
//   ) : keys && keys.length > 0 ? (
//     keys.map((key: any, index: number) => (
//       <tr key={key.id}>
//         <td>{index + 1}</td>
//         <td className="text-break">{key.token}</td>
//         <td>
//                           {new Date(key.created_at).toLocaleDateString()} <br />
//                           <small className="text-muted">
//                             {new Date(key.created_at).toLocaleTimeString()}
//                           </small>
//                         </td>
//                         <td>
//                           <span
//                             className={`badge ${
//                               key.status === "Active"
//                                 ? "bg-success"
//                                 : "bg-light text-danger"
//                             }`}
//                             style={{ cursor: "pointer" }}
//                             onClick={() => handleActivateClick(key.id)} // Open OTP modal
//                           >
//                             {key.status === "Active"
//                               ? "Active"
//                               : "Click to Activate"}
//                           </span>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan={4}>No API Keys found.</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </Table>
//             </div>
//           </CardBody>
//         </Card>

//         {/* White Listed IP Section */}
//         <Card>
//           <CardHeader className="d-flex justify-content-between align-items-center border-bottom-dashed mb-3">
//             <div>
//               <h5 className="fw-bold text-uppercase mb-0">White Listed IP</h5>
//               <small className="text-danger">Only 3 IP White Listed</small>
//             </div>
//             <Button color="info" size="sm" onClick={toggleModal}>
//               <i className="ri-add-line align-middle" /> Add IP
//             </Button>
//           </CardHeader>
//           <AddIPAddressModal isOpen={isModalOpen} toggle={toggleModal} />
//           <CardBody className="pt-0">
//             <div className="table-responsive">
//               <Table className="align-middle table-bordered text-center mb-0">
//                 <thead className="table-light">
//                   <tr>
//                     <th>#</th>
//                     <th>IP Address</th>
//                     <th>Date & Time</th>
//                     <th>Status</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//              <tbody>
//   {whitelistLoading ? (
//     <TokenIpSkeletonRow
//       type="table"
//       columns={["#", "IP Address", "Date & Time", "Status", "Action"]}
//       rows={5}
//     />
//   ) : ipList && ipList.length > 0 ? (
//     ipList.map((ip, index) => (
//       <tr key={ip.id}>
//         <td>{index + 1}</td>
//         <td>{ip.ip_address}</td>
//         <td>
//           {new Date(ip.created_at).toLocaleDateString()} <br />
//           <small className="text-muted">
//             {new Date(ip.created_at).toLocaleTimeString()}
//           </small>
//         </td>
//         <td>
//           <span
//             className={`badge ${
//               ip.status === "Active"
//                 ? "bg-success"
//                 : "bg-light text-danger"
//             }`}
//             style={{ cursor: "pointer" }}
//             onClick={() => handleActivateClick(ip.id)}
//           >
//             {ip.status === "Active" ? "Active" : "Click to Activate"}
//           </span>
//         </td>
//         <td>
//           <i
//             className="ri-delete-bin-6-line text-danger"
//             style={{ cursor: "pointer" }}
//             onClick={() => handleDelete(ip.id)}
//           />
//         </td>
//       </tr>
//     ))
//   ) : (
//     <tr>
//       <td colSpan={5}>No IPs found.</td>
//     </tr>
//   )}
// </tbody>

//               </Table>
//             </div>
//           </CardBody>
//         </Card>

//         {/* OTP Modal */}
//         <OtpModal isOpen={isOtpOpen} toggle={toggleOtpModal} />
//       </Container>
//     </div>
//   );
// };

// export default TokenApi;














// import React, { useEffect, useState, useRef } from "react";
// import Swal from "sweetalert2";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   Button,
//   Card,
//   CardBody,
//   CardHeader,
//   Container,
//   Input,
//   Table,
//   Spinner,
// } from "reactstrap";
// import BreadCrumb from "../../../../Components/Common/BreadCrumb";
// import AddIPAddressModal from "../../../../Components/modal/user/user-sub_modal/AddIPAddressModal";
// import OtpModal from "../../../../Components/modal/user/user-sub_modal/OtpModals";
// import { RootState, AppDispatch } from "../../../../Store";
// import TokenIpSkeletonRow from "../../../../Components/Common/SkeletonWrapper";

// // Slice thunks
// import {
//   getWhitelistedIpApi,
//   deleteWhitelistedIpApi,
// } from "../../../../slices/whitelistSlice/thunk";
// import {
//   updateWebhookApi,
//   getWebhookApi,
// } from "../../../../slices/webhook/thunk";
// import {
//   addApiKeyApi,
//   getApiKeysApi,
// } from "../../../../slices/apiKeyToken/thunk";

// const TokenApi: React.FC = () => {
//   document.title = "Token API";

//   const dispatch = useDispatch<AppDispatch>();

//   // Redux states
//   const { list: ipList, loading: whitelistLoading } = useSelector(
//     (state: RootState) => state.WhitelistApi
//   );
//   const { url: webhookUrl, fetchState: webhookState } = useSelector(
//     (state: RootState) => state.WebhookApi
//   );
//   const { keys, loading: apiKeyLoading } = useSelector(
//     (state: RootState) => state.ApiKeyToken
//   );

//   // Local states
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isOtpOpen, setIsOtpOpen] = useState(false);
//   const [selectedId, setSelectedId] = useState<string | number | null>(null);
//   const [newWebhook, setNewWebhook] = useState("");

//   const fetchOnce = useRef(false);

//   // Initial fetch
//   useEffect(() => {
//     if (fetchOnce.current) return;
//     fetchOnce.current = true;
//     dispatch(getWebhookApi());
//     dispatch(getWhitelistedIpApi());
//     dispatch(getApiKeysApi());
//   }, [dispatch]);

//   // Sync webhook input with redux state
//   useEffect(() => {
//     setNewWebhook(webhookUrl || "");
//   }, [webhookUrl]);

//   // Handlers
//   const toggleModal = () => setIsModalOpen((prev) => !prev);
//   const toggleOtpModal = () => setIsOtpOpen((prev) => !prev);

//   const handleDelete = (id: number | string) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "Once deleted, you will not be able to recover this IP!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#20c997",
//       cancelButtonColor: "#f46a6a",
//       confirmButtonText: "Yes, delete it!",
//       cancelButtonText: "Cancel",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         dispatch(deleteWhitelistedIpApi(id)).then(() => {
//           Swal.fire({
//             icon: "success",
//             title: "Deleted!",
//             text: "IP deleted successfully.",
//             timer: 2000,
//             showConfirmButton: false,
//           });
//           dispatch(getWhitelistedIpApi());
//         });
//       }
//     });
//   };

//   const handleUpdateWebhook = () => {
//     if (!newWebhook.trim()) return;
//     dispatch(updateWebhookApi({ url: newWebhook }));
//   };

//   const handleGenerateKey = () => {
//     dispatch(addApiKeyApi({ token_type: "api" })).then(() =>
//       dispatch(getApiKeysApi())
//     );
//   };

//   const handleActivateClick = (id: string | number) => {
//     setSelectedId(id);
//     toggleOtpModal();
//   };

//   return (
//     <div className="page-content">
//       <Container fluid>
//         <BreadCrumb title="Token & IP" pageTitle="Developer API" />

//         {/* Webhooks Section */}
//         <Card className="mb-4">
//           <CardHeader className="border-bottom-dashed">
//             <h5 className="fw-bold text-uppercase">Webhooks</h5>
//           </CardHeader>
//           <CardBody>
//             <div className="mb-3 mt-3">
//               <label className="form-label">
//                 Enter Webhook URL{" "}
//                 <span className="text-danger">(Please don't put (?) mark)</span>
//               </label>
//               <div className="d-flex gap-2">
//                 <Input
//                   type="text"
//                   placeholder="Enter webhook URL"
//                   value={newWebhook}
//                   onChange={(e) => setNewWebhook(e.target.value)}
//                   disabled={webhookState.loading}
//                 />
//                 <Button color="primary" onClick={handleUpdateWebhook}>
//                   {webhookState.loading ? <Spinner size="sm" /> : "Update"}
//                 </Button>
//               </div>
//             </div>
//           </CardBody>
//         </Card>

//         {/* API Keys Section */}
//         <Card className="mb-4">
//           <CardHeader className="d-flex justify-content-between align-items-center border-bottom-dashed mb-3">
//             <h5 className="fw-bold text-uppercase mb-0">API Keys</h5>
//             <Button color="success" size="sm" onClick={handleGenerateKey}>
//               {apiKeyLoading ? <Spinner size="sm" /> : "Re-generate Key"}
//             </Button>
//           </CardHeader>
//           <CardBody className="pt-0 mt-2">
//             <div className="table-responsive">
//               <Table className="align-middle table-bordered text-center mb-0">
//                 <thead className="table-light">
//                   <tr>
//                     <th>#</th>
//                     <th>Token</th>
//                     <th>Date & Time</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {apiKeyLoading ? (
//                     <TokenIpSkeletonRow
//                       type="table"
//                       columns={["#", "Token", "Date & Time", "Status"]}
//                       rows={1}
//                     />
//                   ) : keys?.length ? (
//                     keys.map((key, index) => (
//                       <tr key={key.id}>
//                         <td>{index + 1}</td>
//                         <td className="text-break">{key.token}</td>
//                         <td>
//                           {new Date(key.created_at).toLocaleDateString()} <br />
//                           <small className="text-muted">
//                             {new Date(key.created_at).toLocaleTimeString()}
//                           </small>
//                         </td>
//                         <td>
//                           <span
//                             className={`badge ${
//                               key.status === "Active"
//                                 ? "bg-success"
//                                 : "bg-light text-danger"
//                             }`}
//                             style={{ cursor: "pointer" }}
//                             onClick={() => handleActivateClick(key.id)}
//                           >
//                             {key.status === "Active"
//                               ? "Active"
//                               : "Click to Activate"}
//                           </span>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan={4}>No API Keys found.</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </Table>
//             </div>
//           </CardBody>
//         </Card>

//         {/* White Listed IP Section */}
//         <Card>
//           <CardHeader className="d-flex justify-content-between align-items-center border-bottom-dashed mb-3">
//             <div>
//               <h5 className="fw-bold text-uppercase mb-0">White Listed IP</h5>
//               <small className="text-danger">Only 3 IP White Listed</small>
//             </div>
//             <Button color="info" size="sm" onClick={toggleModal}>
//               <i className="ri-add-line align-middle" /> Add IP
//             </Button>
//           </CardHeader>
//           <AddIPAddressModal isOpen={isModalOpen} toggle={toggleModal} />
//           <CardBody className="pt-0">
//             <div className="table-responsive">
//               <Table className="align-middle table-bordered text-center mb-0">
//                 <thead className="table-light">
//                   <tr>
//                     <th>#</th>
//                     <th>IP Address</th>
//                     <th>Date & Time</th>
//                     <th>Status</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {whitelistLoading ? (
//                     <TokenIpSkeletonRow
//                       type="table"
//                       columns={["#", "IP Address", "Date & Time", "Status", "Action"]}
//                       rows={3}
//                     />
//                   ) : ipList?.length ? (
//                     ipList.map((ip, index) => (
//                       <tr key={ip.id}>
//                         <td>{index + 1}</td>
//                         <td>{ip.ip_address}</td>
//                         <td>
//                           {new Date(ip.created_at).toLocaleDateString()} <br />
//                           <small className="text-muted">
//                             {new Date(ip.created_at).toLocaleTimeString()}
//                           </small>
//                         </td>
//                         <td>
//                           <span
//                             className={`badge ${
//                               ip.status === "Active"
//                                 ? "bg-success"
//                                 : "bg-light text-danger"
//                             }`}
//                             style={{ cursor: "pointer" }}
//                             onClick={() => handleActivateClick(ip.id)}
//                           >
//                             {ip.status === "Active" ? "Active" : "Click to Activate"}
//                           </span>
//                         </td>
//                         <td>
//                           <i
//                             className="ri-delete-bin-6-line text-danger"
//                             style={{ cursor: "pointer" }}
//                             onClick={() => handleDelete(ip.id)}
//                           />
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan={5}>No IPs found.</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </Table>
//             </div>
//           </CardBody>
//         </Card>

//         {/* OTP Modal */}
//         <OtpModal isOpen={isOtpOpen} toggle={toggleOtpModal} id={selectedId} />
//       </Container>
//     </div>
//   );
// };

// export default TokenApi;






















import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Input,
  Table,
  Spinner,
} from "reactstrap";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import AddIPAddressModal from "../../../../Components/modal/user/user-sub_modal/AddIPAddressModal";
import OtpModal from "../../../../Components/modal/user/user-sub_modal/OtpModals";
import { RootState, AppDispatch } from "../../../../Store";
import SkeletonWrapper from "../../../../Components/Common/SkeletonWrapper";

// Slice thunks
import {
  getWhitelistedIpApi,
  deleteWhitelistedIpApi,
} from "../../../../slices/whitelistSlice/thunk";
import {
  updateWebhookApi,
  getWebhookApi,
} from "../../../../slices/webhook/thunk";
import {
  addApiKeyApi,
  getApiKeysApi,
} from "../../../../slices/apiKeyToken/thunk";

const TokenApi: React.FC = () => {
  document.title = "Token API";

  const dispatch = useDispatch<AppDispatch>();

  // Redux states
  const { list: ipList, loading: whitelistLoading } = useSelector(
    (state: RootState) => state.WhitelistApi
  );
  const { url: webhookUrl, fetchState: webhookState } = useSelector(
    (state: RootState) => state.WebhookApi
  );
  const { keys, loading: apiKeyLoading } = useSelector(
    (state: RootState) => state.ApiKeyToken
  );

  // Local states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | number | null>(null);
  const [newWebhook, setNewWebhook] = useState("");

  const fetchOnce = useRef(false);

  // Initial fetch (only once)
  useEffect(() => {
    if (fetchOnce.current) return;
    fetchOnce.current = true;
    dispatch(getWebhookApi());
    dispatch(getWhitelistedIpApi());
    dispatch(getApiKeysApi());
  }, [dispatch]);

  // Sync webhook input with redux state
  useEffect(() => {
    setNewWebhook(webhookUrl || "");
  }, [webhookUrl]);

  // Handlers
  const toggleModal = () => setIsModalOpen((prev) => !prev);
  const toggleOtpModal = () => setIsOtpOpen((prev) => !prev);

  const handleDelete = (id: number | string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this IP!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#20c997",
      cancelButtonColor: "#f46a6a",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteWhitelistedIpApi(id)).then(() => {
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "IP deleted successfully.",
            timer: 2000,
            showConfirmButton: false,
          });
          dispatch(getWhitelistedIpApi());
        });
      }
    });
  };

  const handleUpdateWebhook = () => {
    if (!newWebhook.trim()) return;
    dispatch(updateWebhookApi({ url: newWebhook }));
  };

  const handleGenerateKey = () => {
    dispatch(addApiKeyApi({ token_type: "api" })).then(() =>
      dispatch(getApiKeysApi())
    );
  };

  const handleActivateClick = (id: string | number) => {
    setSelectedId(id);
    toggleOtpModal();
  };

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Token & IP" pageTitle="Developer API" />

        {/* Webhooks Section */}
        <Card className="mb-4">
          <CardHeader className="border-bottom-dashed">
            <h5 className="fw-bold text-uppercase">Webhooks</h5>
          </CardHeader>
          <CardBody>
            <div className="mb-3 mt-3">
              <label className="form-label">
                Enter Webhook URL{" "}
                <span className="text-danger">(Please don't put (?) mark)</span>
              </label>
              <div className="d-flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter webhook URL"
                  value={newWebhook}
                  onChange={(e) => setNewWebhook(e.target.value)}
                  disabled={webhookState.loading}
                />
                <Button color="primary" onClick={handleUpdateWebhook}>
                  {webhookState.loading ? <Spinner size="sm" /> : "Update"}
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* API Keys Section */}
        <Card className="mb-4">
          <CardHeader className="d-flex justify-content-between align-items-center border-bottom-dashed mb-3">
            <h5 className="fw-bold text-uppercase mb-0">API Keys</h5>
            <Button color="success" size="sm" onClick={handleGenerateKey}>
              {apiKeyLoading ? <Spinner size="sm" /> : "Re-generate Key"}
            </Button>
          </CardHeader>
          <CardBody className="pt-0 mt-2">
            <div className="table-responsive">
              <Table className="align-middle table-bordered text-center mb-0">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Token</th>
                    <th>Date & Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {apiKeyLoading ? (
                    <SkeletonWrapper
                      type="table"
                      columns={["#", "Token", "Date & Time", "Status"]}
                      rows={1}
                    />
                  ) : keys?.length ? (
                    keys.map((key, index) => (
                      <tr key={key.id}>
                        <td>{index + 1}</td>
                        <td className="text-break">{key.token}</td>
                        <td>
                          {new Date(key.created_at).toLocaleDateString()} <br />
                          <small className="text-muted">
                            {new Date(key.created_at).toLocaleTimeString()}
                          </small>
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              key.status === "Active"
                                ? "bg-success"
                                : "bg-light text-danger"
                            }`}
                            style={{ cursor: "pointer" }}
                            onClick={() => handleActivateClick(key.id)}
                          >
                            {key.status === "Active"
                              ? "Active"
                              : "Click to Activate"}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4}>No API Keys found.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>

        {/* White Listed IP Section */}
        <Card>
          <CardHeader className="d-flex justify-content-between align-items-center border-bottom-dashed mb-3">
            <div>
              <h5 className="fw-bold text-uppercase mb-0">White Listed IP</h5>
              <small className="text-danger">Only 3 IP White Listed</small>
            </div>
            <Button color="info" size="sm" onClick={toggleModal}>
              <i className="ri-add-line align-middle" /> Add IP
            </Button>
          </CardHeader>
          <AddIPAddressModal isOpen={isModalOpen} toggle={toggleModal} />
          <CardBody className="pt-0">
            <div className="table-responsive">
              <Table className="align-middle table-bordered text-center mb-0">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>IP Address</th>
                    <th>Date & Time</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {whitelistLoading ? (
                    <SkeletonWrapper
                      type="table"
                      columns={["#", "IP Address", "Date & Time", "Status", "Action"]}
                      rows={3}
                    />
                  ) : ipList?.length ? (
                    ipList.map((ip, index) => (
                      <tr key={ip.id}>
                        <td>{index + 1}</td>
                        <td>{ip.ip_address}</td>
                        <td>
                          {new Date(ip.created_at).toLocaleDateString()} <br />
                          <small className="text-muted">
                            {new Date(ip.created_at).toLocaleTimeString()}
                          </small>
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              ip.status === "Active"
                                ? "bg-success"
                                : "bg-light text-danger"
                            }`}
                            style={{ cursor: "pointer" }}
                            onClick={() => handleActivateClick(ip.id)}
                          >
                            {ip.status === "Active"
                              ? "Active"
                              : "Click to Activate"}
                          </span>
                        </td>
                        <td>
                          <i
                            className="ri-delete-bin-6-line text-danger"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDelete(ip.id)}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5}>No IPs found.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>

        {/* OTP Modal */}
        <OtpModal isOpen={isOtpOpen} toggle={toggleOtpModal} id={selectedId} />
      </Container>
    </div>
  );
};

export default TokenApi;
