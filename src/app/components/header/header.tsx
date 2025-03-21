'use'
import { Movie } from "@/app/types";
import { ToggleTheme } from "../Theme/ToggleTheme";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { api, API_KEY, BASE_URL } from "@/app/constants";
import { Search } from "lucide-react";


type HeaderProps = {
  selectedGenre: { id: number; name: string } | null,
  setSelectedGenre: Dispatch<SetStateAction<{ id: number; name: string } | null>>,
  searchValue:string | null
}
export function Header({ selectedGenre, setSelectedGenre, searchValue }: HeaderProps) {
  const [genre, setGenre] = useState<Movie[]>([])

  useEffect(() => {
    const getGenres = async () => {
      const res = await api.get(`${BASE_URL}/genre/movie/list`)
      setGenre(res.data.genres)
    }
    getGenres()
  }, [])

  return (
    <header className="w-full bg-blue-300 dark:bg-gray-800 shadow-md p-4 mb-5">
      <div className="container mx-auto flex  md:flex-row justify-between items-center gap-4 md:gap-0">
        {/* Logo */}
        <img src="movie-logo.png" alt="movie-logo" className="w-24 max-w-[120px] h-auto" />

        {/* Genre + Search */}
        <div className="flex sm:flex-row md:flex-row items-center md:gap-7 w-full md:w-[400px] gap-5  ">
          <div className="w-[40%] sm:w-full  rounded-md">
            <Select onValueChange={(value) => {
              const selected = genre.find((g) => g.id.toString() === value);
              if (selected) {
                setSelectedGenre(selected);
              }
            }}>
              <SelectTrigger className="w-full bg-neutral-100">
                <SelectValue placeholder="Choose Genre" />
              </SelectTrigger>
              <SelectContent>
                {genre.map((each) => (
                  <SelectItem key={each.id} value={each.id.toString()}>
                    {each.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

          </div>
          {/* input search */}
          <input
            placeholder="Search movie..."
            className="w-[70%] h-9 sm:w-full md:w-[600px] 
            px-3 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2
             focus:ring-blue-500 text-sm bg-neutral-100 dark:bg-gray-800"
             value={searchValue ?? ""}
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