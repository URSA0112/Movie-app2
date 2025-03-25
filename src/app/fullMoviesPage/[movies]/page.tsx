'use client'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_KEY, BASE_URL, BASE_IMAGE_URL } from '@/app/constants'
import { Movie } from '@/app/types'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink } from '@/components/ui/pagination'
import { Footer } from '@/app/components/footer/footer'

export default function FullMoviesPage() {
  const params = useParams()
  const category = params?.movies as string
  const [movies, setMovies] = useState<Movie[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)

  useEffect(() => {
    if (!category) return

    const fetchCategoryMovies = async () => {
      let endpoint = ''
      if (category === 'upcoming') endpoint = '/movie/upcoming'
      else if (category === 'top-rated') endpoint = '/movie/top_rated'
      else if (category === 'popular') endpoint = '/movie/popular'

      try {
        const res = await axios.get(
          `${BASE_URL}${endpoint}?api_key=${API_KEY}&page=${currentPage}`
        )
        setMovies(res.data.results)
        setTotalPages(res.data.total_pages)
      } catch (err) {
        console.error(err)
      }
    }

    fetchCategoryMovies()
  }, [category, currentPage])

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return (
    <div className='p-6 bg-gray-900 text-white'>
      <h2 className='text-3xl mb-6 capitalize'>{category.replace('-', ' ')} Movies</h2>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
        {movies.map((movie) => (
          <Link
            key={movie.id}
            href={`/movieDetails/${movie.id}`}
          >
            <Card className='h-full flex flex-col bg-neutral-100 dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 p-2'>
              <CardContent className='p-0'>
                <img
                  src={`${BASE_IMAGE_URL}w500${movie.poster_path}`}
                  alt={movie.title}
                  className='w-full h-60 object-cover rounded-t-md'
                />
              </CardContent>
              <CardHeader className='px-3 py-2 min-h-[80px]'>
                <CardTitle className='text-sm truncate min-h-[20px]'>
                  <span className='bg-yellow-500 text-white font-semibold text-xs px-2 py-1 rounded-full shadow-sm'>
                    ⭐ {movie.vote_average.toFixed(1)} / 10
                  </span>
                </CardTitle>
                <CardDescription className='text-sm font-bold dark:text-neutral-200 text-black min-h-[40px] truncate'>
                  {movie.title}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      <Pagination className='mt-10 flex justify-center'>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>

          {[...Array(5)].map((_, index) => {
            const pageNumber = currentPage - 2 + index
            if (pageNumber > 0 && pageNumber <= totalPages) {
              return (
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={() => handlePageChange(pageNumber)}
                    isActive={pageNumber === currentPage}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              )
            }
            return null
          })}

          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
         <Footer></Footer>
    </div>
  )
}