import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Mail,
  Lock,
  User as UserIcon,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RefreshCw,
  ArrowLeft,
} from 'lucide-react';
import { EuclidUser } from '../types';
import { authService, AuthStatus } from '../services/authService';

interface AuthScreenProps {
  onAuthenticated: (user: EuclidUser) => void;
  isLoadingSession?: boolean;
}

type AuthMode = 'select' | 'signin' | 'signup' | 'forgot_password';

export const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthenticated, isLoadingSession = false }) => {
  const [mode, setMode] = useState<AuthMode>('select');

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  // States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showLegalModal, setShowLegalModal] = useState<'privacy' | 'terms' | null>(null);

  // Subscribe to central authService state for updates
  useEffect(() => {
    const unsubscribe = authService.subscribe((state) => {
      setErrorMsg(state.error);
      if (state.user && state.status === 'signed-in') {
        onAuthenticated(state.user);
      }
    });
    return () => unsubscribe();
  }, [onAuthenticated]);

  const handleTryAgain = () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    authService.clearError();
    setMode('select');
  };

  // Helper: validate password requirements
  const validatePasswordRequirements = (pwd: string): string | null => {
    if (pwd.length < 8) return 'Password must be at least 8 characters long.';
    if (!/[A-Z]/.test(pwd)) return 'Password must contain at least one uppercase letter (A-Z).';
    if (!/[a-z]/.test(pwd)) return 'Password must contain at least one lowercase letter (a-z).';
    if (!/[0-9]/.test(pwd)) return 'Password must contain at least one number (0-9).';
    return null;
  };

  // Google Sign In Handler (triggered ONLY on user click)
  const handleGoogleSignIn = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsSubmitting(true);
    try {
      const user = await authService.signInWithGoogle();
      onAuthenticated(user);
    } catch (err: any) {
      setErrorMsg(err.message || 'Google sign-in could not be completed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Sign In Handler
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email || !password) {
      setErrorMsg('Please fill in both email and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const user = await authService.signInWithEmail(email.trim(), password);
      onAuthenticated(user);
    } catch (err: any) {
      setErrorMsg(err.message || 'Sign in failed. Please check your email and password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Create Account Handler
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    const pwdError = validatePasswordRequirements(password);
    if (pwdError) {
      setErrorMsg(pwdError);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    if (!acceptTerms) {
      setErrorMsg('You must accept the Terms of Service and Privacy Policy to create an account.');
      return;
    }

    setIsSubmitting(true);
    try {
      const { user, verificationSent } = await authService.signUpWithEmail(
        fullName.trim(),
        email.trim(),
        password
      );
      if (verificationSent) {
        setSuccessMsg('Account created! A verification email has been sent to your inbox.');
      } else {
        setSuccessMsg('Account successfully created!');
      }
      setTimeout(() => {
        onAuthenticated(user);
      }, 1200);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to create account.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset Password Handler
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg('Please enter your valid registered email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      await authService.sendPasswordReset(email.trim());
      setSuccessMsg('Password reset link sent! Check your email inbox for instructions.');
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to send password reset email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingSession) {
    return (
      <div className="w-full h-full min-h-[500px] flex flex-col items-center justify-center bg-[#071018] text-slate-100 p-6 space-y-4">
        <div className="relative flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-2 border-emerald-500/20 border-t-emerald-400 animate-spin" />
          <Sparkles className="w-5 h-5 text-emerald-400 absolute" />
        </div>
        <div className="text-center space-y-1">
          <p className="text-sm font-bold text-slate-200">Checking Euclid Session</p>
          <p className="text-xs text-slate-400">Verifying authentication status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[520px] max-h-[600px] bg-[#071018] text-slate-100 flex flex-col justify-between p-5 overflow-y-auto font-sans relative">
      {/* Top Brand Logo */}
      <div className="space-y-3 text-center pt-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-950/80 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15)] mx-auto">
          <Sparkles className="w-6 h-6 text-emerald-400" />
        </div>

        <div>
          <h1 className="text-lg font-bold text-white tracking-tight">Welcome to Euclid Smart Clipper</h1>
          <p className="text-xs text-slate-400 max-w-[280px] mx-auto mt-1 leading-relaxed">
            Sign in to capture webpages, create timestamped YouTube notes, and sync your clips with Euclid Smart Notes.
          </p>
        </div>
      </div>

      {/* Global Error Banner with Try Again Button */}
      {errorMsg && (
        <div className="my-2 p-3 rounded-xl bg-red-950/90 border border-red-500/50 text-red-200 text-xs flex flex-col gap-2 shadow-md">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span className="flex-1 leading-snug">{errorMsg}</span>
          </div>
          <button
            type="button"
            onClick={handleTryAgain}
            className="self-end px-3 py-1 rounded-lg bg-red-900/80 hover:bg-red-800 border border-red-500/50 text-red-100 text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1.5"
          >
            <RefreshCw className="w-3 h-3 text-red-300" />
            <span>Try Again</span>
          </button>
        </div>
      )}

      {/* Global Success Banner */}
      {successMsg && (
        <div className="my-2 p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-start gap-2 shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <span className="flex-1 leading-snug">{successMsg}</span>
        </div>
      )}

      {/* MAIN VIEW MODE SWITCHER */}
      <div className="my-3 space-y-3">
        {/* MODE 1: SELECT / HOME */}
        {mode === 'select' && (
          <div className="space-y-2.5">
            {/* Google Sign In */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isSubmitting}
              className="w-full h-10 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-100 text-xs font-bold flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-sm disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9c-.2-.7-.4-1.5-.4-2.3z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="relative flex items-center justify-center my-1">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800" />
              </div>
              <span className="relative px-2 bg-[#071018] text-[10px] uppercase font-bold text-slate-500">or</span>
            </div>

            {/* Sign in with Email */}
            <button
              type="button"
              onClick={() => {
                setErrorMsg(null);
                setSuccessMsg(null);
                setMode('signin');
              }}
              className="w-full h-10 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.2)] focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <Mail className="w-4 h-4 text-emerald-100" />
              <span>Sign in with Email</span>
            </button>

            {/* Create Account */}
            <button
              type="button"
              onClick={() => {
                setErrorMsg(null);
                setSuccessMsg(null);
                setMode('signup');
              }}
              className="w-full h-10 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <UserIcon className="w-4 h-4 text-amber-400" />
              <span>Create Account</span>
            </button>

            <div className="pt-1 text-center">
              <button
                type="button"
                onClick={() => {
                  setErrorMsg(null);
                  setSuccessMsg(null);
                  setMode('forgot_password');
                }}
                className="text-xs text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors cursor-pointer"
              >
                Forgot password?
              </button>
            </div>
          </div>
        )}

        {/* MODE 2: SIGN IN FORM */}
        {mode === 'signin' && (
          <form onSubmit={handleEmailSignIn} className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Sign In</span>
              <button
                type="button"
                onClick={() => setMode('select')}
                className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3 h-3" /> Back
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-300 block">Email Address</label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full h-9 pl-9 pr-3 bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl text-xs text-slate-100 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-slate-300">Password</label>
                <button
                  type="button"
                  onClick={() => setMode('forgot_password')}
                  className="text-[10px] text-amber-400 hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-9 pl-9 pr-3 bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl text-xs text-slate-100 outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-9 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md disabled:opacity-50 mt-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              {isSubmitting ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>

            <div className="text-center pt-2 text-[11px] text-slate-400">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setErrorMsg(null);
                  setSuccessMsg(null);
                  setMode('signup');
                }}
                className="text-emerald-400 font-bold hover:underline cursor-pointer"
              >
                Create Account
              </button>
            </div>
          </form>
        )}

        {/* MODE 3: CREATE ACCOUNT FORM */}
        {mode === 'signup' && (
          <form onSubmit={handleSignUp} className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Create Account</span>
              <button
                type="button"
                onClick={() => setMode('select')}
                className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3 h-3" /> Back
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-300 block">Full Name</label>
              <div className="relative">
                <UserIcon className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full h-8 pl-9 pr-3 bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl text-xs text-slate-100 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-300 block">Email Address</label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full h-8 pl-9 pr-3 bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl text-xs text-slate-100 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-300 block">Password</label>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-8 pl-9 pr-3 bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl text-xs text-slate-100 outline-none transition-all"
                />
              </div>
              <p className="text-[9px] text-slate-400 pl-1">Min 8 chars, 1 uppercase, 1 lowercase & 1 number.</p>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-300 block">Confirm Password</label>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-8 pl-9 pr-3 bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl text-xs text-slate-100 outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-0.5 rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500 cursor-pointer"
              />
              <label htmlFor="terms" className="text-[10px] text-slate-400 leading-tight">
                I accept the{' '}
                <button
                  type="button"
                  onClick={() => setShowLegalModal('terms')}
                  className="text-amber-400 underline cursor-pointer"
                >
                  Terms of Service
                </button>{' '}
                and{' '}
                <button
                  type="button"
                  onClick={() => setShowLegalModal('privacy')}
                  className="text-amber-400 underline cursor-pointer"
                >
                  Privacy Policy
                </button>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-9 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md disabled:opacity-50 mt-1 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              {isSubmitting ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>

            <div className="text-center pt-1 text-[11px] text-slate-400">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setErrorMsg(null);
                  setSuccessMsg(null);
                  setMode('signin');
                }}
                className="text-emerald-400 font-bold hover:underline cursor-pointer"
              >
                Sign In
              </button>
            </div>
          </form>
        )}

        {/* MODE 4: FORGOT PASSWORD */}
        {mode === 'forgot_password' && (
          <form onSubmit={handleResetPassword} className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Reset Password</span>
              <button
                type="button"
                onClick={() => setMode('signin')}
                className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3 h-3" /> Back
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Enter your registered email address below. We'll send you a password reset link to recover access.
            </p>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-300 block">Registered Email</label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full h-9 pl-9 pr-3 bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-xl text-xs text-slate-100 outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-9 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              {isSubmitting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <span>Send Reset Email</span>}
            </button>

            <div className="text-center pt-2 text-[11px]">
              <button
                type="button"
                onClick={() => setMode('signin')}
                className="text-emerald-400 font-bold hover:underline cursor-pointer"
              >
                Remembered your password? Sign In
              </button>
            </div>
          </form>
        )}
      </div>

      {/* FOOTER LINKS */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
        <button
          type="button"
          onClick={() => setShowLegalModal('privacy')}
          className="hover:text-slate-300 transition-colors cursor-pointer"
        >
          Privacy Policy
        </button>

        <span className="text-slate-700">•</span>

        <button
          type="button"
          onClick={() => setShowLegalModal('terms')}
          className="hover:text-slate-300 transition-colors cursor-pointer"
        >
          Terms of Service
        </button>

        <span className="text-slate-700">•</span>

        <span className="text-[10px] text-slate-600 font-mono">v1.0.0</span>
      </div>

      {/* Legal Modal */}
      {showLegalModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-slate-700 rounded-2xl max-w-sm w-full p-4 space-y-3 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-sm font-bold text-white capitalize">
                {showLegalModal === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
              </h3>
              <button
                type="button"
                onClick={() => setShowLegalModal(null)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕ Close
              </button>
            </div>
            <div className="text-xs text-slate-300 max-h-60 overflow-y-auto space-y-2 pr-1 leading-relaxed">
              {showLegalModal === 'privacy' ? (
                <>
                  <p>
                    <strong>Euclid Smart Clipper Privacy Policy</strong>
                  </p>
                  <p>
                    Your privacy is essential. We store authentication details and clip metadata securely in your user-owned Firestore collection (`users/{'{uid}'}/clips`).
                  </p>
                  <p>
                    We never store raw Google passwords or sell personal data. Authentication tokens and user clips are strictly isolated to your authenticated profile.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>Euclid Smart Clipper Terms of Service</strong>
                  </p>
                  <p>
                    By creating an account, you agree to capture web content responsibly in accordance with copyright and fair use guidelines.
                  </p>
                  <p>
                    Clips saved in Euclid Smart Clipper are synced with Euclid Smart Notes under your authenticated account credentials.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
