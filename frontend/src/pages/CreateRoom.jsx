import React, { useState } from "react";

export default function CreateRoom() {
  const [roomType, setRoomType] = useState("fan");
  const [tags, setTags] = useState(["#R&B", "#Vegan"]);
  const [newTag, setNewTag] = useState("");
  const [themeColor, setThemeColor] = useState("blue");

  const addTag = () => {
    if (newTag && !tags.includes(`#${newTag}`)) {
      setTags([...tags, `#${newTag}`]);
      setNewTag("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-xl space-y-6">
      <h1 className="text-2xl font-bold">Create Room</h1>

      {/* Room Type */}
      <div>
        <label className="block mb-2 font-medium">Room Type</label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="roomType"
              value="fan"
              checked={roomType === "fan"}
              onChange={() => setRoomType("fan")}
            />
            Fan Room
          </label>
          <label className="flex items-center gap-2 opacity-50">
            <input
              type="radio"
              name="roomType"
              value="verified"
              disabled
            />
            Artist-Verified (Coming Soon)
          </label>
        </div>
      </div>

      {/* Artist Name */}
      {roomType === "fan" && (
        <div>
          <label className="block mb-2 font-medium">Artist Name</label>
          <input
            placeholder="e.g., BTS"
            className="w-full px-4 py-2 border rounded-md"
          />
          <p className="text-xs mt-1 text-gray-500 italic">
            This is a fan-led room. Not official.
          </p>
        </div>
      )}

      {/* Room Name */}
      <div>
        <label className="block mb-2 font-medium">Room Name</label>
        <input
          placeholder="e.g., Vinyl & Veggie Night"
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block mb-2 font-medium">Description</label>
        <textarea
          placeholder="e.g., Chill beats for plant-based eats"
          className="w-full px-4 py-2 border rounded-md resize-none"
        />
      </div>

      {/* Tags */}
      <div>
        <label className="block mb-2 font-medium">Tags</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag, idx) => (
            <span key={idx} className="px-3 py-1 bg-gray-200 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value.replace("#", ""))}
            placeholder="Add tag"
            className="flex-1 px-4 py-2 border rounded-md"
          />
          <button
            onClick={addTag}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>

      {/* Spotify Sync */}
      <div className="flex justify-between items-center">
        <div>
          <label className="block font-medium mb-1">Music</label>
          <button className="border px-4 py-2 rounded-md">Connect Spotify</button>
        </div>
        <label className="flex items-center gap-2">
          <span>Sync Playback</span>
          <input type="checkbox" className="w-5 h-5 accent-blue-500" />
        </label>
      </div>

      {/* Food Partner */}
      <div>
        <label className="block mb-2 font-medium">Food Partner</label>
        <select className="w-full border px-4 py-2 rounded-md">
          <option>McDonald's</option>
          <option>No Food</option>
        </select>
      </div>

      {/* Privacy */}
      <div>
        <label className="block mb-2 font-medium">Privacy</label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input type="radio" name="privacy" value="public" defaultChecked />
            Public
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="privacy" value="private" />
            Private
          </label>
        </div>
      </div>

      {/* Co-hosts */}
      <div>
        <label className="block mb-2 font-medium">Co-Hosts</label>
        <input
          placeholder="@Username1, @Username2"
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>

      {/* Monetization */}
      <div>
        <label className="block mb-2 font-medium">Monetization</label>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <input type="radio" name="monetization" value="tips" />
            Enable Tips
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="monetization" value="sponsor" />
            Sponsor Room
          </label>
        </div>
      </div>

      {/* Customize */}
      <div>
        <label className="block mb-2 font-medium">Customize</label>
        <div className="flex items-center gap-4">
          <input type="file" />
          <div className="flex gap-2">
            {["blue", "red", "green"].map((color) => (
              <button
                key={color}
                onClick={() => setThemeColor(color)}
                className={`w-6 h-6 rounded-full border-2 ${
                  themeColor === color ? "border-black" : "border-transparent"
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 pt-4">
        <button className="border px-4 py-2 rounded-md">Preview Room</button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Go Live!
        </button>
      </div>
    </div>
  );
}
