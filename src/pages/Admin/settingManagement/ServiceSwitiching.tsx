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
import AddServiceModal from "../../../Components/modal/admin/admin-sub_modal/AddServiceModal";

interface ServiceItem {
  id: number;
  apiName: string;
  product: string;
  serviceCode: string;
  purchase: string;
  limit: number;
  status: "Active" | "Inactive";
}

interface OptionType {
  value: string;
  label: string;
}

const ServiceSwitching = () => {
  document.title = "Service Switching";

  const [currentPage, setCurrentPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState<OptionType | null>(null);
  const [statusFilter, setStatusFilter] = useState<OptionType | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const itemsPerPage = 5;

  const filteredData = serviceSwitchingData.filter((item) => {
    const matchesCategory =
      !categoryFilter ||
      categoryFilter.value === "All" ||
      item.product === categoryFilter.value;
    const matchesStatus =
      !statusFilter ||
      statusFilter.value === "All" ||
      item.status === statusFilter.value;
    const matchesSearch = item.apiName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesStatus && matchesSearch;
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
          <BreadCrumb
            title="Service Switching"
            pageTitle="Setting Management"
          />
          <Card>
            <CardHeader className="border-bottom-dashed">
              <h5 className="card-title mb-0">Service Switching</h5>
            </CardHeader>
            <CardBody className="border-bottom border-bottom-dashed">
              <Row className="g-3">
                <Col md={3}>
                  <label>Product Category</label>
                  <Select
                    value={categoryFilter}
                    onChange={(option) => setCategoryFilter(option)}
                    options={productCategories}
                    placeholder="All Product Category"
                    isClearable
                    isSearchable
                  />
                </Col>
                <Col md={3}>
                  <label>Status</label>
                  <Select
                    value={statusFilter}
                    onChange={(option) => setStatusFilter(option)}
                    options={productStatuses}
                    placeholder="All"
                    isClearable
                    isSearchable
                  />
                </Col>
                <Col md={3}>
                  <label>Search API Name</label>
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                  />
                </Col>
                <Col md={3} className="d-flex align-items-end gap-2">
                  <Button color="warning" block>
                    <i className="ri-equalizer-fill me-1"></i> Filter
                  </Button>
                  <Button color="success" block onClick={toggleModal}>
                    <i className="ri-add-line me-1"></i> Add Service
                  </Button>
                </Col>
              </Row>
            </CardBody>

            <AddServiceModal isOpen={isModalOpen} toggle={toggleModal} />

            <CardBody>
              <div className="table-responsive">
                <Table className="align-middle table-nowrap mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>API Name</th>
                      <th>Product</th>
                      <th>API Service Code</th>
                      <th>Purchase (₹, %)</th>
                      <th>Limit</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.length > 0 ? (
                      paginatedData.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.apiName}</td>
                          <td>{item.product}</td>
                          <td>{item.serviceCode}</td>
                          <td>{item.purchase}</td>
                          <td>{item.limit}</td>
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
                            <Button color="danger" size="sm">
                              <i className="ri-delete-bin-6-line me-1"></i>{" "}
                              Remove
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="text-center py-5">
                          <lord-icon
                            src="https://cdn.lordicon.com/msoeawqm.json"
                            trigger="loop"
                            style={{ width: 75, height: 75 }}
                          />
                          <h5 className="mt-3">No data found</h5>
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

const serviceSwitchingData: ServiceItem[] = [
  {
    id: 1,
    apiName: "Cashfree1",
    product: "Rental",
    serviceCode: "BANK",
    purchase: "Surcharge @ 2 ₹/Txn",
    limit: 1,
    status: "Inactive",
  },
  {
    id: 2,
    apiName: "Cashfree2",
    product: "Aadhaar Masking",
    serviceCode: "0",
    purchase: "Commission @ 0 %",
    limit: 0,
    status: "Active",
  },
  {
    id: 3,
    apiName: "competed3",
    product: "Rental",
    serviceCode: "0",
    purchase: "Commission @ 0 %",
    limit: 1,
    status: "Inactive",
  },
  {
    id: 4,
    apiName: "Cashfree4",
    product: "Aadhaar OKYC",
    serviceCode: "0",
    purchase: "Surcharge @ 0 ₹/Txn",
    limit: 0,
    status: "Inactive",
  },
  {
    id: 5,
    apiName: "Cashfree5",
    product: "PAN",
    serviceCode: "0",
    purchase: "Commission @ 0 %",
    limit: 1,
    status: "Active",
  },
];

const productCategories: OptionType[] = [
  { value: "All", label: "All Product Category" },
  { value: "Rental", label: "Rental" },
  { value: "Aadhaar Masking", label: "Aadhaar Masking" },
  { value: "Aadhaar OKYC", label: "Aadhaar OKYC" },
  { value: "PAN", label: "PAN" },
];

const productStatuses: OptionType[] = [
  { value: "All", label: "All" },
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

export default ServiceSwitching;
