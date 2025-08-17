const CallToAction = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg mb-6">
      <p className="text-lg text-center mb-4">
        Can we count on your pledge for our upcoming project?
      </p>
      
      <div className="flex justify-center mb-4">
        <button className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors">
          Support this Project
        </button>
      </div>
      
      <p className="text-sm text-amber-400 text-center mb-4">
        10% discount for early supporters
      </p>
      
      <p className="text-sm text-gray-400 text-center mb-4">
        Get project news and updates by providing your email.
      </p>
      
      <div className="flex justify-center space-x-4 text-xs text-gray-500 mb-4">
        <a href="#" className="hover:text-gray-300">Privacy</a>
        <a href="#" className="hover:text-gray-300">Terms</a>
      </div>
      
      <p className="text-sm text-gray-400 text-center">
        Join <span className="font-bold text-white">2,942</span> other supporters!
      </p>
    </div>
  );
};
export default CallToAction;
