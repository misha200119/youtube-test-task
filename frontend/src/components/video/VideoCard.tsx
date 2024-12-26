import { FC } from 'react';
import { Video } from '../../types/video.type';
import { FaClock } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

type VideoCardProps = {
  video: Video;
};

export const VideoCard: FC<VideoCardProps> = ({ video }) => {
  const navigate = useNavigate();

  const onClick = () => navigate(`/video/${video.videoId}`);

  return (
    <div
      key={video.videoId}
      onClick={onClick}
      className="video-card w-full rounded-lg bg-zinc-900 hover:bg-zinc-800 transition-colors overflow-hidden cursor-pointer">
      <div className="relative w-full">
        <div
          style={{
            background: `url("${video.thumbnailUrl}") no-repeat`,
            backgroundPosition: 'center',
          }}
          className={`video-card-preview w-full aspect-video`}
        />
        <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-white">
          <FaClock className="inline mr-1" />
          {formatDistanceToNow(new Date(video.publishedAt))}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-white text-lg line-clamp-2">
          {video.title}
        </h3>
        <p className="text-sm text-gray-400 mt-1 line-clamp-2">
          {video.description}
        </p>
      </div>
    </div>
  );
};
