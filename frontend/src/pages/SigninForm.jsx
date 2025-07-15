import { useState } from 'react';
import { FiMail, FiLock, FiUser, FiCheck } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

const SigninForm = () => {
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign in submission
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-6 text-center">
          <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
            <FiUser className="text-white" /> 
            Sign In to Your Account
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Username/Email Field */}
          <div className="space-y-2">
            <label htmlFor="usernameOrEmail" className="block text-sm font-medium text-gray-300">
              Username or Email
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="usernameOrEmail"
                name="usernameOrEmail"
                value={formData.usernameOrEmail}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your username or email"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, rememberMe: !prev.rememberMe }))}
                className={`w-5 h-5 rounded-md border ${formData.rememberMe ? 'bg-purple-600 border-purple-600' : 'border-gray-500'} flex items-center justify-center mr-2`}
              >
                {formData.rememberMe && <FiCheck className="text-white text-xs" />}
              </button>
              <label htmlFor="rememberMe" className="text-sm text-gray-300">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-purple-400 hover:text-purple-300">
              Forgot your password?
            </a>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors"
          >
            Sign In
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-700"></div>
            <span className="px-4 text-gray-400 text-sm">OR</span>
            <div className="flex-1 border-t border-gray-700"></div>
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            className="w-full py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <FcGoogle size={20} />
            Sign in with Google
          </button>

          {/* Sign Up Link */}
          <div className="text-center text-gray-400 text-sm">
            Not a member yet?{' '}
            <a href="#" className="text-purple-400 hover:text-purple-300">
              Sign up now
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SigninForm;
