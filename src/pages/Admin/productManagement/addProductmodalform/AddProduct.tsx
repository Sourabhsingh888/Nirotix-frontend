import React, { useState, useEffect } from "react";
import { Col, Input, Label, FormFeedback } from "reactstrap";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../../Store";
import { getProductCategories } from "../../../../slices/productCategory/thunk";

interface AddProductFormProps {
  onChange: (
    isValid: boolean,
    data: {
      category_id: number | string;
      name: string;
      description: string;
      icon: File | string | null;
      status: string;
    }
  ) => void;
  initialData?: {
    category_id: number | string;
    name: string;
    description: string;
    icon?: string;
    status: string;
  };
}

const AddProductForm: React.FC<AddProductFormProps> = ({
  onChange,
  initialData,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { list } = useSelector((state: RootState) => state.ProductCategory);
  console.log("list",list);
  

  // Pagination for category select
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Form fields
  const [category, setCategory] = useState<number | "">("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  // Validation state
  const [touched, setTouched] = useState({
    category: false,
    name: false,
    description: false,
    icon: false,
    status: false,
  });

  const [errors, setErrors] = useState({
    category: "",
    name: "",
    description: "",
    icon: "",
    status: "",
  });

  // Fetch categories on mount & pagination
  useEffect(() => {
    dispatch(
      getProductCategories({
        offset: currentPage - 1,
        limit: itemsPerPage,
      })
    );
  }, [dispatch, currentPage]);

  const categoryOptions = list.map((cat: any) => ({
    value: cat.id,
    label: cat.name,
  }));

  // ✅ Handle initialData (edit mode)
  useEffect(() => {
    if (initialData) {
      setCategory(initialData.category_id || "");
      setName(initialData.name || "");
      setDescription(initialData.description || "");
      setStatus(initialData.status || "");
    }
  }, [initialData]);

  // ✅ Validation + propagate data
  useEffect(() => {
    const newErrors = {
      category: category ? "" : "Category is required",
      name: name ? "" : "Name is required",
      description: description ? "" : "Description is required",
      icon: initialData?.icon || icon ? "" : "Icon is required",
      status: status ? "" : "Status is required",
    };
    setErrors(newErrors);

    const isValid = Object.values(newErrors).every((e) => e === "");

    // Build plain object instead of FormData
    const data = {
      category_id: category,
      name,
      description,
      icon: icon || initialData?.icon || null,
      status,
    };

    onChange(isValid, data);
  }, [category, name, description, icon, status, initialData]);

  return (
    <div className="row g-3">
      {/* Category */}
      <Col xxl={12}>
        <Label htmlFor="productCategory" className="form-label">
          Category
        </Label>
        <Select
          id="productCategory"
          value={categoryOptions.find((opt) => opt.value === category) || null}
          onChange={(selected) => setCategory(selected ? selected.value : "")}
          onBlur={() => setTouched((t) => ({ ...t, category: true }))}
          options={categoryOptions}
          placeholder="Select Category"
          isClearable
          isSearchable
          onMenuScrollToBottom={() => setCurrentPage((prev) => prev + 1)}
        />
        {touched.category && errors.category && (
          <div className="text-danger mt-1">{errors.category}</div>
        )}
      </Col>

      {/* Name */}
      <Col xxl={12}>
        <Label htmlFor="productName" className="form-label">
          Name
        </Label>
        <Input
          type="text"
          id="productName"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, name: true }))}
          autoComplete="off"
          invalid={touched.name && !!errors.name}
        />
        {touched.name && errors.name && (
          <FormFeedback>{errors.name}</FormFeedback>
        )}
      </Col>

      {/* Description */}
      <Col xxl={12}>
        <Label htmlFor="productDescription" className="form-label">
          Description
        </Label>
        <Input
          type="textarea"
          id="productDescription"
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, description: true }))}
          invalid={touched.description && !!errors.description}
        />
        {touched.description && errors.description && (
          <FormFeedback>{errors.description}</FormFeedback>
        )}
      </Col>

      {/* Icon */}
      <Col xxl={12}>
        <Label htmlFor="productIcon" className="form-label">
          Icon
        </Label>
        <Input
          type="file"
          id="productIcon"
          onChange={(e) => setIcon(e.target.files?.[0] || null)}
          onBlur={() => setTouched((t) => ({ ...t, icon: true }))}
          invalid={touched.icon && !!errors.icon}
        />
        {!icon && initialData?.icon && (
          <div className="mt-2">
            <img
              src={initialData.icon}
              alt="Existing Icon"
              style={{ width: "40px", height: "40px", objectFit: "cover" }}
            />
          </div>
        )}
        {touched.icon && errors.icon && (
          <FormFeedback>{errors.icon}</FormFeedback>
        )}
      </Col>

      {/* Status */}
      <Col xxl={12}>
        <Label className="form-label">Status</Label>
        <br />
        <div className="form-check form-check-inline form-radio-success">
          <input
            className="form-check-input"
            type="radio"
            name="status"
            id="status-active"
            value="Active"
            checked={status === "Active"}
            onChange={(e) => setStatus(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, status: true }))}
          />
          <label className="form-check-label" htmlFor="status-active">
            Active
          </label>
        </div>
        <div className="form-check form-check-inline form-radio-danger">
          <input
            className="form-check-input"
            type="radio"
            name="status"
            id="status-inactive"
            value="Inactive"
            checked={status === "Inactive"}
            onChange={(e) => setStatus(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, status: true }))}
          />
          <label className="form-check-label" htmlFor="status-inactive">
            Inactive
          </label>
        </div>
        {touched.status && errors.status && (
          <div className="text-danger mt-1">{errors.status}</div>
        )}
      </Col>
    </div>
  );
};

