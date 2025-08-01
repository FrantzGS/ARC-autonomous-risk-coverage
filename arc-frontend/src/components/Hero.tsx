"use client"

import Image from "next/image"

export default function Hero() {
  return (
    <div className="relative w-full h-screen">
      <Image
        src="/hero.jpg"
        alt="Rainy farmland"
        layout="fill"
        objectFit="cover"
        priority
        className="brightness-50"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          ARC – ETHGlobal Unite × 1inch
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-xl">
          Autonomous Risk Coverage for Farmers. Powered by Web3.
        </p>
        <a
          href="#"
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl text-lg transition"
        >
          Launch the App
        </a>
      </div>
    </div>
  )
}
