import { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { WandSparkles, ShieldCheck, Loader2 } from 'lucide-react'
import { useAppContext } from '../context/AppContext'

const VerifyEmail = () => {
  const navigate = useNavigate()
  const { user, backendUrl, showToast } = useAppContext()
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)
  const inputRefs = useRef([])

  const pending = JSON.parse(sessionStorage.getItem('pending_register') || 'null')
  const email = pending?.email || ''

  useEffect(() => {
    if (user) navigate('/ai', { replace: true })
    if (!email) navigate('/register', { replace: true })
  }, [user, email, navigate])

  useEffect(() => {
    if (resendCooldown > 0) {
      const t = setTimeout(() => setResendCooldown(c => c - 1), 1000)
      return () => clearTimeout(t)
    }
  }, [resendCooldown])

  const handleChange = (idx, val) => {
    if (!/^\d?$/.test(val)) return
    const next = [...otp]
    next[idx] = val
    setOtp(next)
    if (val && idx < 5) inputRefs.current[idx + 1]?.focus()
  }

  const handleKeyDown = (idx, e) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (pasted.length === 6) {
      setOtp(pasted.split(''))
      inputRefs.current[5]?.focus()
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const code = otp.join('')
    if (code.length < 6) {
      showToast('Please enter the 6-digit OTP', 'error')
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`${backendUrl}/user/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: code }),
      })
      const data = await res.json()
      if (data.success) {
        // /user/verify does NOT set the accessToken cookie.
        // The user must log in to get the cookie.
        sessionStorage.removeItem('pending_register')
        showToast('Email verified! Please log in.', 'success')
        navigate('/login')
      } else {
        showToast(data.message || 'Verification failed', 'error')
      }
    } catch (_) {
      showToast('Network error', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (resendCooldown > 0) return
    setResendLoading(true)
    try {
      const res = await fetch(`${backendUrl}/user/resend-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (data.success) {
        showToast('New OTP sent to your email', 'success')
        setResendCooldown(60)
      } else {
        showToast(data.message || 'Failed to resend OTP', 'error')
      }
    } catch (_) {
      showToast('Network error', 'error')
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8 cursor-pointer" onClick={() => navigate('/')}>
          <span className="text-3xl font-bold text-primary">GenAI</span>
          <WandSparkles className="w-7 h-7 text-primary" />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 text-primary" />
            </div>
          </div>

          <h1 className="text-2xl font-semibold text-slate-800 text-center mb-1">Verify your email</h1>
          <p className="text-sm text-gray-500 text-center mb-6">
            We sent a 6-digit code to <span className="font-medium text-gray-700">{email}</span>
          </p>

          <form onSubmit={onSubmit}>
            <div className="flex justify-center gap-2 mb-6" onPaste={handlePaste}>
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={el => (inputRefs.current[idx] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className="w-11 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 bg-primary text-white py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition disabled:opacity-60 cursor-pointer"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
              {loading ? 'Verifying...' : 'Verify Email'}
            </button>
          </form>

          <div className="mt-5 text-center">
            <p className="text-sm text-gray-500">
              Didn't receive the code?{' '}
              <button
                onClick={handleResend}
                disabled={resendLoading || resendCooldown > 0}
                className="text-primary font-medium hover:underline disabled:opacity-50 cursor-pointer"
              >
                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : resendLoading ? 'Sending...' : 'Resend OTP'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmail
