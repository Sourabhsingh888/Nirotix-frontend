import React from "react";
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

const CinMcaLookup = () => {
  document.title = "Cin/Mca Lookup";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Cin Mca Lookup" pageTitle="KYB" />
          <Card>
            <Row>
              <Col lg={12}>
                <CardHeader className="d-flex justify-content-between align-items-center border-bottom-dashed">
                  <h5 className="mb-0">Cin Mca Lookup</h5>
                </CardHeader>
              </Col>
            </Row>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CinMcaLookup;
