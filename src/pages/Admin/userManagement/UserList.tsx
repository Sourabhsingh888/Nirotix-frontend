import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
  Table,
  Badge,
} from "reactstrap";
import Select from "react-select";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { FaFilter, FaUserPlus } from "react-icons/fa";
import AddUserModal from "../../../Components/modal/admin/admin-sub_modal/AddUserModal";

const UserList: React.FC = () => {
  document.title = "User List";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="User List" pageTitle="User Management" />

          {/* Main Card */}
          <Card className="mb-3">
            <CardHeader className="d-flex justify-content-between align-items-center border-bottom-dashed">
              <h5 className="mb-0">Add, Edit & Remove</h5>
              <Button color="success" onClick={toggleModal}>
                <FaUserPlus className="me-1" /> Add User
              </Button>
            </CardHeader>

            <CardBody className="border-bottom border-bottom-dashed">
              {/* Summary Table */}
              <Table bordered responsive className="text-center mb-4">
                <thead className="table-light">
                  <tr>
                    <th>Total Balance</th>
                    <th>Total Free Balance</th>
                    <th>Total Lean Balance</th>
                    <th>Total Users</th>
                    <th>Active Users</th>
                    <th>Inactive Users</th>
                    <th>Banned</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="fw-bold">
                    <td>₹ 869231629.01</td>
                    <td>₹ 0</td>
                    <td>₹ 0.50</td>
                    <td className="text-primary">126</td>
                    <td className="text-success">125</td>
                    <td className="text-dark">1</td>
                    <td className="bg-danger text-white">1</td>
                  </tr>
                </tbody>
              </Table>

              {/* Filters Row */}
              <Row className="align-items-center mb-2 g-2">
                <Col md="3">
                  <Select
                    options={roleOptions}
                    isClearable
                    isSearchable
                    placeholder="Search By"
                  />
                </Col>

                <Col md="3">
                  <Select
                    options={statusOptions}
                    isClearable
                    placeholder="Search By Status"
                  />
                </Col>
                <Col md="3">
                  <Input
                    type="search"
                    placeholder="Search by name, email, mobile"
                  />
                </Col>
                <Col md="2" className="d-flex gap-1">
                  <Button color="warning">
                    <FaFilter className="me-1" />
                    Filters
                  </Button>
                </Col>
              </Row>
            </CardBody>
            <AddUserModal isOpen={isModalOpen} toggle={toggleModal} />

            {/* Table Row */}
            <CardBody>
              <Row>
                <Col>
                  <Table responsive bordered hover>
                    <thead className="table-light text-center">
                      <tr>
                        <th>#</th>
                        <th>Profile Image</th>
                        <th>Role</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile No.</th>
                        <th>Wallet</th>
                        <th>Create Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {userData.map((user, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <img
                              src={user.profileImage}
                              alt={user.name}
                              className="rounded-circle"
                              width="40"
                              height="40"
                            />
                          </td>
                          <td>
                            <Badge color="info">{user.role}</Badge>
                          </td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.mobile}</td>
                          <td>{user.wallet}</td>
                          <td>{user.createDate}</td>
                          <td>
                            <Badge
                              color={
                                user.status === "Active"
                                  ? "success"
                                  : user.status === "Inactive"
                                  ? "secondary"
                                  : "danger"
                              }
                            >
                              {user.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

const userData = [
  {
    id: "1",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    role: "User",
    name: "Bhupendra Bansal",
    email: "bhupendra@example.com",
    mobile: "9251137777",
    wallet: "₹ 1,200.00",
    createDate: "2023-11-12",
    status: "Active",
  },
  {
    id: "2",
    profileImage: "https://randomuser.me/api/portraits/women/45.jpg",
    role: "User",
    name: "Ashim Haldar",
    email: "ashim@example.com",
    mobile: "8918288088",
    wallet: "₹ 500.00",
    createDate: "2024-02-18",
    status: "Inactive",
  },
  {
    id: "3",
    profileImage: "https://randomuser.me/api/portraits/men/78.jpg",
    role: "Manager",
    name: "Swapan Pradhan",
    email: "swapan@example.com",
    mobile: "8670796722",
    wallet: "₹ 0.00",
    createDate: "2022-08-05",
    status: "Banned",
  },
  {
    id: "4",
    profileImage: "https://randomuser.me/api/portraits/men/61.jpg",
    role: "User",
    name: "Ravi Mehra",
    email: "ravi.mehra@example.com",
    mobile: "9001234567",
    wallet: "₹ 2,340.75",
    createDate: "2024-06-30",
    status: "Active",
  },
  {
    id: "5",
    profileImage: "https://randomuser.me/api/portraits/women/22.jpg",
    role: "User",
    name: "Kritika Jain",
    email: "kritika.jain@example.com",
    mobile: "9876543210",
    wallet: "₹ 50.00",
    createDate: "2023-09-21",
    status: "Inactive",
  },
];

const roleOptions = [
  { value: "user", label: "User" },
  { value: "manager", label: "Manager" },
];

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "banned", label: "Banned" },
];

export default UserList;
