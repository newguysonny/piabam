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
  return (
    <div className="p-6">
      <FanEvent events={eventsData} />
    </div>
  );
}

export default EventsPage;
