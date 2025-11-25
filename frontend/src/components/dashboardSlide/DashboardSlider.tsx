import { Link } from "react-router-dom";

export default function DashboardSlider({ links }: { links: any[] }) {
  return (
    <div className="group ulDashboard h-screen w-[100px] md:hover:w-[300px] left-0 bg-blue-400 text-white flex flex-col items-start justify-center gap-5 p-5 transition-all duration-300 ease-in-out text-5xl">
      {links.map(({ path, label, icon }, i) => (
        <Link key={i} to={path} className="flex items-center gap-3">
          {icon}
          <p className="hidden md:group-hover:block transition-all duration-300 ease-in-out">
            {label}
          </p>
        </Link>
      ))}
    </div>
  );
}