export default AddProductForm;

// import React, { useState, useEffect } from "react";
// import { Col, Input, Label, FormFeedback } from "reactstrap";
// import Select from "react-select";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState, AppDispatch } from "../../../../Store";
// import { getProductCategories } from "../../../../slices/productCategory/thunk";

// interface AddProductFormProps {
//   onChange: (isValid: boolean, formData: FormData) => void;
//     initialData?: {
//     category_id: number | string;
//     name: string;
//     description: string;
//     icon?: string; // for edit mode, you may have existing icon path
//     status: string;
//   };
// }

// const AddProductForm: React.FC<AddProductFormProps> = ({ onChange,
//   initialData
//  }) => {
//    const dispatch: AppDispatch = useDispatch();
//    const { list } = useSelector((state: RootState) => state.ProductCategory);
//    console.log("list", list);

//    // Pagination state
//    const [currentPage, setCurrentPage] = useState(1);
//    const itemsPerPage = 10;

//    // Form fields
//    const [category, setCategory] = useState<number | "">("");
//    const [name, setName] = useState("");
//    const [description, setDescription] = useState("");
//    const [icon, setIcon] = useState<File | null>(null);
//    const [status, setStatus] = useState(initialData?.status || "Active");

//    // Validation
//    const [touched, setTouched] = useState({
//      category: false,
//      name: false,
//      description: false,
//      icon: false,
//      status: false,
//    });

//    const [errors, setErrors] = useState({
//      category: "",
//      name: "",
//      description: "",
//      icon: "",
//      status: "",
//    });

//    // Fetch categories from API
//    useEffect(() => {
//      dispatch(
//        getProductCategories({
//          offset: currentPage - 1,
//          limit: itemsPerPage,
//        })
//      );
//    }, [dispatch, currentPage]);

//    const categoryOptions = list.map((cat: any) => ({
//      value: cat.id,
//      label: cat.name,
//    }));

//    // in AddProductForm
//    useEffect(() => {
//      if (initialData) {
//        setCategory(initialData.category_id || "");
//        setName(initialData.name || "");
//        setDescription(initialData.description || "");
//        setStatus(initialData.status || "");
//      }
//      // run only on first mount OR when product id changes
//    }, [
//      initialData?.category_id,
//      initialData?.name,
//      initialData?.description,
//      initialData?.status,
//    ]);

// // useEffect(() => {
// //   const newErrors = {
// //     category: category ? "" : "Category is required",
// //     name: name ? "" : "Name is required",
// //     description: description ? "" : "Description is required",
// //     icon: icon || initialData?.icon ? "" : "Icon is required",
// //     status: status ? "" : "Status is required",
// //   };
// //   setErrors(newErrors);

// //   const isValid = Object.values(newErrors).every((e) => e === "");

// //   // ✅ instead send plain object
// //   onChange(isValid, {
// //     category_id: category,
// //     name,
// //     description,
// //     icon: File | null,
// //     status,
// //   });
// // }, [category, name, description, icon, status]);
// useEffect(() => {
//   const newErrors = {
//     category: category ? "" : "Category is required",
//     name: name ? "" : "Name is required",
//     description: description ? "" : "Description is required",
//     icon: icon || initialData?.icon ? "" : "Icon is required",
//     status: status ? "" : "Status is required",
//   };
//   setErrors(newErrors);

