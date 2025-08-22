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

const PanToGistin = () => {
    document.title = "Pan To Gistin";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Pan To Gistin" pageTitle="KYB" />
          <Card>
            <Row>
              <Col lg={12}>
                <CardHeader className="d-flex justify-content-between align-items-center border-bottom-dashed">
                  <h5 className="mb-0">Pan To Gistin</h5>
                </CardHeader>
              </Col>
            </Row>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default PanToGistin;
