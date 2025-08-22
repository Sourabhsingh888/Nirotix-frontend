import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Row,
  Table,
} from "reactstrap";
import BreadCrumb from "../../../../Components/Common/BreadCrumb";
import AddIPAddressModal from "../../../../Components/modal/user/user-sub_modal/AddIPAddressModal";

const TokenApi = () => {
  document.title = "Token API";

      const [isModalOpen, setIsModalOpen] = useState(false);
      const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Token & IP" pageTitle="Developer API" />
        {/* Webhooks Section */}
        <Card className="mb-4">
          <CardHeader className="border-bottom-dashed">
            <h5 className="fw-bold text-uppercase">Webhooks</h5>
          </CardHeader>
          <CardBody>
            <div className="mb-3 mt-3">
              <label className="form-label">
                Enter Webhook URL{" "}
                <span className="text-danger">(Please don't put (?) mark)</span>
              </label>
              <div className="d-flex gap-2">
                <Input type="text" placeholder="Enter webhook URL" />
                <Button color="primary">Update</Button>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* API KEYS Section */}
        <Card className="mb-4">
          <CardHeader className="d-flex justify-content-between align-items-center border-bottom-dashed mb-3">
            <h5 className="fw-bold text-uppercase mb-0">API Keys</h5>
            <Button color="success" size="sm">
              Re-generate Key
            </Button>
          </CardHeader>
          <CardBody className="pt-0 mt-2">
            <div className="table-responsive">
              <Table className="align-middle table-bordered text-center mb-0">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Token</th>
                    <th>Date & Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2</td>
                    <td className="text-break">
                      dcf53035999425abe455c38152ee5af27601b21e709feeb1e5d7a3eeab3bcc1c
                    </td>
                    <td>
                      29-07-2025 <br />
                      <small className="text-muted">10:54:48 AM</small>
                    </td>
                    <td>
                      <span className="badge bg-light text-danger">
                        Click to Activate
                      </span>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>

        {/* White Listed IP Section */}
        <Card>
          <CardHeader className="d-flex justify-content-between align-items-center border-bottom-dashed mb-3">
            <div>
              <h5 className="fw-bold text-uppercase mb-0">White Listed IP</h5>
              <small className="text-danger">Only 3 IP White Listed</small>
            </div>
            <Button color="info" size="sm" onClick={toggleModal}>
              <i className="ri-add-line align-middle" /> Add IP
            </Button>
          </CardHeader>
          <AddIPAddressModal isOpen={isModalOpen} toggle={toggleModal} />
          <CardBody className="pt-0">
            <div className="table-responsive">
              <Table className="align-middle table-bordered text-center mb-0">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>IP Address</th>
                    <th>Date & Time</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>41</td>
                    <td>103.174.103.54</td>
                    <td>
                      26-05-2025 <br />
                      <small className="text-muted">18:17:00 PM</small>
                    </td>
                    <td>
                      <span className="badge bg-light text-danger">
                        Click to Activate
                      </span>
                    </td>
                    <td>
                      <i className="ri-delete-bin-6-line text-danger" />
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default TokenApi;
