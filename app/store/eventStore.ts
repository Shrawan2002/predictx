import { create } from "zustand";
import { EventStoreState } from "@/types/event.types";
import { toast } from "sonner";
import { eventService } from "@/services/event.service";

export const useEventStore = create<EventStoreState>((set, get) => ({
    // ── Initial state 
    events: [],
    event: null,
    selectedEvent: null,
    loading: false,
    creating: false,
    updating: false,
    deleting: false,
    error: null,
    search: "",
    statusFilter: "all",

    // fetching all events
    fetchAllEvents: async () => {
        try {
            set({ loading: true, error: null })

            const data = await eventService.getAllEvents();
            if (data.success && data.data) {
                set({ events: data.data })

            } else {
                toast.error(data.message || "Failed to fetch events");
                set({ error: data.message || "failed to fetch events" })
            }
        }
        catch (err: any) {
            const message = err instanceof Error ? err.message : "Failed to fetch events";
            toast.error(message)
            set({ error: message })
        }
        finally {
            set({ loading: false })
        }
    },

    // fetching specific event
    fetchEvent: async (eventId: number) => {
        try {
            set({ loading: true, error: null })

            const data = await eventService.getEvent(eventId);
            if (data.success && data.data) {
                set({ event: data.data })

            } else {
                toast.error(data.message || "Failed to fetch event");
                set({ error: data.message || "failed to fetch event" })
            }
        }
        catch (err: any) {
            const message = err instanceof Error ? err.message : "Failed to fetch event";
            toast.error(message)
            set({ error: message })
        }
        finally {
            set({ loading: false })
        }
    },

    // creating event
    createEvent: async (data) => {
        try {
            set({ creating: true, error: null })
            const res = await eventService.createEvent(data)
            if (res.success) {
                toast.success(res.message || "Event created successfully")
                await get().fetchAllEvents();
                return true;
            }
            toast.error(res.message || "Failed to create event");
            return false
        }
        catch (err: any) {
            const message = err instanceof Error ? err.message : "failed to create event";
            toast.error(message)
            set({ error: message })
            return false
        }
        finally {
            set({ creating: false })
        }
    },
    // updating event
    updateEvent: async (id, payload) => {
        try {
            set({ updating: true, error: null })
            const res = await eventService.updateEvent(id, payload);
            if (res.success) {
                toast.success(res.message || "Event updated successfully")
                await get().fetchAllEvents();
                return true;
            }
            toast.error(res.message || "Failed to update event");
            return false
        } catch (err: any) {
            const message = err instanceof Error ? err.message : "Failed to update event";
            toast.error(message)
            set({ error: message })
            return false
        } finally {
            set({ updating: false })
        }
    },

    //deleting event
    deleteEvent: async (id) => {
        try {
            set({ deleting: true, error: null })
            const res = await eventService.deleteEvent(id)
            if (res.success) {
                toast.success(res.message || "Event deleted successfully")
                await get().fetchAllEvents();
                return true;
            }
            toast.error(res.message || "Failed to delete event");
            return false
        } catch (err: any) {
            const message = err instanceof Error ? err.message : "failed to delete event"
            toast.error(message)
            set({ error: message })
            return false
        } finally {
            set({ deleting: false })
        }
    },
    // ── Selection ──────────────────────────────────────────
    setSelectedEvent: (event) => set({ selectedEvent: event }),
    clearSelectedEvent: () => set({ selectedEvent: null }),
    // ── Filters ────────────────────────────────────────────
    setSearch: (query) => set({ search: query }),
    setStatusFilter: (status) => set({ statusFilter: status }),

    clearError: () => set({ error: null }),

}))