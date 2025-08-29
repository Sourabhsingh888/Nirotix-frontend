// import React, { useState } from "react";
// import {
//   Container,
//   Card,
//   CardBody,
//   CardTitle,
//   CardText,
//   Button,
//   Nav,
//   NavItem,
//   NavLink,
//   TabContent,
//   TabPane,
//   Row,
//   Col,
// } from "reactstrap";
// import { Link, useLocation } from "react-router-dom";
// import classnames from "classnames";
// import AddMoneyModal from "../../../Components/modal/user/user-sub_modal/AddMoneyModal";

// const tabData = [
//   { id: "aadhaar-pan", label: "Aadhaar / PAN" },
//   { id: "bank-account", label: "Bank Account" },
//   { id: "kyb", label: "KYB(Know Your Business)" },
//   { id: "digital-kyc", label: "Regulated Digital KYC" },
//   { id: "documents", label: "Other Official Documents" },
//   { id: "telecom", label: "Telecom Intelligence" },
//   { id: "utility", label: "Utility Bills Intelligence" },
// ];

// const productData: Record<
//   string,
//   { title: string; desc: string; link: string }[]
// > = {
//   "aadhaar-pan": [
//     {
//       title: "Aadhaar OKYC",
//       desc: "Verify an aadhaar number offline by generating and submitting the OTP.",
//       link: "/services/aadhar",
//     },
//     {
//       title: "Aadhaar Masking",
//       desc: "Retrieve Aadhaar details with the first 8 digits masked, ensuring data privacy during eKYC verification.",
//       link: "/services/aadhar",
//     },
//     {
//       title: "PAN 360",
//       desc: "Retrieve every bit of detail from an individual’s PAN information such as masked aadhaar number, address, contact, and more.",
//       link: "/services/pan",
//     },
//     {
//       title: "PAN Lite",
//       desc: "A crucial tool that helps you verify user identity by ensuring the provided details align with official records.",
//       link: "/services/pan",
//     },
//   ],
//   "bank-account": [
//     {
//       title: "Bank Verification",
//       desc: "Validate bank account numbers with IFSC.",
//       link: "/services/bank/pennydrop",
//     },
//   ],
//   kyb: [
//     {
//       title: "Business KYC",
//       desc: "Know Your Business – GSTIN, CIN, and more.",
//       link: "/services/business-kyc",
//     },
//   ],
//   "digital-kyc": [
//     {
//       title: "Face Match",
//       desc: "Compare two face images for similarity.",
//       link: "/services/face-match",
//     },
//   ],
//   documents: [
//     {
//       title: "Passport OCR",
//       desc: "Extract data from passport using OCR.",
//       link: "/services/passport-ocr",
//     },
//   ],
//   telecom: [
//     {
//       title: "Mobile Operator Check",
//       desc: "Detect telecom operator of a phone number.",
//       link: "/services/mobile-operator-check",
//     },
//   ],
//   utility: [
//     {
//       title: "Electricity Bill OCR",
//       desc: "Extract data from electricity bills.",
//       link: "/services/electricity-bill-ocr",
//     },
//   ],
// };

// const UserDashboard = () => {
//   document.title = "User Dashboard";
//   const [activeTab, setActiveTab] = useState("aadhaar-pan");

//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const toggleModal = () => setIsModalOpen(!isModalOpen);

//   return (
//     <React.Fragment>
//       <div className="page-content">
//         <Container fluid>
//           <Col lg={12}>
//             <div className="col-md-6 col-xl-4">
//               <div className="card">
//                 <div className="card-header bg-light">
//                   <h4 className="card-title text-muted">Nerotix Wallet</h4>
//                 </div>
//                 {/*end card-header*/}
//                 <div className="card-body">
//                   <div className="d-flex justify-content-between w-100 align-items-center">
//                     <div>
//                       <h5 className="card-text text-muted">Total Balance</h5>
//                       <h5>
//                         ₹ <span id="totalAmount">71.68</span>
//                       </h5>
//                     </div>

//                     <button
//                       className="btn btn-outline-secondary ms-auto"
//                       onClick={toggleModal}
//                     >
//                       ADD MONEY
//                     </button>

//                     <AddMoneyModal isOpen={isModalOpen} toggle={toggleModal} />
//                   </div>

