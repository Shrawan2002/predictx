export default function HeaderLogo() {
    return (
        <div className="flex items-center gap-3">

            <div className="
                w-9 h-9 flex items-center justify-center
                rounded-lg
                bg-linear-to-br
                from-blue-500 to-indigo-600
                shadow-md
            ">
                <svg
                    viewBox="0 0 48 48"
                    className="w-5 h-5"
                >
                    <path
                        d="M14 10H26C32 10 36 14 36 20C36 26 32 30 26 30H14V10Z"
                        fill="white"
                    />

                    <path
                        d="M14 30L24 38H14V30Z"
                        fill="white"
                    />
                </svg>
            </div>

            <span className="
                text-lg font-semibold tracking-tight
                text-[#18181B]
                dark:text-white
            ">
                PredictX
            </span>
        </div>
    );
}