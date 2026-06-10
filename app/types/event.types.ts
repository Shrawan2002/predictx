import { SubCategory } from "./category.types";

export interface EventType {
    id: number,
    categoryId: number;
    subcategoryId: number;
    question: string;
    betPrice: number;
    startTime: string;
    endTime: string;
    image?: string | File;
}

// ── Form / request shape ───────────────────────────────────
export interface PostEventType {
    categoryId: number;
    subcategoryId?: number;
    question: string;
    betPrice: number;
    startTime: string;
    endTime: string;
    image?: File | null;
}

export interface EditEventType extends PostEventType { }


export interface ApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data: T;
}

// ── Zustand store shape ────────────────────────────────────
export interface EventStoreState {
    events: EventType[];
    event: EventType | null;
    selectedEvent: EventType | null;
    loading: boolean;
    creating: boolean;
    updating: boolean;
    deleting: boolean;
    error: string | null;
    search: string;
    statusFilter: string; // "all" | "active" | "pending" | "ended"

    //actions

    fetchAllEvents: () => Promise<void>;
    fetchEvent: (eventId: number) => Promise<void>;
    createEvent: (payload: PostEventType) => Promise<boolean>;
    updateEvent: (id: number, payload: EditEventType) => Promise<boolean>;
    deleteEvent: (id: number) => Promise<boolean>;
    setSelectedEvent: (event: EventType | null) => void;
    clearSelectedEvent: () => void;
    setSearch: (query: string) => void;
    setStatusFilter: (status: string) => void;
    clearError: () => void;
}