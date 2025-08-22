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
import PrepaidTariffPlansModal from "../../../../Components/modal/user/user-sub_modal/PrepaidTariffPlansModal";

const PrepaidTariffPlans = () => {
  document.title = "Prepaid Tariff Plans";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Breadcrumb */}
          <BreadCrumb
            title="Prepaid Tariff Plans"
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
                    Discover the Best Prepaid Tariff Plans
                  </h2>
                  <p className="text-white mb-0">
                    Compare and choose the perfect prepaid plan for your mobile
                    number with real-time data, calls, and OTT benefits.
                  </p>
                  <div className="d-flex flex-wrap gap-2 mt-4">
                    <Button color="btn btn-primary" onClick={toggleModal}>
                      Find Your Plan
                    </Button>
                    <Button color="dark">View API Docs</Button>
                  </div>
                </CardBody>
                <PrepaidTariffPlansModal
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
                  <h5 className="mb-0">Instant Plan Comparison</h5>
                </CardHeader>
                <CardBody>
                  <p className="mb-0">
                    Quickly compare prepaid tariff plans from top operators in
                    seconds. Simple, fast, and accurate.
                  </p>
                </CardBody>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <CardHeader className="border-bottom">
                  <h5 className="mb-0">Tailored Recommendations</h5>
                </CardHeader>
                <CardBody>
                  <p className="mb-0">
                    Get personalized prepaid plans based on your usage, with
                    exclusive offers and OTT subscriptions included.
                  </p>
                </CardBody>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <CardHeader className="border-bottom">
                  <h5 className="mb-0">Real-Time Tariff Plans API</h5>
                </CardHeader>
                <CardBody>
                  <p className="mb-0">
                    Integrate our API to access up-to-date prepaid tariff plans
                    for any mobile number with minimal setup.
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

export default PrepaidTariffPlans;
