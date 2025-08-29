import React from "react";
import Select, { components } from "react-select";
import { Spinner } from "reactstrap";

interface Option {
  value: number | string;
  label: string;
}

interface InfiniteDropdownProps {
  value: number | string | null;
  options: Option[];
  onChange: (val: number | string | null) => void;
  loadMore: () => void;
  hasMore: boolean;
  loading: boolean;
  placeholder?: string;
  error?: string;
  isDisabled?: boolean; // <-- NEW
}

const InfiniteDropdown: React.FC<InfiniteDropdownProps> = ({
  value,
  options,
  onChange,
  loadMore,
  hasMore,
  loading,
  placeholder,
  error,
  isDisabled = false,
}) => {
  // Find current option object by value
  const selectedOption = options.find((opt) => opt.value === value) || null;

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 5) {
      if (hasMore && !loading) {
        loadMore();
      }
    }
  };

  // Custom MenuList overriding react-select's scroll container
  const MenuList = (props: any) => {
    return (
      <components.MenuList
        {...props}
        innerProps={{ ...props.innerProps, onScroll: handleScroll }}
      >
        {props.children}
        {loading && (
          <div className="text-center p-2">
            <Spinner size="sm" />
          </div>
        )}
        {/* {!hasMore && !loading && options.length > 0 && (
          <div className="text-center p-2 text-muted">No more options</div>
        )} */}
      </components.MenuList>
    );
  };

  return (
    <div>
      <Select
        value={selectedOption}
        onChange={(opt) => onChange(opt ? (opt as Option).value : null)}
        options={options}
        placeholder={placeholder}
        components={{ MenuList }}
        classNamePrefix="react-select"
        menuPlacement="auto"
        menuShouldScrollIntoView={false}
        isDisabled={isDisabled} // <-- APPLY HERE
      />
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};

export default InfiniteDropdown;