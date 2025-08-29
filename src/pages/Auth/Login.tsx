import React, { useState, useEffect } from "react";
import {
  Input,
  Label,
  Form,
  FormGroup,
  Button,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../slices/thunks";
import Spinners from "../../Components/Common/Spinner"; // update path as needed
import type { RootState, AppDispatch } from "../../Store"; // adjust path as needed
import logo from "../../assets/images/logo.svg";
import mfaImage from "../../assets/images/MFA_illustration.svg";
import passwordlessImage from "../../assets/images/Passwordless_illustration.svg";
import { toast } from "react-toastify";

const Login = () => {
  document.title = "Login";
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
const { loading, error, errorMsg } = useSelector(
  (state: RootState) => state.Login
);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [location, setLocation] = useState({ latitude: "", longitude: "" });
  const [browser, setBrowser] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);


  // Get user geolocation
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          latitude: pos.coords.latitude.toString(),
          longitude: pos.coords.longitude.toString(),
        });
      },
      (err) => {
        console.warn("Location error:", err);
      }
    );
  }, []);

  // Get browser info
  useEffect(() => {
    setBrowser(navigator.userAgent);
  }, []);

useEffect(() => {
  const interval = setInterval(() => {
    setCarouselIndex((prev) => (prev === 0 ? 1 : 0));
  }, 5000); // auto switch every 5s

  return () => clearInterval(interval); // cleanup on unmount
}, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const loginData = {
      email,
      password,
      latitude: location.latitude,
      longitude: location.longitude,
      browser,
    };
    console.log("loginData", loginData);
    dispatch(loginUser(loginData, navigate));
  };

