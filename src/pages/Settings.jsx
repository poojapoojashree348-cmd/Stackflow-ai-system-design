import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useProject } from "../context/ProjectContext.jsx";
import authService from "../services/authService.js";
import projectService from "../services/projectService.js";
import {
  User,
  Mail,
  Lock,
  Coins,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Send,
  ToggleLeft,
  ToggleRight,
  Server,
  KeyRound
} from "lucide-react";

export function Settings() {
  const { user, updateUser, setCredits, updateOtpSettings, sendTestOtp, fetchOtp } = useAuth();
  const { fetchStats } = useProject();

  const [name, setName] = useState(user?.name || "Developer");
  const [email, setEmail] = useState(user?.email || "demo@stackflow.ai");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [otpEnabled, setOtpEnabled] = useState(user?.otpEnabled ?? true);
  const [otpLoading, setOtpLoading] = useState(false);
  const [testOtpLoading, setTestOtpLoading] = useState(false);
  const [testOtpPreview, setTestOtpPreview] = useState(null);

  // SMTP Settings State
  const [smtpStatus, setSmtpStatus] = useState(null);
  const [smtpHost, setSmtpHost] = useState("smtp.gmail.com");
  const [smtpPort, setSmtpPort] = useState("587");
  const [smtpUser, setSmtpUser] = useState("");
  const [smtpPass, setSmtpPass] = useState("");
  const [smtpLoading, setSmtpLoading] = useState(false);
  const [smtpSuccess, setSmtpSuccess] = useState("");
  const [smtpError, setSmtpError] = useState("");

  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [creditsLoading, setCreditsLoading] = useState(false);

  const [profileSuccess, setProfileSuccess] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [creditsSuccess, setCreditsSuccess] = useState("");
  const [otpSuccess, setOtpSuccess] = useState("");

  const [profileError, setProfileError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [creditsError, setCreditsError] = useState("");
  const [otpError, setOtpError] = useState("");

  useEffect(() => {
    // Load current SMTP configuration status
    authService.getSmtpSettings().then((data) => {
      if (data) {
        setSmtpStatus(data);
        if (data.host) setSmtpHost(data.host);
        if (data.port) setSmtpPort(data.port.toString());
      }
    }).catch(() => {});
  }, []);

  const handleSaveSmtp = async (e) => {
    if (e) e.preventDefault();
    setSmtpSuccess("");
    setSmtpError("");

    if (!smtpUser || !smtpPass) {
      setSmtpError("Please provide your sender email address and password / App Password.");
      return;
    }

    try {
      setSmtpLoading(true);
      const res = await authService.updateSmtpSettings({
        host: smtpHost.trim(),
        port: parseInt(smtpPort, 10),
        user: smtpUser.trim(),
        pass: smtpPass.trim()
      });

      if (res?.success) {
        setSmtpSuccess("SMTP verified successfully! Real OTP emails will now be sent directly from your account.");
        setSmtpStatus(res.status);
        setSmtpPass("");
      }
    } catch (err) {
      setSmtpError(err.message || "Failed to verify SMTP credentials. For Gmail, please use an App Password.");
    } finally {
      setSmtpLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileSuccess("");
    setProfileError("");

    try {
      setProfileLoading(true);
      const res = await authService.updateProfile({ name, email });
      if (res?.user) {
        updateUser(res.user);
        setProfileSuccess("Profile updated successfully.");
      }
    } catch (err) {
      setProfileError(err.message || "Failed to update profile.");
    } finally {
      setProfileLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordSuccess("");
    setPasswordError("");

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters.");
      return;
    }

    try {
      setPasswordLoading(true);
      await authService.changePassword(currentPassword, newPassword);
      setPasswordSuccess("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setPasswordError(err.message || "Failed to change password.");
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleToggleOtp = async () => {
    const nextState = !otpEnabled;
    setOtpSuccess("");
    setOtpError("");

    try {
      setOtpLoading(true);
      const res = await updateOtpSettings(nextState);
      setOtpEnabled(nextState);
      setOtpSuccess(res.message || `Email OTP verification is now ${nextState ? "Enabled" : "Disabled"}.`);
    } catch (err) {
      setOtpError(err.message || "Failed to update OTP security settings.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSendTestOtp = async () => {
    setOtpSuccess("");
    setOtpError("");
    setTestOtpPreview(null);

    try {
      setTestOtpLoading(true);
      const res = await sendTestOtp(user?.email || email);
      setTestOtpPreview({
        isRealSmtp: res?.isRealSmtp,
        otpCode: res?.otpCode
      });
      setOtpSuccess(res?.message || "Verification code dispatched via Nodemailer! Please check your email inbox.");
    } catch (err) {
      setOtpError(err.message || "Failed to send test OTP code.");
    } finally {
      setTestOtpLoading(false);
    }
  };

  const handleResetCredits = async () => {
    setCreditsSuccess("");
    setCreditsError("");
    try {
      setCreditsLoading(true);
      const res = await projectService.reloadCredits();
      if (res?.credits !== undefined) {
        setCredits(res.credits);
        await fetchStats();
        setCreditsSuccess("Credits successfully reset to 100.");
      }
    } catch (err) {
      setCreditsError(err.message || "Failed to reload credits.");
    } finally {
      setCreditsLoading(false);
    }
  };

  const credits = user?.credits ?? 85;

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Account & Security Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
          Configure email OTP verification, credentials, profile information, and AI generation credits.
        </p>
      </div>

      {/* Credit Pool Balance Box */}
      <div className="rounded-xl border border-slate-800 bg-[#0f1422] p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shrink-0">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">AI Generation Credits Pool</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Each system design generation or regeneration costs 1 credit.
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-indigo-400">{credits}</span>
                <span className="text-xs text-slate-400">/ 100 Available Credits</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleResetCredits}
            disabled={creditsLoading}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-center cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${creditsLoading ? "animate-spin" : ""}`} />
            <span>Reset Credits to 100</span>
          </button>
        </div>

        {creditsSuccess && (
          <p className="mt-3 text-xs text-emerald-400 font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> {creditsSuccess}
          </p>
        )}
        {creditsError && (
          <p className="mt-3 text-xs text-rose-400 font-medium flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4" /> {creditsError}
          </p>
        )}
      </div>

      {/* Two-Factor Email OTP Verification */}
      <div className="rounded-xl border border-slate-800 bg-[#0f1422] p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sky-950/40 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <span>Email OTP & Two-Factor Authentication</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                  Active
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Send secure 6-digit one-time passcodes to your email address during sign-in.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleToggleOtp}
            disabled={otpLoading}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              otpEnabled
                ? "bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-950"
                : "bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700"
            }`}
          >
            {otpLoading ? (
              <RefreshCw className="w-4 h-4 animate-spin text-slate-400" />
            ) : otpEnabled ? (
              <ToggleRight className="w-4 h-4 text-emerald-400" />
            ) : (
              <ToggleLeft className="w-4 h-4 text-slate-500" />
            )}
            <span>{otpEnabled ? "OTP Enabled" : "OTP Disabled"}</span>
          </button>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-slate-200">Send Test Verification Code</p>
            <p className="text-[11px] text-slate-400">Trigger verification code dispatch to your email address ({user?.email || email}).</p>
          </div>
          <button
            onClick={handleSendTestOtp}
            disabled={testOtpLoading}
            className="px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{testOtpLoading ? "Sending..." : "Dispatch Test Code"}</span>
          </button>
        </div>

        {otpSuccess && (
          <p className="mt-3 text-xs text-emerald-400 font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 shrink-0" /> {otpSuccess}
          </p>
        )}

        {testOtpPreview && (
          <div className="mt-3 p-3.5 rounded-xl bg-slate-900 border border-indigo-500/30 text-xs text-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">Dispatched to Inbox</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {testOtpPreview.isRealSmtp ? "Live SMTP Server" : "Mailbox Server"}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Check your email inbox ({user?.email || email}) for the 6-digit verification code.
              </p>
            </div>

            {testOtpPreview.otpCode && (
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
                <span>Active Code:</span>
                <strong className="font-mono text-sm tracking-wider text-white bg-slate-950 px-2 py-0.5 rounded border border-emerald-500/20">
                  {testOtpPreview.otpCode}
                </strong>
              </div>
            )}
          </div>
        )}
      </div>

      {/* SMTP Server Configuration Box */}
      <div className="rounded-xl border border-slate-800 bg-[#0f1422] p-5 shadow-xs">
        <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shrink-0">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Live Email Dispatcher (SMTP Server)</h3>
              <p className="text-xs text-slate-400">
                Connect your Gmail or SMTP relay to deliver real OTP emails directly to user inboxes.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {smtpStatus?.configured ? (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Connected ({smtpStatus.user})
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-800 text-slate-400 border border-slate-700">
                Development Mailbox
              </span>
            )}
          </div>
        </div>

        <form onSubmit={handleSaveSmtp} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">SMTP Host</label>
              <input
                type="text"
                value={smtpHost}
                onChange={(e) => setSmtpHost(e.target.value)}
                placeholder="smtp.gmail.com"
                className="w-full px-3 py-2 rounded-lg border border-slate-800 bg-[#0d121f] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Port</label>
              <input
                type="text"
                value={smtpPort}
                onChange={(e) => setSmtpPort(e.target.value)}
                placeholder="587"
                className="w-full px-3 py-2 rounded-lg border border-slate-800 bg-[#0d121f] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Sender Email Address</label>
              <input
                type="email"
                value={smtpUser}
                onChange={(e) => setSmtpUser(e.target.value)}
                placeholder="yourname@gmail.com"
                className="w-full px-3 py-2 rounded-lg border border-slate-800 bg-[#0d121f] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Password or Google App Password
              </label>
              <input
                type="password"
                value={smtpPass}
                onChange={(e) => setSmtpPass(e.target.value)}
                placeholder="16-character App Password"
                className="w-full px-3 py-2 rounded-lg border border-slate-800 bg-[#0d121f] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
            <strong className="text-slate-300">💡 Quick Guide for Gmail:</strong> Go to <span className="text-indigo-400 font-mono">myaccount.google.com/apppasswords</span>, generate a 16-character App Password, and paste it here. All OTP verification codes will be sent directly from your Gmail account to any recipient!
          </div>

          <div className="flex items-center justify-between pt-1">
            {smtpSuccess && (
              <p className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 shrink-0" /> {smtpSuccess}
              </p>
            )}
            {smtpError && (
              <p className="text-xs text-rose-400 font-medium flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" /> {smtpError}
              </p>
            )}
            <button
              type="submit"
              disabled={smtpLoading}
              className="ml-auto px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              {smtpLoading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Verifying SMTP...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verify & Connect SMTP</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Profile Form */}
      <div className="rounded-xl border border-slate-800 bg-[#0f1422] p-5 shadow-xs">
        <h3 className="text-sm font-semibold text-white mb-3">Profile Information</h3>
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-800 bg-[#0d121f] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-800 bg-[#0d121f] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            {profileSuccess && (
              <p className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> {profileSuccess}
              </p>
            )}
            {profileError && (
              <p className="text-xs text-rose-400 font-medium flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" /> {profileError}
              </p>
            )}
            <button
              type="submit"
              disabled={profileLoading}
              className="ml-auto px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              {profileLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>

      {/* Password Form */}
      <div className="rounded-xl border border-slate-800 bg-[#0f1422] p-5 shadow-xs">
        <h3 className="text-sm font-semibold text-white mb-3">Security & Password</h3>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-800 bg-[#0d121f] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-800 bg-[#0d121f] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-800 bg-[#0d121f] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            {passwordSuccess && (
              <p className="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> {passwordSuccess}
              </p>
            )}
            {passwordError && (
              <p className="text-xs text-rose-400 font-medium flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" /> {passwordError}
              </p>
            )}
            <button
              type="submit"
              disabled={passwordLoading}
              className="ml-auto px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              {passwordLoading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings;