//   const isValid = Object.values(newErrors).every((e) => e === "");

//   // ✅ send actual state values (icon is File | null)
//   onChange(isValid, {
//     category_id: category,
//     name,
//     description,
//     icon, // <-- pass the state variable
//     status,
//   });
// }, [category, name, description, icon, status]);

//    return (
//      <div className="row g-3">
//        {/* Category */}
//        <Col xxl={12}>
//          <Label htmlFor="productCategory" className="form-label">
//            Category
//          </Label>
//          <Select
//            id="productCategory"
//            value={categoryOptions.find((opt) => opt.value === category) || null}
//            onChange={(selected) => setCategory(selected ? selected.value : "")}
//            onBlur={() => setTouched((t) => ({ ...t, category: true }))}
//            options={categoryOptions}
//            placeholder="Select Category"
//            isClearable
//            isSearchable
//            onMenuScrollToBottom={() => setCurrentPage((prev) => prev + 1)}
//          />
//          {touched.category && errors.category && (
//            <div className="text-danger mt-1">{errors.category}</div>
//          )}
//        </Col>

//        {/* Name */}
//        <Col xxl={12}>
//          <Label htmlFor="productName" className="form-label">
//            Name
//          </Label>
//          <Input
//            type="text"
//            id="productName"
//            placeholder="Enter Name"
//            value={name}
//            onChange={(e) => setName(e.target.value)}
//            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
//            autoComplete="off"
//            invalid={touched.name && !!errors.name}
//          />
//          {touched.name && errors.name && (
//            <FormFeedback>{errors.name}</FormFeedback>
//          )}
//        </Col>

//        {/* Description */}
//        <Col xxl={12}>
//          <Label htmlFor="productDescription" className="form-label">
//            Description
//          </Label>
//          <Input
//            type="textarea"
//            id="productDescription"
//            placeholder="Enter Description"
//            value={description}
//            onChange={(e) => setDescription(e.target.value)}
//            onBlur={() => setTouched((t) => ({ ...t, description: true }))}
//            invalid={touched.description && !!errors.description}
//          />
//          {touched.description && errors.description && (
//            <FormFeedback>{errors.description}</FormFeedback>
//          )}
//        </Col>

//        {/* Icon */}
//        <Col xxl={12}>
//          <Label htmlFor="productIcon" className="form-label">
//            Icon
//          </Label>
//          <Input
//            type="file"
//            id="productIcon"
//            onChange={(e) => setIcon(e.target.files?.[0] || null)}
//            onBlur={() => setTouched((t) => ({ ...t, icon: true }))}
//            invalid={touched.icon && !!errors.icon}
//          />
//          {/* Show preview if editing and no new file selected */}
//          {!icon && initialData?.icon && (
//            <div className="mt-2">
//              <img
//                src={initialData.icon}
//                alt="Existing Icon"
//                style={{ width: "40px", height: "40px", objectFit: "cover" }}
//              />
//            </div>
//          )}
//          {touched.icon && errors.icon && (
//            <FormFeedback>{errors.icon}</FormFeedback>
//          )}
//        </Col>

//        {/* Status */}
//        <Col xxl={12}>
//          <Label className="form-label">Status</Label>
//          <br />
//          <div className="form-check form-check-inline form-radio-success">
//            <input
//              className="form-check-input"
//              type="radio"
//              name="status"
//              id="status-active"
//              value="Active"
//              checked={status === "Active"}
//              onChange={(e) => setStatus(e.target.value)}
//              onBlur={() => setTouched((t) => ({ ...t, status: true }))}
//            />
//            <label className="form-check-label" htmlFor="status-active">
//              Active
//            </label>
//          </div>
//          <div className="form-check form-check-inline form-radio-danger">
//            <input
//              className="form-check-input"
//              type="radio"
//              name="status"
//              id="status-inactive"
//              value="Inactive"
//              checked={status === "Inactive"}
//              onChange={(e) => setStatus(e.target.value)}
//              onBlur={() => setTouched((t) => ({ ...t, status: true }))}
//            />
//            <label className="form-check-label" htmlFor="status-inactive">
//              Inactive
//            </label>
//          </div>
//          {touched.status && errors.status && (
//            <div className="text-danger mt-1">{errors.status}</div>
//          )}
//        </Col>
//      </div>
//    );
//  };

// export default AddProductForm;
