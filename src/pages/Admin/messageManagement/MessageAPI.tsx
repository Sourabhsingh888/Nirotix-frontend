import React, { useEffect, useState } from "react";
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
  Spinner,
} from "reactstrap";
import Select from "react-select";
import Swal from "sweetalert2";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import AddMsgApiModal from "../../../Components/modal/admin/admin-sub_modal/AddMsgApiModal";
import UpdatedMsgApiModal from "../../../Components/modal/admin/admin-sub_modal/UpdatedMsgApiModal";

import {
  getMessagesApi,
  deleteMessageApi,
  getMessageByIdApi,
  changeMessageStatusApi,
} from "../../../slices/msgApi/thunk";
import { RootState, AppDispatch } from "../../../Store";
import { useDispatch, useSelector } from "react-redux";

const apiTypeOptions = [
  { value: "All", label: "All Types" },
  { value: "SMS", label: "SMS" },
  { value: "Whatsapp", label: "Whatsapp" },
];

const statusOptions = [
  { value: "All", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

const MessageAPIPage: React.FC = () => {
  document.title = "Message API";

  const dispatch = useDispatch<AppDispatch>();
  const { list, fetchState, recordsTotal, recordsFiltered } = useSelector(
    (state: RootState) => state.MsgApi
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<{ value: string; label: string } | null>(null);
  const [apiTypeFilter, setApiTypeFilter] = useState<{ value: string; label: string } | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedApiId, setSelectedApiId] = useState<string | number | null>(null);

  const itemsPerPage = 10;

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleUpdateModal = () => setIsUpdateModalOpen(!isUpdateModalOpen);

  // Fetch data from API whenever filters/page change (with debounce)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      dispatch(
        getMessagesApi({
          offset: currentPage - 1,
          limit: itemsPerPage,
          searchValue: searchValue.trim(),
          api_type: apiTypeFilter?.value || "",
          status: statusFilter?.value || "",
        })
      );
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [dispatch, currentPage, searchValue, statusFilter, apiTypeFilter]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= Math.ceil((recordsFiltered || recordsTotal) / itemsPerPage)) {
      setCurrentPage(page);
    }
  };

  const handleDelete = (id: number | string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this API!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#20c997",
      cancelButtonColor: "#f46a6a",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteMessageApi(id)).then(() => {
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "API deleted successfully.",
            timer: 2000,
            showConfirmButton: false,
          });
          // Refetch after delete
          dispatch(
            getMessagesApi({
              offset: currentPage - 1,
              limit: itemsPerPage,
              searchValue: searchValue.trim(),
              api_type: apiTypeFilter?.value || "",
              status: statusFilter?.value || "",
            })
          );
        });
      }
    });
  };

  const handleEdit = async (id: string | number) => {
    try {
      setSelectedApiId(id); // store ID for modal
      await dispatch(getMessageByIdApi(id)).unwrap(); // fetch data
      setIsUpdateModalOpen(true); // open modal after data is ready
    } catch (err) {
      console.error("Failed to fetch message for edit:", err);
    }
  };

const handleStatusChange = (id: string) =>
   { dispatch(changeMessageStatusApi(id))
     .unwrap()
     .catch((err) => {
       console.error("Status change failed:", err);
     });
};

  const totalPages = Math.ceil((recordsFiltered || recordsTotal) / itemsPerPage);

  function formatToIST(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }

  return (
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
              <Col md={3} className="d-flex align-items-end">
                <Button color="primary" block onClick={toggleModal}>
                  Add API
                </Button>
              </Col>
            </Row>
          </CardBody>

          <AddMsgApiModal isOpen={isModalOpen} toggle={toggleModal} />

          <CardBody>
            {fetchState.loading ? (
              <div className="d-flex justify-content-center align-items-center" style={{ height: 200 }}>
                <Spinner color="primary" />
              </div>
            ) : fetchState.error ? (
              <div className="text-center text-danger">{fetchState.error}</div>
            ) : list.length > 0 ? (
              <>
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
                      {list.map((item, idx) => (
                        <tr key={item.id}>
                          <td>{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                          <td><b>{item.api_name}</b></td>
                          <td>{item.api_type}</td>
                          <td>{item.method}</td>
                          <td>
                            <Badge
                              color={item.status === "active" ? "success" : "danger"}
                              pill
                              style={{ cursor: "pointer" }}
                              onClick={() => handleStatusChange(item.id)}
                            >
                              {item.status}
                            </Badge>
                          </td>
                          <td>{formatToIST(item.created_at)}</td>
                          <td>
                            <Button color="primary" size="sm" className="me-2" onClick={() => handleEdit(item.id)}>
                              <i className="ri-pencil-line me-1"></i> Edit
                            </Button>
                            <Button color="danger" size="sm" onClick={() => handleDelete(item.id)}>
                              <i className="ri-delete-bin-6-line me-1"></i> Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>

                {totalPages > 1 && (
                  <div className="d-flex justify-content-end mt-3">
                    <Pagination>
                      <PaginationItem disabled={currentPage === 1}>
                        <PaginationLink previous onClick={() => handlePageChange(currentPage - 1)} />
                      </PaginationItem>

                      {[...Array(totalPages)].map((_, idx) => (
                        <PaginationItem key={idx} active={currentPage === idx + 1}>
                          <PaginationLink onClick={() => handlePageChange(idx + 1)}>
                            {idx + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      <PaginationItem disabled={currentPage === totalPages}>
                        <PaginationLink next onClick={() => handlePageChange(currentPage + 1)} />
                      </PaginationItem>
                    </Pagination>
                  </div>
                )}
              </>
            ) : (
              <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: 300 }}>
                <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop" style={{ width: 75, height: 75 }} />
                <h5 className="mt-3">No data found</h5>
              </div>
            )}
          </CardBody>
        </Card>

        {/* Update Modal */}
        <UpdatedMsgApiModal
          isOpen={isUpdateModalOpen}
          toggle={() => setIsUpdateModalOpen(false)}
          selectedId={selectedApiId}
        />
      </Container>
    </div>
  );
};

export default MessageAPIPage;
