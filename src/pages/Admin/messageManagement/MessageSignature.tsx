import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
} from "reactstrap";
import Select from "react-select";
import { toast} from "react-toastify";
import BreadCrumb from "../../../Components/Common/BreadCrumb";

const statusOptions = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
];

const MessageSignature = () => {
  document.title = "Message Signature";

  const [smsSignature, setSmsSignature] = useState(
    "*Team,*\n*Redpay*\n*Have a Good Day*"
  );
  const [whatsappSignature, setWhatsappSignature] = useState(
    "*Team,*\n*Redpay*\n*Have a Good Day*"
  );
  const [smsStatus, setSmsStatus] = useState(statusOptions[0]);
  const [whatsappStatus, setWhatsappStatus] = useState(statusOptions[0]);

  const handleUpdate = () => {
    const payload = {
      smsSignature,
      whatsappSignature,
      smsStatus: smsStatus?.value,
      whatsappStatus: whatsappStatus?.value,
    };
    console.log("Updated Signature Payload:", payload);
    // You can call API here
    toast.success("Signature updated successfully!");
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb
            title="Message Signature"
            pageTitle="Message Management"
          />
          <Card>
            <CardHeader className="border-bottom-dashed">
              <h5 className="card-title mb-0">Message Signature</h5>
            </CardHeader>
            <CardBody>
              <Row className="g-4">
                <Col md={6}>
                  <Label className="form-label fw-bold">SMS Signature</Label>
                  <Input
                    type="textarea"
                    rows="5"
                    value={smsSignature}
                    onChange={(e) => setSmsSignature(e.target.value)}
                  />
                  <Select
                    className="mt-2"
                    value={smsStatus}
                    onChange={(option) => setSmsStatus(option)}
                    options={statusOptions}
                    placeholder="Status"
                    isClearable
                  />
                </Col>
                <Col md={6}>
                  <Label className="form-label fw-bold">
                    Whatsapp Signature
                  </Label>
                  <Input
                    type="textarea"
                    rows="5"
                    value={whatsappSignature}
                    onChange={(e) => setWhatsappSignature(e.target.value)}
                  />
                  <Select
                    className="mt-2"
                    value={whatsappStatus}
                    onChange={(option) => setWhatsappStatus(option)}
                    options={statusOptions}
                    placeholder="Status"
                    isClearable
                  />
                </Col>
              </Row>

              <div className="text-center mt-4">
                <Button color="success" onClick={handleUpdate}>
                  Update Signature
                </Button>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default MessageSignature;