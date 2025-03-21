import { ToggleTheme } from "../Theme/ToggleTheme";
import { GenreSelectButton } from "./select";

export function Header() {
  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-md p-4">
      <div className="container mx-auto flex  md:flex-row justify-between items-center gap-4 md:gap-0">
        
        {/* Logo */}

          <img src="movie-logo.png" alt="movie-logo" className="w-24 max-w-[120px] h-auto" />

        {/* Genre + Search */}
        <div className="flex sm:flex-row md:flex-row items-center md:gap-7 w-full md:w-[400px] gap-5 ">
          <div className="w-[40%] sm:w-full  rounded-md">
            <GenreSelectButton />
          </div>
          <input
            placeholder="Search movie..."
            className="w-[70%] sm:w-full md:w-[600px] px-3 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
        
        {/* Dark mode toggle */}
        <div className="flex-shrink-0">
          <ToggleTheme />
        </div>
      </div>
    </header>
  );
}