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
import GSTIN_NoVerifyModal from "../../../../Components/modal/user/user-sub_modal/GSTIN_NoVerifyModal";

const Gstin = () => {
  document.title = "GSTIN Verification";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="GSTIN Verification" pageTitle="KYB" />

          {/* Top Banner */}
          <div className="bg-success p-2 rounded mb-3">
            <Row className="d-flex justify-content-around p-1">
              <Col md={3} sm={12} className="bg-light-alt text-center">
                <img src={findimg} alt="img" className="img-fluid" />
              </Col>
              <Col md={9} sm={12} className="align-self-center">
                <CardBody className="ms-3">
                  <h2 className="text-white">Verify GSTIN Instantly</h2>
                  <p className="text-white mb-0">
                    Quickly validate GSTIN numbers and retrieve official
                    business details using our accurate and secure API.
                  </p>
                  <div className="d-flex flex-wrap gap-2 mt-4">
                    <Button color="btn btn-primary" onClick={toggleModal}>
                      Verify GSTIN
                    </Button>
                    <Button color="dark">View API Docs</Button>
                  </div>
                </CardBody>
                <GSTIN_NoVerifyModal
                  isOpen={isModalOpen}
                  toggle={toggleModal}
                />
              </Col>
            </Row>
          </div>

          {/* Info Cards */}
          <Row className="mt-4">
            <Col md={4}>
              <Card>
                <CardHeader className="border-bottom">
                  <h5 className="mb-0">Instant GSTIN Verification</h5>
                </CardHeader>
                <CardBody>
                  <p className="mb-0">
                    Instantly verify GST numbers and fetch business legal name,
                    status, and taxpayer type from the GSTN database.
                  </p>
                </CardBody>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <CardHeader className="border-bottom">
                  <h5 className="mb-0">KYB Compliance</h5>
                </CardHeader>
                <CardBody>
                  <p className="mb-0">
                    Ensure business compliance and legitimacy as part of your
                    Know Your Business (KYB) process with GSTIN verification.
                  </p>
                </CardBody>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <CardHeader className="border-bottom">
                  <h5 className="mb-0">Accurate & Secure API</h5>
                </CardHeader>
                <CardBody>
                  <p className="mb-0">
                    Use our robust API to validate GSTINs with secure, real-time
                    responses and minimal integration effort.
                  </p>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Verification Table */}
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
                          <th>GSTIN</th>
                          <th>Name of Business</th>
                          <th>Legal Name of Business</th>
                          <th>Tax Payer Type</th>
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
                                  No GSTIN verification records found
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

export default Gstin;