import nodemailer, { type Transporter } from "nodemailer";

export interface MailDispatchResult {
  success: boolean;
  messageId?: string;
  previewUrl?: string | false;
  isRealSmtp: boolean;
  error?: string;
}

let cachedTransporter: Transporter | null = null;
let isRealSmtpConfigured = false;
let runtimeSmtpConfig: {
  host?: string;
  port?: number;
  user?: string;
  pass?: string;
  from?: string;
} | null = null;

export function setCustomSmtpConfig(config: {
  host: string;
  port: number;
  user: string;
  pass: string;
  from?: string;
}) {
  runtimeSmtpConfig = config;
  cachedTransporter = null;
  isRealSmtpConfigured = false;
}

export function getSmtpStatus() {
  const host = runtimeSmtpConfig?.host || process.env.SMTP_HOST || process.env.EMAIL_HOST || "smtp.gmail.com";
  const user = runtimeSmtpConfig?.user || process.env.SMTP_USER || process.env.EMAIL_USER;
  const rawPass = runtimeSmtpConfig?.pass || process.env.SMTP_PASS || process.env.EMAIL_PASS || process.env.EMAIL_PASSWORD;
  const configured = Boolean(user && rawPass);

  return {
    configured,
    isRealSmtp: configured,
    host,
    port: runtimeSmtpConfig?.port || parseInt(process.env.SMTP_PORT || "587", 10),
    user: user ? `${user.substring(0, 3)}***@${user.split("@")[1] || "gmail.com"}` : null,
    from: runtimeSmtpConfig?.from || process.env.SMTP_FROM || (user ? `"StackFlow.AI Security" <${user.trim()}>` : "StackFlow.AI Security <noreply@stackflow.ai>")
  };
}

export async function verifySmtp(config: {
  host: string;
  port: number;
  user: string;
  pass: string;
}): Promise<{ valid: boolean; error?: string }> {
  try {
    const cleanUser = config.user.trim();
    const cleanPass = config.pass.replace(/\s+/g, "").trim();

    const testTransporter = nodemailer.createTransport({
      host: config.host || "smtp.gmail.com",
      port: config.port || 587,
      secure: config.port === 465,
      auth: {
        user: cleanUser,
        pass: cleanPass
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    await testTransporter.verify();
    return { valid: true };
  } catch (err: any) {
    return { valid: false, error: err.message || "Failed to verify SMTP credentials" };
  }
}

async function getTransporter(): Promise<{ transporter: Transporter; isRealSmtp: boolean }> {
  const service = process.env.SMTP_SERVICE;
  const host = runtimeSmtpConfig?.host || process.env.SMTP_HOST || process.env.EMAIL_HOST;
  const user = runtimeSmtpConfig?.user || process.env.SMTP_USER || process.env.EMAIL_USER;
  const rawPass = runtimeSmtpConfig?.pass || process.env.SMTP_PASS || process.env.EMAIL_PASS || process.env.EMAIL_PASSWORD;
  const port = runtimeSmtpConfig?.port || parseInt(process.env.SMTP_PORT || process.env.EMAIL_PORT || "587", 10);
  const secure = port === 465 || process.env.SMTP_SECURE === "true";

  // 1. If real SMTP credentials are provided
  if (user && rawPass && user.trim().length > 0 && rawPass.trim().length > 0) {
    const cleanUser = user.trim();
    // Strip spaces from Google App Password (e.g. "mine gafr hwdx imfk" -> "minegafrhwdximfk")
    const cleanPass = cleanUser.endsWith("@gmail.com") ? rawPass.replace(/\s+/g, "").trim() : rawPass.trim();

    if (!cachedTransporter || !isRealSmtpConfigured) {
      const isGmail = cleanUser.endsWith("@gmail.com") || host?.includes("gmail.com") || service === "gmail";
      const transportOptions: any = {
        auth: {
          user: cleanUser,
          pass: cleanPass
        },
        tls: {
          rejectUnauthorized: false
        }
      };

      if (isGmail) {
        transportOptions.service = "gmail";
      } else if (service) {
        transportOptions.service = service;
      } else {
        transportOptions.host = host || "smtp.gmail.com";
        transportOptions.port = port;
        transportOptions.secure = secure;
      }

      cachedTransporter = nodemailer.createTransport(transportOptions);
      isRealSmtpConfigured = true;
      console.log(`[MailService] Initialized real SMTP transport (${isGmail ? "Gmail Service" : `${host || "smtp.gmail.com"}:${port}`}) for user: ${cleanUser}`);
    }
    return { transporter: cachedTransporter, isRealSmtp: true };
  }

  // 2. Fallback: Ethereal test inbox for development/preview environments
  if (!cachedTransporter || isRealSmtpConfigured) {
    try {
      const testAccount = await nodemailer.createTestAccount();
      cachedTransporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
      isRealSmtpConfigured = false;
      console.log(`[MailService] Initialized test mailbox transport (Ethereal: ${testAccount.user})`);
    } catch (err: any) {
      console.warn("[MailService] Failed to create test account, using direct fallback:", err.message);
      cachedTransporter = nodemailer.createTransport({
        jsonTransport: true
      });
      isRealSmtpConfigured = false;
    }
  }

  return { transporter: cachedTransporter, isRealSmtp: isRealSmtpConfigured };
}

export async function sendOtpEmail(
  toEmail: string,
  otpCode: string,
  type: "login" | "register" | "test"
): Promise<MailDispatchResult> {
  const cleanEmail = toEmail.trim().toLowerCase();

  const titleMap = {
    login: "Login Verification Code",
    register: "Verify Your Email Address",
    test: "Security Verification Test"
  };

  const subjectMap = {
    login: `🔐 ${otpCode} is your StackFlow.AI login verification code`,
    register: `✨ ${otpCode} is your StackFlow.AI email verification code`,
    test: `🧪 ${otpCode} is your StackFlow.AI security test code`
  };

  const title = titleMap[type] || "Verification Code";
  const subject = subjectMap[type] || `🔐 ${otpCode} is your StackFlow.AI verification code`;

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 40px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 540px; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01); border: 1px solid #e2e8f0;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%); padding: 36px 32px; text-align: center;">
              <div style="display: inline-block; padding: 10px 16px; background-color: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 12px; margin-bottom: 12px;">
                <span style="color: #ffffff; font-weight: 800; font-size: 20px; letter-spacing: -0.5px;">StackFlow<span style="color: #818cf8;">.AI</span></span>
              </div>
              <h1 style="color: #ffffff; font-size: 22px; font-weight: 700; margin: 0; letter-spacing: -0.5px;">${title}</h1>
              <p style="color: #c7d2fe; font-size: 13px; margin: 6px 0 0 0;">Automated System Architecture Platform</p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 36px 32px;">
              <p style="font-size: 15px; line-height: 1.6; color: #334155; margin: 0 0 18px 0;">
                Hello,
              </p>
              <p style="font-size: 14px; line-height: 1.6; color: #475569; margin: 0 0 24px 0;">
                ${type === "register" 
                  ? "Thank you for creating an account with StackFlow.AI. To activate your account and claim your <strong>100 free system design credits</strong>, please enter the 6-digit verification code below:" 
                  : type === "login" 
                  ? "We received a login request for your account. Please enter the 6-digit verification code below to securely sign in:" 
                  : "Here is your requested security verification test code:"}
              </p>

              <!-- OTP Code Display Card -->
              <div style="background-color: #f8fafc; border: 2px dashed #6366f1; border-radius: 16px; padding: 24px; text-align: center; margin: 28px 0;">
                <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: #6366f1; margin-bottom: 8px;">
                  Your Verification Code
                </div>
                <div style="font-family: 'Courier New', Courier, monospace; font-size: 40px; font-weight: 900; letter-spacing: 10px; color: #1e1b4b; padding: 8px 0; margin-left: 10px;">
                  ${otpCode}
                </div>
                <div style="font-size: 12px; color: #64748b; margin-top: 8px;">
                  ⏱️ Expires in <strong>10 minutes</strong>
                </div>
              </div>

              <!-- Security Information -->
              <div style="background-color: #fffbeb; border-left: 4px solid #f59e0b; padding: 14px 16px; border-radius: 8px; margin: 24px 0;">
                <p style="font-size: 12px; line-height: 1.5; color: #92400e; margin: 0;">
                  <strong>Security Note:</strong> Never share this verification code with anyone. StackFlow.AI team members will never ask for your code.
                </p>
              </div>

              <p style="font-size: 13px; line-height: 1.6; color: #64748b; margin: 24px 0 0 0;">
                If you did not request this verification code, please ignore this email or change your password if you suspect unauthorized access.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 24px 32px; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="font-size: 12px; color: #94a3b8; margin: 0 0 6px 0;">
                Sent to <strong style="color: #64748b;">${cleanEmail}</strong>
              </p>
              <p style="font-size: 11px; color: #cbd5e1; margin: 0;">
                © 2026 StackFlow.AI • Automated Software Architecture Platform
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  const textContent = `
StackFlow.AI — ${title}
==========================================

Your verification code is: ${otpCode}

This code will expire in 10 minutes.
Sent to: ${cleanEmail}

If you did not request this code, you can safely ignore this email.
© 2026 StackFlow.AI
  `.trim();

  try {
    const { transporter, isRealSmtp } = await getTransporter();

    const authUser = runtimeSmtpConfig?.user || process.env.SMTP_USER || process.env.EMAIL_USER;
    const fromAddress = process.env.SMTP_FROM || (authUser ? `"StackFlow.AI Security" <${authUser.trim()}>` : `"StackFlow.AI Security" <noreply@stackflow.ai>`);

    const info = await transporter.sendMail({
      from: fromAddress,
      to: cleanEmail,
      subject,
      text: textContent,
      html: htmlContent
    });

    console.log(`\n================= 📧 DISPATCHED EMAIL OTP =================`);
    console.log(`To: ${cleanEmail}`);
    console.log(`Subject: ${subject}`);
    console.log(`Verification Code: ${otpCode}`);
    console.log(`Mode: ${isRealSmtp ? "Real SMTP Delivery (Direct to inbox via Nodemailer)" : "Sandbox Development Dispatch"}`);
    console.log(`===========================================================\n`);

    return {
      success: true,
      messageId: info.messageId,
      isRealSmtp
    };
  } catch (err: any) {
    console.error("[MailService] Failed to send email:", err);
    return {
      success: false,
      isRealSmtp: false,
      error: err.message || "Failed to dispatch email"
    };
  }
}
