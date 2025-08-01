'use client';

import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/hero.jpg" //ajouter ce fichier dans public/hero.jpg
        alt="Agricultural field under rain"
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          ARC – Autonomous Risk Coverage
        </h1>
        <p className="text-lg md:text-2xl mb-6">
          ETHGlobal Unite × 1inch Hackathon
        </p>
        <a
          href="#simulate"
          className="bg-green-600 hover:bg-green-700 transition px-6 py-3 rounded-xl text-lg font-semibold shadow-md"
        >
          Launch Simulation
        </a>
      </div>
    </section>
  );
}
