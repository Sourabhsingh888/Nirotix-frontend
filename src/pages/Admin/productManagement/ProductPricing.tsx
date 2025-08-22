import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Input,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Spinner,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../Store";
import Swal from "sweetalert2";
import ProductPricingModal from "../../../Components/modal/admin/admin-sub_modal/AddProductPriceModal";
import UpdateProductPricing from "../../../Components/modal/admin/admin-sub_modal/UpdateProductPricing";
import {
  getProductPricing,
  deleteProductPricing,
} from "../../../slices/productPricing/thunk";

const ProductPricing: React.FC = () => {
  document.title = "Product Pricing";
  const dispatch = useDispatch<AppDispatch>();
  const { list, fetchState, recordsTotal, recordsFiltered } = useSelector(
    (state: RootState) => state.ProductPrice
  );
  console.log("list", list);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const toggleAddModal = () => setIsAddModalOpen((prev) => !prev);
  const toggleEditModal = () => setIsEditModalOpen((prev) => !prev);

  const handleDelete = (id: number | string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProductPricing(id));
      }
    });
  };

  const handleEdit = (item: any) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  const totalPages = Math.ceil(recordsFiltered / itemsPerPage);

  // ✅ Fetch product pricing list
  useEffect(() => {
    dispatch(
      getProductPricing({
        offset: (currentPage - 1) * itemsPerPage, // proper offset
        limit: itemsPerPage,
        searchValue: searchValue.trim(),
      })
    );
  }, [dispatch, currentPage, itemsPerPage, searchValue]);

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Product Pricing" pageTitle="Product Management" />

        <Card>
          <CardHeader className="border-bottom-dashed">
            <h5 className="mb-0">Product Price List</h5>
          </CardHeader>

          {/* Filters */}
          <CardBody className="border-bottom border-bottom-dashed">
            <Row className="align-items-end">
              <Col md={6}>
                <label className="form-label fw-semibold">Search By Name</label>
                <Input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search Value"
                />
              </Col>
              <Col md={6}>
                <Button
                  color="success"
                  onClick={toggleAddModal}
                  className="w-100"
                >
                  <i className="ri-add-line me-1"></i> Add Price
                </Button>
              </Col>
            </Row>
          </CardBody>

          {/* Add Modal */}
          <ProductPricingModal
            isOpen={isAddModalOpen}
            toggle={toggleAddModal}
          />

          {/* Edit Modal */}
          {selectedItem && (
            <UpdateProductPricing
              isOpen={isEditModalOpen}
              toggle={toggleEditModal}
              productPricing={selectedItem}
            />
          )}

          {/* Table */}
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
                  <Table hover bordered responsive className="mb-0 text-center">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Currency</th>
                        <th>Created At</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {list.map((item) => (
                        <tr key={item.id}>
                          <td>{item.serial_no}</td>
                          <td>{item.products}</td>
                          <td>{item.price}</td>
                          <td>{item.currency}</td>
                          <td>{item.created_at}</td>
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

                {/* Pagination */}
                <Row className="align-items-center mt-4 d-flex justify-content-between">
                  <Col md="auto">
                    <div className="text-muted">
                      Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                      {Math.min(currentPage * itemsPerPage, recordsFiltered)} of{" "}
                      {recordsFiltered} entries
                    </div>
                  </Col>
                  <Col md="auto">
                    <Pagination className="mb-0">
                      <PaginationItem disabled={currentPage === 1}>
                        <PaginationLink
                          previous
                          onClick={() =>
                            setCurrentPage((p) => Math.max(p - 1, 1))
                          }
                        >
                          Previous
                        </PaginationLink>
                      </PaginationItem>

                      {[...Array(totalPages)].map((_, i) => (
                        <PaginationItem key={i} active={i + 1 === currentPage}>
                          <PaginationLink onClick={() => setCurrentPage(i + 1)}>
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      <PaginationItem disabled={currentPage === totalPages}>
                        <PaginationLink
                          next
                          onClick={() =>
                            setCurrentPage((p) => Math.min(p + 1, totalPages))
                          }
                        >
                          Next
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
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

export default ProductPricing;