import React from "react";
import { Mail, CheckCircle2, ShieldCheck, Clock, X, Inbox, AlertCircle, KeyRound, Server } from "lucide-react";

export default function EmailOtpNotification({
  email,
  isRealSmtp,
  onFetchOtp,
  fetchingOtp = false,
  fetchedCode = null,
  onClose
}) {
  return (
    <div
      id="email-otp-status-card"
      className="w-full bg-slate-900/95 text-white rounded-2xl p-4 sm:p-5 shadow-lg border border-indigo-500/25 my-4 transition-all duration-300 relative overflow-hidden"
    >
      {/* Decorative ambient subtle glow */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-36 h-36 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-36 h-36 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-start justify-between gap-3 relative z-10">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/25 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5 shadow-inner">
            <Mail className="w-5 h-5 animate-pulse text-indigo-300" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1">
                <Inbox className="w-3.5 h-3.5" /> Nodemailer Email Verification
              </span>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                isRealSmtp 
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" 
                  : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
              }`}>
                <CheckCircle2 className="w-3 h-3" /> {isRealSmtp ? "Direct Inbox Delivery" : "Nodemailer Dispatched"}
              </span>
            </div>
            <h4 className="text-sm font-semibold text-white mt-1">
              Verification Code Sent to <span className="text-indigo-300 font-mono underline decoration-indigo-400/50 underline-offset-2">{email}</span>
            </h4>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              We&apos;ve dispatched your 6-digit verification code. Please check your email inbox and spam folder. If your email provider hasn&apos;t delivered the message yet, you can fetch your active code directly from the server below.
            </p>
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            title="Dismiss message"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Fetch OTP from Backend Action Area */}
      {onFetchOtp && (
        <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 relative z-10">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Server className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span>Didn&apos;t receive email?</span>
          </div>

          <div className="flex items-center gap-2">
            {fetchedCode ? (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Active Code:</span>
                <strong className="font-mono text-sm tracking-widest text-white bg-slate-950/70 px-2 py-0.5 rounded border border-emerald-500/30">{fetchedCode}</strong>
              </div>
            ) : (
              <button
                type="button"
                id="notification-fetch-otp-btn"
                onClick={onFetchOtp}
                disabled={fetchingOtp}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer hover:shadow-indigo-500/20"
                title="Fetch verification code directly from the backend"
              >
                <KeyRound className={`w-3.5 h-3.5 ${fetchingOtp ? "animate-spin" : ""}`} />
                <span>{fetchingOtp ? "Fetching Code..." : "Fetch OTP from Server"}</span>
              </button>
            )}
          </div>
        </div>
      )}

      <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-400 relative z-10">
        <div className="flex items-center gap-3.5 flex-wrap">
          <span className="flex items-center gap-1.5 text-slate-300 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Secure Nodemailer Delivery
          </span>
          <span className="flex items-center gap-1.5 text-amber-400 font-medium">
            <Clock className="w-3.5 h-3.5" /> Code expires in 10 minutes
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-slate-400">
          <AlertCircle className="w-3 h-3 text-indigo-400 shrink-0" />
          <span>Keep this window open</span>
        </div>
      </div>
    </div>
  );
}
