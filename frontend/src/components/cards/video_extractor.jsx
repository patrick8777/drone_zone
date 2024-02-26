import React, { useRef, useEffect } from 'react';

const VideoThumbnailExtractor = ({ videoSource }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const handleLoadedMetadata = () => {
      const aspectRatio = video.videoWidth / video.videoHeight;
      const thumbnailWidth = 4 * aspectRatio;

      canvas.width = thumbnailWidth;
      canvas.height = 4;

      const x = (canvas.width - video.videoWidth) / 2;

      context.drawImage(video, x, 0, video.videoWidth, video.videoHeight, 0, 0, canvas.width, canvas.height);

      const thumbnailUrl = canvas.toDataURL('image/png');
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [videoSource]);

  return (
    <div>
      <video
        style={{objectFit: 'cover', maxWidth: 'none' }}
        ref={videoRef}
        src={videoSource}
        width="400"
        height="7000"
      />
      <canvas ref={canvasRef} style={{ display: 'none' }} width={400} height={7000} />
    </div>
  );
};

export default VideoThumbnailExtractor;