//                   <div className="d-flex justify-content-between w-100 mt-2 mb-0">
//                     <div>
//                       <span className="text-muted">
//                         Last updated at <span id="refresh-date">15:53 PM</span>
//                       </span>
//                     </div>
//                     <div className="text-center">
//                       <i
//                         style={{ cursor: "pointer" }}
//                         id="updateWallet"
//                         className="la la-refresh text-secondary progress-icon-spin fs-1"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/*end card-body*/}
//                 <div className="card-footer bg-light-alt m-0">
//                   <div className="d-flex justify-content-between w-100">
//                     <span className="text-muted card-text">Lien Balance</span>
//                     <span className=" card-text">
//                       ₹ <span id="lien_balance">30</span>
//                     </span>
//                   </div>
//                   <div className="d-flex justify-content-between w-100 mt-2">
//                     <span className="text-muted card-text">
//                       Free Balance{" "}
//                       <span className="badge bg-danger" id="">
//                         Expire{" "}
//                       </span>
//                     </span>
//                     <span className=" card-text">
//                       ₹ <span id="free_balance">0.88</span>
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               {/*end card*/}
//             </div>
//           </Col>





//           <Col lg={12}>
//             <div className="mb-2 mt-2">
//               <h4 className="text-bold">All Products</h4>
//               <p className="text-muted">
//                 Explore other products that might suit your business needs.
//               </p>
//             </div>
//           </Col>



//           <div className="card bg-light">
//             <div className="card-header">
//               <ul
//                 className="nav nav-tabs nav-tabs-custom"
//                 role="tablist"
//                 id="bottom-tab"
//               >
//                 {tabData.map((tab, index) => (
//                   <li
//                     key={index}
//                     className="nav-item product_category"
//                     data-id={index + 1}
//                     role="presentation"
//                   >
//                     <button
//                       className={classnames("nav-link", {
//                         active: activeTab === tab.id,
//                       })}
//                       onClick={() => setActiveTab(tab.id)}
//                       type="button"
//                       role="tab"
//                       aria-selected={activeTab === tab.id}
//                     >
//                       {tab.label}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>



//             <CardBody>
//               <Row id="product-container">
//                 {(productData[activeTab] || []).map((card, index) => (
//                   <Col xxl={3} xl={4} lg={6} className="mb-4" key={index}>
//                     <Card className="ribbon-box border shadow-none mb-lg-0">
//                       <CardBody className="text-muted">
//                           <span className="ribbon-three ribbon-three-primary">
//                             <span>₹ N/A</span>
//                           </span>
//                         <h4 className="card-title mt-4">{card.title}</h4>
//                         <p className="card-text text-muted">{card.desc}</p>
//                         <Button color="primary" outline>
//                           <Link to={card.link}>Explore</Link>
//                         </Button>
//                       </CardBody>
//                     </Card>
//                   </Col>
//                 ))}
//               </Row>
//             </CardBody>
//           </div>
//         </Container>
//       </div>
//     </React.Fragment>
//   );
// };

// export default UserDashboard;









// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Card,
//   CardBody,
//   Button,
//   Row,
//   Col,
// } from "reactstrap";
// import { Link } from "react-router-dom";
// import classnames from "classnames";
// import AddMoneyModal from "../../../Components/modal/user/user-sub_modal/AddMoneyModal";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../../Store";
// import { getProductCategories } from "../../../slices/productCategory/thunk";
// import { getProducts } from "../../../slices/addProduct/thunk";
// import { getProductPricing } from "../../../slices/productPricing/thunk";
// import { getWalletApi } from "../../../slices/wallet/thunk";


// const UserDashboard = () => {
//   document.title = "User Dashboard";
//   const dispatch = useDispatch<AppDispatch>();

//   const [activeTab, setActiveTab] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const toggleModal = () => setIsModalOpen(!isModalOpen);

//   // Redux state
//   const { list: categories } = useSelector(
//     (state: RootState) => state.ProductCategory
//   );
//   const { list: products } = useSelector(
//     (state: RootState) => state.AddProduct
//   );
//   const { list: pricingList } = useSelector(
//     (state: RootState) => state.ProductPrice
//   );


