export const fileSizeDisplay = (bytes: number) => {
  if (bytes < 1_000_000) {
    const kilobytes = Math.round(bytes / 1024);
    return `${kilobytes} KB`;
  }

  if (bytes < 1_000_000_000) {
    const megabytes = bytes / (1024 * 1024);
    return `${megabytes.toFixed(2)} MB`;
  }

  const gigabytes = bytes / (1024 * 1024 * 1024);
  return `${gigabytes.toFixed(2)} GB`;
};
