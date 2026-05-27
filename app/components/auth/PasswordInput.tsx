"use client";

import { useState, forwardRef } from "react";

import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> { }

const PasswordInput = forwardRef<HTMLInputElement, Props>(({ value, onChange, onBlur, name, ...props }, ref) => {
    const [show, setShow] = useState(false);
    return (
        <div className="relative">
            <Input
                ref={ref}
                name={name}
                type={show ? "text" : "password"}
                placeholder="Password"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className="h-[46px] rounded-xl pr-12"
                {...props}
            />
            <button
                type="button"
                onClick={() => setShow(!show)}
                className="
                    absolute    
                    right-4
                    top-1/2
                    -translate-y-1/2
                "
            >
                {show ? (
                    <EyeOff size={18} />
                ) : (
                    <Eye size={18} />
                )}
            </button>
        </div>
    );
}
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;