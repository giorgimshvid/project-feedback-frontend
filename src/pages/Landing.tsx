import { Link } from 'react-router-dom'

const Landing = () => {
    return (
        <div className="min-h-screen w-full bg-[#2f323d] flex flex-col items-center justify-center px-4">
            <h1 className="text-white font-bold text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
                პროექტის უკუკავშირი
            </h1>

            <p className="mt-4 text-center text-[#ecdede] text-base sm:text-lg md:text-xl">
                პლატფორმა დეველოპერებისთვის. გააზიარე, შეაფასე, განვითარდი.
            </p>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
                <Link
                    to="/login"
                    className="rounded-full bg-emerald-500 px-12 py-4 text-lg font-semibold text-white transition-colors hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
                >
                    Log in
                </Link>

                <Link
                    to="/signup"
                    className="rounded-full bg-[#f2eda3] px-12 py-4 text-lg font-semibold text-[#2f323d] transition-colors hover:bg-[#e9e28d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f2eda3]"
                >
                    Sign Up
                </Link>
            </div>
        </div>
    )
}

export default Landing