useEffect(() => {
  let timer: NodeJS.Timeout;

  if (loading) {
    // start timer when loading begins
    timer = setTimeout(() => {
      toast.warning("Internet seems slow, please wait...");
    }, 5000); // 5 seconds
  }

  return () => clearTimeout(timer);
}, [loading]);


  return (
    <>
      {loading && <Spinners />}
      <div className="auth-page-wrapper justify-content-center align-items-center">
        <div className="bg-overlay" />
        <div className="auth-page-content overflow-hidden pt-lg-5">
          <div className="container-login">
            <div className="row">
              <div className="col-lg-12">
                <div className="card overflow-hidden">
                  <div className="row g-0">
                    {/* Left Side */}
                    <div className="col-lg-7 box-main">
                      <div className="p-lg-5 p-4 content-background">
                        <div className="mb-4">
                          <img src={logo} alt="" height={40} />
                        </div>
                        <div>
                          <h5 className="text-primary">Welcome Back !</h5>
                          <p className="text-muted">
                            Sign in to access your Account.
                          </p>
                        </div>

                        <div className="mt-4">
                          <Form onSubmit={handleSubmit}>
                            <input type="hidden" value={location.latitude} />
                            <input type="hidden" value={location.longitude} />

                            {/* Email */}
                            <FormGroup className="mb-3">
                              <Label htmlFor="email" className="form-label">
                                Username
                              </Label>
                              <Input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="Enter username"
                                autoComplete="off"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                              />
                            </FormGroup>

                            {/* Password */}
                            <FormGroup className="mb-3">
                              <div className="float-end">
                                <a
                                  href="/forgot-password"
                                  className="text-muted"
                                >
                                  Forgot password?
                                </a>
                              </div>
                              <Label htmlFor="password" className="form-label">
                                Password
                              </Label>
                              <div className="position-relative auth-pass-inputgroup mb-3">
                                <Input
                                  type={showPassword ? "text" : "password"}
                                  className="form-control pe-5 password-input"
                                  placeholder="Enter password"
                                  id="password"
                                  name="password"
                                  autoComplete="off"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  required
                                />
                                <i
                                  onClick={() =>
                                    setShowPassword((prev) => !prev)
                                  }
                                  className={`ri-eye${
                                    showPassword ? "-off" : ""
                                  }-fill position-absolute end-0 top-50 translate-middle-y me-3 cursor-pointer text-muted`}
                                  style={{ zIndex: 2 }}
                                ></i>
                              </div>
                            </FormGroup>

                            {/* Remember Me */}
                            <div className="form-check mb-3">
                              <Input
                                className="form-check-input"
                                type="checkbox"
                                id="auth-remember-check"
                                checked={remember}
                                onChange={() => setRemember(!remember)}
                              />
                              <Label
                                className="form-check-label"
                                htmlFor="auth-remember-check"
                              >
                                Remember me
                              </Label>
                            </div>

                            {/* Submit Button */}
                            <div className="mt-4">
                              <small className="locations d-none text-danger" />
                              <Button
                                type="submit"
                                color="success"
                                className="w-100 submit"
                                disabled={loading}
                              >
                                {loading ? (
                                  <>
                                    <span
                                      className="spinner-border spinner-border-sm me-2"
                                      role="status"
                                      aria-hidden="true"
                                    ></span>
                                    Signing In...
                                  </>
                                ) : (
                                  "Sign In"
                                )}
                              </Button>
                            </div>
                          </Form>
                        </div>

                        {/* Signup Footer */}
                        <div className="mt-5 text-center">
                          <p className="mb-0">
                            Don't have an account ?{" "}
                            <a
                              href="/register"
                              className="fw-semibold text-primary text-decoration-underline"
                            >
                              Signup
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right Side Carousel */}
                    <div className="col-lg-5 content-background">
                      <div className="p-lg-5 p-4 auth-one-bg h-100">
                        <div className="position-relative h-100 d-flex flex-column">
                          <div className="mt-auto">
                            <div
                              id="qoutescarouselIndicators"
                              className="carousel slide"
                              data-bs-ride="carousel"
                            >
                              <div className="carousel-indicators ">
                                <button
                                  type="button"
                                  data-bs-target="#qoutescarouselIndicators"
                                  data-bs-slide-to={0}
                                  className={
                                    carouselIndex === 0 ? "active" : ""
                                  }
                                  aria-current={carouselIndex === 0}
                                  aria-label="Slide 1"
                                  onClick={() => setCarouselIndex(0)}
                                />
                                <button
                                  type="button"
                                  data-bs-target="#qoutescarouselIndicators"
                                  data-bs-slide-to={1}
                                  className={
                                    carouselIndex === 1 ? "active" : ""
                                  }
                                  aria-current={carouselIndex === 1}
                                  aria-label="Slide 2"
                                  onClick={() => setCarouselIndex(1)}
                                />
                              </div>

                              <div className="carousel-inner text-center text-white-50 pb-5">
                                <div
                                  className={`carousel-item ${
                                    carouselIndex === 0 ? "active" : ""
                                  }`}
                                >
                                  <img
                                    src={mfaImage}
                                    alt=""
                                    className="golinAA"
                                  />
                                  <h4>MFA for all accounts</h4>
                                  <p className="fs-15 fst-italicAA">
                                    "Move away from risky passwords and
                                    experience one-tap access to Nerotix.
                                    Download and install OneAuth."
                                  </p>
                                </div>

                                <div
                                  className={`carousel-item ${
                                    carouselIndex === 1 ? "active" : ""
                                  }`}
                                >
                                  <img
                                    src={passwordlessImage}
                                    alt=""
                                    className="golinAA"
                                  />
                                  <h4>Passwordless sign-in</h4>
                                  <p className="fs-15 fst-italicAA">
                                    "Secure online accounts with OneAuth 2FA.
                                    Back up OTP secrets and never lose access to
                                    your accounts."
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* End carousel + login form */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <footer className="login-footer">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center">
                  <p className="mb-0 text-muted">
                    &copy; {new Date().getFullYear()}, Nerotix Technologies Pvt.
                    Ltd. All Rights Reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Login;