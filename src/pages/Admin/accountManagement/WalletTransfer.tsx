import React from "react";
import { Container } from "reactstrap";

//import COmponents
import BreadCrumb from "../../../Components/Common/BreadCrumb";

const WalletTransferPage = () => {
  document.title = "Wallet Transfer";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Wallet Transfer" pageTitle="Account Management" />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default WalletTransferPage;
