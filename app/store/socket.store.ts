"use client";

import { create } from "zustand";

import { io, Socket } from "socket.io-client";

interface SocketState {

    socket: Socket | null;

    connect: () => void;

    disconnect: () => void;
}

export const useSocketStore =
    create<SocketState>((set, get) => ({

        socket: null,

        connect: () => {

            if (get().socket) return;

            const socket =
                io(
                    process.env
                        .NEXT_PUBLIC_WS_URL!
                );

            set({ socket });
        },

        disconnect: () => {

            get()
                .socket
                ?.disconnect();

            set({
                socket: null,
            });
        },
    }));