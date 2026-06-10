import { apiFetch } from "@/lib/api";
import { ApiResponse, EditEventType, EventType, PostEventType } from "@/types/event.types";

export const eventService = {
    getAllEvents: async (): Promise<ApiResponse<EventType[]>> => {
        const { data } = await apiFetch.get("/admin/events");
        return data;
    },
    getEvent: async (eventId: number): Promise<ApiResponse<EventType>> => {
        const { data } = await apiFetch.get(`/admin/events/${eventId}`);
        return data;
    },
    createEvent: async (payload: PostEventType): Promise<ApiResponse<EventType>> => {
        const { data } = await apiFetch.post("/admin/events", payload);
        return data;
    },
    updateEvent: async (id: number, payload: EditEventType): Promise<ApiResponse<EventType>> => {
        const { data } = await apiFetch.patch(`/admin/events/${id}/status`, payload);
        return data;
    },
    deleteEvent: async (id: number): Promise<ApiResponse<void>> => {
        const { data } = await apiFetch.delete(`/admin/events/${id}/status`);
        return data;
    }
}

