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
import PanVerifyModal from "../../../../Components/modal/user/user-sub_modal/PanVerifyModal";

const Pan = () => {
  document.title = "PAN KYC";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="PAN KYC" pageTitle="Aadhaar/PAN Services" />

          {/* Top Banner */}
          <div className="bg-success p-2 rounded mb-3">
            <Row className="d-flex justify-content-around p-1">
              <Col md={3} sm={12} className="bg-light-alt text-center">
                <img src={findimg} alt="img" className="img-fluid" />
              </Col>
              <Col md={9} sm={12} className="align-self-center">
                <CardBody className="ms-3">
                  <h2 className="text-white">Verify PAN Instantly</h2>
                  <p className="text-white mb-0">
                    Instantly validate PAN details and confirm identity using
                    our secure and real-time PAN verification API.
                  </p>
                  <div className="d-flex flex-wrap gap-2 mt-4">
                    <Button color="btn btn-primary" onClick={toggleModal}>
                      Verify PAN
                    </Button>
                    <Button color="dark">View API Docs</Button>
                  </div>
                </CardBody>
                <PanVerifyModal isOpen={isModalOpen} toggle={toggleModal} />
              </Col>
            </Row>
          </div>

          {/* Info Cards */}
          <Row className="mt-4">
            <Col md={4}>
              <Card>
                <CardHeader className="border-bottom">
                  <h5 className="mb-0">Instant PAN Verification</h5>
                </CardHeader>
                <CardBody>
                  <p className="mb-0">
                    Validate PAN number and fetch official name and status
                    directly from NSDL database.
                  </p>
                </CardBody>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <CardHeader className="border-bottom">
                  <h5 className="mb-0">KYC Compliance</h5>
                </CardHeader>
                <CardBody>
                  <p className="mb-0">
                    Ensure your customers are KYC compliant using PAN
                    verification as part of your onboarding process.
                  </p>
                </CardBody>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <CardHeader className="border-bottom">
                  <h5 className="mb-0">Secure & Accurate API</h5>
                </CardHeader>
                <CardBody>
                  <p className="mb-0">
                    Our PAN verification API offers real-time, accurate, and
                    secure results with minimal setup.
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
                          <th>PAN</th>
                          <th>Registered Name</th>
                          <th>Type</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan={6}>
                            <div className="py-5">
                              <lord-icon
                                src="https://cdn.lordicon.com/msoeawqm.json"
                                trigger="loop"
                                style={{ width: 75, height: 75 }}
                              />
                              <p className="text-muted mb-0">
                                <strong>
                                  No PAN verification records found
                                </strong>
                              </p>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </Table>

                    <div className="d-flex justify-content-between align-items-center px-2 mt-2">
                      <div className="text-muted">
                        Showing 0 to 0 of 0 entries
                      </div>
                      <div>
                        <ul className="pagination pagination-separated mb-0">
                          <li className="page-item disabled">
                            <span className="page-link">Previous</span>
                          </li>
                          <li className="page-item disabled">
                            <span className="page-link">Next</span>
                          </li>
                        </ul>
                      </div>
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

export default Pan;