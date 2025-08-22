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
import AddMsgApiModal from "../../../Components/modal/admin/admin-sub_modal/AddMsgApiModal";

// Interface for API Data
interface ApiDataItem {
  id: number;
  name: string;
  method: string;
  date: string;
  type: string;
  status: "Active" | "Inactive";
}

const MessageAPIPage: React.FC = () => {
  document.title = "Message API";
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [statusFilter, setStatusFilter] = useState<{
    value: string;
    label: string;
  }>(statusOptions[0]);
  const [apiTypeFilter, setApiTypeFilter] = useState<{
    value: string;
    label: string;
  }>(apiTypeOptions[0]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const itemsPerPage = 5;

  // Filter logic
  const filteredData = apiData.filter((item) => {
    const matchesStatus =
      !statusFilter ||
      statusFilter.value === "All" ||
      item.status === statusFilter.value;
    const matchesType =
      !apiTypeFilter ||
      apiTypeFilter.value === "All" ||
      item.type === apiTypeFilter.value;
    const matchesSearch =
      !searchValue ||
      item.name.toLowerCase().includes(searchValue.toLowerCase());

    return matchesStatus && matchesType && matchesSearch;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Message API" pageTitle="Settings" />
          <Card>
            <CardHeader className="border-bottom-dashed">
              <h5 className="card-title mb-0">Message API List</h5>
            </CardHeader>

            <CardBody className="border-bottom border-bottom-dashed">
              <Row className="g-3">
                <Col md={3}>
                  <label>Filter By Api Type</label>
                  <Select
                    value={apiTypeFilter}
                    onChange={setApiTypeFilter}
                    options={apiTypeOptions}
                    isClearable
                    placeholder="Select Type"
                  />
                </Col>
                <Col md={3}>
                  <label>Api Status</label>
                  <Select
                    value={statusFilter}
                    onChange={setStatusFilter}
                    options={statusOptions}
                    isClearable
                    placeholder="Select Status"
                  />
                </Col>
                <Col md={3}>
                  <label>Search by name</label>
                  <Input
                    type="search"
                    placeholder="Search..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </Col>
                <Col md={3} className="d-flex align-items-end gap-2">
                  <Button color="warning" block>
                    <i className="ri-equalizer-fill me-1"></i> Filter
                  </Button>
                  <Button color="primary" block onClick={toggleModal}>
                    Add API
                  </Button>
                </Col>
              </Row>
            </CardBody>
            <AddMsgApiModal isOpen={isModalOpen} toggle={setIsModalOpen} />

            <CardBody>
              <div className="table-responsive">
                <Table className="align-middle table-nowrap mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Api Name</th>
                      <th>Api Type</th>
                      <th>Method</th>
                      <th>Status</th>
                      <th>Create Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((item, index) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>
                          <b>{item.name}</b>
                        </td>
                        <td>{item.type}</td>
                        <td>{item.method}</td>
                        <td>
                          <Badge
                            color={
                              item.status === "Active" ? "success" : "danger"
                            }
                            pill
                          >
                            {item.status}
                          </Badge>
                        </td>
                        <td>{item.date}</td>
                        <td>
                          <Button color="primary" size="sm" className="me-2">
                            <i className="ri-pencil-line me-1"></i> Edit
                          </Button>
                          <Button color="danger" size="sm">
                            <i className="ri-delete-bin-6-line me-1"></i> Delete
                          </Button>
                        </td>
                      </tr>
                    ))}

                    {paginatedData.length === 0 && (
                      <tr>
                        <td colSpan={7} className="text-center py-5">
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

// Sample data
const apiData: ApiDataItem[] = [
  {
    id: 10,
    name: "ROXINDIA1",
    type: "SMS",
    method: "GET",
    status: "Inactive",
    date: "03-04-2025\n16:44:20 PM",
  },
  {
    id: 9,
    name: "ROXINDIA",
    type: "Whatsapp",
    method: "GET",
    status: "Active",
    date: "03-04-2025\n12:33:00 PM",
  },
  {
    id: 8,
    name: "ROXINDIA1",
    type: "SMS",
    method: "GET",
    status: "Inactive",
    date: "03-04-2025\n16:44:20 PM",
  },
  {
    id: 7,
    name: "ROXINDIA",
    type: "Whatsapp",
    method: "GET",
    status: "Active",
    date: "03-04-2025\n12:33:00 PM",
  },
  {
    id: 6,
    name: "ROXINDIA1",
    type: "SMS",
    method: "GET",
    status: "Inactive",
    date: "03-04-2025\n16:44:20 PM",
  },
  {
    id: 5,
    name: "ROXINDIA",
    type: "Whatsapp",
    method: "GET",
    status: "Active",
    date: "03-04-2025\n12:33:00 PM",
  },
  {
    id: 4,
    name: "ROXINDIA1",
    type: "SMS",
    method: "GET",
    status: "Inactive",
    date: "03-04-2025\n16:44:20 PM",
  },
  {
    id: 3,
    name: "ROXINDIA",
    type: "Whatsapp",
    method: "GET",
    status: "Active",
    date: "03-04-2025\n12:33:00 PM",
  },
  {
    id: 2,
    name: "ROXINDIA1",
    type: "SMS",
    method: "GET",
    status: "Inactive",
    date: "03-04-2025\n16:44:20 PM",
  },
  {
    id: 1,
    name: "ROXINDIA",
    type: "Whatsapp",
    method: "GET",
    status: "Active",
    date: "03-04-2025\n12:33:00 PM",
  },
];

// Type options
const apiTypeOptions = [
  { value: "All", label: "All Types" },
  { value: "SMS", label: "SMS" },
  { value: "WhatsApp", label: "WhatsApp" },
];

const statusOptions = [
  { value: "All", label: "All Status" },
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

export default MessageAPIPage;
