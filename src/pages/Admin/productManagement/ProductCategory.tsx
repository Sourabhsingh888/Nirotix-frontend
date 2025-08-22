import { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../Store";
import Swal from "sweetalert2";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import AddCategoryModal from "../../../Components/modal/admin/admin-sub_modal/AddProductCategoryModal";
import UpdateCategoryModal from "../../../Components/modal/admin/admin-sub_modal/UpdateCategoryModal";
import {
  getProductCategories,
  deleteProductCategory,
} from "../../../slices/productCategory/thunk";

const SelectOption = [
  { value: "All", label: "All" },
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

const ProductCategoryPage = () => {
  document.title = "Product Category";
  const dispatch = useDispatch<AppDispatch>();
  const { list, fetchState, recordsTotal, recordsFiltered } = useSelector(
    (state: RootState) => state.ProductCategory
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [categoryStatus, setCategoryStatus] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  const itemsPerPage = 10;

  const toggleAddModal = () => setIsAddModalOpen(!isAddModalOpen);
  const toggleUpdateModal = () => setIsUpdateModalOpen(!isUpdateModalOpen);

  // Fetch categories from API (Server-side Pagination)
  useEffect(() => {
    dispatch(
      getProductCategories({
        offset: currentPage - 1,
        limit: itemsPerPage,
        searchValue: searchValue.trim(),
        ProductCategoryStatus: categoryStatus?.value || "",
      })
    );
  }, [dispatch, categoryStatus, searchValue, currentPage]);

  const totalPages = Math.ceil(
    (recordsFiltered || recordsTotal || 0) / itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Add this function inside your component
  const handleDelete = (id: number | string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#20c997", // green
      cancelButtonColor: "#f46a6a", // red
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProductCategory(id)).then(() => {
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Category deleted successfully.",
            timer: 2000,
            showConfirmButton: false,
          });
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon: "info",
          title: "Cancelled",
          text: "Your data is safe!",
          confirmButtonColor: "#20c997",
        });
      }
    });
  };

  const handleEdit = (category: any) => {
    setSelectedCategory(category);
    setIsUpdateModalOpen(true);
  };

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Product Categories" pageTitle="Product Management" />
        <Card>
          <CardHeader className="border-bottom-dashed">
            <h5 className="card-title mb-0">Product Categories</h5>
          </CardHeader>
          <CardBody className="border-bottom border-bottom-dashed">
            <Row className="g-3">
              <Col xs={12} md={4}>
                <label>Status</label>
                <Select
                  value={categoryStatus}
                  onChange={(option) => setCategoryStatus(option)}
                  options={SelectOption}
                  placeholder="Select Status"
                  isClearable
                />
              </Col>
              <Col xs={12} md={4}>
                <label>Search By Name</label>
                <Input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search Value"
                />
              </Col>
              <Col xs={12} md={4} className="d-flex align-items-end">
                <Button color="success" onClick={toggleAddModal} block>
                  <i className="ri-add-line me-1"></i> Add Category
                </Button>
              </Col>
            </Row>
          </CardBody>
          <AddCategoryModal isOpen={isAddModalOpen} toggle={toggleAddModal} />
          <UpdateCategoryModal
            isOpen={isUpdateModalOpen}
            toggle={toggleUpdateModal}
            category={selectedCategory}
          />

          <CardBody>
            {fetchState.loading ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: 200 }}
              >
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
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Created</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {list.map((item, index) => (
                        <tr key={index}>
                          <td>{item.serial_no}</td>
                          <td>
                            <b>{item.name}</b>
                          </td>
                          <td>{item.slug}</td>

                          <td>{item.created_at}</td>
                          <td>
                            <Badge
                              color={
                                item.status === "Active" ? "success" : "danger"
                              }
                              pill
                            >
                              {item.status?.toUpperCase() || ""}
                            </Badge>
                          </td>
                          <td>
                            <Button
                              color="primary"
                              size="sm"
                              className="me-2"
                              onClick={() => handleEdit(item)}
                            >
                              <i className="ri-pencil-line me-1"></i> Edit
                            </Button>
                            <Button
                              color="danger"
                              size="sm"
                              onClick={() => handleDelete(item.id)}
                            >
                              <i className="ri-delete-bin-6-line me-1"></i>{" "}
                              Remove
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>

                <Row className="align-items-center mt-4 d-flex justify-content-between">
                  {/* Left Side - Showing Entries */}
                  <Col md="auto">
                    <div className="text-muted">
                      Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                      {Math.min(
                        currentPage * itemsPerPage,
                        recordsFiltered || recordsTotal
                      )}{" "}
                      of {recordsFiltered || recordsTotal} entries
                    </div>
                  </Col>

                  {/* Right Side - Pagination (only if total records > itemsPerPage) */}
                  <Col md="auto">
                    {(recordsFiltered || recordsTotal) > itemsPerPage && (
                      <Pagination className="mb-0">
                        <PaginationItem disabled={currentPage === 1}>
                          <PaginationLink
                            previous
                            onClick={() => handlePageChange(currentPage - 1)}
                          >
                            Previous
                          </PaginationLink>
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
                          >
                            Next
                          </PaginationLink>
                        </PaginationItem>
                      </Pagination>
                    )}
                  </Col>
                </Row>
              </>
            ) : (
              <div
                className="d-flex flex-column justify-content-center align-items-center"
                style={{ height: "300px" }}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/msoeawqm.json"
                  trigger="loop"
                  style={{ width: 75, height: 75 }}
                />
                <h5 className="mt-3">No data found</h5>
              </div>
            )}
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default ProductCategoryPage;
