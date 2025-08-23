import CrewStats from "../crew/CrewStats";

export default function CrewLinkCard({ image, crewId, title="Lagos Foodie Club" }) {
  return (
    <Link 
‎      to={`/map?crew=${crewId}`} // This will open the modal on the map page
‎      className="block hover:bg-gray-200 transition-colors"
      >
    <div className="flex items-center gap-3 p-3 bg-gray-100  rounded-lg shadow-md">
      {/* Crew Image */}
      <img
        src={image}
        alt={title}
        className="w-20 h-14 rounded-md object-cover"
      />

      {/* Right side: Title +  Stats */}
      <div className="flex flex-col flex-1">
        <h3 className="text-sm font-bold hover:text-purple-600 active:text-purple-500">{title}</h3>
        <CrewStats />
      </div>
    </div>
    </Link>
  );
}
