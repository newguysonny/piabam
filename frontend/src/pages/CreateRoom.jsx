import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
        <Label className="mb-2 block">Room Type</Label>
        <RadioGroup
          defaultValue="fan"
          onValueChange={setRoomType}
          className="flex gap-6"
        >
          <div>
            <RadioGroupItem value="fan" id="fan" />
            <Label htmlFor="fan">Fan Room</Label>
          </div>
          <div>
            <RadioGroupItem value="verified" id="verified" disabled />
            <Label htmlFor="verified" className="opacity-50">
              Artist-Verified (Coming Soon)
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Artist Name */}
      {roomType === "fan" && (
        <div>
          <Label className="mb-2 block">Artist Name</Label>
          <Input placeholder="e.g., BTS" />
          <p className="text-xs mt-1 text-gray-500 italic">
            This is a fan-led room. Not official.
          </p>
        </div>
      )}

      {/* Room Name */}
      <div>
        <Label className="mb-2 block">Room Name</Label>
        <Input placeholder="e.g., Vinyl & Veggie Night" />
      </div>

      {/* Description */}
      <div>
        <Label className="mb-2 block">Description</Label>
        <Textarea placeholder="e.g., Chill beats for plant-based eats" />
      </div>

      {/* Tags */}
      <div>
        <Label className="mb-2 block">Tags</Label>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag, idx) => (
            <span key={idx} className="px-3 py-1 bg-gray-200 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value.replace("#", ""))}
            placeholder="Add tag"
          />
          <Button onClick={addTag}>Add</Button>
        </div>
      </div>

      {/* Spotify Sync */}
      <div className="flex justify-between items-center">
        <div>
          <Label className="block">Music</Label>
          <Button variant="outline">Connect Spotify</Button>
        </div>
        <div className="flex items-center gap-2">
          <Label>Sync Playback</Label>
          <Switch />
        </div>
      </div>

      {/* Food Partner */}
      <div>
        <Label className="mb-2 block">Food Partner</Label>
        <select className="w-full border p-2 rounded-lg">
          <option>McDonald's</option>
          <option>No Food</option>
        </select>
      </div>

      {/* Privacy */}
      <div>
        <Label className="mb-2 block">Privacy</Label>
        <RadioGroup defaultValue="public" className="flex gap-6">
          <div>
            <RadioGroupItem value="public" id="public" />
            <Label htmlFor="public">Public</Label>
          </div>
          <div>
            <RadioGroupItem value="private" id="private" />
            <Label htmlFor="private">Private</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Co-hosts */}
      <div>
        <Label className="mb-2 block">Co-Hosts</Label>
        <Input placeholder="@Username1, @Username2" />
      </div>

      {/* Monetization */}
      <div>
        <Label className="mb-2 block">Monetization</Label>
        <RadioGroup defaultValue="none" className="flex flex-col gap-2">
          <div>
            <RadioGroupItem value="tips" id="tips" />
            <Label htmlFor="tips">Enable Tips</Label>
          </div>
          <div>
            <RadioGroupItem value="sponsor" id="sponsor" />
            <Label htmlFor="sponsor">Sponsor Room</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Customize */}
      <div>
        <Label className="mb-2 block">Customize</Label>
        <div className="flex items-center gap-4">
          <Input type="file" />
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
        <Button variant="outline">Preview Room</Button>
        <Button>Go Live!</Button>
      </div>
    </div>
  );
}
