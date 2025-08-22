import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Table,
} from "reactstrap";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import findimg from "../../../../assets/images/find.png";
import BankAccountNoVerifyModal from "../../../../Components/modal/user/user-sub_modal/BankAccountNoVerifyModal";

const BankVerification = () => {
  document.title = "Penny Drop";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Breadcrumb */}
          <BreadCrumb title="Penny Drop" pageTitle="Bank Account" />

          {/* Top Banner */}
          <div className="bg-success p-2 rounded">
            <Row className="d-flex justify-content-around p-1">
              <Col md={3} sm={12} className="bg-light-alt text-center">
                <img src={findimg} alt="img" className="img-fluid" />
              </Col>
              <Col md={9} sm={12} className="align-self-center">
                <CardBody className="ms-3">
                  <h2 className="text-white">Verify your bank account</h2>
                  <p className="text-white mb-0">
                    Instantly verify your bank details by receiving a small test
                    deposit.
                    <br />
                    This ensures the account is active and correctly linked.
                  </p>
                  <div className="d-flex flex-wrap gap-2 mt-4">
                    <Button color="btn btn-primary" onClick={toggleModal}>
                      Verify Bank Account
                    </Button>
                    <Button color="dark">View API Docs</Button>
                  </div>
                </CardBody>
                <BankAccountNoVerifyModal
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
                  <h5 className="mb-0">Instant Bank Account Verification</h5>
                </CardHeader>
                <CardBody>
                  <p className="mb-0">
                    Easily confirm if a bank account is active by sending a
                    small test deposit. Quick, accurate, and hassle-free.
                  </p>
                </CardBody>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <CardHeader className="border-bottom">
                  <h5 className="mb-0">Secure &amp; Seamless Verification</h5>
                </CardHeader>
                <CardBody>
                  <p className="mb-0">
                    Authenticate user bank accounts instantly and securely using
                    our automated penny drop system — privacy assured.
                  </p>
                </CardBody>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <CardHeader className="border-bottom">
                  <h5 className="mb-0">Real-Time Bank Verification API</h5>
                </CardHeader>
                <CardBody>
                  <p className="mb-0">
                    Integrate our API to verify bank accounts instantly via
                    penny drop. Get accurate, real-time responses with minimal
                    setup.
                  </p>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Verification Report Table */}
          <Card className="mt-4">
            <CardHeader className="border-bottom-dashed">
              <h5 className="mb-0">Verification Report</h5>
            </CardHeader>
            <CardBody>
              <div className="table-responsive">
                <Table className="table-bordered align-middle text-center">
                  <thead className="table-light">
                    <tr>
                      <th>Verified At</th>
                      <th>Transaction ID</th>
                      <th>Bank A/c No.</th>
                      <th>IFSC</th>
                      <th>Name at Bank</th>
                      <th>Account Status</th>
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
                          <p className="text-muted mt-2 mb-0">
                            <strong>Sorry! No Result Found</strong>
                          </p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <div className="d-flex justify-content-between mt-2 px-2">
                  <div className="text-muted">Showing 0 to 0 of 0 entries</div>
                  <ul className="pagination mb-0">
                    <li className="page-item disabled">
                      <span className="page-link">Previous</span>
                    </li>
                    <li className="page-item disabled">
                      <span className="page-link">Next</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default BankVerification;
