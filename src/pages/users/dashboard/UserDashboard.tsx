import React, { useState } from "react";
import {
  Container,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Col,
} from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import classnames from "classnames";
import AddMoneyModal from "../../../Components/modal/user/user-sub_modal/AddMoneyModal";

const tabData = [
  { id: "aadhaar-pan", label: "Aadhaar / PAN" },
  { id: "bank-account", label: "Bank Account" },
  { id: "kyb", label: "KYB(Know Your Business)" },
  { id: "digital-kyc", label: "Regulated Digital KYC" },
  { id: "documents", label: "Other Official Documents" },
  { id: "telecom", label: "Telecom Intelligence" },
  { id: "utility", label: "Utility Bills Intelligence" },
];

const productData: Record<
  string,
  { title: string; desc: string; link: string }[]
> = {
  "aadhaar-pan": [
    {
      title: "Aadhaar OKYC",
      desc: "Verify an aadhaar number offline by generating and submitting the OTP.",
      link: "/services/aadhar",
    },
    {
      title: "Aadhaar Masking",
      desc: "Retrieve Aadhaar details with the first 8 digits masked, ensuring data privacy during eKYC verification.",
      link: "/services/aadhar",
    },
    {
      title: "PAN 360",
      desc: "Retrieve every bit of detail from an individual’s PAN information such as masked aadhaar number, address, contact, and more.",
      link: "/services/pan",
    },
    {
      title: "PAN Lite",
      desc: "A crucial tool that helps you verify user identity by ensuring the provided details align with official records.",
      link: "/services/pan",
    },
  ],
  "bank-account": [
    {
      title: "Bank Verification",
      desc: "Validate bank account numbers with IFSC.",
      link: "/services/bank/pennydrop",
    },
  ],
  kyb: [
    {
      title: "Business KYC",
      desc: "Know Your Business – GSTIN, CIN, and more.",
      link: "/services/business-kyc",
    },
  ],
  "digital-kyc": [
    {
      title: "Face Match",
      desc: "Compare two face images for similarity.",
      link: "/services/face-match",
    },
  ],
  documents: [
    {
      title: "Passport OCR",
      desc: "Extract data from passport using OCR.",
      link: "/services/passport-ocr",
    },
  ],
  telecom: [
    {
      title: "Mobile Operator Check",
      desc: "Detect telecom operator of a phone number.",
      link: "/services/mobile-operator-check",
    },
  ],
  utility: [
    {
      title: "Electricity Bill OCR",
      desc: "Extract data from electricity bills.",
      link: "/services/electricity-bill-ocr",
    },
  ],
};

const UserDashboard = () => {
  document.title = "User Dashboard";
  const [activeTab, setActiveTab] = useState("aadhaar-pan");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Col lg={12}>
            <div className="col-md-6 col-xl-4">
              <div className="card">
                <div className="card-header bg-light">
                  <h4 className="card-title text-muted">Nerotix Wallet</h4>
                </div>
                {/*end card-header*/}
                <div className="card-body">
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <div>
                      <h5 className="card-text text-muted">Total Balance</h5>
                      <h5>
                        ₹ <span id="totalAmount">71.68</span>
                      </h5>
                    </div>

                    <button
                      className="btn btn-outline-secondary ms-auto"
                      onClick={toggleModal}
                    >
                      ADD MONEY
                    </button>

                    <AddMoneyModal isOpen={isModalOpen} toggle={toggleModal} />
                  </div>

                  <div className="d-flex justify-content-between w-100 mt-2 mb-0">
                    <div>
                      <span className="text-muted">
                        Last updated at <span id="refresh-date">15:53 PM</span>
                      </span>
                    </div>
                    <div className="text-center">
                      <i
                        style={{ cursor: "pointer" }}
                        id="updateWallet"
                        className="la la-refresh text-secondary progress-icon-spin fs-1"
                      />
                    </div>
                  </div>
                </div>

                {/*end card-body*/}
                <div className="card-footer bg-light-alt m-0">
                  <div className="d-flex justify-content-between w-100">
                    <span className="text-muted card-text">Lien Balance</span>
                    <span className=" card-text">
                      ₹ <span id="lien_balance">30</span>
                    </span>
                  </div>
                  <div className="d-flex justify-content-between w-100 mt-2">
                    <span className="text-muted card-text">
                      Free Balance{" "}
                      <span className="badge bg-danger" id="">
                        Expire{" "}
                      </span>
                    </span>
                    <span className=" card-text">
                      ₹ <span id="free_balance">0.88</span>
                    </span>
                  </div>
                </div>
              </div>
              {/*end card*/}
            </div>
          </Col>
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
              <ul
                className="nav nav-tabs nav-tabs-custom"
                role="tablist"
                id="bottom-tab"
              >
                {tabData.map((tab, index) => (
                  <li
                    key={index}
                    className="nav-item product_category"
                    data-id={index + 1}
                    role="presentation"
                  >
                    <button
                      className={classnames("nav-link", {
                        active: activeTab === tab.id,
                      })}
                      onClick={() => setActiveTab(tab.id)}
                      type="button"
                      role="tab"
                      aria-selected={activeTab === tab.id}
                    >
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <CardBody>
              <Row id="product-container">
                {(productData[activeTab] || []).map((card, index) => (
                  <Col xxl={3} xl={4} lg={6} className="mb-4" key={index}>
                    <Card className="ribbon-box border shadow-none mb-lg-0">
                      <CardBody className="text-muted">
                          <span className="ribbon-three ribbon-three-primary">
                            <span>₹ N/A</span>
                          </span>
                        <h4 className="card-title mt-4">{card.title}</h4>
                        <p className="card-text text-muted">{card.desc}</p>
                        <Button color="primary" outline>
                          <Link to={card.link}>Explore</Link>
                        </Button>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>
            </CardBody>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UserDashboard;