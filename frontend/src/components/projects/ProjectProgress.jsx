const ProjectProgress = ({ current, goal, calculateProgress }) => {
  const progress = calculateProgress(current, goal);

  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs mb-1">
        <span className="font-medium text-purple-600">
          🚀 {progress.toFixed(0)}% to goal
        </span>
        <span className="text-gray-500">
          {current.toLocaleString()}/{goal.toLocaleString()} members
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProjectProgress;
