import FanEvent from "../../components/faajee/FanEvent";

const eventsData = [
  {
    id: 1,
    title: "Wizkid Live in Lagos",
    rating: 4.8,
    fanInfo: "Wizkid FC",
    crews:  16,
    country: "Nigeria",
    supporters: 285260,
    image: "https://placehold.co/56x56"
  },
  {
    id: 2,
    title: "Burna Boy UK Tour",
    rating: 4.7,
    fanInfo: "Burna Boy Nation",
    crews:  10,
    country: "UK",
    supporters: 270634,
    image: "https://placehold.co/56x56"
  }
];


function EventsPage() {
  const normalizeEvents = (eventsData) => ({
    id: eventsData.id,
    title: eventsData.title,
    crews: eventsData.crews,
    image: eventsData.image,
    fanInfo: eventsData.fanInfo,
    country: eventsData.country,
    supporters: eventsData.backers || eventsData.supporters
  });

  const standardizedEvents = eventsData.map(normalizeEvents);
   return (
    <div>
    {/* Upcoming Events*/}
    <div className="p-2">
      <FanEvent title= "Upcoming Events" events={standardizedEvents} />
    </div>
    
    {/* Popular Events*/}
    <div className="p-2">
      <FanEvent title="Most Popular Events" events={eventsData} />
    </div>
    </div>
  );
}

export default EventsPage;
