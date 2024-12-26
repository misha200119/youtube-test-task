import { useParams, useNavigate } from 'react-router-dom';
import { useGetVideoByIdQuery } from '../store/api';
import { formatDistanceToNow } from 'date-fns';
import { Spinner, Button } from 'flowbite-react';
import { FaEye, FaThumbsUp, FaArrowLeft } from 'react-icons/fa';

export const Video = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: video, isLoading } = useGetVideoByIdQuery(id);

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto p-4">
        <div className="max-w-4xl mx-auto">
          <Button
            onClick={() => navigate(-1)}
            theme={{
              base: 'group flex h-min items-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none',
              color: {
                dark: 'text-white bg-black border border-zinc-800 hover:bg-zinc-900 focus:ring-gray-800',
              },
            }}
            className="mb-4">
            <FaArrowLeft className="mr-2" />
            Back
          </Button>

          <div className="aspect-video bg-zinc-900 rounded-lg overflow-hidden">
            <img
              src={video?.thumbnailUrl}
              alt={video?.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mt-4 space-y-4">
            <h1 className="text-2xl font-bold">{video?.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm">
              <span className="flex items-center gap-1">
                <FaEye className="text-lg" />
                {video?.viewCount.toLocaleString()} views
              </span>
              <span className="flex items-center gap-1">
                <FaThumbsUp className="text-lg" />
                {video?.likeCount.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                Published {formatDistanceToNow(new Date(video?.publishedAt))}{' '}
                ago
              </span>
            </div>

            <div className="p-4 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors">
              <p className="text-gray-300 whitespace-pre-wrap">
                {video?.description}
              </p>
            </div>

            {video?.commentCount > 0 && (
              <div className="p-4 bg-zinc-900 rounded-lg">
                <h2 className="text-lg font-medium mb-2">
                  Comments ({video.commentCount.toLocaleString()})
                </h2>
                {/* Comments section could be added here */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
