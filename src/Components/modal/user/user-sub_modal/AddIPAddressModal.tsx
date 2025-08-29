// import React, { useState, useCallback } from "react";
// import { useDispatch } from "react-redux";
// import BaseModal from "../../basemodal/BaseModal";
// import AddIPAddressForm from "../../../../pages/users/account/developerAPI/addIP_modalform/AddIPAddress";
// import { addWhitelistedIpApi, getWhitelistedIpApi } from "../../../../slices/whitelistSlice/thunk";

// interface AddIPAddressModalProps {
//   isOpen: boolean;
//   toggle: () => void;
// }

// const AddIPAddressModal: React.FC<AddIPAddressModalProps> = ({
//   isOpen,
//   toggle,
// }) => {
//   const dispatch = useDispatch();
//   const [formData, setFormData] = useState<{ ipno: string }>({ ipno: "" });
//   const [isValid, setIsValid] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const ipRegex =
//     /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/;

//   const handleFormChange = useCallback(
//     (valid: boolean, data: { ipno: string }) => {
//       setIsValid(valid);
//       setFormData(data);
//       setError(null); // clear error when user types
//     },
//     []
//   );

//   const handleClose = () => {
//     setFormData({ ipno: "" });
//     setIsValid(false);
//     setLoading(false);
//     setError(null);
//     toggle();
//   };

//   const handleSubmit = () => {
//     const ipno = formData.ipno.trim();

//     if (!ipno) {
//       setError("IP address is required");
//       return;
//     }
//     if (!ipRegex.test(ipno)) {
//       setError("Invalid IP address format");
//       return;
//     }

//     if (loading) return;
//     setLoading(true);

//     dispatch(addWhitelistedIpApi({ ip_address: ipno }))
//       .unwrap()
//       .then(() => {

//         dispatch(getWhitelistedIpApi());
//         handleClose();
//       })
//       .catch(() => {
//         setError("Failed to add IP Address");
//       })
//       .finally(() => setLoading(false));
//   };

//   return (
//     <BaseModal
//       isOpen={isOpen}
//       toggle={handleClose}
//       title="Add IP Address"
//       submitLabel={loading ? "Adding..." : "Add"}
//       cancelLabel="Cancel"
//       size="md"
//       onSubmit={handleSubmit}
//       isSubmitDisabled={!ipRegex.test(formData.ipno) || loading}
//     >
//       <AddIPAddressForm onChange={handleFormChange} />
//       {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
//     </BaseModal>
//   );
// };

// export default AddIPAddressModal;










import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import BaseModal from "../../basemodal/BaseModal";
import AddIPAddressForm from "../../../../pages/users/account/developerAPI/addIP_modalform/AddIPAddress";
import {
  addWhitelistedIpApi,
  getWhitelistedIpApi,
} from "../../../../slices/whitelistSlice/thunk";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface AddIPAddressModalProps {
  isOpen: boolean;
  toggle: () => void;
}

const AddIPAddressModal: React.FC<AddIPAddressModalProps> = ({
  isOpen,
  toggle,
}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<{ ipno: string }>({ ipno: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Regex for IPv4
  const ipRegex =
    /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/;

  const handleFormChange = useCallback((valid: boolean, data: { ipno: string }) => {
    setFormData(data);
    setError(null);
  }, []);

  const handleClose = () => {
    setFormData({ ipno: "" });
    setLoading(false);
    setError(null);
    toggle();
  };

  const handleSubmit = () => {
    const ipno = formData.ipno.trim();

    if (!ipno) {
      setError("IP address is required");
      return;
    }
    if (!ipRegex.test(ipno)) {
      setError("Invalid IP address format");
      return;
    }

    if (loading) return;
    setLoading(true);

    dispatch(addWhitelistedIpApi({ ip_address: ipno }))
      .unwrap()
      .then(() => {
        dispatch(getWhitelistedIpApi());
        handleClose();
      })
      .catch(() => {
        setError("Failed to add IP Address");
      })
      .finally(() => setLoading(false));
  };

  return (
    <BaseModal
      isOpen={isOpen}
      toggle={handleClose}
      title="Add IP Address"
      submitLabel={loading ? "Adding..." : "Add"}
      cancelLabel="Cancel"
      size="md"
      onSubmit={handleSubmit}
      isSubmitDisabled={!ipRegex.test(formData.ipno) || loading}
    >
      {loading ? (
        <>
          {/* Input field skeleton */}
          <Skeleton height={40} className="mb-3" />
          {/* Error text / helper text skeleton */}
          <Skeleton height={20} width={120} />
        </>
      ) : (
        <AddIPAddressForm onChange={handleFormChange} />
      )}

      {/* Error message */}
      {error && !loading && (
        <p className="text-red-500 mt-2 text-sm">{error}</p>
      )}
    </BaseModal>
  );
};

export default AddIPAddressModal;