//   const { wallet, loading, error } = useSelector((state: RootState) => state.Wallet);
//   console.log("Wallet Data:", wallet);
//   // Load categories on mount
//   useEffect(() => {
//     dispatch(getWalletApi());
//     dispatch(getProductCategories({ offset: 0, limit: 10 }));
//   }, [dispatch]);

//   // Set default active tab when categories load
//   useEffect(() => {
//     if (categories.length > 0 && !activeTab) {
//       setActiveTab(categories[0].id);
//     }
//   }, [categories, activeTab]);

//   // Load products when activeTab changes
//   useEffect(() => {
//     if (activeTab) {
//       dispatch(
//         getProducts({
//           offset: 0,
//           limit: 50,
//           searchValue: "",
//           ProductStatus: "ACTIVE",
//           categoryId: activeTab,
//         })
//       );
//     }
//   }, [dispatch, activeTab]);

//   // Load product pricing whenever products change
//   useEffect(() => {
//     if (products.length > 0) {
//       dispatch(getProductPricing({ offset: 0, limit: 100, searchValue: "" }));
//     }
//   }, [dispatch, products]);


//   const list = useSelector((state: RootState) => state.ProductPrice?.list || []);

//   useEffect(() => {
//     console.log("Product Pricing Lis:", list);
//   }, [list]);


//   // Helper: get price for a productId
//   const getPriceForProduct = (productId: string) => {
//     const pricing = pricingList.find((p: any) => p.productId === productId);
//     return pricing ? pricing.price : "N/A";
//   };

//   return (
//     <React.Fragment>
//       <div className="page-content">
//         <Container fluid>
//           {/* Wallet Card */}
//           <Col lg={12}>
//             <div className="col-md-6 col-xl-4">
//               <div className="card">
//                 <div className="card-header bg-light">
//                   <h4 className="card-title text-muted">Nerotix Wallet</h4>
//                 </div>
//                 <div className="card-body">
//                   {loading && <p>Loading...</p>}
//                   {error && <p className="text-danger">{error}</p>}
//                   <div className="d-flex justify-content-between w-100 align-items-center">
//                     <div>
//                       <h5 className="card-text text-muted">Total Balance</h5>
//                       <h5>
//                         ₹ <span id="totalAmount">{wallet?.total_balance ?? 0}</span>
//                       </h5>
//                     </div>
//                     <button className="btn btn-outline-secondary ms-auto" onClick={toggleModal}>
//                       ADD MONEY
//                     </button>
//                     <AddMoneyModal isOpen={isModalOpen} toggle={toggleModal} />
//                   </div>
//                   <div className="d-flex justify-content-between w-100 mt-2 mb-0">
//                     <div>
//                       <span className="text-muted">
//                         Last updated at{" "}
//                         <span id="refresh-date">
//                           {wallet?.updated_at
//                             ? new Date(wallet.updated_at).toLocaleTimeString()
//                             : "N/A"}
//                         </span>
//                       </span>
//                     </div>
//                     <div className="text-center">
//                       {/* <i
//                   style={{ cursor: "pointer" }}
//                   id="updateWallet"
//                   className="la la-refresh text-secondary progress-icon-spin fs-1"
//                   onClick={() => dispatch(getWalletApi())} // Refresh wallet
//                 /> */}

//                       <i
//                         style={{ cursor: "pointer", transition: "transform 0.5s linear" }}
//                         id="updateWallet"
//                         className={classnames(
//                           "la la-refresh text-secondary fs-1",
//                           { "spin-animation": loading }
//                         )}
//                         onClick={() => dispatch(getWalletApi())}
//                       />


//                     </div>
//                   </div>
//                 </div>
//                 <div className="card-footer bg-light-alt m-0">
//                   <div className="d-flex justify-content-between w-100">
//                     <span className="text-muted card-text">Lien Balance</span>
//                     <span className=" card-text">
//                       ₹ <span id="lien_balance">{wallet?.lien_balance ?? 0}</span>
//                     </span>
//                   </div>
//                   <div className="d-flex justify-content-between w-100 mt-2">
//                     <span className="text-muted card-text">
//                       Free Balance{" "}
//                       <span className="badge bg-danger">
//                         Expire{" "}
//                         {wallet?.balance_expire_at
//                           ? new Date(wallet.balance_expire_at).toLocaleDateString()
//                           : ""}
//                       </span>
//                     </span>
//                     <span className=" card-text">
//                       ₹ <span id="free_balance">{wallet?.free_balance ?? 0}</span>
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Col>

