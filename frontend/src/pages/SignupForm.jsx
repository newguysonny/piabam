import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';
import { FiMail, FiLock, FiUser, FiCheck } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';


const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {  // Made this async
    e.preventDefault();
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    if (!/^[a-z0-9_]{3,20}$/i.test(formData.username)) {
      alert('Username must be 3-20 chars (letters, numbers, _)');
      return;
    }
    
    if (!formData.agreeToTerms) {
      alert('You must agree to the terms');
      return;
    }

    try {
      // 1. Auth sign-up
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/account`,
          data: {  // Store username in user_metadata
            username: formData.username
          }
        }
      });

      if (authError) throw authError;

      // 2. Create user profile
      const { error: profileError } = await supabase
        .from('users')
        .insert([{
          id: authData.user.id,
          email: formData.email,
          username: formData.username,
          created_at: new Date().toISOString()
        }]);

      if (profileError) throw profileError;

      alert('Sign-up successful! Check your email for confirmation.');
    } catch (error) {
      alert(`Error: ${error.message}`);
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-6 text-center">
          <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
            <FiUser className="text-white" /> 
            Create New Account
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Username Field */}
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-300">
              Username
            </label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                placeholder="Choose a username"
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email Address
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-300"
                placeholder="Enter your email"
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
                placeholder="Create a password"
                required
                minLength="6"
              />
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
              Confirm Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Confirm your password"
                required
                minLength="6"
              />
            </div>
          </div>

          {/* Terms Agreement */}
          <div className="flex items-start pt-2">
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, agreeToTerms: !prev.agreeToTerms }))}
              className={`mt-1 w-5 h-5 rounded-md border ${formData.agreeToTerms ? 'bg-purple-600 border-purple-600' : 'border-gray-500'} flex items-center justify-center mr-2`}
            >
              {formData.agreeToTerms && <FiCheck className="text-white text-xs" />}
            </button>
            <label htmlFor="agreeToTerms" className="text-sm text-gray-300">
              I agree to the <a href="#" className="text-purple-400 hover:text-purple-300">Terms of Service</a> and <a href="#" className="text-purple-400 hover:text-purple-300">Privacy Policy</a>
            </label>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={!formData.agreeToTerms}
            className={`w-full py-3 rounded-lg font-medium transition-colors ${formData.agreeToTerms ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-600 cursor-not-allowed'}`}
          >
            Create Account
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-700"></div>
            <span className="px-4 text-gray-400 text-sm">OR</span>
            <div className="flex-1 border-t border-gray-700"></div>
          </div>

          {/* Google Sign Up */}
          <button
            type="button"
            className="w-full py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <FcGoogle size={20} />
            Sign up with Google
          </button>

          {/* Sign In Link */}
          <div className="text-center text-gray-400 text-sm">
            Already have an account?{' '}
            
             <Link to="/signin" className="text-purple-400 hover:text-purple-300">
            Sign in
           </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;








/*
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Signup() {
  return (
    <div>
      <Navbar />
      <h1>Dashboard Content for signup</h1>
      <Footer />
    </div>
  );
}
*/
