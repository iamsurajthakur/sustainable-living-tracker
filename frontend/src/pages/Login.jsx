import React, { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'

const Login = () => {
  const [searchParams] = useSearchParams()
  const state = searchParams.get('state')

  const [isLogin, setIsLogin] = useState(() => state !== 'register')

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
    agreeToTerms: false,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Add your authentication logic here
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
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
              <div className="flex items-center w-full bg-transparent border border-gray-700 h-12 rounded-full overflow-hidden px-6 gap-3 mb-4 focus-within:border-gray-500 transition-all duration-200 animate-slideDown">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 8a4 4 0 100-8 4 4 0 000 8zM8 10c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z"
                    fill="#9CA3AF"
                  />
                </svg>
                <input
                  type="text"
                  name="fullName"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Full name"
                  className="bg-transparent text-gray-300 placeholder-gray-500 outline-none text-sm w-full h-full"
                  required
                />
              </div>
            )}

            {/* Email Field */}
            <div className="flex items-center w-full bg-transparent border border-gray-700 h-12 rounded-full overflow-hidden px-6 gap-3 mb-4 focus-within:border-gray-500 transition-all duration-200">
              <svg
                width="16"
                height="12"
                viewBox="0 0 16 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                  fill="#9CA3AF"
                />
              </svg>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email id"
                className="bg-transparent text-gray-300 placeholder-gray-500 outline-none text-sm w-full h-full"
                required
              />
            </div>

            {/* Password Field */}
            <div className="flex items-center w-full bg-transparent border border-gray-700 h-12 rounded-full overflow-hidden px-6 gap-3 mb-4 focus-within:border-gray-500 transition-all duration-200">
              <svg
                width="13"
                height="17"
                viewBox="0 0 13 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                  fill="#9CA3AF"
                />
              </svg>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="bg-transparent text-gray-300 placeholder-gray-500 outline-none text-sm w-full h-full"
                required
              />
            </div>

            {/* Confirm Password (only for register) */}
            {!isLogin && (
              <div className="flex items-center w-full bg-transparent border border-gray-700 h-12 rounded-full overflow-hidden px-6 gap-3 mb-4 focus-within:border-gray-500 transition-all duration-200 animate-slideDown">
                <svg
                  width="13"
                  height="17"
                  viewBox="0 0 13 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                    fill="#9CA3AF"
                  />
                </svg>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm password"
                  className="bg-transparent text-gray-300 placeholder-gray-500 outline-none text-sm w-full h-full"
                  required
                />
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
              <div className="flex items-start gap-2 mb-6 animate-slideDown">
                <input
                  className="w-4 h-4 mt-0.5 accent-green-500 bg-gray-800 border-gray-700 rounded"
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
            )}

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full h-12 cursor-pointer rounded-full text-white bg-green-500 hover:bg-green-600 transition-all duration-200 font-medium hover:shadow-lg hover:shadow-green-500/20"
            >
              {isLogin ? 'Login' : 'Create Account'}
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
