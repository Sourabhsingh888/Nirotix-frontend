import React, { useState, useEffect } from "react";
import { Col, Input, Label, FormFeedback } from "reactstrap";
import Select from "react-select";

interface AddUserFormProps {
  onChange: (isValid: boolean, formData: any) => void;
}

const AddUser: React.FC<AddUserFormProps> = ({ onChange }) => {
  const userRole = ["Manager", "User"];
  const userRoleOptions = userRole.map((role) => ({
    value: role.toLowerCase().replace(/\s+/g, "-"),
    label: role,
  }));

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState("");

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    mobile: false,
    role: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    mobile: "",
    role: "",
  });

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^\d{10}$/;

    const newErrors = {
      name: name.trim() === "" ? "Name is required" : "",
      email:
        email.trim() === ""
          ? "Email is required"
          : !emailRegex.test(email)
          ? "Invalid email format"
          : "",
      mobile:
        mobile.trim() === ""
          ? "Mobile is required"
          : !mobileRegex.test(mobile)
          ? "Mobile must be 10 digits"
          : "",
      role: role.trim() === "" ? "Role is required" : "",
    };

    setErrors(newErrors);

    const isValid = Object.values(newErrors).every((err) => err === "");
    onChange(isValid, { name, email, mobile, role });
  }, [name, email, mobile, role]);

  return (
    <div className="row g-3">
      {/* Name */}
      <Col xxl={12}>
        <div>
          <Label htmlFor="userName" className="form-label">
            Name
          </Label>
          <Input
            type="text"
            id="userName"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
            autoComplete="off"
            invalid={touched.name && !!errors.name}
          />
          {touched.name && errors.name && (
            <FormFeedback>{errors.name}</FormFeedback>
          )}
        </div>
      </Col>

      {/* Email */}
      <Col xxl={12}>
        <div>
          <Label htmlFor="userEmail" className="form-label">
            Email
          </Label>
          <Input
            type="email"
            id="userEmail"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
            invalid={touched.email && !!errors.email}
          />
          {touched.email && errors.email && (
            <FormFeedback>{errors.email}</FormFeedback>
          )}
        </div>
      </Col>

      {/* Mobile */}
      <Col xxl={12}>
        <div>
          <Label htmlFor="userMobile" className="form-label">
            Mobile
          </Label>
          <Input
            type="tel"
            id="userMobile"
            placeholder="Enter Mobile Number"
            value={mobile}
            onChange={(e) =>
              setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
            }
            onBlur={() => setTouched((prev) => ({ ...prev, mobile: true }))}
            invalid={touched.mobile && !!errors.mobile}
          />
          {touched.mobile && errors.mobile && (
            <FormFeedback>{errors.mobile}</FormFeedback>
          )}
        </div>
      </Col>

      {/* Role */}
      <Col xxl={12}>
        <div>
          <Label htmlFor="userRole" className="form-label">
            Role
          </Label>
          <Select
            id="userRole"
            value={userRoleOptions.find((opt) => opt.value === role)}
            onChange={(selected) => setRole(selected ? selected.value : "")}
            onBlur={() => setTouched((prev) => ({ ...prev, role: true }))}
            options={userRoleOptions}
            placeholder="Select Role"
            isClearable
            isSearchable
          />
          {touched.role && errors.role && (
            <div className="text-danger mt-1">{errors.role}</div>
          )}
        </div>
      </Col>
    </div>
  );
};

export default AddUser;