import React, { useRef, useEffect } from "react";

export default function OtpInput({ value = "", onChange, length = 6, disabled = false, autoFocus = true }) {
  const inputRefs = useRef([]);

  // Ensure refs array has right size
  inputRefs.current = inputRefs.current.slice(0, length);

  const otpArray = value.split("").slice(0, length);
  while (otpArray.length < length) {
    otpArray.push("");
  }

  useEffect(() => {
    if (autoFocus && inputRefs.current[0] && !disabled) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus, disabled]);

  const handleChange = (e, index) => {
    const val = e.target.value;
    // Keep only numbers
    const cleanDigits = val.replace(/\D/g, "");

    if (!cleanDigits) {
      // Clear current cell
      const newOtp = [...otpArray];
      newOtp[index] = "";
      onChange(newOtp.join(""));
      return;
    }

    if (cleanDigits.length === 1) {
      const newOtp = [...otpArray];
      newOtp[index] = cleanDigits;
      const combined = newOtp.join("");
      onChange(combined);

      // Advance focus to next cell
      if (index < length - 1 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    } else {
      // Multiple digits entered (e.g. pasted into single input)
      handlePasteValue(cleanDigits, index);
    }
  };

  const handlePasteValue = (pastedText, startIndex = 0) => {
    const digits = pastedText.replace(/\D/g, "").slice(0, length - startIndex);
    if (!digits) return;

    const newOtp = [...otpArray];
    for (let i = 0; i < digits.length; i++) {
      if (startIndex + i < length) {
        newOtp[startIndex + i] = digits[i];
      }
    }

    const combined = newOtp.join("");
    onChange(combined);

    const nextIndex = Math.min(startIndex + digits.length, length - 1);
    if (inputRefs.current[nextIndex]) {
      inputRefs.current[nextIndex].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otpArray[index] && index > 0 && inputRefs.current[index - 1]) {
        // Move to previous and clear
        inputRefs.current[index - 1].focus();
        const newOtp = [...otpArray];
        newOtp[index - 1] = "";
        onChange(newOtp.join(""));
      } else {
        const newOtp = [...otpArray];
        newOtp[index] = "";
        onChange(newOtp.join(""));
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    handlePasteValue(pastedData, 0);
  };

  return (
    <div id="otp-input-container" className="flex items-center justify-center gap-2 sm:gap-3 my-3">
      {Array.from({ length }).map((_, index) => {
        const isFilled = !!otpArray[index];
        return (
          <input
            key={index}
            id={`otp-box-${index}`}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={otpArray[index]}
            disabled={disabled}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            className={`w-11 h-13 sm:w-13 sm:h-14 text-center text-xl sm:text-2xl font-bold font-mono rounded-xl border transition-all shadow-xs outline-none ${
              isFilled
                ? "border-blue-600 bg-blue-50/40 text-blue-900 ring-2 ring-blue-500/20"
                : "border-slate-300 bg-white text-slate-900 hover:border-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
            } ${disabled ? "opacity-50 cursor-not-allowed bg-slate-100" : ""}`}
            autoComplete="one-time-code"
          />
        );
      })}
    </div>
  );
}
