// src/app/page.tsx
import Image from 'next/image'

export default function Home() {
  return (
    <div className="relative w-full h-screen">
      <Image
        src="/hero.jpg"
        alt="Agricultural field in rain"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-between p-8 text-white">
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            <span className="text-blue-600">A</span>
            <span className="text-white">R</span>
            <span className="text-red-600">C</span>
          </h1>
          <button className="bg-white text-black px-4 py-2 rounded shadow">
            Connect Wallet
          </button>
        </header>

        <main className="text-center">
          <h2 className="text-4xl font-bold mb-2">Autonomous Risk Coverage</h2>
          <p className="text-lg italic mb-6">ETHGlobal Unite × 1inch</p>
          <nav className="flex justify-center gap-8 text-xl font-semibold">
            <a href="#">Infos</a>
            <a href="#">FAQ</a>
            <a href="#">Subscribe</a>
            <a href="#">Contact</a>
          </nav>
        </main>
      </div>
    </div>
  )
}
