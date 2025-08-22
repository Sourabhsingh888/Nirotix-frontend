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
import MobileNoVerifyModal from "../../../../Components/modal/user/user-sub_modal/MobileNoVerifyModal";

const NumberLookup = () => {
  document.title = "Number Lookup";

    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Breadcrumb */}
          <BreadCrumb title="Number Lookup" pageTitle="Telecom Intelligence" />

          {/* Top Banner */}
          <div className="bg-success p-2 rounded">
            <Row className="d-flex justify-content-around p-1">
              <Col md={3} sm={12} className="bg-light-alt text-center">
                <img src={findimg} alt="img" className="img-fluid" />
              </Col>
              <Col md={9} sm={12} className="align-self-center">
                <CardBody className="ms-3">
                  <h2 className="text-white">Lookup Any Phone Number</h2>
                  <p className="text-white mb-0">
                    Instantly fetch the circle and operator of any phone number
                    with our fast and reliable API.
                  </p>
                  <div className="d-flex flex-wrap gap-2 mt-4">
                    <Button color="btn btn-primary" onClick={toggleModal}>
                      Try Number Lookup
                    </Button>
                    <Button color="dark">View API Docs</Button>
                  </div>
                </CardBody>
                <MobileNoVerifyModal
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
                  <h5 className="mb-0">Instant Number Lookup</h5>
                </CardHeader>
                <CardBody>
                  <p className="mb-0">
                    Quickly identify the circle and operator of any phone number
                    in seconds. Simple, fast, accurate, and secure.
                  </p>
                </CardBody>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <CardHeader className="border-bottom">
                  <h5 className="mb-0">Secure &amp; Reliable Data</h5>
                </CardHeader>
                <CardBody>
                  <p className="mb-0">
                    Access trusted telecom data securely through our API,
                    ensuring privacy and accuracy with every lookup.
                  </p>
                </CardBody>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <CardHeader className="border-bottom">
                  <h5 className="mb-0">Real-Time Number Lookup API</h5>
                </CardHeader>
                <CardBody>
                  <p className="mb-0">
                    Integrate our API to get real-time phone number details with
                    minimal setup. Perfect for businesses and developers.
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

export default NumberLookup;
