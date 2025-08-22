import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";

const MessageLogs = () => {
  document.title = "Message Logs";

  const [startDate, setStartDate] = useState("25-07-2025");
  const [endDate, setEndDate] = useState("25-07-2025");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  // Dummy filtered data (empty to match "No matching records" initially)
  const filteredLogs = [];

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const paginatedData = filteredLogs.slice(
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
          <BreadCrumb title="Message Logs" pageTitle="MSG Management" />
          <Card>
            <CardHeader className="border-bottom-dashed">
              <h5 className="card-title mb-0">Message Logs</h5>
            </CardHeader>

            <CardBody className="border-bottom border-bottom-dashed">
              <Row className="g-3">
                <Col md={3}>
                  <label>Start Date</label>
                  <Input
                    type="text"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </Col>
                <Col md={3}>
                  <label>End Date</label>
                  <Input
                    type="text"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </Col>
                <Col md={3} className="d-flex align-items-end">
                  <button type="button" className="btn btn-warning w-100">
                    <i className="ri-equalizer-fill me-1"></i> Filter
                  </button>
                </Col>
              </Row>
            </CardBody>

            <CardBody>
              <div className="table-responsive">
                <Table className="align-middle table-nowrap mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Api Id</th>
                      <th>Numbers</th>
                      <th>Message</th>
                      <th>Base Url</th>
                      <th>Params</th>
                      <th>Response</th>
                      <th>Date & Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.length > 0 ? (
                      paginatedData.map((log, idx) => (
                        <tr key={idx}>
                          <td>{log.id}</td>
                          <td>{log.apiId}</td>
                          <td>{log.numbers}</td>
                          <td>{log.message}</td>
                          <td>{log.baseUrl}</td>
                          <td>{log.params}</td>
                          <td>{log.response}</td>
                          <td>{log.dateTime}</td>
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
                          <h5 className="mt-3">No matching records found</h5>
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

export default MessageLogs;
