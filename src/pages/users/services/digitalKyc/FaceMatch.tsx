import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";

const FaceMatch = () => {
      document.title = "Face match";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Face Match" pageTitle="Digital Kyc" />
          <Row>
            <Col>
              <div className="h-100">
                <h1>Face Match</h1>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default FaceMatch