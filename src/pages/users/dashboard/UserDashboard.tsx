import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardBody,
  Button,
  Row,
  Col,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import AddMoneyModal from "../../../Components/modal/user/user-sub_modal/AddMoneyModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../Store";
import { getProductCategories } from "../../../slices/productCategory/thunk";
import { getProducts } from "../../../slices/addProduct/thunk";
import { getProductPricing } from "../../../slices/productPricing/thunk";
import { getWalletApi } from "../../../slices/wallet/thunk";
import SkeletonWrapper from "../../../Components/Common/SkeletonWrapper";

const UserDashboard = () => {
  document.title = "User Dashboard";
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [walletRefreshing, setWalletRefreshing] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);


  const { dropdownList: categories, fetchState: { loading: categoryLoading } } = useSelector(
    (state: RootState) => state.ProductCategory
  );
  const { tableList: products, fetchState: { loading: productLoading } } = useSelector(
    (state: RootState) => state.AddProduct
  );
  const { list: pricingList, fetchState: { loading: pricingLoading } } = useSelector(
    (state: RootState) => state.ProductPrice
  );
  const { wallet, loading: walletLoading, error } = useSelector(
    (state: RootState) => state.Wallet
  );

  const isProductLoading = productLoading || pricingLoading;


  useEffect(() => {
    dispatch(getWalletApi()).catch(err => console.error(err));
    dispatch(getProductCategories({ offset: 0, limit: 10, context: "dropdown" })).catch(err => console.error(err));
  }, [dispatch]);


  useEffect(() => {
    if (categories.length && !activeTab) {
      setActiveTab(categories[0].id);
    }
  }, [categories, activeTab]);


  useEffect(() => {
    if (activeTab) {
      dispatch(getProducts({
        offset: 0,
        limit: 50,
        searchValue: "",
        ProductStatus: "ACTIVE",
        categoryId: activeTab,
        context: "table"
      }))

    }
  }, [dispatch, activeTab]);


  useEffect(() => {
    if (products.length > 0) {
      dispatch(getProductPricing({ offset: 0, limit: 100, searchValue: "" }))
        .catch(err => console.error(err));
    }
  }, [dispatch, products]);


  const handleWalletRefresh = () => {
    setWalletRefreshing(true);
    dispatch(getWalletApi())
      .catch(err => console.error(err))
      .finally(() => setTimeout(() => setWalletRefreshing(false), 1000));
  };

  const handleExploreClick = (product: any) => {
    navigate(`/services/${product.slug}`, { state: { product } });
  };

  return (
    <div className="page-content">
      <Container fluid>

        <Col lg={12}>
          <div className="col-md-6 col-xl-4">
            <div className="card">
              <div className="card-header bg-light">
                <h4 className="card-title text-muted">Nerotix Wallet</h4>
              </div>
              <div className="card-body">
                {(walletLoading && !walletRefreshing) ? (
                  <div className="d-flex">
                    <div className="me-3" style={{ flex: 3 }}>
                      <SkeletonWrapper type="form" rows={3} columns={1} />
                    </div>
                    <div style={{ flex: 2 }}>
                      <SkeletonWrapper type="form" rows={2} columns={1} />
                    </div>
                  </div>
                ) : (
                  <>
                    {error && <p className="text-danger">{error}</p>}
                    <div className="d-flex justify-content-between w-100 align-items-center">
                      <div>
                        <h5 className="card-text text-muted">Total Balance</h5>
                        <h5>₹ <span id="totalAmount">{wallet?.total_balance ?? 0}</span></h5>
                      </div>
                      <button className="btn btn-outline-secondary ms-auto" onClick={toggleModal}>
                        ADD MONEY
                      </button>
                      <AddMoneyModal isOpen={isModalOpen} toggle={toggleModal} />
                    </div>

                    <div className="d-flex justify-content-between w-100 mt-2 mb-0">
                      <div>
                        <span className="text-muted" style={{ fontWeight: '600', color: '#333' }}>
                          Last updated at{" "}<br />
                          <span id="refresh-date" style={{ fontWeight: '400', color: '#000000' }}>
                            {wallet?.updated_at ? new Date(wallet.updated_at).toLocaleString() : "N/A"}
                          </span>
                        </span>
                      </div>
                      <div className="text-center">
                        <i
                          style={{ cursor: "pointer" }}
                          className={classnames(
                            "la la-refresh text-secondary fs-1",
                            { "spin-animation": walletRefreshing || walletLoading }
                          )}
                          onClick={handleWalletRefresh}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
              {!walletLoading && (
                <div className="card-footer bg-light-alt m-0">
                  <div className="d-flex justify-content-between w-100">
                    <span className="text-muted card-text">Lien Balance</span>
                    <span className="card-text">₹ <span id="lien_balance">{wallet?.lien_balance ?? 0}</span></span>
                  </div>
                  <div className="d-flex justify-content-between w-100 mt-2">
                    <span className="text-muted card-text">
                      Free Balance{" "}
                      <span className="badge bg-danger">
                        Expire{" "}{wallet?.balance_expire_at ? new Date(wallet.balance_expire_at).toLocaleDateString() : ""}
                      </span>
                    </span>
                    <span className="card-text">₹ <span id="free_balance">{wallet?.free_balance ?? 0}</span></span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Col>


        <Col lg={12}>
          <div className="mb-2 mt-2">
            <h4 className="text-bold">All Products</h4>
            <p className="text-muted">
              Explore other products that might suit your business needs.
            </p>
          </div>
        </Col>

        <div className="card bg-light">
          <div className="card-header">
            {categoryLoading ? (
              <SkeletonWrapper type="tabs" rows={2} columns={7} />
            ) : (
              <ul className="nav nav-tabs nav-tabs-custom" role="tablist" id="bottom-tab">
                {categories.map((tab: any) => (
                  <li key={tab.id} className="nav-item product_category" data-id={tab.id} role="presentation">
                    <button
                      className={classnames("nav-link", { active: activeTab === tab.id })}
                      onClick={() => setActiveTab(tab.id)}
                      type="button"
                      role="tab"
                      aria-selected={activeTab === tab.id}
                    >
                      {tab.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <CardBody>
            <Row id="product-container">
              {isProductLoading ? (
                <SkeletonWrapper type="card" rows={1} />
              ) : (
                products.map((card: any) => {
                  const pricing = pricingList.find((p) => p.product_id === card.id);
                  return (
                    <Col xxl={3} xl={4} lg={6} className="mb-4" key={card.id}>
                      <Card className="ribbon-box border shadow-none mb-lg-0">
                        <CardBody className="text-muted">
                          <span className="ribbon-three ribbon-three-primary">
                            <span>
                              {pricing?.price || pricing?.price === 0 ? `₹ ${pricing.price}` : "N/A"}
                            </span>
                          </span>
                          <h4 className="card-title mt-4">{card.name}</h4>
                          <p className="card-text text-muted">{card.description}</p>
                          <Button color="primary" outline onClick={() => handleExploreClick(card)}>
                            Explore
                          </Button>
                        </CardBody>
                      </Card>
                    </Col>
                  );
                })
              )}
            </Row>
          </CardBody>
        </div>
      </Container>
    </div>
  );
};

export default UserDashboard;
