// ResetPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");


    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setMessage(
        "If an account exists with this email, a password reset link has been sent."
      );

      setPassword("");
    } catch (err) {
      setError("Something went wrong. Please try again.");
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
          <h2 className="fw-bold">Change Password</h2>
          <p className="text-muted mb-0">
            Enter your new password.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">
              New Password
            </label>

            <input
              type="password"
              className="form-control"
              placeholder="password here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                Changing...
              </>
            ) : (
              "Change Password"
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