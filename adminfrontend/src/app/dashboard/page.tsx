"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ScrollProgressBar from "../components/ScrollProgressBar";
import { motion } from "framer-motion";
import Link from "next/link";
import { EVENT_API_END_POINT } from "../utils/constants"
import { RESULTS_END_POINT } from "../utils/constants"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../ui/dialog";
import { RegisterForm } from "../components/CreateEvent";
import { ResultForm } from "../components/CreateResult";
import { Trash2 } from "lucide-react";
// import { Toaster, toast } from 'sonner';

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [results, setResults] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [resultToDelete, setResultToDelete] = useState(null);
  const router = useRouter();
  
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (!isAuthenticated) {
      router.push("/"); // Redirect if not logged in
    } else {
      document.title = "FAROUCHE - Dashboard";
      fetchEvents();
      fetchResults();
    }
  }, []);

  async function fetchEvents() {
    const res = await fetch(`${EVENT_API_END_POINT}/getEvents`);
    const data = await res.json();
    setEvents(data.data);
  }

  async function fetchResults() {
    const res = await fetch(`${RESULTS_END_POINT}/getResults`);
    const data = await res.json();
    setResults(data.data || []);
  }

  const handleDeleteEvent = async (eventId) => {
    setIsDeleting(true);
    try {
      const response = await fetch(`${EVENT_API_END_POINT}/deleteEvent`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventId }),
      });

      if (response.ok) {
        // Remove the deleted event from the state
        setEvents(events.filter(event => event.eventid !== eventId));
        // toast.success("Event deleted successfully");
        console.log("Event deleted successfully");
      } else {
        // toast.error("Failed to delete event");
        console.error("Failed to delete event");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      // toast.error("Error deleting event");
    } finally {
      setIsDeleting(false);
      setEventToDelete(null);
    }
  };

  const handleDeleteResult = async (resultId) => {
    setIsDeleting(true);
    try {
      const response = await fetch(`${RESULTS_END_POINT}/deleteResult`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resultId }),
      });

      if (response.ok) {
        // Remove the deleted result from the state
        setResults(results.filter(result => result.resultid !== resultId));
        // toast.success("Result deleted successfully");
        console.log("Result deleted successfully");
      } else {
        // toast.error("Failed to delete result");
        console.error("Failed to delete result");
      }
    } catch (error) {
      console.error("Error deleting result:", error);
      // toast.error("Error deleting result");
    } finally {
      setIsDeleting(false);
      setResultToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* <Toaster /> */}
      <ScrollProgressBar />
      <div className="container mx-auto px-4 py-20">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-400 to-blue-600 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Manage your events and view insights
          </p>
        </motion.section>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Total Events */}
          <div className="rounded-lg bg-gradient-to-b from-green-800 to-black p-6 border border-green-700">
            <h2 className="text-2xl font-bold text-green-400 mb-3">
              Total Events
            </h2>
            <p className="text-4xl font-semibold text-gray-100">
              {events.length}
            </p>
          </div>
          
          {/* Total Results */}
          <div className="rounded-lg bg-gradient-to-b from-blue-800 to-black p-6 border border-blue-700">
            <h2 className="text-2xl font-bold text-blue-400 mb-3">
              Total Results
            </h2>
            <p className="text-4xl font-semibold text-gray-100">
              {results.length}
            </p>
          </div>

          {/* Admin Actions */}
          <div className="rounded-lg bg-gradient-to-b from-purple-800 to-black p-6 border border-purple-700">
            <h2 className="text-2xl font-bold text-purple-400 mb-3">
              Admin Actions
            </h2>
            <div className="flex gap-3">
              <div className="space-y-4">
                <Dialog>
                  <DialogTrigger
                    className="block px-4 py-2 text-center rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors"
                  >
                    Add Event
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create a New Event</DialogTitle>
                      <DialogDescription>
                        Please fill in the details below to register your event.
                        This action will create a permanent event entry in our
                        system.
                      </DialogDescription>
                    </DialogHeader>
                    <RegisterForm />
                  </DialogContent>
                </Dialog>
              </div>
              <div className="space-y-4">
                <Dialog>
                  <DialogTrigger className="block px-4 py-2 text-center rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors">
                    Add Results
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create a New Result</DialogTitle>
                      <DialogDescription>
                        Please fill in the details below to add a new result.
                      </DialogDescription>
                    </DialogHeader>
                    <ResultForm />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>

        {/* Events List with Delete Option */}
        <div className="rounded-lg bg-gray-900 p-6 border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-blue-400 mb-4">Events List</h2>
          {events.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-800 text-left">
                    <th className="p-3 rounded-tl-lg">Event Name</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Location</th>
                    <th className="p-3 rounded-tr-lg text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr key={event.eventid} className="border-b border-gray-700">
                      <td className="p-3">{event.title || event.eventname}</td>
                      <td className="p-3">{new Date(event.date || event.eventdate).toLocaleDateString()}</td>
                      <td className="p-3">{event.location || event.venue}</td>
                      <td className="p-3 text-center">
                        <Dialog>
                          <DialogTrigger>
                            <button 
                              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900 rounded-full transition-colors"
                              onClick={() => setEventToDelete(event.eventid)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle className="text-red-400">Confirm Delete</DialogTitle>
                              <DialogDescription>
                                Are you sure you want to delete this event? This action cannot be undone.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="mt-4 flex justify-end gap-2">
                              <button 
                                className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
                                onClick={() => setEventToDelete(null)}
                              >
                                Cancel
                              </button>
                              <button 
                                className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                                onClick={() => handleDeleteEvent(eventToDelete)}
                                disabled={isDeleting}
                              >
                                {isDeleting ? "Deleting..." : "Delete"}
                              </button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-400">No events found.</p>
          )}
        </div>

        {/* Results List with Delete Option */}
        <div className="rounded-lg bg-gray-900 p-6 border border-gray-700">
          <h2 className="text-2xl font-bold text-green-400 mb-4">Results List</h2>
          {results.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-800 text-left">
                    <th className="p-3 rounded-tl-lg">Event</th>
                    <th className="p-3">Winner</th>
                    <th className="p-3">Position</th>
                    <th className="p-3 rounded-tr-lg text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result) => (
                    <tr key={result.resultid} className="border-b border-gray-700">
                      <td className="p-3">{result.eventname}</td>
                      <td className="p-3">{result.winnername}</td>
                      <td className="p-3">{result.position}</td>
                      <td className="p-3 text-center">
                        <Dialog>
                          <DialogTrigger>
                            <button 
                              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900 rounded-full transition-colors"
                              onClick={() => setResultToDelete(result.resultid)}
                            >
                              <Trash2 size={16} />
                            </button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle className="text-red-400">Confirm Delete</DialogTitle>
                              <DialogDescription>
                                Are you sure you want to delete this result? This action cannot be undone.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="mt-4 flex justify-end gap-2">
                              <button 
                                className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
                                onClick={() => setResultToDelete(null)}
                              >
                                Cancel
                              </button>
                              <button 
                                className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                                onClick={() => handleDeleteResult(resultToDelete)}
                                disabled={isDeleting}
                              >
                                {isDeleting ? "Deleting..." : "Delete"}
                              </button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-400">No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
}