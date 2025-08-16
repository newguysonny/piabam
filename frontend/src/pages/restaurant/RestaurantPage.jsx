import MenuSection from "../../components/restaurant/MenuSection";

export default function RestaurantPage() {
  const items = [
    {
      id: 1,
      name: "Custom Beef Steak Hoagie",
      price: 5.29,
      image: "https://via.placeholder.com/300x200?text=Beef+Steak",
    },
    {
      id: 2,
      name: "Ham Hoagie",
      price: 4.99,
      image: "https://via.placeholder.com/300x200?text=Ham+Hoagie",
    },
    {
      id: 3,
      name: "Turkey & Ham Club Sandwich",
      price: 9.39,
      image: "https://via.placeholder.com/300x200?text=Turkey+Club",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <MenuSection menu="Hoagies & Specialty Sandwiches" items={items} />
    </div>
  );
}
