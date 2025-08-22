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
import DTHCustomerInfoModal from "../../../../Components/modal/user/user-sub_modal/DTHCustomerInfoModal";

const DTHCustomerInfo = () => {
  document.title = "DTHCustomerInfo";

    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Breadcrumb */}
          <BreadCrumb
            title="DTH Customer Info"
            pageTitle="Telecom Intelligence"
          />

          {/* Top Banner */}
          <div className="bg-success p-2 rounded">
            <Row className="d-flex justify-content-around p-1">
              <Col md={3} sm={12} className="bg-light-alt text-center">
                <img src={findimg} alt="img" className="img-fluid" />
              </Col>
              <Col md={9} sm={12} className="align-self-center">
                <CardBody className="ms-3">
                  <h2 className="text-white">DTH Connection Information</h2>
                  <p className="text-white mb-0">
                    Instantly retrieve your DTH account details, subscription
                    plans, and billing info with a single lookup
                  </p>
                  <div className="d-flex flex-wrap gap-2 mt-4">
                    <Button color="btn btn-primary" onClick={toggleModal}>
                      Check DTH Info
                    </Button>
                    <Button color="dark">View API Docs</Button>
                  </div>
                </CardBody>
                <DTHCustomerInfoModal
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
                  <h5 className="mb-0">Instant DTH Lookup</h5>
                </CardHeader>
                <CardBody>
                  <p className="mb-0">
                    Quickly access your DTH customer info in seconds. Simple,
                    fast, accurate, and secure.
                  </p>
                </CardBody>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <CardHeader className="border-bottom">
                  <h5 className="mb-0">Secure &amp; Detailed Insights</h5>
                </CardHeader>
                <CardBody>
                  <p className="mb-0">
                    Retrieve subscription plans, recharge history, and more
                    securely through our API, ensuring privacy.
                  </p>
                </CardBody>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <CardHeader className="border-bottom">
                  <h5 className="mb-0">Real-Time DTH Customer Info API</h5>
                </CardHeader>
                <CardBody>
                  <p className="mb-0">
                    Integrate our API to fetch real-time DTH customer details
                    with minimal setup, perfect for providers.
                  </p>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DTHCustomerInfo;
