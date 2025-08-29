// // // components/common/SkeletonWrapper.tsx
// // import React from "react";
// // import Skeleton from "react-loading-skeleton";
// // import "react-loading-skeleton/dist/skeleton.css";
// // import { Table, Row, Col } from "reactstrap";

// // type SkeletonType = "form" | "table";

// // interface SkeletonWrapperProps {
// //   type: SkeletonType;     // which type of skeleton to render
// //   rows?: number;          // rows for both table & form
// //   columns?: number | string[]; // for table = string[] (headers), for form = number of columns
// // }

// // const SkeletonWrapper: React.FC<SkeletonWrapperProps> = ({
// //   type,
// //   rows = 5,
// //   columns = 2,
// // }) => {
// //   if (type === "table") {
// //     const headers = Array.isArray(columns) ? columns : [];
// //     return (
// //       <div className="table-responsive">
// //         <Table className="align-middle table-nowrap mb-0">
// //           <thead className="table-light">
// //             <tr>
// //               {headers.map((col, idx) => (
// //                 <th key={idx}>{col}</th>
// //               ))}
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {Array.from({ length: rows }).map((_, rowIdx) => (
// //               <tr key={rowIdx}>
// //                 {headers.map((_, colIdx) => (
// //                   <td key={colIdx}>
// //                     <Skeleton height={20} width="80%" />
// //                   </td>
// //                 ))}
// //               </tr>
// //             ))}
// //           </tbody>
// //         </Table>
// //       </div>
// //     );
// //   }

// //   // form skeleton
// //   if (type === "form") {
// //     const colCount = typeof columns === "number" ? columns : 2;
// //     return (
// //       <>
// //         {Array.from({ length: rows }).map((_, rowIdx) => (
// //           <Row className="mb-3" key={rowIdx}>
// //             {Array.from({ length: colCount }).map((_, colIdx) => (
// //               <Col key={colIdx}>
// //                 <Skeleton height={40} width="100%" />
// //               </Col>
// //             ))}
// //           </Row>
// //         ))}
// //       </>
// //     );
// //   }

// //   return null;
// // };

// // export default SkeletonWrapper;






// // components/common/SkeletonWrapper.tsx
// import React from "react";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import { Row, Col } from "reactstrap";

// type SkeletonType = "form" | "table";

// interface SkeletonWrapperProps {
//   type: SkeletonType;     // which type of skeleton to render
//   rows?: number;          // rows for both table & form
//   columns?: number | string[]; // for table = string[] (headers), for form = number of columns
// }

// const SkeletonWrapper: React.FC<SkeletonWrapperProps> = ({
//   type,
//   rows = 5,
//   columns = 2,
// }) => {
//   if (type === "table") {
//     const headers = Array.isArray(columns) ? columns : [];
//     return (
//       <>
//         {Array.from({ length: rows }).map((_, rowIdx) => (
//           <tr key={rowIdx}>
//             {headers.map((_, colIdx) => (
//               <td key={colIdx}>
//                 <Skeleton height={20} width="80%" />
//               </td>
//             ))}
//           </tr>
//         ))}
//       </>
//     );
//   }

//   // form skeleton
//   if (type === "form") {
//     const colCount = typeof columns === "number" ? columns : 2;
//     return (
//       <>
//         {Array.from({ length: rows }).map((_, rowIdx) => (
//           <Row className="mb-3" key={rowIdx}>
//             {Array.from({ length: colCount }).map((_, colIdx) => (
//               <Col key={colIdx}>
//                 <Skeleton height={40} width="100%" />
//               </Col>
//             ))}
//           </Row>
//         ))}
//       </>
//     );
//   }

//   return null;
// };

// export default SkeletonWrapper;




// components/common/SkeletonWrapper.tsx
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Row, Col } from "reactstrap";

type SkeletonType = "form" | "table" | "card" | "tabs";

interface SkeletonWrapperProps {
  type: SkeletonType;
  rows?: number;                  // rows for form/table/card/tabs
  columns?: number | string[];    // form: number of cols, table: string[] headers, tabs: number of tabs
  cardPerRow?: number;            // for card skeleton layout
  cardHeight?: number;            // card height skeleton
}

const SkeletonWrapper: React.FC<SkeletonWrapperProps> = ({
  type,
  rows = 5,
  columns = 2,
  cardPerRow = 3,
  cardHeight = 200,
}) => {
  if (type === "table") {
    const headers = Array.isArray(columns) ? columns : [];
    return (
      <div className="table-responsive">
        <table className="table align-middle table-nowrap mb-0">
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
                    <Skeleton height={20} width="80%" borderRadius={8} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (type === "form") {
    const colCount = typeof columns === "number" ? columns : 2;
    return (
      <>
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <Row className="mb-3" key={rowIdx}>
            {Array.from({ length: colCount }).map((_, colIdx) => (
              <Col key={colIdx}>
                <Skeleton height={40} width="100%" borderRadius={8} />
              </Col>
            ))}
          </Row>
        ))}
      </>
    );
  }

  if (type === "card") {
    const cardsInRow = Array.from({ length: cardPerRow });
    return (
      <>
        {Array.from({ length: rows }).map((_, rowIdx) => (
          <Row className="mb-4" key={rowIdx}>
            {cardsInRow.map((_, cardIdx) => (
              <Col key={cardIdx}>
                <div className="card shadow-sm p-2">
                  <Skeleton height={cardHeight} width="100%" borderRadius={12} />
                  <div className="p-2">
                    <Skeleton height={20} width="60%" />
                    <Skeleton height={15} width="80%" className="mt-2" />
                    <Skeleton height={15} width="50%" className="mt-2" />
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        ))}
      </>
    );
  }

  if (type === "tabs") {
    const tabCount = typeof columns === "number" ? columns : 4;
    return (
      <div className="d-flex gap-3">
        {Array.from({ length: tabCount }).map((_, idx) => (
          <Skeleton key={idx} height={35} width={100} borderRadius={8} />
        ))}
      </div>
    );
  }

  return null;
};

export default SkeletonWrapper;

