export const paginationTheme = {
  base: '',
  layout: {
    table: { base: 'text-sm text-gray-400' },
  },
  pages: {
    base: 'inline-flex items-center -space-x-px',
    previous: {
      base: 'ml-0 rounded-l-lg border border-zinc-800 bg-black py-2 px-3 leading-tight text-gray-400 hover:bg-zinc-900',
      icon: 'h-5 w-5',
    },
    next: {
      base: 'rounded-r-lg border border-zinc-800 bg-black py-2 px-3 leading-tight text-gray-400 hover:bg-zinc-900',
      icon: 'h-5 w-5',
    },
    selector: {
      base: 'w-12 border border-zinc-800 bg-black py-2 leading-tight text-gray-400 hover:bg-zinc-900',
      active: 'bg-zinc-900 text-white hover:bg-zinc-800',
    },
  },
};
