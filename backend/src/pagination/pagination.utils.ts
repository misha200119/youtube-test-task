export function encodePageToken(page: number): string {
  return Buffer.from(`page_${page}`).toString('base64');
}

export function decodePageToken(token: string): number {
  const decoded = Buffer.from(token, 'base64').toString();
  return parseInt(decoded.replace('page_', '')) || 1;
}
