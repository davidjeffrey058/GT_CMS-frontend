// ResetPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { postFetch } from "../util/postFetch";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await postFetch("http://localhost:4000/api/auth/reset-link", 
        { email });

        if(response.error){
          throw new Error(response.error || "Failed to send reset link");
        }

        setMessage(response.message || "Reset link sent successfully. Please check your email.");
       
      setEmail("");
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex align-items-center justify-content-center">
      <div
        className="card shadow-sm p-4 border-0"
        style={{ width: "100%", maxWidth: "420px" }}
      >
        <div className="text-center mb-4">
          <h2 className="fw-bold">Reset Password</h2>
          <p className="text-muted mb-0">
            Enter your email to receive a password reset link.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">
              Email Address
            </label>

            <input
              type="email"
              className="form-control"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {error && (
            <div className="alert alert-danger py-2" role="alert">
              {error}
            </div>
          )}

          {message && (
            <div className="alert alert-success py-2" role="alert">
              {message}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>

        <div className="text-center mt-3">
          {/* <a href="/login" className="text-decoration-none">
            Back to Login
          </a> */}
          <Link to="/login" className="text-decoration-none">Back to Login</Link>
        </div>
      </div>
    </div>
  );
}