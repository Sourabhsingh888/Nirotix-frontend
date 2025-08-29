// // components/common/TableSkeleton.tsx
// import React from "react";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import { Table } from "reactstrap";

// interface TableSkeletonProps {
//   columns: string[]; // header names
//   rows?: number; // number of skeleton rows
// }

// const TableSkeleton: React.FC<TableSkeletonProps> = ({ columns, rows = 5 }) => {
//   return (
//     <div className="table-responsive">
//       <Table className="align-middle table-nowrap mb-0">
//         <thead className="table-light">
//           <tr>
//             {columns.map((col, idx) => (
//               <th key={idx}>{col}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {Array.from({ length: rows }).map((_, rowIdx) => (
//             <tr key={rowIdx}>
//               {columns.map((_, colIdx) => (
//                 <td key={colIdx}>
//                   <Skeleton height={20} width="80%" />
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default TableSkeleton;



// components/common/SkeletonWrapper.tsx
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Table, Row, Col } from "reactstrap";

type SkeletonType = "form" | "table";

interface SkeletonWrapperProps {
  type: SkeletonType;     // which type of skeleton to render
  rows?: number;          // rows for both table & form
  columns?: number | string[]; // for table = string[] (headers), for form = number of columns
}

const SkeletonWrapper: React.FC<SkeletonWrapperProps> = ({
  type,
  rows = 5,
  columns = 2,
}) => {
  if (type === "table") {
    const headers = Array.isArray(columns) ? columns : [];
    return (
      <div className="table-responsive">
        <Table className="align-middle table-nowrap mb-0">
          <thead className="table-light">
            <tr>
              {headers.map((col, idx) => (
                <th key={idx}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, rowIdx) => (
              <tr key={rowIdx}>
                {headers.map((_, colIdx) => (
                  <td key={colIdx}>
                    <Skeleton height={20} width="80%" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }

  // form skeleton
  if (type === "form") {
    const colCount = typeof columns === "number" ? columns : 2;
    return (
      <>
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <Row className="mb-3" key={rowIdx}>
            {Array.from({ length: colCount }).map((_, colIdx) => (
              <Col key={colIdx}>
                <Skeleton height={40} width="100%" />
              </Col>
            ))}
          </Row>
        ))}
      </>
    );
  }

  return null;
};

export default SkeletonWrapper;