const ProjectCTA = ({ isLaunch }) => {
  return (
    <>
      {isLaunch ? (
        <>
          <button className="w-full py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition flex items-center justify-center gap-2">
            Pledge $1 • Join Movement
          </button>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Fully refundable if goal isn't reached
          </p>
        </>
      ) : (
        <button className="w-full py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-yellow-600 transition flex items-center justify-center gap-2">
          Notify Me
        </button>
      )}
    </>
  );
};

export default ProjectCTA;