//           {/* Products Section */}
//           <Col lg={12}>
//             <div className="mb-2 mt-2">
//               <h4 className="text-bold">All Products</h4>
//               <p className="text-muted">
//                 Explore other products that might suit your business needs.
//               </p>
//             </div>
//           </Col>

//           <div className="card bg-light">
//             <div className="card-header">
//               <ul className="nav nav-tabs nav-tabs-custom" role="tablist" id="bottom-tab">
//                 {categories.map((tab: any, index: number) => (
//                   <li
//                     key={index}
//                     className="nav-item product_category"
//                     data-id={tab.id}
//                     role="presentation"
//                   >
//                     <button
//                       className={classnames("nav-link", {
//                         active: activeTab === tab.id,
//                       })}
//                       onClick={() => setActiveTab(tab.id)}
//                       type="button"
//                       role="tab"
//                       aria-selected={activeTab === tab.id}
//                     >
//                       {tab.name}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <CardBody>






//               <Row id="product-container">
//                 {products.map((card: any) => {
//                   console.log("Product Card:", card);

//                   const pricing = list.find(
//                     (p) => p.product_id === card.id
//                   );

//                   return (
//                     <Col xxl={3} xl={4} lg={6} className="mb-4" key={card.id}>
//                       <Card className="ribbon-box border shadow-none mb-lg-0">
//                         <CardBody className="text-muted">
//                           <span className="ribbon-three ribbon-three-primary">
//                             <span>  ₹ {pricing?.price || "N/A"}</span>
//                           </span>
//                           <h4 className="card-title mt-4">{card.name}</h4>
//                           <p className="card-text text-muted">{card.description}</p>
//                           <Button color="primary" outline>
//                             <Link to={card.link}>Explore</Link>
//                           </Button>
//                         </CardBody>
//                       </Card>
//                     </Col>
//                   );
//                 })}
//               </Row>

//             </CardBody>
//           </div>
//         </Container>
//       </div>
//     </React.Fragment>
//   );
// };

// export default UserDashboard;





















import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardBody,
  Button,
  Row,
  Col,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import AddMoneyModal from "../../../Components/modal/user/user-sub_modal/AddMoneyModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../Store";
import { getProductCategories } from "../../../slices/productCategory/thunk";
import { getProducts } from "../../../slices/addProduct/thunk";
import { getProductPricing } from "../../../slices/productPricing/thunk";
import { getWalletApi } from "../../../slices/wallet/thunk";
import SkeletonWrapper from "../../../Components/Common/SkeletonWrapper";

