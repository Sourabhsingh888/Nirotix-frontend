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
import SpecialOfferCheckModal from "../../../../Components/modal/user/user-sub_modal/SpecialOfferCheckModal";
const SpecialOffercheck = () => {
  document.title = "Special Offer check";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Breadcrumb */}
          <BreadCrumb
            title="Special Offer check"
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
                  <h2 className="text-white">
                    Check Special Offers for Your Mobile Number
                  </h2>
                  <p className="text-white mb-0">
                    Instantly discover exclusive offers and deals tailored for
                    your mobile number with a quick lookup.
                  </p>
                  <div className="d-flex flex-wrap gap-2 mt-4">
                    <Button color="btn btn-primary" onClick={toggleModal}>
                      Check Offer Now
                    </Button>
                    <Button color="dark">View API Docs</Button>
                  </div>
                </CardBody>
                <SpecialOfferCheckModal
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
                  <h5 className="mb-0">Instant Offer Lookup</h5>
                </CardHeader>
                <CardBody>
                  <p className="mb-0">
                    Quickly check special offers for your mobile number in
                    seconds. Simple, fast, and accurate.
                  </p>
                </CardBody>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <CardHeader className="border-bottom">
                  <h5 className="mb-0">Personalized &amp; Secure</h5>
                </CardHeader>
                <CardBody>
                  <p className="mb-0">
                    Access tailored deals securely through our API, ensuring
                    your privacy with every lookup.
                  </p>
                </CardBody>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <CardHeader className="border-bottom">
                  <h5 className="mb-0">Real-Time Offers API</h5>
                </CardHeader>
                <CardBody>
                  <p className="mb-0">
                    Integrate our API to fetch real-time offer details for any
                    mobile number with minimal setup.
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

export default SpecialOffercheck;
