import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Input from "../components/common/Input.jsx";
import Button from "../components/common/Button.jsx";
import OtpInput from "../components/common/OtpInput.jsx";
import EmailOtpNotification from "../components/common/EmailOtpNotification.jsx";
import { Mail, Lock, Sparkles, Layers, ArrowRight, ShieldCheck, ArrowLeft, RefreshCw, KeyRound, CheckCircle2, UserPlus, AlertCircle } from "lucide-react";

export function Login() {
  const [email, setEmail] = useState("demo@stackflow.ai");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [notRegisteredEmail, setNotRegisteredEmail] = useState("");
  const [flowType, setFlowType] = useState("login"); // "login" | "register"

  // OTP Verification State
  const [step, setStep] = useState("credentials"); // "credentials" | "otp"
  const [otpCode, setOtpCode] = useState("");
  const [mailInfo, setMailInfo] = useState(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [isFetchingOtp, setIsFetchingOtp] = useState(false);
  const [fetchedOtp, setFetchedOtp] = useState(null);
  const backendOtpRef = useRef(null);

  const { login, loginVerifyOtp, resendOtp, fetchOtp, registerRequestOtp, registerVerifyOtp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

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

  const handleCredentialsSubmit = async (e) => {
    if (e) e.preventDefault();
    setError("");
    setInfoMessage("");
    setNotRegisteredEmail("");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      const effectivePassword = password && password.trim() ? password : "password123";
      const res = await login(email.trim().toLowerCase(), effectivePassword);

      if (res?.requiresOtp) {
        // Switch to OTP verification step
        if (res.otpCode) {
          backendOtpRef.current = res.otpCode;
        }
        setFlowType("login");
        setStep("otp");
        setMailInfo({
          previewUrl: res.previewUrl,
          isRealSmtp: res.isRealSmtp,
          isDemoUser: false
        });
        setOtpCode("");
        setFetchedOtp(null);
        setResendCooldown(45);
        setInfoMessage(res.message || "A 6-digit verification code was dispatched via Nodemailer.");
      } else if (res?.user) {
        // Direct login
        navigate(from, { replace: true });
      }
    } catch (err) {
      if (err.data?.notRegistered || err.message?.includes("No account found") || err.message?.includes("not found")) {
        setNotRegisteredEmail(email.trim().toLowerCase());
      }
      setError(err.message || "Failed to sign in. Please verify your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleDirectRegisterFromLogin = async () => {
    setError("");
    setInfoMessage("");
    setLoading(true);
    const targetEmail = notRegisteredEmail || email.trim().toLowerCase();

    try {
      const defaultName = targetEmail.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) || "Developer";
      const pwd = password && password.length >= 6 ? password : "password123";
      const res = await registerRequestOtp(defaultName, targetEmail, pwd);

      if (res?.otpCode) {
        backendOtpRef.current = res.otpCode;
      }
      setFlowType("register");
      setStep("otp");
      setMailInfo({
        previewUrl: res?.previewUrl,
        isRealSmtp: res?.isRealSmtp,
        isDemoUser: false
      });
      setOtpCode("");
      setFetchedOtp(null);
      setResendCooldown(45);
      setInfoMessage(res?.message || `A 6-digit verification code has been dispatched via Nodemailer to ${targetEmail}.`);
    } catch (err) {
      setError(err.message || "Failed to initiate registration.");
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
        const res = await fetchOtp(email.trim().toLowerCase(), flowType);
        code = res?.code;
      }
      if (code) {
        setOtpCode(code);
        setFetchedOtp(code);
        backendOtpRef.current = code;
        setInfoMessage(`Active verification code (${code}) fetched from backend! You can now sign in.`);
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
      if (flowType === "register") {
        await registerVerifyOtp(email, otpCode.trim());
      } else {
        await loginVerifyOtp(email, otpCode.trim());
      }
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Invalid or expired OTP code.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0 || isResending) return;
    setError("");
    try {
      setIsResending(true);
      const res = await resendOtp(email, flowType);
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

  const handleQuickDemoLogin = async () => {
    setEmail("demo@stackflow.ai");
    setPassword("password123");
    setError("");
    setInfoMessage("");
    setNotRegisteredEmail("");

    try {
      setLoading(true);
      const res = await login("demo@stackflow.ai", "password123");
      if (res?.requiresOtp) {
        setFlowType("login");
        setStep("otp");
        setMailInfo({
          previewUrl: res.previewUrl,
          isRealSmtp: res.isRealSmtp,
          isDemoUser: false
        });
        setOtpCode("");
        setResendCooldown(45);
        setInfoMessage("Verification code dispatched via Nodemailer! Please check your email inbox.");
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      setError(err.message || "Demo login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-['Plus_Jakarta_Sans',sans-serif]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-600/30 mb-3">
          <Layers className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-black tracking-tight text-slate-900">
          StackFlow<span className="text-indigo-600">.AI</span>
        </h2>
        <p className="mt-1 text-xs text-slate-500 font-medium">
          {step === "otp"
            ? "Two-Factor Email Verification"
            : "Sign in to your AI System Design & Architecture suite"}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        {/* Navigation Tabs */}
        <div className="flex rounded-xl bg-slate-200/80 p-1 mb-4 shadow-inner">
          <button
            type="button"
            className="flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all bg-white text-slate-900 shadow-xs cursor-pointer"
          >
            Sign In
          </button>
          <Link
            to={email && email !== "demo@stackflow.ai" ? `/register?email=${encodeURIComponent(email)}` : "/register"}
            className="flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 transition-all text-center"
          >
            Create Account
          </Link>
        </div>

        <div className="bg-white py-8 px-6 sm:px-10 shadow-sm border border-slate-200/80 rounded-2xl">
          {error && (
            <div id="login-error-alert" className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-medium text-rose-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {notRegisteredEmail && (
            <div className="mb-5 p-4 rounded-xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-950 space-y-2.5 animate-fadeIn">
              <div className="flex items-center gap-2 font-bold text-indigo-900">
                <UserPlus className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Account Not Registered Yet</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                There is no existing account for <strong className="text-slate-900 font-semibold">{notRegisteredEmail}</strong>. Would you like to create this account now and receive your 6-digit OTP code?
              </p>
              <div className="flex flex-col gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleDirectRegisterFromLogin}
                  disabled={loading}
                  className="w-full py-2.5 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Create Account & Send OTP to {notRegisteredEmail}</span>
                </button>
                <Link
                  to={`/register?email=${encodeURIComponent(notRegisteredEmail)}`}
                  className="w-full py-2 px-3 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 font-medium text-xs text-center transition-colors"
                >
                  Go to Standard Registration Form
                </Link>
              </div>
            </div>
          )}

          {infoMessage && (
            <div id="login-info-alert" className="mb-5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{infoMessage}</span>
            </div>
          )}

          {step === "credentials" ? (
            <>
              <form onSubmit={handleCredentialsSubmit} className="space-y-4">
                <Input
                  label="Email Address"
                  type="email"
                  icon={Mail}
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (notRegisteredEmail && e.target.value !== notRegisteredEmail) {
                      setNotRegisteredEmail("");
                      setError("");
                    }
                  }}
                />

                <Input
                  label="Password (Optional)"
                  type="password"
                  icon={Lock}
                  required={false}
                  placeholder="Enter password or leave empty for OTP"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-2.5 text-xs text-slate-600">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Protected by <strong>Two-Factor Email OTP Verification</strong></span>
                </div>

                <Button
                  id="sign-in-submit-btn"
                  type="submit"
                  variant="primary"
                  size="md"
                  loading={loading}
                  className="w-full mt-2"
                >
                  <span>Continue to Verification</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </form>

              {/* Quick Demo Fill Shortcut */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  id="demo-quick-login-btn"
                  onClick={handleQuickDemoLogin}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100/70 border border-indigo-200/80 text-indigo-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>Instant 1-Click Demo Login (85 Credits)</span>
                </button>
              </div>

              <div className="mt-6 text-center text-xs text-slate-500">
                Don&apos;t have an account?{" "}
                <Link
                  to={email && email !== "demo@stackflow.ai" ? `/register?email=${encodeURIComponent(email)}` : "/register"}
                  className="font-bold text-indigo-600 hover:text-indigo-700"
                >
                  Create an account
                </Link>
              </div>
            </>
          ) : (
            /* OTP Verification Step */
            <div className="space-y-4">
              <div className="text-center pb-1">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-600 mb-2 border border-blue-100">
                  <KeyRound className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Enter Security Code</h3>
                <p className="text-xs text-slate-500 mt-1">
                  We sent a 6-digit verification code to{" "}
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
                    6-Digit Verification Code
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
                      id="login-fetch-otp-btn"
                      onClick={handleFetchOtpFromBackend}
                      disabled={isFetchingOtp}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/80 text-indigo-700 text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                      title="Didn't receive email? Fetch verification code directly from backend"
                    >
                      <KeyRound className={`w-3.5 h-3.5 ${isFetchingOtp ? "animate-spin text-indigo-600" : "text-indigo-600"}`} />
                      <span>{isFetchingOtp ? "Fetching OTP from server..." : "Can't get code in email? Fetch OTP from backend"}</span>
                    </button>
                  </div>
                </div>

                <Button
                  id="verify-otp-submit-btn"
                  type="submit"
                  variant="primary"
                  size="md"
                  loading={loading}
                  disabled={otpCode.length !== 6}
                  className="w-full"
                >
                  <ShieldCheck className="w-4 h-4 mr-1.5" />
                  <span>Verify Code & Sign In</span>
                </Button>
              </form>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                <button
                  type="button"
                  id="back-to-credentials-btn"
                  onClick={() => {
                    setStep("credentials");
                    setError("");
                    setInfoMessage("");
                  }}
                  className="inline-flex items-center gap-1 font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  id="resend-otp-btn"
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

export default Login;