const UserDashboard = () => {
  document.title = "User Dashboard";
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [walletRefreshing, setWalletRefreshing] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // Redux state
  const { dropdownList: categories, fetchState: { loading: categoryLoading } } = useSelector(
    (state: RootState) => state.ProductCategory
  );
  const { tableList: products, fetchState: { loading: productLoading } } = useSelector(
    (state: RootState) => state.AddProduct
  );
  const { list: pricingList, fetchState: { loading: pricingLoading } } = useSelector(
    (state: RootState) => state.ProductPrice
  );
  const { wallet, loading: walletLoading, error } = useSelector(
    (state: RootState) => state.Wallet
  );

  const isProductLoading = productLoading || pricingLoading;

  // Initial data fetch
  useEffect(() => {
    dispatch(getWalletApi()).catch(err => console.error(err));
    dispatch(getProductCategories({ offset: 0, limit: 10, context: "dropdown" })).catch(err => console.error(err));
  }, [dispatch]);

  // Set default active tab when categories load
  useEffect(() => {
    if (categories.length && !activeTab) {
      setActiveTab(categories[0].id);
    }
  }, [categories, activeTab]);

  // Fetch products on activeTab change
  useEffect(() => {
    if (activeTab) {
     dispatch(getProducts({
  offset: 0,
  limit: 50,
  searchValue: "",
  ProductStatus: "ACTIVE",
  categoryId: activeTab,
  context: "table"   // ✅ add this
}))

    }
  }, [dispatch, activeTab]);

  // Fetch pricing once products are available
  useEffect(() => {
    if (products.length > 0) {
      dispatch(getProductPricing({ offset: 0, limit: 100, searchValue: "" }))
        .catch(err => console.error(err));
    }
  }, [dispatch, products]);

  // Wallet refresh handler
  const handleWalletRefresh = () => {
    setWalletRefreshing(true);
    dispatch(getWalletApi())
      .catch(err => console.error(err))
      .finally(() => setTimeout(() => setWalletRefreshing(false), 1000));
  };

  const handleExploreClick = (product: any) => {
    navigate(`/services/${product.slug}`, { state: { product } });
  };

  return (
    <div className="page-content">
      <Container fluid>
        {/* Wallet Card */}
        <Col lg={12}>
          <div className="col-md-6 col-xl-4">
            <div className="card">
              <div className="card-header bg-light">
                <h4 className="card-title text-muted">Nerotix Wallet</h4>
              </div>
              <div className="card-body">
                {(walletLoading && !walletRefreshing) ? (
                  <div className="d-flex">
                    <div className="me-3" style={{ flex: 3 }}>
                      <SkeletonWrapper type="form" rows={3} columns={1} />
                    </div>
                    <div style={{ flex: 2 }}>
                      <SkeletonWrapper type="form" rows={2} columns={1} />
                    </div>
                  </div>
                ) : (
                  <>
                    {error && <p className="text-danger">{error}</p>}
                    <div className="d-flex justify-content-between w-100 align-items-center">
                      <div>
                        <h5 className="card-text text-muted">Total Balance</h5>
                        <h5>₹ <span id="totalAmount">{wallet?.total_balance ?? 0}</span></h5>
                      </div>
                      <button className="btn btn-outline-secondary ms-auto" onClick={toggleModal}>
                        ADD MONEY
                      </button>
                      <AddMoneyModal isOpen={isModalOpen} toggle={toggleModal} />
                    </div>

                    <div className="d-flex justify-content-between w-100 mt-2 mb-0">
                      <div>
                        <span className="text-muted" style={{ fontWeight: '600', color: '#333' }}>
                          Last updated at{" "}<br />
                          <span id="refresh-date" style={{ fontWeight: '400', color: '#000000' }}>
                            {wallet?.updated_at ? new Date(wallet.updated_at).toLocaleString() : "N/A"}
                          </span>
                        </span>
                      </div>
                      <div className="text-center">
                        <i
                          style={{ cursor: "pointer" }}
                          className={classnames(
                            "la la-refresh text-secondary fs-1",
                            { "spin-animation": walletRefreshing || walletLoading }
                          )}
                          onClick={handleWalletRefresh}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
              {!walletLoading && (
                <div className="card-footer bg-light-alt m-0">
                  <div className="d-flex justify-content-between w-100">
                    <span className="text-muted card-text">Lien Balance</span>
                    <span className="card-text">₹ <span id="lien_balance">{wallet?.lien_balance ?? 0}</span></span>
                  </div>
                  <div className="d-flex justify-content-between w-100 mt-2">
                    <span className="text-muted card-text">
                      Free Balance{" "}
                      <span className="badge bg-danger">
                        Expire{" "}{wallet?.balance_expire_at ? new Date(wallet.balance_expire_at).toLocaleDateString() : ""}
                      </span>
                    </span>
                    <span className="card-text">₹ <span id="free_balance">{wallet?.free_balance ?? 0}</span></span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Col>

        {/* Products Section */}
        <Col lg={12}>
          <div className="mb-2 mt-2">
            <h4 className="text-bold">All Products</h4>
            <p className="text-muted">
              Explore other products that might suit your business needs.
            </p>
          </div>
        </Col>

        <div className="card bg-light">
          <div className="card-header">
            {categoryLoading ? (
              <SkeletonWrapper type="tabs" rows={2} columns={7} />
            ) : (
              <ul className="nav nav-tabs nav-tabs-custom" role="tablist" id="bottom-tab">
                {categories.map((tab: any) => (
                  <li key={tab.id} className="nav-item product_category" data-id={tab.id} role="presentation">
                    <button
                      className={classnames("nav-link", { active: activeTab === tab.id })}
                      onClick={() => setActiveTab(tab.id)}
                      type="button"
                      role="tab"
                      aria-selected={activeTab === tab.id}
                    >
                      {tab.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <CardBody>
            <Row id="product-container">
              {isProductLoading ? (
                <SkeletonWrapper type="card" rows={1} />
              ) : (
                products.map((card: any) => {
                  const pricing = pricingList.find((p) => p.product_id === card.id);
                  return (
                    <Col xxl={3} xl={4} lg={6} className="mb-4" key={card.id}>
                      <Card className="ribbon-box border shadow-none mb-lg-0">
                        <CardBody className="text-muted">
                          <span className="ribbon-three ribbon-three-primary">
                            <span>
                              {pricing?.price || pricing?.price === 0 ? `₹ ${pricing.price}` : "N/A"}
                            </span>
                          </span>
                          <h4 className="card-title mt-4">{card.name}</h4>
                          <p className="card-text text-muted">{card.description}</p>
                          <Button color="primary" outline onClick={() => handleExploreClick(card)}>
                            Explore
                          </Button>
                        </CardBody>
                      </Card>
                    </Col>
                  );
                })
              )}
            </Row>
          </CardBody>
        </div>
      </Container>
    </div>
  );
};

export default UserDashboard;









































// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Card,
//   CardBody,
//   Button,
//   Row,
//   Col,
// } from "reactstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../../Store";
// import { getProductCategories } from "../../../slices/productCategory/thunk";
// import { getProducts } from "../../../slices/addProduct/thunk";
// import { getProductPricing } from "../../../slices/productPricing/thunk";
// import { getWalletApi } from "../../../slices/wallet/thunk";
// import SkeletonWrapper from "../../../Components/Common/SkeletonWrapper";
// import AddMoneyModal from "../../../Components/modal/user/user-sub_modal/AddMoneyModal";
// import { useNavigate } from "react-router-dom";
// import classnames from "classnames";

// const UserDashboard = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();

//   const [activeTab, setActiveTab] = useState<string | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [walletRefreshing, setWalletRefreshing] = useState(false);
//   const toggleModal = () => setIsModalOpen(!isModalOpen);

//   const { list: categories, fetchState: { loading: categoryLoading } } = useSelector(
//     (state: RootState) => state.ProductCategory
//   );
//   const { list: products, fetchState: { loading: productLoading } } = useSelector(
//     (state: RootState) => state.AddProduct
//   );
//   const { list: pricingList, fetchState: { loading: pricingLoading } } = useSelector(
//     (state: RootState) => state.ProductPrice
//   );
//   const { wallet, loading: walletLoading, error } = useSelector(
//     (state: RootState) => state.Wallet
//   );

//   const isProductLoading = productLoading || pricingLoading;

//   // Initial data fetch
//   useEffect(() => {
//     dispatch(getWalletApi());
//     dispatch(getProductCategories({ offset: 0, limit: 10 }));
//   }, [dispatch]);

//   useEffect(() => {
//     if (categories.length > 0 && !activeTab) {
//       setActiveTab(categories[0].id);
//     }
//   }, [categories, activeTab]);

//   useEffect(() => {
//     if (activeTab) {
//       dispatch(
//         getProducts({
//           offset: 0,
//           limit: 50,
//           searchValue: "",
//           ProductStatus: "ACTIVE",
//           categoryId: activeTab,
//         })
//       );
//     }
//   }, [dispatch, activeTab]);

//   useEffect(() => {
//     if (products.length > 0) {
//       dispatch(getProductPricing({ offset: 0, limit: 100, searchValue: "" }));
//     }
//   }, [dispatch, products]);

//   const handleWalletRefresh = () => {
//     setWalletRefreshing(true);
//     dispatch(getWalletApi()).finally(() => {
//       setTimeout(() => setWalletRefreshing(false), 1000);
//     });
//   };

//   //  Industry-level product navigation
// const handleExploreClick = (product: any) => {
  
//   navigate(`/services/${product.slug}`, { state: { product } });
//   console.log(product);
// };





//   return (
//     <div className="page-content">
//       <Container fluid>
//         {/* Wallet Card */}
//         <Col lg={12}>
//           <div className="col-md-6 col-xl-4">
//             <div className="card">
//               <div className="card-header bg-light">
//                 <h4 className="card-title text-muted">Nerotix Wallet</h4>
//               </div>
//               <div className="card-body">
//                 {(walletLoading && !walletRefreshing) ? (
//                   <div className="d-flex">
//                     <div className="me-3" style={{ flex: 3 }}>
//                       <SkeletonWrapper type="form" rows={3} columns={1} />
//                     </div>
//                     <div style={{ flex: 2 }}>
//                       <SkeletonWrapper type="form" rows={2} columns={1} />
//                     </div>
//                   </div>
//                 ) : (
//                   <>
//                     {error && <p className="text-danger">{error}</p>}
//                     <div className="d-flex justify-content-between w-100 align-items-center">
//                       <div>
//                         <h5 className="card-text text-muted">Total Balance</h5>
//                         <h5>₹ <span id="totalAmount">{wallet?.total_balance ?? 0}</span></h5>
//                       </div>
//                       <button className="btn btn-outline-secondary ms-auto" onClick={toggleModal}>
//                         ADD MONEY
//                       </button>
//                       <AddMoneyModal isOpen={isModalOpen} toggle={toggleModal} />
//                     </div>
//                     <div className="d-flex justify-content-between w-100 mt-2 mb-0">
//                       <div>
//                         <span className="text-muted" style={{ fontWeight: '600', color: '#333' }}>
//                           Last updated at{" "}<br />
//                           <span id="refresh-date" style={{ fontWeight: '400', color: '#000000' }}>
//                             {wallet?.updated_at
//                               ? new Date(wallet.updated_at).toLocaleString() 
//                               : "N/A"}
//                           </span>
//                         </span>
//                       </div>
//                       <div className="text-center">
//                         <i
//                           style={{ cursor: "pointer" }}
//                           className={classnames(
//                             "la la-refresh text-secondary fs-1",
//                             { "spin-animation": walletRefreshing || walletLoading }
//                           )}
//                           onClick={handleWalletRefresh}
//                         />
//                       </div>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </Col>

//         {/* Products Section */}
//         <Col lg={12}>
//           <div className="mb-2 mt-2">
//             <h4 className="text-bold">All Products</h4>
//             <p className="text-muted">
//               Explore other products that might suit your business needs.
//             </p>
//           </div>
//         </Col>

//         <div className="card bg-light">
//           <div className="card-header">
//             {categoryLoading ? (
//               <SkeletonWrapper type="tabs" rows={2} columns={7} />
//             ) : (
//               <ul className="nav nav-tabs nav-tabs-custom" role="tablist" id="bottom-tab">
//                 {categories.map((tab: any, index: number) => (
//                   <li key={index} className="nav-item product_category" data-id={tab.id} role="presentation">
//                     <button
//                       className={classnames("nav-link", { active: activeTab === tab.id })}
//                       onClick={() => setActiveTab(tab.id)}
//                       type="button"
//                       role="tab"
//                       aria-selected={activeTab === tab.id}
//                     >
//                       {tab.name}
//                     </button>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//           <CardBody>
//             <Row id="product-container">
//               {isProductLoading ? (
//                 <SkeletonWrapper type="card" rows={1} />
//               ) : (
//                 products.map((card: any) => {
//                   const pricing = pricingList.find((p) => p.product_id === card.id);
//                   return (
//                     <Col xxl={3} xl={4} lg={6} className="mb-4" key={card.id}>
//                       <Card className="ribbon-box border shadow-none mb-lg-0">
//                         <CardBody className="text-muted">
//                           <span className="ribbon-three ribbon-three-primary">
//                             <span>
//                               {pricing?.price ? `₹ ${pricing.price}` : "N/A"}
//                             </span>
//                           </span>
//                           <h4 className="card-title mt-4">{card.name}</h4>
//                           <p className="card-text text-muted">{card.description}</p>
//                           {/* ✅ Explore Button with useNavigate */}
                        
//                         </CardBody>
//                       </Card>
//                     </Col>
//                   );
//                 })
//               )}
//             </Row>
//           </CardBody>
//         </div>
//       </Container>
//     </div>
//   );
// };

// export default UserDashboard;
