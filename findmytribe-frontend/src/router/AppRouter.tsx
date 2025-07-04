import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import CreateEvent from '../pages/CreateEvent';
import TribePage from '../pages/TribePage';
import CrewPage from '../pages/CrewPage';
import MainLayout from '../layouts/MainLayout';
import Search from '../pages/SearchPage'; // assuming this is a page for /search
import EventGrid from '../pages/EventPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search onSearch={function (query: string): void {
                      throw new Error('Function not implemented.');
                  } }/>} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/tribes/:id" element={<TribePage />} />
          <Route path="/event/:id" element={<EventGrid />} />
          <Route path="/crew/:id" element={<CrewPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
