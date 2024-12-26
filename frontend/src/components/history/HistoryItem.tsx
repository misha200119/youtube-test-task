import { FC } from 'react';
import { SearchHistory } from '../../types/history';
import { formatDistanceToNow } from 'date-fns';
import { FaClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

type HistoryitemProps = {
  historyItem: SearchHistory;
};

export const HistoryItem: FC<HistoryitemProps> = ({ historyItem }) => {
  const navigate = useNavigate();

  const onClick = () => navigate(`/?q=${historyItem.query}`, {});

  return (
    <div
      key={historyItem.id}
      onClick={onClick}
      className="p-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 cursor-pointer">
      <p className="text-white">{historyItem.query}</p>
      <div className="flex items-center gap-1 text-sm text-gray-400 mt-1">
        <FaClock />
        <span>{formatDistanceToNow(new Date(historyItem.timestamp))} ago</span>
      </div>
    </div>
  );
};
