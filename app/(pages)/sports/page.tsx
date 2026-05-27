"use client";
import Test from "@/components/Test";
import { useAuthStore } from "@/store/authStore";
export default function SportPage() {
    const count = useAuthStore((state) => state.count);
    const increment = useAuthStore((state) => state.increment);
    return (
        <div>
            <h1>Sport Page</h1>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
            <Test />
        </div>
    )
}
