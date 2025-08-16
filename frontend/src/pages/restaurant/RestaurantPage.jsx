import MenuSection from "./components/MenuSection";

export default function RestaurantMenu() {
  const items = [
    {
      id: 1,
      name: "Custom Beef Steak Hoagie",
      price: 5.29,
      image:
        "https://placehold.co/600x400/F97316/FFFFFF?text=Beef+Steak+Hoagie",
    },
    {
      id: 2,
      name: "Ham Hoagie",
      price: 4.99,
      image: "https://placehold.co/600x400/2563EB/FFFFFF?text=Ham+Hoagie",
    },
    {
      id: 3,
      name: "Turkey & Ham Club Sandwich",
      price: 9.39,
      image:
        "https://placehold.co/600x400/16A34A/FFFFFF?text=Turkey+%26+Ham+Club",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <MenuSection menu="Hoagies & Specialty Sandwiches" items={items} />
    </div>
  );
}
