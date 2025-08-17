export default function HostProfile() {
  return (
    <div className="flex flex-col items-center py-4">
      <div className="relative">
        <img
          src="/avatars/anna256.png"
          alt="Host Avatar"
          className="w-14 h-14 rounded-full border-4 border-blue-400 shadow-lg"
        />
        <div className="absolute bottom-0 right-0 bg-black rounded-full p-1 border border-white">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
      </div>
      <div className="mt-2 font-medium">Anna256</div>
      <CrewStats />
    </div>
  );
}
