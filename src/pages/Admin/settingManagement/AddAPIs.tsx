import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Table,
  Badge,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import Select from "react-select";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import AddApiModal from "../../../Components/modal/admin/admin-sub_modal/AddApiModal";

const MessageAPIPage = () => {
  document.title = "Add APIs";

  const [currentPage, setCurrentPage] = useState(1);
  const [ajaxSelect, setAjaxSelect] = useState(null);
  const [apiTypeSelect, setApiTypeSelect] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const itemsPerPage = 5;

  const filteredData = messageApiData.filter((item) => {
    const matchStatus =
      !ajaxSelect ||
      ajaxSelect.value === "All" ||
      item.status === ajaxSelect.value;
    const matchApiType =
      !apiTypeSelect ||
      apiTypeSelect.value === "All" ||
      item.type === apiTypeSelect.value;
    const matchSearch =
      !searchValue ||
      item.name.toLowerCase().includes(searchValue.toLowerCase());
    return matchStatus && matchApiType && matchSearch;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Add APIs" pageTitle="Setting Management" />

          <Card>
            <CardHeader className="border-bottom-dashed">
              <h5 className="card-title mb-0">Add APIs</h5>
            </CardHeader>
            <CardBody className="border-bottom border-bottom-dashed">
              <Row className="g-3">
                <Col md={4}>
                  <label>API Status</label>
                  <Select
                    value={ajaxSelect}
                    onChange={(option) => setAjaxSelect(option)}
                    options={statusOptions}
                    placeholder="Select Status"
                    isClearable
                    isSearchable
                  />
                </Col>

                <Col md={4}>
                  <label>Search by API Name</label>
                  <Input
                    type="text"
                    placeholder="Search Value"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </Col>

                <Col md={4} className="d-flex align-items-end gap-2">
                  <Button color="success" onClick={toggleModal} block>
                    <i className="ri-add-line me-1"></i> Add API
                  </Button>
                </Col>
              </Row>
            </CardBody>
            <AddApiModal isOpen={isModalOpen} toggle={setIsModalOpen} />
            <CardBody>
              <div className="table-responsive">
                <Table className="align-middle table-nowrap mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>API Name</th>
                      <th>API Balance</th>
                      <th>Create Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.length > 0 ? (
                      paginatedData.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>
                            <b>{item.apiName}</b>
                          </td>
                          <td>{item.apiBalance}</td>
                          <td>{item.createdAt}</td>
                          <td>
                            <Badge
                              color={
                                item.status === "Active"
                                  ? "success"
                                  : "secondary"
                              }
                              pill
                            >
                              {item.status.toUpperCase()}
                            </Badge>
                          </td>
                          <td>
                            <Button color="primary" size="sm" className="me-2">
                              <i className="ri-pencil-line me-1"></i> Edit
                            </Button>
                            <Button color="danger" size="sm" className="me-2">
                              <i className="ri-delete-bin-6-line me-1"></i>{" "}
                              Remove
                            </Button>
                            <Button color="secondary" size="sm">
                              <i className="ri-key-line align-bottom me-1" />
                              Auth Keys
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center py-4">
                          <h5>No data found</h5>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>

              {totalPages > 1 && (
                <div className="d-flex justify-content-end mt-3">
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

// Dummy Data
const messageApiData = [
  {
    id: 1,
    apiName: "Msg91",
    status: "Active",
    apiBalance: "₹ 3,042.00",
    createdAt: "2024-12-20",
  },
  {
    id: 2,
    apiName: "TextLocal",
    status: "Inactive",
    apiBalance: "₹ 0.00",
    createdAt: "2023-09-05",
  },
  {
    id: 3,
    apiName: "Twilio",
    status: "Active",
    apiBalance: "₹ 1,227.50",
    createdAt: "2024-01-10",
  },
  {
    id: 4,
    apiName: "Kaleyra",
    status: "Active",
    apiBalance: "₹ 5,325.75",
    createdAt: "2022-11-18",
  },
  {
    id: 5,
    apiName: "Gupshup",
    status: "Inactive",
    apiBalance: "₹ 0.00",
    createdAt: "2024-04-08",
  },
  {
    id: 6,
    apiName: "Aakash SMS",
    status: "Active",
    apiBalance: "₹ 726.90",
    createdAt: "2024-06-14",
  },
];

const statusOptions = [
  { value: "All", label: "All" },
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

export default MessageAPIPage;
