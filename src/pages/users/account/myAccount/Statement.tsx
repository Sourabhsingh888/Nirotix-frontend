import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Table,
  Input,
  Button,
  Label,
} from "reactstrap";
import Select from "react-select";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";

const productCategoryOptions = [
  { label: "All", value: "all" },
  { label: "Recharge", value: "recharge" },
  { label: "KYC", value: "kyc" },
];

const productsOptions = [
  { label: "Select Products", value: "" },
  { label: "Aadhar", value: "aadhar" },
  { label: "Pan", value: "pan" },
];

const searchByOptions = [
  { label: "Select By", value: "" },
  { label: "Transaction ID", value: "txn" },
  { label: "Amount", value: "amount" },
];

const creditDebitOptions = [
  { label: "All", value: "all" },
  { label: "Credit", value: "credit" },
  { label: "Debit", value: "debit" },
];

const Statement = () => {
  document.title = "Statement";

  const [productCategory, setProductCategory] = useState(
    productCategoryOptions[0]
  );
  const [product, setProduct] = useState(productsOptions[0]);
  const [searchBy, setSearchBy] = useState(searchByOptions[0]);
  const [creditDebit, setCreditDebit] = useState(creditDebitOptions[0]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="StateMent" pageTitle="My Account" />
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center border-bottom-dashed mb-1">
              <h5 className="mb-0">Statement</h5>
            </CardHeader>
            <CardBody>
              <Row className="mb-3">
                <Col md={3}>
                  <Label>Start Date</Label>
                  <Input type="date" value="2025-07-29" />
                </Col>
                <Col md={3}>
                  <Label>End Date</Label>
                  <Input type="date" value="2025-07-29" />
                </Col>
                <Col md={3}>
                  <Label>Product Category</Label>
                  <Select
                    options={productCategoryOptions}
                    value={productCategory}
                    onChange={(selected) => setProductCategory(selected!)}
                    isClearable
                  />
                </Col>
                <Col md={3}>
                  <Label>Products</Label>
                  <Select
                    options={productsOptions}
                    value={product}
                    onChange={(selected) => setProduct(selected!)}
                    isClearable
                  />
                </Col>
              </Row>

              <Row className="mb-4">
                <Col md={3}>
                  <Label>Search By</Label>
                  <Select
                    options={searchByOptions}
                    value={searchBy}
                    onChange={(selected) => setSearchBy(selected!)}
                    isClearable
                  />
                </Col>
                <Col md={3}>
                  <Label>Enter Value</Label>
                  <Input placeholder="Enter Value" />
                </Col>
                <Col md={3}>
                  <Label>Credit / Debit</Label>
                  <Select
                    options={creditDebitOptions}
                    value={creditDebit}
                    onChange={(selected) => setCreditDebit(selected!)}
                    isClearable
                  />
                </Col>
                <Col md={3} className="align-self-end">
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
                      <th>Status</th>
                      <th>Txn ID</th>
                      <th>Date & Time</th>
                      <th>Description</th>
                      <th>Net Amount</th>
                      <th>Credit / Debit</th>
                      <th>Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={7}>
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

export default Statement;