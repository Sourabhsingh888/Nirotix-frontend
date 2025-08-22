import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";

const DashboardPage = () => {
  document.title = "Dashboard";

  const [rightColumn, setRightColumn] = useState(true);
  const toggleRightColumn = () => {
    setRightColumn(!rightColumn);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col>
              <div className="h-100">
                <Row>
                  <h1>DashBoard Page</h1>
                </Row>
                <Row>
                  <Col xl={8}>
                  </Col>
                </Row>
                <Row>
                </Row>
                <Row>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardPage;