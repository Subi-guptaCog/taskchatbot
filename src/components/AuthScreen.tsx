import React, { useState, useEffect } from "react";
import { UserProfile } from "../types";
import { 
  Chrome, 
  Apple, 
  Facebook, 
  Mail, 
  Phone, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Info, 
  Loader2, 
  KeyRound, 
  CornerDownRight,
  AlertCircle,
  CheckCircle,
  UserPlus,
  LogIn,
  Fingerprint,
  Globe
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AuthScreenProps {
  onLoginSuccess: (user: UserProfile) => void;
}

type AuthMethod = "sso" | "gmail" | "phone";
type AuthProvider = "google" | "apple" | "facebook" | "gmail" | "phone";

// Standard pre-defined team accounts for realistic simulation
const DEFAULT_ACCOUNTS: UserProfile[] = [
  {
    name: "Saurabh Sharma",
    emailOrPhone: "saurabh.sharma@gmail.com",
    provider: "google",
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80"
  },
  {
    name: "Aisha Patel",
    emailOrPhone: "aisha.patel@facebook.com",
    provider: "facebook",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80"
  },
  {
    name: "Rohan Verma",
    emailOrPhone: "rohan.apple@icloud.com",
    provider: "apple",
    avatarUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=120&h=120&q=80"
  },
  {
    name: "Saurabh Kumar",
    emailOrPhone: "+919876543210",
    provider: "phone",
    phoneCountryCode: "+91"
  }
];

export default function AuthScreen({ onLoginSuccess }: AuthScreenProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [method, setMethod] = useState<AuthMethod>("sso");
  const [loadingProvider, setLoadingProvider] = useState<AuthProvider | null>(null);
  
  // Real-world accounts database stored locally
  const [registeredAccounts, setRegisteredAccounts] = useState<UserProfile[]>([]);

  // Load and sync registered account databases from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("task_chatbot_registered_users");
    if (saved) {
      try {
        setRegisteredAccounts(JSON.parse(saved));
      } catch (_) {
        localStorage.setItem("task_chatbot_registered_users", JSON.stringify(DEFAULT_ACCOUNTS));
        setRegisteredAccounts(DEFAULT_ACCOUNTS);
      }
    } else {
      localStorage.setItem("task_chatbot_registered_users", JSON.stringify(DEFAULT_ACCOUNTS));
      setRegisteredAccounts(DEFAULT_ACCOUNTS);
    }
  }, []);

  // Sync to database helper
  const addNewAccount = (newUser: UserProfile) => {
    const updated = [...registeredAccounts, newUser];
    setRegisteredAccounts(updated);
    localStorage.setItem("task_chatbot_registered_users", JSON.stringify(updated));
  };

  // Gmail States
  const [gmailEmail, setGmailEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [gmailError, setGmailError] = useState("");
  const [gmailSuccessMsg, setGmailSuccessMsg] = useState("");

  // Phone States
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpVisible, setOtpVisible] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [phoneSuccessMsg, setPhoneSuccessMsg] = useState("");
  const [otpCountdown, setOtpCountdown] = useState(60);

  // SSO Custom setup modal states
  const [ssoModalOpen, setSsoModalOpen] = useState(false);
  const [ssoPendingProvider, setSsoPendingProvider] = useState<"google" | "apple" | "facebook" | null>(null);
  const [ssoFullName, setSsoFullName] = useState("");
  const [ssoEmail, setSsoEmail] = useState("");
  const [ssoError, setSsoError] = useState("");

  // Active SSO Account picker lists (for Sign In)
  const [ssoPickerProvider, setSsoPickerProvider] = useState<"google" | "apple" | "facebook" | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpVisible && otpCountdown > 0) {
      interval = setInterval(() => {
        setOtpCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpVisible, otpCountdown]);

  // Handle SSO Sign In click
  const handleSSOSignInClick = (provider: "google" | "apple" | "facebook") => {
    // Look up registered accounts for this provider
    const providerUsers = registeredAccounts.filter(p => p.provider === provider);
    
    if (providerUsers.length === 0) {
      // If none registered yet, show an alert with a shortcut to register
      setSsoError(`No accounts registered via this SSO channel. Please select 'Sign Up' above to register a new ${provider.toUpperCase()} account.`);
      // Auto open dynamic modal to register instead
      setSsoPendingProvider(provider);
      setSsoFullName("");
      setSsoEmail(provider === "google" ? "user@gmail.com" : provider === "apple" ? "user@icloud.com" : "user@facebook.com");
      setSsoError("");
      setSsoModalOpen(true);
      return;
    }

    // If accounts exist, trigger a beautiful "Profile Selector" modal
    setSsoPickerProvider(provider);
  };

  // Handle SSO Sign Up click
  const handleSSOSignUpClick = (provider: "google" | "apple" | "facebook") => {
    setSsoPendingProvider(provider);
    setSsoFullName("");
    setSsoEmail(provider === "google" ? "user@gmail.com" : provider === "apple" ? "user@icloud.com" : "user@facebook.com");
    setSsoError("");
    setSsoModalOpen(true);
  };

  // Process and save newly setup SSO credentials
  const handleSSORegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSsoError("");

    if (!ssoFullName.trim()) {
      setSsoError("Please enter your full name.");
      return;
    }
    if (!ssoEmail.trim() || !ssoEmail.includes("@")) {
      setSsoError("Please enter a valid email address.");
      return;
    }

    // Check if duplicate email
    const duplicate = registeredAccounts.find(
      u => u.emailOrPhone.toLowerCase() === ssoEmail.toLowerCase().trim()
    );
    if (duplicate) {
      setSsoError(`Account with email "${ssoEmail}" is already registered via ${duplicate.provider.toUpperCase()}.`);
      return;
    }

    const provider = ssoPendingProvider!;
    setLoadingProvider(provider);
    setSsoModalOpen(false);

    setTimeout(() => {
      // Dynamically select an elegant avatar based on genders or random profile illustration
      const randomId = Math.floor(Math.random() * 70) + 10;
      let avatarUrl = `https://images.unsplash.com/photo-${randomId === 15 ? "1535713875002-d1d0cf377fde" : "1544005313-94ddf0286df2"}?auto=format&fit=crop&w=120&h=120&q=80`;
      if (provider === "apple") avatarUrl = `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80`;

      const newUser: UserProfile = {
        name: ssoFullName.trim(),
        emailOrPhone: ssoEmail.toLowerCase().trim(),
        provider: provider,
        avatarUrl: avatarUrl
      };

      addNewAccount(newUser);
      setLoadingProvider(null);
      onLoginSuccess(newUser);
    }, 1500);
  };

  // Login via Picker Selection
  const handleSelectSsoProfile = (profile: UserProfile) => {
    setSsoPickerProvider(null);
    setLoadingProvider(profile.provider);
    setTimeout(() => {
      setLoadingProvider(null);
      onLoginSuccess(profile);
    }, 1200);
  };

  // Handle Gmail ID (Email) Sign In or Sign Up
  const handleGmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGmailError("");
    setGmailSuccessMsg("");

    const email = gmailEmail.toLowerCase().trim();

    if (!email || !email.endsWith("@gmail.com")) {
      setGmailError("Gmail address must terminate with @gmail.com (e.g., mail@gmail.com)");
      return;
    }

    if (isSignUp) {
      // Sign Up Flow
      if (!fullName.trim()) {
        setGmailError("Your Full Profile Name is required to start registration");
        return;
      }

      // Check if duplicate
      const duplicate = registeredAccounts.find(acc => acc.emailOrPhone.toLowerCase() === email);
      if (duplicate) {
        setGmailError(`This Gmail ID is already registered via channel: "${duplicate.provider.toUpperCase()}". Please switch to 'Sign In' to access your workspace database.`);
        return;
      }

      setLoadingProvider("gmail");
      setTimeout(() => {
        const newUser: UserProfile = {
          name: fullName.trim(),
          emailOrPhone: email,
          provider: "gmail"
        };
        addNewAccount(newUser);
        setLoadingProvider(null);
        onLoginSuccess(newUser);
      }, 1200);

    } else {
      // Sign In Flow
      const account = registeredAccounts.find(
        acc => acc.emailOrPhone.toLowerCase() === email && (acc.provider === "gmail" || acc.provider === "google")
      );

      if (!account) {
        setGmailError(`No active account found for Gmail: "${email}". Double check spelling or click 'Sign Up' above to register this profile.`);
        return;
      }

      setLoadingProvider("gmail");
      setTimeout(() => {
        setLoadingProvider(null);
        onLoginSuccess(account);
      }, 1200);
    }
  };

  // Trigger Local Verification SMS OTP Code for dynamic India phone numbers
  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError("");
    setPhoneSuccessMsg("");

    const cleaned = phoneNumber.replace(/\s+/g, "");
    const indianPhoneRegex = /^[6-9]\d{9}$/;
    
    if (!indianPhoneRegex.test(cleaned)) {
      setPhoneError("Please enter a valid 10-digit Indian mobile phone number (starting digits: 6-9)");
      return;
    }

    const formattedPhone = `+91${cleaned}`;

    if (isSignUp) {
      // Sign Up Flow - verify name and ensure number isn't taken
      if (!fullName.trim()) {
        setPhoneError("Profile registration requires your Full Name.");
        return;
      }

      const duplicate = registeredAccounts.find(acc => acc.emailOrPhone === formattedPhone);
      if (duplicate) {
        setPhoneError(`Mobile number +91 ${cleaned} is already registered. Please go to 'Sign In' instead.`);
        return;
      }
    } else {
      // Sign In Flow - ensure account exists first
      const account = registeredAccounts.find(acc => acc.emailOrPhone === formattedPhone && acc.provider === "phone");
      if (!account) {
        setPhoneError(`The number +91 ${cleaned} has not been registered yet. Please click 'Sign Up' above to create an account.`);
        return;
      }
    }

    setLoadingProvider("phone");
    setTimeout(() => {
      setLoadingProvider(null);
      setOtpVisible(true);
      setOtpCountdown(60);
      setOtpCode("");
      setPhoneSuccessMsg(`SMS cellular token sent to mobile gateway! Test Pin is 111111`);
    }, 1000);
  };

  // Confirm dynamic SMS 6-digit OTP passcode
  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError("");

    if (otpCode !== "111111") {
      setPhoneError("Verification pin incorrect. Hardcoded simulation OTP: 111111");
      return;
    }

    const formattedPhone = `+91${phoneNumber}`;

    setLoadingProvider("phone");
    setTimeout(() => {
      let activeUser: UserProfile;

      if (isSignUp) {
        const newUser: UserProfile = {
          name: fullName.trim(),
          emailOrPhone: formattedPhone,
          provider: "phone",
          phoneCountryCode: "+91"
        };
        addNewAccount(newUser);
        activeUser = newUser;
      } else {
        const found = registeredAccounts.find(acc => acc.emailOrPhone === formattedPhone && acc.provider === "phone");
        activeUser = found || {
          name: `User ${formattedPhone}`,
          emailOrPhone: formattedPhone,
          provider: "phone",
          phoneCountryCode: "+91"
        };
      }

      setLoadingProvider(null);
      onLoginSuccess(activeUser);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#090B0E] flex flex-col items-center justify-center p-4 selection:bg-blue-600/30 selection:text-white">
      {/* Background radial atmosphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Authentication Card */}
      <div 
        id="auth-card-container"
        className="w-full max-w-md bg-[#161B22] border border-[#2D3139] rounded-2xl shadow-2xl relative overflow-hidden z-10"
      >
        {/* Loading Overlay */}
        <AnimatePresence>
          {loadingProvider && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center z-50 animate-pulse"
            >
              <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
                Authorizing Connection
              </h3>
              <p className="text-xs text-[#8B949E] mt-1 pr-4 pl-4 leading-relaxed">
                {loadingProvider === "google" && "Establishing Google SSO handshake..."}
                {loadingProvider === "facebook" && "Verifying Facebook graph identity details..."}
                {loadingProvider === "apple" && "Securing Apple ID cryptographic keys..."}
                {loadingProvider === "gmail" && "Authenticating Gmail database records..."}
                {loadingProvider === "phone" && "Validating Indian Cellular Network gateway..."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Header Identity */}
        <div className="px-6 pt-7 pb-4 text-center border-b border-[#2D3139]/40 bg-[#090B0E]/30">
          <div className="inline-flex items-center justify-center gap-2 mb-2">
            <span className="text-3xl">📋</span>
            <span className="text-lg font-black text-white tracking-tight">TaskChatbot</span>
            <span className="text-[10px] bg-[#2D3139] border border-[#3B82F6]/30 text-blue-400 px-1.5 py-0.5 rounded-md font-mono">
              Premium
            </span>
          </div>
          <h2 className="text-base font-bold text-white tracking-tight mt-1">
            {isSignUp ? "Create your workspace account" : "Sign in to TaskChatbot Workspace"}
          </h2>
          <p className="text-xs text-[#8B949E] mt-1 leading-snug px-3">
            {isSignUp 
              ? "Register via official SSO or dynamic local channels to keep metadata synchronized" 
              : "Access your persistent team logs, workflows, and task databases"
            }
          </p>

          {/* Sign In vs Sign Up mini-pills */}
          <div className="flex bg-[#090B0E] p-1 rounded-lg border border-[#2D3139] mt-4">
            <button
              onClick={() => {
                setIsSignUp(false);
                setPhoneError("");
                setGmailError("");
                setGmailSuccessMsg("");
                setPhoneSuccessMsg("");
                setOtpVisible(false);
              }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                !isSignUp 
                  ? "bg-[#21262D] text-white shadow-sm border border-[#30363D]" 
                  : "text-[#8B949E] hover:text-white"
              }`}
            >
              <div className="flex items-center justify-center gap-1.5">
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </div>
            </button>
            <button
              onClick={() => {
                setIsSignUp(true);
                setPhoneError("");
                setGmailError("");
                setGmailSuccessMsg("");
                setPhoneSuccessMsg("");
                setOtpVisible(false);
              }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                isSignUp 
                  ? "bg-[#21262D] text-white shadow-sm border border-[#30363D]" 
                  : "text-[#8B949E] hover:text-white"
              }`}
            >
              <div className="flex items-center justify-center gap-1.5">
                <UserPlus className="w-3.5 h-3.5" />
                <span>Sign Up</span>
              </div>
            </button>
          </div>
        </div>

        {/* Body content with dynamic tabs */}
        <div className="p-6">
          {/* Channel selector */}
          <div className="grid grid-cols-3 gap-2 mb-4 text-center">
            <button
              onClick={() => {
                setMethod("sso");
                setPhoneError("");
                setGmailError("");
              }}
              className={`py-1.5 px-2 rounded-lg border text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                method === "sso"
                  ? "bg-blue-600/10 border-blue-500 text-blue-400"
                  : "bg-[#090B0E]/60 border-[#2D3139] text-[#8B949E] hover:border-[#8B949E]/40"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>SSO</span>
            </button>
            <button
              onClick={() => {
                setMethod("gmail");
                setPhoneError("");
                setGmailError("");
              }}
              className={`py-1.5 px-2 rounded-lg border text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                method === "gmail"
                  ? "bg-violet-600/10 border-violet-500 text-violet-400"
                  : "bg-[#090B0E]/60 border-[#2D3139] text-[#8B949E] hover:border-[#8B949E]/40"
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Gmail ID</span>
            </button>
            <button
              onClick={() => {
                setMethod("phone");
                setPhoneError("");
                setGmailError("");
              }}
              className={`py-1.5 px-2 rounded-lg border text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                method === "phone"
                  ? "bg-emerald-600/10 border-emerald-500 text-emerald-400"
                  : "bg-[#090B0E]/60 border-[#2D3139] text-[#8B949E] hover:border-[#8B949E]/40"
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Phone</span>
            </button>
          </div>

          <div className="min-h-[224px] flex flex-col justify-between">
            {/* 1. SSO METHODS COLUMN */}
            {method === "sso" && (
              <div className="space-y-3.5 py-1">
                {/* Google SSO */}
                <button
                  id="google-sso-login-btn"
                  onClick={() => isSignUp ? handleSSOSignUpClick("google") : handleSSOSignInClick("google")}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#090B0E] border border-[#2D3139] hover:border-[#4285F4]/60 text-white font-medium text-xs md:text-sm flex items-center gap-3 transition-all cursor-pointer hover:bg-slate-900/60"
                >
                  <div className="w-5 h-5 flex items-center justify-center rounded-lg bg-white/5 border border-white/10">
                    <Chrome className="w-3.5 h-3.5 text-[#4285F4]" />
                  </div>
                  <span className="flex-1 text-left text-[#E0E0E0]">
                    {isSignUp ? "Register securely with Google" : "Continue with Google account"}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#8B949E]" />
                </button>

                {/* Facebook SSO */}
                <button
                  id="facebook-sso-login-btn"
                  onClick={() => isSignUp ? handleSSOSignUpClick("facebook") : handleSSOSignInClick("facebook")}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#090B0E] border border-[#2D3139] hover:border-[#1877F2]/60 text-white font-medium text-xs md:text-sm flex items-center gap-3 transition-all cursor-pointer hover:bg-slate-900/60"
                >
                  <div className="w-5 h-5 flex items-center justify-center rounded-lg bg-[#1877F2]/10 border border-[#1877F2]/30">
                    <Facebook className="w-3.5 h-3.5 text-[#1877F2] fill-[#1877F2]" />
                  </div>
                  <span className="flex-1 text-left text-[#E0E0E0]">
                    {isSignUp ? "Sign up linking with Facebook" : "Continue with Facebook"}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#8B949E]" />
                </button>

                {/* Apple ID SSO */}
                <button
                  id="apple-sso-login-btn"
                  onClick={() => isSignUp ? handleSSOSignUpClick("apple") : handleSSOSignInClick("apple")}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#090B0E] border border-[#2D3139] hover:border-white/50 text-white font-medium text-xs md:text-sm flex items-center gap-3 transition-all cursor-pointer hover:bg-slate-900/60"
                >
                  <div className="w-5 h-5 flex items-center justify-center rounded-lg bg-white/10 border border-white/20">
                    <Apple className="w-3.5 h-3.5 text-white fill-white" />
                  </div>
                  <span className="flex-1 text-left text-[#E0E0E0]">
                    {isSignUp ? "Link cryptographic Apple ID" : "Verify with Apple secure key"}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#8B949E]" />
                </button>

                {/* Display SSO Errors/Prompts inline */}
                {ssoError && (
                  <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-xl flex gap-2 pt-2.5 mt-2">
                    <AlertCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] font-semibold text-white leading-none">Security Routing Notice</p>
                      <p className="text-[10px] text-[#8B949E] leading-relaxed mt-1">{ssoError}</p>
                    </div>
                  </div>
                )}

                <div className="bg-[#090B0E]/60 border border-[#2D3139]/70 rounded-xl p-3 flex gap-2 pt-2.5">
                  <Fingerprint className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-[#8B949E] leading-relaxed">
                    SSO utilizes localized container replication nodes. Signups are immediately preserved in local registry structures.
                  </p>
                </div>
              </div>
            )}

            {/* GMAIL CLIENT-SIDE AUTH EMAIL FORM */}
            {method === "gmail" && (
              <form onSubmit={handleGmailSubmit} className="space-y-3.5 py-1">
                {isSignUp && (
                  <div>
                    <label className="block text-[10px] uppercase font-mono font-bold tracking-wider text-[#8B949E] mb-1.5 text-left">
                      Full Profile Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Saurabh Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3 py-2 bg-[#090B0E] border border-[#2D3139] rounded-lg text-xs md:text-sm text-white focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] outline-none transition-all placeholder-[#8B949E]/40"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-[10px] uppercase font-mono font-bold tracking-wider text-[#8B949E] mb-1.5 text-left">
                    Gmail Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="username@gmail.com"
                      value={gmailEmail}
                      onChange={(e) => {
                        setGmailEmail(e.target.value);
                        setGmailError("");
                        setGmailSuccessMsg("");
                      }}
                      className="w-full pl-9 pr-3 py-2 bg-[#090B0E] border border-[#2D3139] rounded-lg text-xs md:text-sm text-white focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] outline-none transition-all placeholder-[#8B949E]/40"
                    />
                    <Mail className="w-4 h-4 text-[#8B949E]/70 absolute left-3 top-2.5" />
                  </div>
                </div>

                {gmailError && (
                  <div className="flex items-start gap-2 text-rose-400 text-[11px] bg-rose-500/10 border border-rose-500/20 p-2.5 rounded-lg text-left leading-normal">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>{gmailError}</span>
                  </div>
                )}

                {gmailSuccessMsg && (
                  <div className="flex items-start gap-2 text-emerald-400 text-[11px] bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-lg text-left leading-normal">
                    <CheckCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>{gmailSuccessMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs md:text-sm flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer mt-4"
                >
                  <span>{isSignUp ? "Register Account" : "Access Console"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* INDIAN PHONE NUMBER + OTP AUTH */}
            {method === "phone" && (
              <div className="py-1">
                {!otpVisible ? (
                  /* STEP A: REQUEST INDIAN PHONE NUMBER */
                  <form onSubmit={handleSendOTP} className="space-y-3.5">
                    {isSignUp && (
                      <div>
                        <label className="block text-[10px] uppercase font-mono font-bold tracking-wider text-[#8B949E] mb-1.5 text-left">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Saurabh Kumar"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full px-3 py-2 bg-[#090B0E] border border-[#2D3139] rounded-lg text-xs md:text-sm text-white focus:border-[#4ADE80] focus:ring-1 focus:ring-[#4ADE80] outline-none transition-all placeholder-[#8B949E]/40"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-[10px] uppercase font-mono font-bold tracking-wider text-[#8B949E] mb-1.5 text-left">
                        Indian Phone Number (10 Digits)
                      </label>
                      <div className="flex gap-2">
                        <div className="flex items-center gap-1.5 bg-[#090B0E] border border-[#2D3139] px-3 rounded-lg text-xs md:text-sm font-semibold select-none text-[#E0E0E0]">
                          <span>🇮🇳</span>
                          <span className="text-[#8B949E]">+91</span>
                        </div>
                        <div className="relative flex-1">
                          <input
                            type="text"
                            required
                            maxLength={10}
                            placeholder="98765 43210"
                            value={phoneNumber}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\D/g, "");
                              setPhoneNumber(val);
                              setPhoneError("");
                              setPhoneSuccessMsg("");
                            }}
                            className="w-full px-3 py-2 bg-[#090B0E] border border-[#2D3139] rounded-lg text-xs md:text-sm text-white focus:border-[#4ADE80] focus:ring-1 focus:ring-[#4ADE80] outline-none transition-all placeholder-[#8B949E]/40"
                          />
                        </div>
                      </div>
                    </div>

                    {phoneError && (
                      <div className="flex items-start gap-2 text-rose-400 text-[11px] bg-rose-500/10 border border-rose-500/20 p-2.5 rounded-lg text-left leading-normal">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <span>{phoneError}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-2 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs md:text-sm flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer mt-4"
                    >
                      <span>Check & Create OTP Node</span>
                      <ShieldCheck className="w-4 h-4" />
                    </button>
                  </form>
                ) : (
                  /* STEP B: ENTER 6-DIGIT OTP AND VERIFY */
                  <form onSubmit={handleVerifyOTP} className="space-y-3.5">
                    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-3 flex gap-2 text-left">
                      <CornerDownRight className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[11px] text-white font-semibold">
                          OTP Issued to +91 {phoneNumber}
                        </p>
                        <p className="text-[10px] text-[#8B949E] mt-0.5 leading-relaxed">
                          Enter hardcoded OTP code: <strong className="text-emerald-400 font-mono text-xs select-all">111111</strong>
                        </p>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-[10px] uppercase font-mono font-bold tracking-wider text-[#8B949E]">
                          Verification Pin (6 Digits)
                        </label>
                        <span className="text-[10px] font-semibold font-mono text-[#8B949E]">
                          {otpCountdown > 0 ? `Resend in ${otpCountdown}s` : "Code ready to resend"}
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          maxLength={6}
                          placeholder="******"
                          value={otpCode}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "");
                            setOtpCode(val);
                            setPhoneError("");
                          }}
                          className="w-full pl-9 pr-3 py-2 bg-[#090B0E] border border-[#2D3139] rounded-lg text-center font-mono tracking-widest text-sm md:text-base text-emerald-400 focus:border-[#4ADE80] focus:ring-1 focus:ring-[#4ADE80] outline-none transition-all placeholder-[#8B949E]/40"
                        />
                        <KeyRound className="w-4 h-4 text-[#8B949E] absolute left-3 top-2.5" />
                      </div>
                    </div>

                    {phoneError && (
                      <div className="flex items-start gap-2 text-rose-400 text-[11px] bg-rose-500/10 border border-rose-500/20 p-2.5 rounded-lg text-left leading-normal">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <span>{phoneError}</span>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setOtpVisible(false);
                          setPhoneError("");
                        }}
                        className="flex-1 py-1 px-3 bg-[#21262D] border border-[#2D3139] text-[#8B949E] hover:text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                      >
                        Change
                      </button>
                      <button
                        type="submit"
                        className="flex-[2] py-2 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs md:text-sm flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                      >
                        <span>Confirm OTP</span>
                        <ShieldCheck className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer info database sync indicator */}
        <div className="px-6 py-4 bg-[#090B0E]/60 border-t border-[#2D3139]/40 flex items-center justify-center gap-2 text-[10px] text-[#8B949E]/80 selection:bg-transparent">
          <Globe className="w-3.5 h-3.5 text-blue-500/80 animate-pulse" />
          <span>Registered: {registeredAccounts.length} profiles locally persistent.</span>
        </div>
      </div>

      {/* ----------------- SUB-MODALS (SSO CREATION / SELECTORS) ----------------- */}

      {/* MODAL A: REGISTERING SSO PROFILE DETAILS ON SIGN UP */}
      <AnimatePresence>
        {ssoModalOpen && (
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-sm bg-[#161B22] border border-[#2D3139] rounded-2xl p-6 shadow-2xl relative"
            >
              <div className="text-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-400 mx-auto flex items-center justify-center mb-2.5">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Link {ssoPendingProvider?.toUpperCase()} SSO
                </h3>
                <p className="text-xs text-[#8B949E] mt-1 leading-snug">
                  Please specify your credentials to build your workspace profile identity
                </p>
              </div>

              <form onSubmit={handleSSORegisterSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-[10px] uppercase font-mono font-bold tracking-wider text-[#8B949E] mb-1.5">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Saurabh Sharma"
                    value={ssoFullName}
                    onChange={(e) => setSsoFullName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#090B0E] border border-[#2D3139] rounded-lg text-xs md:text-sm text-white focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] outline-none transition-all placeholder-[#8B949E]/40"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono font-bold tracking-wider text-[#8B949E] mb-1.5">
                    Authorized {ssoPendingProvider?.toUpperCase()} Email ID
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="username@gmail.com"
                    value={ssoEmail}
                    onChange={(e) => setSsoEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-[#090B0E] border border-[#2D3139] rounded-lg text-xs md:text-sm text-white focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] outline-none transition-all placeholder-[#8B949E]/40"
                  />
                </div>

                {ssoError && (
                  <div className="flex items-start gap-2 text-rose-400 text-[11px] bg-rose-500/10 border border-rose-500/20 p-2.5 rounded-lg text-left leading-normal">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>{ssoError}</span>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setSsoModalOpen(false)}
                    className="flex-1 py-2 px-3 bg-[#21262D] border border-[#2D3139] hover:border-white/20 text-[#8B949E] hover:text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-[2] py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs md:text-sm flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                  >
                    <span>Authenticate SSO</span>
                    <ShieldCheck className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL B: SELECT REGISTERED SSO ACCOUNT ON SIGN IN */}
      <AnimatePresence>
        {ssoPickerProvider && (
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-sm bg-[#161B22] border border-[#2D3139] rounded-2xl p-6 shadow-2xl relative"
            >
              <div className="text-center mb-4">
                <div className="inline-flex gap-2 p-1 px-3 bg-[#090B0E] border border-[#3B82F6]/20 text-[#3B82F6] rounded-full text-xs font-mono font-bold mb-2">
                  <span>🔐 SSO Identity Node</span>
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Select {ssoPickerProvider.toUpperCase()} Profile
                </h3>
                <p className="text-xs text-[#8B949E] mt-1 leading-snug">
                  Choose a saved profile identity to authorize direct workspace access
                </p>
              </div>

              <div className="space-y-2 max-h-56 overflow-y-auto mb-4 pr-1">
                {registeredAccounts
                  .filter(acc => acc.provider === ssoPickerProvider)
                  .map((profile, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectSsoProfile(profile)}
                      className="w-full p-2.5 rounded-xl bg-[#090B0E] border border-[#2D3139] hover:border-blue-500 text-left flex items-center gap-3 transition-all cursor-pointer group"
                    >
                      {profile.avatarUrl ? (
                        <img 
                          src={profile.avatarUrl} 
                          alt={profile.name} 
                          referrerPolicy="no-referrer"
                          className="w-9 h-9 rounded-full object-cover border border-[#2D3139] group-hover:border-blue-500/50" 
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 font-bold flex items-center justify-center text-xs uppercase">
                          {profile.name.charAt(0)}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                          {profile.name}
                        </p>
                        <p className="text-[10px] text-[#8B949E] truncate">
                          {profile.emailOrPhone}
                        </p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#8B949E] group-hover:text-blue-400 transition-colors" />
                    </button>
                  ))}
              </div>

              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    // Switch to Sign Up for this provider
                    setIsSignUp(true);
                    setSsoPickerProvider(null);
                    handleSSOSignUpClick(ssoPickerProvider);
                  }}
                  className="w-full py-2 bg-blue-600/10 border border-blue-500/20 text-blue-400 hover:bg-blue-600/20 hover:text-white rounded-lg text-xs font-semibold cursor-pointer text-center transition-all"
                >
                  Create New {ssoPickerProvider.toUpperCase()} Profile
                </button>
                <button
                  type="button"
                  onClick={() => setSsoPickerProvider(null)}
                  className="w-full py-1.5 text-[#8B949E] hover:text-white text-xs font-semibold cursor-pointer text-center transition-all bg-transparent"
                >
                  Back
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
