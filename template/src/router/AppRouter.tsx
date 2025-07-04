import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import SearchPage from '../pages/SearchPage'
import CreateEvent from '../pages/CreateEvent'
import TribePage from '../pages/TribePage'
import EventPage from '../pages/EventPage'
import CrewPage from '../pages/CrewPage'
import MainLayout from '../layouts/MainLayout'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/tribe/:id" element={<TribePage />} />
          <Route path="/event/:id" element={<EventPage />} />
          <Route path="/crew/:id" element={<CrewPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}
