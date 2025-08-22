import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import Select from "react-select";
import { toast} from "react-toastify";

const userTypes = [
  { label: "All Users", value: "all" },
  { label: "Retailers", value: "retailers" },
  { label: "Distributors", value: "distributors" },
];

const SendMessage = () => {
  document.title = "Send Message";

  const [messageFrom, setMessageFrom] = useState("");
  const [userType, setUserType] = useState(userTypes[0]);
  const [statusFilter, setStatusFilter] = useState({
    active: true,
    inactive: false,
  });
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSend = () => {
    if (!messageFrom || !message || !userType) {
      toast.error("Please fill all required fields.");
      return;
    }

    const formPayload = {
      messageFrom,
      userType: userType.value,
      statusFilter,
      message,
      fileName: file?.name || "No File",
    };

    console.log("Sending message with:", formPayload);
    toast.success("Message sent successfully!");
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Send Message" pageTitle="MSG Management" />
          <Card>
            <CardHeader className="border-bottom-dashed">
              <h5 className="card-title mb-0">Message Send</h5>
            </CardHeader>
            <CardBody>
              <Row className="g-4">
                {/* Top Filters Section */}
                <Col md={12}>
                  {/* Send Message From */}
                  <div className="mb-2">
                    <Label className="fw-semibold mb-2">
                      Send Message From <span className="text-danger">*</span>:
                    </Label>
                    <div className="d-flex gap-4 mt-1 checkbox-success">
                      <div className="form-check">
                        <Input
                          className="form-check-input"
                          type="radio"
                          id="sms"
                          name="messageFrom"
                          value="sms"
                          checked={messageFrom === "sms"}
                          onChange={(e) => setMessageFrom(e.target.value)}
                        />
                        <Label htmlFor="sms" className="form-check-label ms-1">
                          SMS
                        </Label>
                      </div>
                      <div className="form-check checkbox-success">
                        <Input
                          className="form-check-input"
                          type="radio"
                          id="whatsapp"
                          name="messageFrom"
                          value="whatsapp"
                          checked={messageFrom === "whatsapp"}
                          onChange={(e) => setMessageFrom(e.target.value)}
                        />
                        <Label
                          htmlFor="whatsapp"
                          className="form-check-label ms-1"
                        >
                          Whatsapp
                        </Label>
                      </div>
                    </div>
                  </div>

                  {/* User Type & Status in one row */}
                  <Row className="g-3">
                    <Col md={4}>
                      <FormGroup>
                        <Label>
                          Select User Type{" "}
                          <span className="text-danger">*</span>
                        </Label>
                        <Select
                          options={userTypes}
                          value={userType}
                          onChange={(option) => setUserType(option)}
                          placeholder="Select User Type"
                        />
                      </FormGroup>
                    </Col>

                    <Col md={6}>
                      <FormGroup>
                        <Label>
                          Select User's Status{" "}
                          <span className="text-danger">*</span>
                        </Label>
                        <div className="d-flex gap-3 align-items-center mt-1">
                          <div className="form-check checkbox-success">
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              id="active"
                              checked={statusFilter.active}
                              onChange={() =>
                                setStatusFilter({
                                  ...statusFilter,
                                  active: !statusFilter.active,
                                })
                              }
                            />
                            <Label
                              className="form-check-label"
                              htmlFor="active"
                            >
                              Active
                            </Label>
                          </div>
                          <div className="form-check checkbox-success">
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              id="inactive"
                              checked={statusFilter.inactive}
                              onChange={() =>
                                setStatusFilter({
                                  ...statusFilter,
                                  inactive: !statusFilter.inactive,
                                })
                              }
                            />
                            <Label
                              className="form-check-label"
                              htmlFor="inactive"
                            >
                              Inactive
                            </Label>
                          </div>
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>

                {/* Message and Table Side-by-Side */}
                <Col md={6}>
                  <FormGroup>
                    <Label className="fw-semibold">
                      Message <span className="text-danger">*</span>
                    </Label>
                    <Input
                      type="textarea"
                      rows="5"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Enter your message"
                    />
                  </FormGroup>

                  <FormGroup className="mt-2">
                    <Label className="fw-semibold">Choose File</Label>
                    <Input
                      type="file"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <Label className="fw-semibold">Select Keyword</Label>
                  <div className="table-responsive mt-2">
                    <table className="table table-bordered">
                      <thead className="table-light">
                        <tr>
                          <th>Keyword</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-pink">[FULL_NAME]</td>
                          <td>Full name of the user</td>
                        </tr>
                        <tr>
                          <td className="text-pink">[COMPANY_NAME]</td>
                          <td>Name of the company/shop</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Col>

                {/* Send Button Full Width Below */}
                <Col md={12}>
                  <Button color="success" onClick={handleSend}>
                    Send Message <i className="ri-send-plane-2-line me-1"></i>
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default SendMessage;

