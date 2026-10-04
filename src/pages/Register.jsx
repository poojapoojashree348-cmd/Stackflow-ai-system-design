import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Input from "../components/common/Input.jsx";
import Button from "../components/common/Button.jsx";
import OtpInput from "../components/common/OtpInput.jsx";
import EmailOtpNotification from "../components/common/EmailOtpNotification.jsx";
import { Mail, Lock, User, Layers, Gift, ShieldCheck, ArrowLeft, RefreshCw, KeyRound, CheckCircle2, ArrowRight } from "lucide-react";

export function Register() {
  const [searchParams] = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState(() => searchParams.get("email") || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  // OTP Verification State
  const [step, setStep] = useState("form"); // "form" | "otp"
  const [otpCode, setOtpCode] = useState("");
  const [mailInfo, setMailInfo] = useState(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [isFetchingOtp, setIsFetchingOtp] = useState(false);
  const [fetchedOtp, setFetchedOtp] = useState(null);
  const backendOtpRef = useRef(null);

  const { registerRequestOtp, registerVerifyOtp, resendOtp, fetchOtp } = useAuth();
  const navigate = useNavigate();

  // Resend Countdown Timer
  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleFormSubmit = async (e) => {
    if (e) e.preventDefault();
    setError("");
    setInfoMessage("");

    if (!name.trim() || !email.trim() || !password) {
      setError("Please fill out all required fields.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      const res = await registerRequestOtp(name.trim(), email.trim(), password);
      if (res?.success) {
        if (res.otpCode) {
          backendOtpRef.current = res.otpCode;
        }
        setStep("otp");
        setMailInfo({
          previewUrl: res.previewUrl,
          isRealSmtp: res.isRealSmtp,
          isDemoUser: false
        });
        setOtpCode("");
        setFetchedOtp(null);
        setResendCooldown(45);
        setInfoMessage(res.message || "A 6-digit verification code has been dispatched via Nodemailer.");
      }
    } catch (err) {
      setError(err.message || "Registration failed. Please verify your details.");
    } finally {
      setLoading(false);
    }
  };

  const handleFetchOtpFromBackend = async () => {
    setIsFetchingOtp(true);
    setError("");
    try {
      let code = backendOtpRef.current;
      if (!code) {
        const res = await fetchOtp(email.trim().toLowerCase(), "register");
        code = res?.code;
      }
      if (code) {
        setOtpCode(code);
        setFetchedOtp(code);
        backendOtpRef.current = code;
        setInfoMessage(`Active verification code (${code}) fetched from backend! You can now activate your account.`);
      } else {
        setError("No verification code found in backend. Click Resend Code to generate one.");
      }
    } catch (err) {
      if (backendOtpRef.current) {
        setOtpCode(backendOtpRef.current);
        setFetchedOtp(backendOtpRef.current);
        setInfoMessage(`Active verification code (${backendOtpRef.current}) retrieved from server!`);
      } else {
        setError(err.message || "Unable to fetch OTP from backend. Please click Resend Code.");
      }
    } finally {
      setIsFetchingOtp(false);
    }
  };

  const handleOtpVerifySubmit = async (e) => {
    if (e) e.preventDefault();
    setError("");

    if (!otpCode || otpCode.trim().length !== 6) {
      setError("Please enter the complete 6-digit verification code.");
      return;
    }

    try {
      setLoading(true);
      await registerVerifyOtp(email.trim(), otpCode.trim());
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Invalid or expired verification code.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0 || isResending) return;
    setError("");
    try {
      setIsResending(true);
      const res = await resendOtp(email.trim(), "register");
      if (res?.otpCode) {
        backendOtpRef.current = res.otpCode;
      }
      if (res) {
        setMailInfo({
          previewUrl: res.previewUrl,
          isRealSmtp: res.isRealSmtp,
          isDemoUser: false
        });
      }
      setResendCooldown(60);
      setInfoMessage("A fresh verification code has been dispatched via Nodemailer to your email inbox.");
    } catch (err) {
      setError(err.message || "Failed to resend verification code.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-600/30 mb-3">
          <Layers className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-black tracking-tight text-slate-900">
          Create StackFlow Account
        </h2>
        <p className="mt-1 text-xs text-slate-500 font-medium">
          {step === "otp"
            ? "Verify email address to activate your 100 free design credits"
            : "Get 100 free credits to generate production system designs"}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-sm border border-slate-200/80 rounded-2xl">
          {error && (
            <div id="register-error-alert" className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-medium text-rose-700">
              {error}
            </div>
          )}

          {infoMessage && (
            <div id="register-info-alert" className="mb-5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{infoMessage}</span>
            </div>
          )}

          {step === "form" ? (
            <>
              <div className="mb-5 p-3 rounded-xl bg-indigo-50/80 border border-indigo-100 text-indigo-800 flex items-center gap-2 text-xs">
                <Gift className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Welcome bonus: <strong>100 system design credits</strong> upon email verification!</span>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <Input
                  label="Full Name"
                  type="text"
                  icon={User}
                  required
                  placeholder="Alex Johnson"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <Input
                  label="Email Address"
                  type="email"
                  icon={Mail}
                  required
                  placeholder="alex@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                  label="Password"
                  type="password"
                  icon={Lock}
                  required
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Input
                  label="Confirm Password"
                  type="password"
                  icon={Lock}
                  required
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <Button
                  id="register-continue-btn"
                  type="submit"
                  variant="primary"
                  size="md"
                  loading={loading}
                  className="w-full mt-2"
                >
                  <span>Continue to Email Verification</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </form>

              <div className="mt-6 text-center text-xs text-slate-500">
                Already have an account?{" "}
                <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-700">
                  Sign In
                </Link>
              </div>
            </>
          ) : (
            /* OTP Verification Step for New Account */
            <div className="space-y-4">
              <div className="text-center pb-1">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 mb-2 border border-emerald-100">
                  <KeyRound className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Verify Your Email Address</h3>
                <p className="text-xs text-slate-500 mt-1">
                  We sent a 6-digit activation code to{" "}
                  <strong className="text-slate-800">{email}</strong>
                </p>
              </div>

              {/* Email Dispatch Status */}
              <EmailOtpNotification
                email={email}
                isRealSmtp={mailInfo?.isRealSmtp}
                onFetchOtp={handleFetchOtpFromBackend}
                fetchingOtp={isFetchingOtp}
                fetchedCode={fetchedOtp}
              />

              <form onSubmit={handleOtpVerifySubmit} className="space-y-4">
                <div className="py-2">
                  <label className="block text-center text-xs font-semibold text-slate-600 mb-1">
                    6-Digit Activation Code
                  </label>
                  <OtpInput
                    value={otpCode}
                    onChange={(val) => setOtpCode(val)}
                    disabled={loading}
                    autoFocus={true}
                  />

                  {/* Quick Fetch OTP helper button */}
                  <div className="flex justify-center mt-2.5">
                    <button
                      type="button"
                      id="register-fetch-otp-btn"
                      onClick={handleFetchOtpFromBackend}
                      disabled={isFetchingOtp}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200/80 text-emerald-800 text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                      title="Didn't receive email? Fetch activation code directly from backend"
                    >
                      <KeyRound className={`w-3.5 h-3.5 ${isFetchingOtp ? "animate-spin text-emerald-600" : "text-emerald-600"}`} />
                      <span>{isFetchingOtp ? "Fetching code from server..." : "Can't get code in email? Fetch OTP from backend"}</span>
                    </button>
                  </div>
                </div>

                <Button
                  id="verify-register-otp-btn"
                  type="submit"
                  variant="primary"
                  size="md"
                  loading={loading}
                  disabled={otpCode.length !== 6}
                  className="w-full"
                >
                  <ShieldCheck className="w-4 h-4 mr-1.5" />
                  <span>Verify Email & Activate Account</span>
                </Button>
              </form>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                <button
                  type="button"
                  id="back-to-register-form-btn"
                  onClick={() => {
                    setStep("form");
                    setError("");
                    setInfoMessage("");
                  }}
                  className="inline-flex items-center gap-1 font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Edit Details</span>
                </button>

                <button
                  type="button"
                  id="resend-register-otp-btn"
                  onClick={handleResendOtp}
                  disabled={resendCooldown > 0 || isResending}
                  className={`inline-flex items-center gap-1 font-bold ${
                    resendCooldown > 0
                      ? "text-slate-400 cursor-not-allowed"
                      : "text-indigo-600 hover:text-indigo-700 cursor-pointer"
                  }`}
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isResending ? "animate-spin" : ""}`} />
                  <span>
                    {resendCooldown > 0
                      ? `Resend code in ${resendCooldown}s`
                      : "Resend Code"}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;
