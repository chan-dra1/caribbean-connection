import os
import urllib.request
import json

# List of 60 items from the Caribbean Connection Media Library
media_urls = [
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/08/cropped-heavy-Rolla.png",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2026/04/MC-Mike-Andrews.jpg",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2026/04/Flag-Man.jpg",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2026/04/Famalay-lay-lay.jpg",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/09/heavy-Rolla.png",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/09/Nadia-at-One-Fete.mp4",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/09/IMG_2276.jpg",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/08/cropped-heavy-Rolla-2.png",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/08/heavy-Rolla-2.png",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/08/Mike-and-Machel.jpg",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/08/20150620_161224-1-Copy-Copy.jpg",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/08/DSC00105-Copy-scaled.jpg",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/08/DSC01272-Copy-scaled.jpg",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/08/DSC01304-Copy-scaled.jpg",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/08/DSC01960-scaled.jpg",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/08/DSC02003-scaled.jpg",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/08/IMG_0745.jpg",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/08/DSC01965-scaled.jpg",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/08/DSC01937-scaled.jpg",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/08/DSC01994-scaled.jpg",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/08/Mike-and-Ato.jpg",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/08/Mike-and-Steph-3.jpg",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/08/P1010230.jpg",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/08/Port-of-Spain-NAPA.jpg",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/08/caribconnect-2.png",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/08/caribconnect.png",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/08/cropped-heavy-Rolla-transparent.png",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/08/heavy-Rolla-transparent.png",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/08/rock-staar-lN43UXgI6YI-unsplash-scaled.jpg",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/08/xavier-coiffic-gOc3VRa-eas-unsplash-scaled.jpg",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/08/rock-staar-kbDSBL5NBkA-unsplash-2-scaled.jpg",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/08/didin-emelu-8-kuxbxuKU-unsplash.jpg",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/08/obi-onyeador-gUW8waI74AQ-unsplash.jpg",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/08/bash-visual-Kn9x06QWRDU-unsplash.jpg",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/08/s-kelly-fp9s_EdbnjY-unsplash-2-1.jpg",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/08/dele-oluwayomi-rHy09OtimlE-unsplash-scaled.jpg",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/08/heavy-Rolla.png",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/08/makeba-wal-KVHPE9c6yY4-unsplash-scaled.jpg",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/08/jono-hirst-9Vnxo0cCR3Q-unsplash-scaled.jpg",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/08/2.png",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/08/tolga-ahmetler-Mx9vRuQpVkI-unsplash-2-scaled.jpg",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/08/max-van-den-oetelaar-5d5p6_F3haw-unsplash-scaled.jpg",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/08/Mike-Andrews-photo.jpg",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/08/bash-visual-fgvEJptiKBI-unsplash-scaled.jpg",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/08/IMG_1049.jpg",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/08/IMG_1259-scaled-1.jpg",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/08/Radio-3.jpg",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/08/Mr.-Mike.jpg",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/02/IMG_1049.jpg",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/02/20160221_071605.jpg",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/02/IMG_1259-scaled.jpg",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/02/IMG_1258-1-scaled.jpg",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/02/Radio-3.jpg",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/02/IMG_1103.jpg",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/02/Mr.-Mike.jpg",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/02/logo@2x-free-img.png",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/02/musical-instrument-shop-artist-testimonial-img.jpg",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/02/music-instrument-shop-hero-section-guitar-img.png",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/02/music-instrument-shop-hero-section-grad-half-circle-bg.svg",
    "https://www.caribbeanconnectionusa.com/wp-content/uploads/2021/02/musical-instrument-shop-hero-video-thumb.jpg"
]

DESTINATION_DIR = "public/media"

def download_media():
    if not os.path.exists(DESTINATION_DIR):
        os.makedirs(DESTINATION_DIR)
        print(f"Created directory: {DESTINATION_DIR}")

    print(f"Starting download of {len(media_urls)} items...")
    
    for url in media_urls:
        filename = url.split("/")[-1]
        filepath = os.path.join(DESTINATION_DIR, filename)
        
        # Avoid duplicate extensions if file already exists with same name
        # (WordPress sometimes has heavy-Rolla.png and heavy-Rolla.png in different months)
        # We'll overwrite for now or handle collisions by renaming
        
        try:
            print(f"Downloading {filename}...", end=" ", flush=True)
            urllib.request.urlretrieve(url, filepath)
            print("Done.")
        except Exception as e:
            print(f"Failed to download {url}: {e}")

if __name__ == "__main__":
    download_media()
