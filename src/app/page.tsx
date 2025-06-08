export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-playfairDisplay font-bold text-blue-400">
        Welcome to ezrecipe
      </h1>
      <button className="bg-primary text-white font-inter font-semibold py-2 px-4 rounded-xl hover:bg-secondary transition">
        Save Recipe
      </button>

      <a
        href="#"
        className="block text-primary font-inter hover:underline transition"
      >
        View full recipe →
      </a>
    </div>
  );
}
