import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 100,
  height: 100,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <>
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="100" height="100" rx="15" fill="#152938" />
          <circle cx="20" cy="20" r="10" fill="#FDA214" />
          <circle cx="50" cy="20" r="10" fill="#FDA214" />
          <circle cx="80" cy="20" r="10" fill="#FDA214" />
          <circle cx="20" cy="50" r="10" fill="#FDA214" />
          <circle cx="50" cy="50" r="10" fill="#FDA214" />
          <circle cx="80" cy="50" r="10" fill="#FDA214" />
          <circle cx="20" cy="80" r="10" fill="#FDA214" />
          <circle cx="50" cy="80" r="10" fill="#FDA214" />
          <circle cx="80" cy="80" r="10" fill="#FDA214" />
          <circle cx="50" cy="80" r="10" fill="#FDA214" />
          <circle cx="20" cy="80" r="10" fill="#FDA214" />
          <circle cx="50" cy="80" r="10" fill="#FDA214" />
          <circle cx="80" cy="80" r="10" fill="#FDA214" />
        </svg>
      </>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    }
  );
}
