export default ‎function Avatar({ src }) {
‎  return (
‎    <div className="absolute left-1/2 -bottom-8 transform -translate-x-1/2">
‎      <img
‎        src={src}
‎        alt="Restaurant avatar"
‎        className="w-20 h-20 rounded-full border-4 border-white shadow-md"
‎      />
‎    </div>
‎  );
‎}
