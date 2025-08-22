import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Table,
  Input,
  Button,
  Label,
} from "reactstrap";
import Select from "react-select";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";

const typeOptions = [
  { label: "All", value: "all" },
  { label: "Credit", value: "credit" },
  { label: "Debit", value: "debit" },
];

const PaymentReport = () => {
  document.title = "Payment Report";

  const [selectedType, setSelectedType] = useState(typeOptions[0]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Payment Report" pageTitle="My Account" />
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center border-bottom-dashed mb-1">
              <h5 className="mb-0">Payment Report</h5>
            </CardHeader>
            <CardBody>
              <Row className="mb-4">
                <Col md={2}>
                  <Label>Start Date</Label>
                  <Input type="date" value="2025-07-29" />
                </Col>
                <Col md={2}>
                  <Label>End Date</Label>
                  <Input type="date" value="2025-07-29" />
                </Col>
                <Col md={2}>
                  <Label>Type</Label>
                  <Select
                    options={typeOptions}
                    value={selectedType}
                    onChange={(selected) => setSelectedType(selected!)}
                    isClearable
                  />
                </Col>
                <Col md={2} className="align-self-end">
                  <Button color="warning" className="btn-block w-100">
                    <i className="ri-filter-3-line me-1" />
                    Filter
                  </Button>
                </Col>
              </Row>

              <div className="table-responsive">
                <Table className="table-bordered align-middle text-center">
                  <thead className="table-light">
                    <tr>
                      <th>Txn Id</th>
                      <th>DR / CR</th>
                      <th>Date & Time</th>
                      <th>Opening Balance</th>
                      <th>Amount (₹)</th>
                      <th>GST</th>
                      <th>Total</th>
                      <th>Closing Balance</th>
                      <th>Payment Mode</th>
                      <th>UTR No</th>
                      <th>Remark</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={11}>
                        <div className="py-5">
                          <lord-icon
                            src="https://cdn.lordicon.com/msoeawqm.json"
                            trigger="loop"
                            style={{ width: 75, height: 75 }}
                          />
                          <p className="text-muted mb-0">
                            <strong>Sorry! No Result Found</strong>
                          </p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>

                <div className="text-muted text-start px-2">
                  Showing 0 to 0 of 0 entries
                </div>

                <div className="d-flex justify-content-end mt-2">
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

export default PaymentReport;