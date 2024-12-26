import React from 'react';
import { Drawer, Button, Spinner } from 'flowbite-react';

import { FaHistory } from 'react-icons/fa';
import { useGetSearchHistoryQuery } from '../../store/api';
import { historyDrawerTheme } from './utils';
import { HistoryItem } from './HistoryItem';

export const HistoryDrawer = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { data, isLoading } = useGetSearchHistoryQuery(null);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed left-4 top-4 bg-zinc-900 hover:bg-zinc-800">
        <FaHistory className="mr-2" />
        History
      </Button>

      <Drawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        position="left"
        theme={historyDrawerTheme.theme}>
        <Drawer.Header className="bg-black border-b border-zinc-800">
          <div className="flex items-center gap-2 text-white">
            <FaHistory />
            <span>Search History</span>
          </div>
        </Drawer.Header>

        <Drawer.Items className="bg-black">
          {isLoading ? (
            <div className="text-gray-400">
              <Spinner />
            </div>
          ) : (
            <div className="space-y-2">
              {data?.history
                .filter((item) => item.query)
                .map((item) => (
                  <HistoryItem historyItem={item} />
                ))}
            </div>
          )}
        </Drawer.Items>
      </Drawer>
    </>
  );
};
