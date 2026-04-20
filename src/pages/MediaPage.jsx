import React, { useEffect, useMemo, useState } from 'react';
import Footer from '../components/Footer';

const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.mov', '.m4v'];
const AUDIO_EXTENSIONS = ['.mp3', '.wav', '.ogg', '.m4a', '.aac'];
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

const getMediaType = (fileName) => {
  const normalized = fileName.toLowerCase();
  if (VIDEO_EXTENSIONS.some((ext) => normalized.endsWith(ext))) return 'video';
  if (AUDIO_EXTENSIONS.some((ext) => normalized.endsWith(ext))) return 'audio';
  if (IMAGE_EXTENSIONS.some((ext) => normalized.endsWith(ext))) return 'image';
  return 'file';
};

const MediaPage = () => {
  const [mediaItems, setMediaItems] = useState([]);
  const [loadError, setLoadError] = useState('');

  useEffect(() => {
    const loadManifest = async () => {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}media/manifest.json`, {
          cache: 'no-store',
        });
        if (!response.ok) {
          throw new Error('Could not load media manifest');
        }
        const data = await response.json();
        setMediaItems(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setLoadError('Could not load media files right now.');
      }
    };

    loadManifest();
  }, []);

  const enrichedItems = useMemo(() => (
    mediaItems.map((item) => ({
      ...item,
      type: getMediaType(item.fileName),
      url: `${import.meta.env.BASE_URL}media/${item.fileName}`,
    }))
  ), [mediaItems]);

  return (
    <>
      <section className="pt-32 pb-20 px-4 min-h-screen bg-dark-900 border-b-4 border-b-soca-teal">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-4">
              Media Library
            </h1>
            <p className="text-slate-300 max-w-3xl mx-auto uppercase tracking-wide">
              Drop your files in <span className="text-soca-yellow font-bold">public/media</span> and they will appear here after build/deploy.
            </p>
          </div>

          {loadError && (
            <div className="mb-8 rounded-xl border border-red-400/40 bg-red-500/10 p-4 text-red-200">
              {loadError}
            </div>
          )}

          {!loadError && enrichedItems.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-dark-800 p-8 text-center text-slate-300">
              No media files found yet. Add MP4, MP3, or image files to <span className="font-bold text-soca-yellow">public/media</span>.
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {enrichedItems.map((item) => (
              <article
                key={item.fileName}
                className="rounded-2xl overflow-hidden border border-white/10 bg-dark-800 p-5 shadow-2xl"
              >
                <h2 className="text-lg md:text-xl font-bold text-white mb-4 break-all">
                  {item.fileName}
                </h2>

                {item.type === 'video' && (
                  <video className="w-full rounded-lg bg-black" controls preload="metadata">
                    <source src={item.url} />
                  </video>
                )}

                {item.type === 'audio' && (
                  <audio className="w-full" controls preload="metadata">
                    <source src={item.url} />
                  </audio>
                )}

                {item.type === 'image' && (
                  <img
                    src={item.url}
                    alt={item.fileName}
                    className="w-full rounded-lg object-cover max-h-[420px]"
                    loading="lazy"
                  />
                )}

                {item.type === 'file' && (
                  <a
                    href={item.url}
                    className="inline-block mt-2 px-4 py-2 rounded-full bg-soca-red hover:bg-red-500 transition-colors text-white font-bold"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open file
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default MediaPage;
