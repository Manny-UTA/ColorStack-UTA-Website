export default function ThankYouPage() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-[#0b0f24] text-white p-6">
      <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
      <p className="text-lg mb-6">Your message has been sent. We’ll be in touch soon.</p>
      <a
        href="/about"
        className="bg-[#fd9739] hover:bg-[#e67c20] text-white font-semibold px-6 py-3 rounded-full transition"
      >
        Back to About
      </a>
    </main>
  )
}
