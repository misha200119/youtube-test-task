import { useState, useDeferredValue, useEffect } from 'react';
import { TextInput, Spinner, Pagination } from 'flowbite-react';
import { FaSearch } from 'react-icons/fa';
import { useSearchVideosQuery } from '../store/api';
import { VideoCard } from '../components/video/VideoCard';
import { paginationTheme } from '../components/pagination/utils';
import { useSearchParams } from 'react-router-dom';

export const Home = () => {
  const [params] = useSearchParams();

  useEffect(() => {
    params.get('q');
  }, [params]);

  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const deferredSearch = useDeferredValue(search);

  useEffect(() => {
    setSearch(params.get('q') || '');
  }, [params]);

  const { data, isLoading, isFetching } = useSearchVideosQuery(
    {
      q: deferredSearch,
      maxResults: 10,
      pageToken: currentPage.toString(),
    },
    {
      //   skip: !deferredSearch,
    }
  );

  const totalPages = data?.totalResults ? Math.ceil(data.totalResults / 10) : 0;

  return (
    <div className="min-h-screen flex flex-col bg-black pb-5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <div className="max-w-4xl mx-auto pt-4">
          <TextInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search videos..."
            icon={FaSearch}
            className="w-full dark"
          />

          {(isLoading || isFetching) && (
            <div className="absolute right-3 top-6">
              <Spinner size="sm" />
            </div>
          )}

          {data?.results && (
            <div className="my-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.results.map((video) => (
                <VideoCard key={video.videoId} video={video} />
              ))}
            </div>
          )}
        </div>
      </div>

      {data?.results && (
        <div className="mt-auto bg-none">
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
              theme={paginationTheme}
              nextLabel=""
              previousLabel=""
              showIcons
            />
          </div>
        </div>
      )}
    </div>
  );
};
