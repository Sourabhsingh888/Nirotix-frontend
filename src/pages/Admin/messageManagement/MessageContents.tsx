import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { toast} from "react-toastify";
import AddMsgContentModal from "../../../Components/modal/admin/admin-sub_modal/AddMsgContentModal";

const MessageContent = () => {
  document.title = "Message Content";

  const [contentData, setContentData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const itemsPerPage = 4;

  const totalPages = Math.ceil(contentData.length / itemsPerPage);
  const paginatedData = contentData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

const handleToggle = (id: number, key: string) => {
  setContentData((prev) =>
    prev.map((item) => (item.id === id ? { ...item, [key]: !item[key] } : item))
  );

  toast.success("Status Updated successfully", {
    toastId: `status-updated-${id}-${key}`,
    autoClose: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    closeButton: true,
  });
};


  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Message Content" pageTitle="MSG Management" />
          <Card>
            <CardHeader className="d-flex justify-content-between align-items-center border-bottom-dashed">
              <h5 className="card-title mb-0">Message Content</h5>
              <Button color="success" onClick={toggleModal}>
                <i className="ri-add-line me-1"></i> Add Content
              </Button>
            </CardHeader>

            <CardBody>
              <div className="table-responsive">
                <Table className="align-middle table-nowrap mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Type</th>
                      <th>Send SMS</th>
                      <th>Send Whatsapp</th>
                      <th>Send Email</th>
                      <th>Send Notification</th>
                      <th>Content</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.type}</td>
                        <td>
                          <div className="form-check form-switch">
                            <input
                              className={`form-check-input ${
                                item.sms ? "bg-success border-success" : ""
                              }`}
                              type="checkbox"
                              checked={item.sms}
                              onChange={() => handleToggle(item.id, "sms")}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="form-check form-switch">
                            <input
                              className={`form-check-input ${
                                item.whatsapp
                                  ? "bg-success border-success"
                                  : ""
                              }`}
                              type="checkbox"
                              checked={item.whatsapp}
                              onChange={() => handleToggle(item.id, "whatsapp")}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="form-check form-switch">
                            <input
                              className={`form-check-input ${
                                item.email
                                  ? "bg-success border-success"
                                  : ""
                              }`}
                              type="checkbox"
                              checked={item.email}
                              onChange={() => handleToggle(item.id, "email")}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="form-check form-switch">
                            <input
                              className={`form-check-input ${
                                item.notification
                                  ? "bg-success border-success"
                                  : ""
                              }`}
                              type="checkbox"
                              checked={item.notification}
                              onChange={() =>
                                handleToggle(item.id, "notification")
                              }
                            />
                          </div>
                        </td>
                        <td>
                          <Button color="primary" size="sm">
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              <AddMsgContentModal
                isOpen={isModalOpen}
                toggle={setIsModalOpen}
              />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <span>
                    Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                    {(currentPage - 1) * itemsPerPage + paginatedData.length} of{" "}
                    {contentData.length} records
                  </span>
                  <Pagination>
                    <PaginationItem disabled={currentPage === 1}>
                      <PaginationLink
                        previous
                        onClick={() => handlePageChange(currentPage - 1)}
                      />
                    </PaginationItem>

                    {[...Array(totalPages)].map((_, idx) => (
                      <PaginationItem
                        key={idx}
                        active={currentPage === idx + 1}
                      >
                        <PaginationLink
                          onClick={() => handlePageChange(idx + 1)}
                        >
                          {idx + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem disabled={currentPage === totalPages}>
                      <PaginationLink
                        next
                        onClick={() => handlePageChange(currentPage + 1)}
                      />
                    </PaginationItem>
                  </Pagination>
                </div>
              )}
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

const initialData = [
  {
    id: 5,
    type: "Verification OTP",
    sms: true,
    whatsapp: true,
    email: false,
    notification: false,
  },
  {
    id: 4,
    type: "Verification OTP",
    sms: true,
    whatsapp: true,
    email: false,
    notification: false,
  },
  {
    id: 3,
    type: "Login OTP",
    sms: true,
    whatsapp: true,
    email: false,
    notification: false,
  },
  {
    id: 2,
    type: "Token OTP",
    sms: true,
    whatsapp: true,
    email: false,
    notification: false,
  },
  {
    id: 1,
    type: "IP OTP",
    sms: true,
    whatsapp: true,
    email: false,
    notification: false,
  },
  // Add more items if you want to test multi-page
];

export default MessageContent;
