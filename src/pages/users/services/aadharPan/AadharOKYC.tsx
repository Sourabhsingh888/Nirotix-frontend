import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Table,
  Button,
} from "reactstrap";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import findimg from "../../../../assets/images/find.png";
import AadharVerifyModal from "../../../../Components/modal/user/user-sub_modal/AadharVerifyModal";

const AadharOKYC = () => {
  document.title = "Aadhar OKYC";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Aadhaar KYC" pageTitle="Aadhaar/PAN Services" />

          {/* Top Banner */}
          <div className="bg-success p-2 rounded mb-3">
            <Row className="d-flex justify-content-around p-1">
              <Col md={3} sm={12} className="bg-light-alt text-center">
                <img src={findimg} alt="img" className="img-fluid" />
              </Col>
              <Col md={9} sm={12} className="align-self-center">
                <CardBody className="ms-3">
                  <h2 className="text-white">Verify Aadhaar Instantly</h2>
                  <p className="text-white mb-0">
                    Perform fast and secure Aadhaar-based KYC verification for
                    identity authentication and onboarding.
                  </p>
                  <div className="d-flex flex-wrap gap-2 mt-4">
                    <Button color="btn btn-primary" onClick={toggleModal}>
                      Verify Aadhaar
                    </Button>
                    <Button color="dark">View API Docs</Button>
                  </div>
                </CardBody>
                <AadharVerifyModal isOpen={isModalOpen} toggle={toggleModal} />
              </Col>
            </Row>
          </div>

          {/* Info Cards */}
          <Row className="mt-4">
            <Col md={4}>
              <Card>
                <CardHeader className="border-bottom">
                  <h5 className="mb-0">Instant Aadhaar Verification</h5>
                </CardHeader>
                <CardBody>
                  <p className="mb-0">
                    Instantly validate user identity using Aadhaar number for
                    seamless customer onboarding.
                  </p>
                </CardBody>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <CardHeader className="border-bottom">
                  <h5 className="mb-0">eKYC via Aadhaar</h5>
                </CardHeader>
                <CardBody>
                  <p className="mb-0">
                    Use Aadhaar OTP-based eKYC to collect verified details like
                    name, DOB, gender, and address.
                  </p>
                </CardBody>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <CardHeader className="border-bottom">
                  <h5 className="mb-0">Secure & Compliant</h5>
                </CardHeader>
                <CardBody>
                  <p className="mb-0">
                    Our Aadhaar KYC API follows UIDAI guidelines ensuring data
                    privacy and compliance.
                  </p>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Card>
            <Row>
              <Col lg={12}>
                <CardBody>
                  <div className="table-responsive">
                    <Table className="table-bordered align-middle text-center">
                      <thead className="table-light">
                        <tr>
                          <th>Verified At</th>
                          <th>Transaction ID</th>
                          <th>Name on Aadhaar</th>
                          <th>Gender</th>
                          <th>Date of Birth</th>
                          <th>State</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan={7}>
                            <div className="py-5">
                              <lord-icon
                                src="https://cdn.lordicon.com/msoeawqm.json"
                                trigger="loop"
                                style={{ width: 75, height: 75 }}
                              />
                              <p className="text-muted mb-0">
                                <strong>
                                  Sorry! No Aadhaar KYC records found
                                </strong>
                              </p>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                    <div className="text-muted text-start px-2">
                      Showing 0 to 0 of 0 entries
                    </div>
                  </div>
                </CardBody>
              </Col>
            </Row>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AadharOKYC;





