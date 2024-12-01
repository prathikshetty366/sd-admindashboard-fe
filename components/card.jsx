// Card.jsx
export default function Card({ image, text }) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-200 hover:shadow-lg">
      <img src={image} alt={text} className="h-32 w-full object-cover" />
      <div className="px-2 py-3 sm:p-4">
        <h3 className="text-center text-lg font-semibold">{text}</h3>
      </div>
    </div>
  )
}
