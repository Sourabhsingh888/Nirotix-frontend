// import React, { useState, useEffect } from "react";
// import { Dropdown, DropdownToggle, DropdownMenu, Button } from "reactstrap";

// type Option = {
//   label: string;
//   value: string;
// };

// interface Props {
//   label?: string;
//   options: Option[];
//   value: Option[]; // controlled value from parent
//   onApply: (selected: Option[]) => void;
// }

// const MultiSelectWithApply: React.FC<Props> = ({ options, value, onApply }) => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [tempSelected, setTempSelected] = useState<Option[]>([]);

//   useEffect(() => {
//     // Keep temp in sync with parent value whenever it changes
//     setTempSelected(value);
//   }, [value]);

//   const toggle = () => {
//     if (!dropdownOpen) {
//       setTempSelected(value);
//     }
//     setDropdownOpen(!dropdownOpen);
//   };

//   const handleCheck = (option: Option) => {
//     if (option.value === "All") {
//       if (tempSelected.find((s) => s.value === "All")) {
//         setTempSelected([]);
//       } else {
//         setTempSelected([option]);
//       }
//     } else {
//       const already = tempSelected.find((s) => s.value === option.value);
//       if (already) {
//         setTempSelected(tempSelected.filter((s) => s.value !== option.value));
//       } else {
//         setTempSelected([
//           ...tempSelected.filter((s) => s.value !== "All"),
//           option,
//         ]);
//       }
//     }
//   };

//   const applySelection = () => {
//     onApply(tempSelected);
//     setDropdownOpen(false);
//   };

//   const removeTag = (value: string) => {
//     const updated =
//       value === "All" ? [] : tempSelected.filter((s) => s.value !== value);
//     onApply(updated);
//   };

//   const clearAll = () => {
//     onApply([]);
//   };

//   return (
//     <div className="w-100">
//       <Dropdown isOpen={dropdownOpen} toggle={toggle} isMulti>
//         <DropdownToggle caret className="w-100 text-start py-2 form-select">
//           {value.length > 0 ? value.map((s) => s.label).join(", ") : "All"}
//         </DropdownToggle>
//         <DropdownMenu className="p-2 w-100">
//           {options.map((option) => {
//             const id = `chk-${option.value}`;
//             return (
//               <div
//                 key={option.value}
//                 className="d-flex align-items-center mb-1"
//               >
//                 <input
//                   id={id}
//                   type="checkbox"
//                   checked={!!tempSelected.find((s) => s.value === option.value)}
//                   onChange={() => handleCheck(option)}
//                 />
//                 <label htmlFor={id} className="ms-2 mb-0">
//                   {option.label}
//                 </label>
//               </div>
//             );
//           })}
//           <Button
//             color="success"
//             size="sm"
//             className="mt-2 w-100"
//             onClick={applySelection}
//           >
//             Apply
//           </Button>
//         </DropdownMenu>
//       </Dropdown>

//       {value.length > 0 && (
//         <div className="d-flex align-items-center flex-wrap mt-2 p-2 border rounded">
//           <strong className="me-2">Status: </strong>
//           {value.map((s) => (
//             <span
//               key={s.value}
//               className="badge bg-light text-dark border me-2"
//               style={{ cursor: "pointer" }}
//               onClick={() => removeTag(s.value)}
//             >
//               {s.label} <i className="ri-close-line ms-1"></i>
//             </span>
//           ))}
//           <Button
//             color="link"
//             size="sm"
//             className="text-danger p-0"
//             onClick={clearAll}
//           >
//             <i className="ri-delete-bin-line me-1"></i> Clear
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MultiSelectWithApply;



import React, { useState, useEffect } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, Button } from "reactstrap";

type Option = {
  label: string;
  value: string;
};

interface Props {
  label?: string;
  options: Option[];
  value: Option[]; // controlled value from parent
  onApply: (selected: Option[]) => void;
}

const MultiSelectWithApply: React.FC<Props> = ({
  label,
  options,
  value,
  onApply,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [tempSelected, setTempSelected] = useState<Option[]>([]);

  useEffect(() => {
    // Sync with parent whenever value changes
    setTempSelected(value);
  }, [value]);

  const toggle = () => {
    if (!dropdownOpen) {
      // Reset temp when opening
      setTempSelected(value);
    }
    setDropdownOpen(!dropdownOpen);
  };

  const handleCheck = (option: Option) => {
    if (option.value === "All") {
      if (tempSelected.find((s) => s.value === "All")) {
        setTempSelected([]);
      } else {
        setTempSelected([option]);
      }
    } else {
      const already = tempSelected.find((s) => s.value === option.value);
      if (already) {
        setTempSelected(tempSelected.filter((s) => s.value !== option.value));
      } else {
        setTempSelected([
          ...tempSelected.filter((s) => s.value !== "All"), // remove "All" if specific selected
          option,
        ]);
      }
    }
  };

  const applySelection = () => {
    onApply(tempSelected);
    setDropdownOpen(false);
  };

  const removeTag = (val: string) => {
    const updated =
      val === "All" ? [] : tempSelected.filter((s) => s.value !== val);
    onApply(updated);
  };

  const clearAll = () => {
    onApply([]);
  };

  return (
    <div className="w-100">
      {label && <label className="form-label">{label}</label>}
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret className="w-100 text-start py-2 form-select">
          {value.length > 0 ? value.map((s) => s.label).join(", ") : "All"}
        </DropdownToggle>
        <DropdownMenu className="p-2 w-100">
          {options.map((option) => {
            const id = `chk-${option.value}`;
            return (
              <div
                key={option.value}
                className="d-flex align-items-center mb-1"
              >
                <input
                  id={id}
                  type="checkbox"
                  checked={!!tempSelected.find((s) => s.value === option.value)}
                  onChange={() => handleCheck(option)}
                />
                <label htmlFor={id} className="ms-2 mb-0">
                  {option.label}
                </label>
              </div>
            );
          })}
          <Button
            color="success"
            size="sm"
            className="mt-2 w-100"
            onClick={applySelection}
          >
            Apply
          </Button>
        </DropdownMenu>
      </Dropdown>

      {value.length > 0 && (
        <div className="d-flex align-items-center flex-wrap mt-2 p-2 border rounded">
          <strong className="me-2">Status: </strong>
          {value.map((s) => (
            <span
              key={s.value}
              className="badge bg-light text-dark border me-2"
              style={{ cursor: "pointer" }}
              onClick={() => removeTag(s.value)}
            >
              {s.label} <i className="ri-close-line ms-1"></i>
            </span>
          ))}
          <Button
            color="link"
            size="sm"
            className="text-danger p-0"
            onClick={clearAll}
          >
            <i className="ri-delete-bin-line me-1"></i> Clear
          </Button>
        </div>
      )}
    </div>
  );
};

export default MultiSelectWithApply;

