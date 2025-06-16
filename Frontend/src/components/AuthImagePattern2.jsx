import { Volleyball } from "lucide-react";

const AuthImagePattern2 = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-[#0A0A0A] p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
                className={`aspect-square rounded-2xl bg-gradient-to-br from-[#2F4F4F] to-[#1B1B1B]  hover:scale-105 hover:shadow-[0_0_15px_#00FFD1] transition-transform duration-500 ease-in-out 
                flex items-center justify-center ${
                (i % 5 === 0) * (4 + i) ? "animate-pulse" : "animate-bounce"
            }`}
            >
                {/* <Volleyball className="w-6 h-6 text-emerald-600" /> */}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-mono text-emerald-100 mb-4">{title}</h2>
        <p className="font-mono text-red-100 transition duration-500 hover:scale-105 hover:text-red-200">
        {subtitle}
        </p>

      </div>
    </div>
  );
};

export default AuthImagePattern2;