"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Settings,
  X,
  Camera,
  CameraOff,
  Monitor,
  Mic,
  Phone,
  CheckCircle2,
} from "lucide-react";

const ROOM_BG =
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80";

const AVATARS = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&q=80",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&q=80",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=200&q=80",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80",
  },
];

type Step = "avatar" | "camera" | "room";

export default function HubPage() {
  const [step, setStep] = useState<Step>("avatar");
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [inRoom, setInRoom] = useState(false);

  if (inRoom) {
    return <VirtualRoom />;
  }

  return (
    <div className="flex items-center justify-center">
      {/* Blurred room preview behind modal */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <Image
          src={ROOM_BG}
          alt=""
          fill
          className="object-cover opacity-30 blur-sm"
          sizes="100vw"
        />
      </div>

      {/* Settings modal */}
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-panel">
        {/* Header */}
        <div className="flex items-center gap-3 bg-ink px-4 py-4 sm:px-6">
          <Settings className="h-5 w-5 text-white" />
          <h2 className="text-base font-bold text-white">Meeting settings</h2>
          <button className="ml-auto flex h-8 w-8 items-center justify-center rounded-full text-white/70 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        {step === "avatar" && (
          <>
            <div className="p-4 sm:p-6">
              <p className="mb-4 text-sm font-semibold text-ink">
                Pick your Avatar
              </p>
              <div className="grid grid-cols-3 gap-3">
                {AVATARS.map((av) => (
                  <button
                    key={av.id}
                    type="button"
                    onClick={() => setSelectedAvatar(av.id)}
                    className={`relative overflow-hidden rounded-xl border-2 transition-all ${
                      selectedAvatar === av.id
                        ? "border-accent shadow-md"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={av.image}
                      alt={`Avatar ${av.id}`}
                      width={160}
                      height={160}
                      className="h-32 w-full object-cover"
                    />
                    {selectedAvatar === av.id && (
                      <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent">
                        <CheckCircle2 className="h-3 w-3 text-white" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-between px-4 pb-4 sm:px-6 sm:pb-6">
              <button
                type="button"
                className="btn-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setStep("camera")}
                disabled={!selectedAvatar}
                className="btn-black"
              >
                Next
              </button>
            </div>
          </>
        )}

        {step === "camera" && (
          <>
            <div className="p-4 sm:p-6">
              <div className="overflow-hidden rounded-xl bg-ink">
                <div className="flex items-center gap-2 px-4 py-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                    A
                  </span>
                  <span className="text-sm font-semibold text-white">
                    Abdelali Hraich
                  </span>
                </div>

                <div className="flex h-40 items-center justify-center">
                  {cameraOn ? (
                    <p className="text-sm text-white/60">Camera preview</p>
                  ) : (
                    <div className="text-center">
                      <p className="text-sm font-semibold text-amber-400">
                        ⚠ Camera Not Detected
                      </p>
                      <p className="mt-1 text-xs text-white/50">
                        Check browser permissions (allow camera access)
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center gap-3 px-4 pb-4">
                  <button
                    type="button"
                    onClick={() => setCameraOn((v) => !v)}
                    className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                      cameraOn
                        ? "bg-white/10 text-white hover:bg-white/20"
                        : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                  >
                    {cameraOn ? (
                      <Camera className="h-5 w-5" />
                    ) : (
                      <CameraOff className="h-5 w-5" />
                    )}
                  </button>
                  <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20">
                    <Monitor className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setMicOn((v) => !v)}
                    className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                      micOn
                        ? "bg-white/10 text-white hover:bg-white/20"
                        : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                  >
                    <Mic className="h-5 w-5" />
                  </button>
                  <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20">
                    <Phone className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-between px-4 pb-4 sm:px-6 sm:pb-6">
              <button
                type="button"
                onClick={() => setStep("avatar")}
                className="btn-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setInRoom(true)}
                className="btn-black"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function VirtualRoom() {
  return (
    <div className="relative -m-5 flex h-[calc(100vh-100px)] flex-col overflow-hidden sm:-m-6">
      {/* Background */}
      <Image
        src={ROOM_BG}
        alt="Virtual room"
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />

      {/* Top HUD */}
      <div className="relative z-10 mx-auto mt-4 flex max-w-[calc(100%-1.5rem)] flex-wrap items-center justify-center gap-2 rounded-2xl bg-ink/90 px-3 py-2.5 backdrop-blur-sm sm:gap-3 sm:px-4">
        <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white">
          <span className="text-sm font-bold">+</span>
        </button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-600 text-xs font-bold text-white">
          A
        </div>
        <span className="hidden text-sm font-semibold text-white sm:inline">
          Abdelali Hraich
        </span>
        <div className="mx-2 hidden h-4 w-px bg-white/20 sm:block" />
        <div className="flex gap-1">
          {["A", "S", "R"].map((i, idx) => (
            <span
              key={idx}
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white ${
                idx === 0 ? "bg-red-500" : idx === 1 ? "bg-purple-500" : "bg-green-500"
              }`}
            >
              {i}
            </span>
          ))}
        </div>
        <button className="btn-blue text-xs">Share</button>
      </div>

      <p className="relative z-10 mx-auto mt-2 rounded bg-ink/60 px-2 py-1 text-xs text-white/80">
        Click anywhere to navigate · Scroll to zoom
      </p>
    </div>
  );
}
