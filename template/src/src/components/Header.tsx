import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">FindMyTribe</Link>
      <nav className="space-x-4">
        <Link to="/search" className="text-gray-700 hover:text-blue-500">Search</Link>
        <Link to="/create-event" className="text-gray-700 hover:text-blue-500">Create Event</Link>
      </nav>
    </header>
  )
}
