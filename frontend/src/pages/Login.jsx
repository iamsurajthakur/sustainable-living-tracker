import React, { useContext, useState, useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
// import { useSearchParams } from 'react-router-dom'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { loginUser, registerUser } from '@/api/auth.js'
import { AuthContext } from '@/components/secure/AuthContext'
import { Spinner } from '@/components/ui/spinner'
import { toast } from 'react-toastify'
import { Input } from '@/components/ui/input'

const Login = () => {
  const navigate = useNavigate()
  const { accessToken, setAccessToken, loading } = useContext(AuthContext)
  const [searchParams] = useSearchParams()
  const state = searchParams.get('state')

  const [isLogin, setIsLogin] = useState(() => state != 'register')
  const [isLoading, setIsLoading] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [termsError, setTermsError] = useState('')

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
    agreeToTerms: false,
  })

  // Password validation function
  const validatePassword = (password) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long'
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter'
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter'
    }
    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one number'
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return 'Password must contain at least one special character'
    }
    return ''
  }

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && accessToken) {
      navigate('/dashboard', { replace: true })
    }
  }, [accessToken, loading, navigate])

  // Show nothing while checking auth
  if (loading) {
    return null // or return <LoadingAnimation />
  }

  const handleSubmit = async () => {
    if (isLoading) return

    // Validate email before submission
    if (!formData.email) {
      setEmailError('Email is required')
      return
    }

    if (!validateEmail(formData.email)) {
      setEmailError('Please enter a valid email address')
      return
    }

    // Validate password before submission
    if (!formData.password) {
      setPasswordError('Password is required')
      return
    }

    const passwordValidationError = validatePassword(formData.password)
    if (passwordValidationError) {
      setPasswordError(passwordValidationError)
      return
    }

    // Validate password match for registration
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setConfirmPasswordError('Passwords do not match')
      return
    }

    // Validate terms agreement for registration
    if (!isLogin && !formData.agreeToTerms) {
      setTermsError('You must agree to the Terms of Service and Privacy Policy')
      return
    }

    try {
      setIsLoading(true)
      let response
      if (isLogin) {
        response = await loginUser({
          email: formData.email,
          password: formData.password,
        })
        toast.success('You have successfully logged in.')

        //set user in local storage
        const userData = response.data.data
        localStorage.setItem('user', JSON.stringify(userData))

        const token =
          response.data.data?.accessToken || response.data.accessToken

        if (token) {
          setAccessToken(token)
        } else {
          console.error('No access token found in response')
        }
      } else {
        response = await registerUser({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        })
        toast.success('Your account has been created successfully.')
        navigate('/login', { replace: true })
        setIsLogin(true)
      }
    } catch (error) {
      // Better error handling
      console.error('Auth error: ', error.response?.data || error.message)

      // Handle specific error status codes
      if (error.response?.status === 409) {
        toast.error(
          'This email is already registered. Please use a different email or login.'
        )
        setEmailError('Email already exists')
      } else if (error.response?.status === 400) {
        toast.error(
          error.response?.data?.message ||
            'Invalid request. Please check your information.'
        )
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error(error.message || 'An error occurred. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))

    // Validate email on change
    if (name === 'email') {
      if (value && !validateEmail(value)) {
        setEmailError('Please enter a valid email address')
      } else {
        setEmailError('')
      }
    }

    // Validate password on change
    if (name === 'password') {
      if (value) {
        const error = validatePassword(value)
        setPasswordError(error)
      } else {
        setPasswordError('')
      }

      // Check if confirmPassword matches when password changes
      if (formData.confirmPassword && value !== formData.confirmPassword) {
        setConfirmPasswordError('Passwords do not match')
      } else {
        setConfirmPasswordError('')
      }
    }

    // Validate confirm password on change
    if (name === 'confirmPassword') {
      if (value && value !== formData.password) {
        setConfirmPasswordError('Passwords do not match')
      } else {
        setConfirmPasswordError('')
      }
    }

    // Clear terms error when checkbox is checked
    if (name === 'agreeToTerms' && checked) {
      setTermsError('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
      handleSubmit()
    }
  }

  return (
    <div className="h-screen bg-black flex overflow-hidden">
      {/* Left side - Artistic Image */}
      <div className="w-full hidden md:flex md:w-1/2 relative overflow-hidden">
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1739643004572-e7fdf40cf6dd?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Artistic illustration"
        />
      </div>

      {/* Right side - Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-6 md:px-12 bg-black overflow-y-auto">
        <div className="w-full max-w-md py-8 animate-fadeIn">
          {/* Header */}
          <h2 className="text-4xl md:text-5xl text-gray-200 font-medium mb-3 transition-opacity duration-300">
            {isLogin ? 'login' : 'register'}
          </h2>
          <p className="text-sm text-gray-400 mb-8 transition-opacity duration-300">
            {isLogin
              ? 'Welcome back! Please login to continue'
              : 'Create an account to get started'}
          </p>

          <div className="w-full">
            {/* Google login */}
            <button
              type="button"
              onClick={() => console.log('Google login clicked')}
              className="w-full cursor-pointer bg-gray-900 hover:bg-gray-800 transition-colors flex items-center justify-center h-12 rounded-full border border-gray-700"
            >
              <motion.img
                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
                alt="Google logo"
                className="mr-2"
              />
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 w-full my-6">
              <div className="w-full h-px bg-gray-700"></div>
              <p className="whitespace-nowrap text-sm text-gray-400">
                or {isLogin ? 'login' : 'register'} with email
              </p>
              <div className="w-full h-px bg-gray-700"></div>
            </div>

            {/* Name Field (only for register) */}
            {!isLogin && (
              <div className="relative flex items-center w-full mb-4 animate-slideDown">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-6 pointer-events-none z-10"
                >
                  <path
                    d="M8 8a4 4 0 100-8 4 4 0 000 8zM8 10c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z"
                    fill="#9CA3AF"
                  />
                </svg>
                <Input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Full name"
                  className="bg-transparent border-gray-700 text-gray-300 placeholder-gray-500 h-12 rounded-full pl-14 pr-6 focus-visible:border-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors"
                  required
                />
              </div>
            )}

            {/* Email Field */}
            <div className="relative flex flex-col w-full mb-4">
              <div className="relative flex items-center w-full">
                <svg
                  width="16"
                  height="12"
                  viewBox="0 0 16 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-6 pointer-events-none z-10"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                    fill="#9CA3AF"
                  />
                </svg>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Email id"
                  className={`bg-transparent border-gray-700 text-gray-300 placeholder-gray-500 h-12 rounded-full pl-14 pr-6 focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors ${
                    emailError
                      ? 'border-red-500 focus-visible:border-red-500'
                      : 'focus-visible:border-gray-500'
                  }`}
                  required
                />
              </div>

              {/* Error message with smooth transition */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  emailError
                    ? 'max-h-6 opacity-100 mt-2'
                    : 'max-h-0 opacity-0 mt-0'
                }`}
              >
                <p className="text-red-500 text-xs ml-6 transform transition-transform duration-300">
                  {emailError}
                </p>
              </div>
            </div>

            {/* Password Field */}
            <div className="relative flex flex-col w-full mb-4">
              <div className="relative flex items-center w-full">
                <svg
                  width="13"
                  height="17"
                  viewBox="0 0 13 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-6 pointer-events-none z-10"
                >
                  <path
                    d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                    fill="#9CA3AF"
                  />
                </svg>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Password"
                  className={`bg-transparent border-gray-700 text-gray-300 placeholder-gray-500 h-12 rounded-full pl-14 pr-6 focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors ${
                    passwordError
                      ? 'border-red-500 focus-visible:border-red-500'
                      : 'focus-visible:border-gray-500'
                  }`}
                  required
                />
              </div>

              {/* Error message with smooth transition */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  passwordError
                    ? 'max-h-20 opacity-100 mt-2'
                    : 'max-h-0 opacity-0 mt-0'
                }`}
              >
                <p className="text-red-500 text-xs ml-6">{passwordError}</p>
              </div>
            </div>

            {/* Confirm Password (only for register) */}
            {!isLogin && (
              <div className="relative flex flex-col w-full mb-4 animate-slideDown">
                <div className="relative flex items-center w-full">
                  <svg
                    width="13"
                    height="17"
                    viewBox="0 0 13 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-6 pointer-events-none z-10"
                  >
                    <path
                      d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                      fill="#9CA3AF"
                    />
                  </svg>
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Confirm password"
                    className={`bg-transparent border-gray-700 text-gray-300 placeholder-gray-500 h-12 rounded-full pl-14 pr-6 focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors ${
                      confirmPasswordError
                        ? 'border-red-500 focus-visible:border-red-500'
                        : 'focus-visible:border-gray-500'
                    }`}
                    required
                  />
                </div>

                {/* Error message with smooth transition */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    confirmPasswordError
                      ? 'max-h-10 opacity-100 mt-2'
                      : 'max-h-0 opacity-0 mt-0'
                  }`}
                >
                  <p className="text-red-500 text-xs ml-6">
                    {confirmPasswordError}
                  </p>
                </div>
              </div>
            )}

            {/* Remember Me / Forgot Password */}
            {isLogin && (
              <div className="w-full flex items-center justify-between mb-8 text-gray-400">
                <div className="flex items-center gap-2">
                  <input
                    className="w-4 h-4 accent-green-500 bg-gray-800 border-gray-700 rounded"
                    type="checkbox"
                    id="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                  />
                  <label className="text-sm cursor-pointer" htmlFor="checkbox">
                    Remember me
                  </label>
                </div>
              </div>
            )}

            {/* Terms agreement for register */}
            {!isLogin && (
              <div className="flex flex-col mb-6 animate-slideDown">
                <div className="flex items-start gap-2">
                  <input
                    className={`w-4 h-4 mt-0.5 accent-green-500 bg-gray-800 rounded transition-colors ${
                      termsError ? 'border-2 border-red-500' : 'border-gray-700'
                    }`}
                    type="checkbox"
                    id="terms"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    required
                  />
                  <label
                    className="text-sm text-gray-400 cursor-pointer"
                    htmlFor="terms"
                  >
                    I agree to the Terms of Service and Privacy Policy
                  </label>
                </div>

                {/* Error message with smooth transition */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    termsError
                      ? 'max-h-10 opacity-100 mt-2'
                      : 'max-h-0 opacity-0 mt-0'
                  }`}
                >
                  <p className="text-red-500 text-xs ml-6">{termsError}</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full cursor-pointer h-12 rounded-full font-medium transition-all duration-200
    ${
      isLoading
        ? 'bg-green-400 cursor-not-allowed'
        : 'bg-green-500 hover:bg-green-600 hover:shadow-lg hover:shadow-green-500/20'
    }
    text-white
  `}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Spinner className="h-4 w-4 text-white" />
                  {isLogin ? 'Logging in...' : 'Creating account...'}
                </span>
              ) : isLogin ? (
                'Login'
              ) : (
                'Create Account'
              )}
            </button>

            {/* Toggle between Login/Register */}
            <p className="text-gray-400 text-sm mt-6 text-center">
              {isLogin
                ? "Don't have an account? "
                : 'Already have an account? '}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-green-500 cursor-pointer hover:text-green-400 transition-colors font-medium"
              >
                {isLogin ? 'register' : 'login'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
