#!/usr/bin/env python3
"""
Media Optimization Script for Wedding Website
Optimizes photos and videos to be web-friendly and updates HTML gallery
"""

import os
import sys
import re
from pathlib import Path
from PIL import Image
import subprocess
import json
from datetime import datetime

# Configuration
PROJECT_ROOT = Path(__file__).parent.parent  # Go up one level from scripts/
ASSETS_DIR = PROJECT_ROOT / "assets"
IMAGES_DIR = ASSETS_DIR / "images"
VIDEOS_DIR = ASSETS_DIR / "videos"
STATE_FILE = ASSETS_DIR / ".optimization_state.json"
HTML_FILE = PROJECT_ROOT / "index.html"

# Image settings
IMAGE_MAX_WIDTH = 1920
IMAGE_MAX_HEIGHT = 1920
WEBP_QUALITY = 85
JPEG_QUALITY = 85

# Video settings
VIDEO_MAX_WIDTH = 1280
VIDEO_CRF = 28  # Lower is better quality, 23-28 is good range
VIDEO_PRESET = "medium"  # ultrafast, fast, medium, slow, slower


def load_state():
    """Load the state of previously optimized files."""
    if STATE_FILE.exists():
        with open(STATE_FILE, 'r') as f:
            return json.load(f)
    return {"optimized_files": {}, "gallery_items": []}


def save_state(state):
    """Save the state of optimized files."""
    with open(STATE_FILE, 'w') as f:
        json.dump(state, f, indent=2)


def get_file_hash(filepath):
    """Get modification time as a simple hash."""
    return os.path.getmtime(filepath)


def get_file_date(filepath):
    """Extract date from filename or use modification date."""
    filepath = Path(filepath)
    filename = filepath.stem

    # Try to extract date from filename (common formats)
    # Format: YYYYMMDD or YYYY-MM-DD or IMG_YYYYMMDD
    date_patterns = [
        r'(\d{4})(\d{2})(\d{2})',  # YYYYMMDD
        r'(\d{4})-(\d{2})-(\d{2})',  # YYYY-MM-DD
        r'IMG_(\d{4})(\d{2})(\d{2})',  # IMG_YYYYMMDD
        r'(\d{8})',  # Just 8 digits
    ]

    for pattern in date_patterns:
        match = re.search(pattern, filename)
        if match:
            try:
                if len(match.groups()) == 3:
                    year, month, day = match.groups()
                    return datetime(int(year), int(month), int(day))
                elif len(match.groups()) == 1:
                    date_str = match.group(1)
                    year = int(date_str[:4])
                    month = int(date_str[4:6])
                    day = int(date_str[6:8])
                    return datetime(year, month, day)
            except (ValueError, IndexError):
                pass

    # Fall back to file modification time
    return datetime.fromtimestamp(filepath.stat().st_mtime)


def optimize_image(input_path, replace_original=True):
    """Optimize an image file."""
    input_path = Path(input_path)

    try:
        img = Image.open(input_path)

        # Convert RGBA to RGB if necessary
        if img.mode in ('RGBA', 'LA', 'P'):
            background = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode == 'P':
                img = img.convert('RGBA')
            background.paste(img, mask=img.split()[-1] if img.mode in ('RGBA', 'LA') else None)
            img = background

        # Resize if needed
        if img.width > IMAGE_MAX_WIDTH or img.height > IMAGE_MAX_HEIGHT:
            img.thumbnail((IMAGE_MAX_WIDTH, IMAGE_MAX_HEIGHT), Image.Resampling.LANCZOS)

        if replace_original:
            # Save optimized versions in the same directory
            output_dir = input_path.parent

            # Save as WebP
            webp_output = output_dir / f"{input_path.stem}.webp"
            img.save(webp_output, 'WEBP', quality=WEBP_QUALITY, method=6)
            print(f"  ✓ Created WebP: {webp_output.name}")

            # Save as JPEG (fallback) - overwrite original if it was jpg
            jpg_output = output_dir / f"{input_path.stem}.jpg"
            img.save(jpg_output, 'JPEG', quality=JPEG_QUALITY, optimize=True)
            print(f"  ✓ Created JPEG: {jpg_output.name}")

        return True
    except Exception as e:
        print(f"  ✗ Error optimizing {input_path.name}: {e}")
        return False


def check_ffmpeg():
    """Check if ffmpeg is installed."""
    try:
        subprocess.run(['ffmpeg', '-version'],
                      stdout=subprocess.DEVNULL,
                      stderr=subprocess.DEVNULL)
        return True
    except FileNotFoundError:
        return False


def optimize_video(input_path, replace_original=True):
    """Optimize a video file."""
    if not check_ffmpeg():
        print("  ⚠ ffmpeg not found. Install with: brew install ffmpeg")
        return False

    input_path = Path(input_path)

    if replace_original:
        # Create temporary file
        output_path = input_path.parent / f"{input_path.stem}_optimized.mp4"
    else:
        output_path = input_path.parent / f"{input_path.stem}_optimized.mp4"

    # Check if optimized version already exists and is newer than source
    if output_path.exists():
        source_mtime = input_path.stat().st_mtime
        output_mtime = output_path.stat().st_mtime
        if output_mtime >= source_mtime:
            print(f"  ⊘ Skipped (already optimized): {output_path.name}")
            return True

    try:
        # Use ffmpeg to optimize video
        cmd = [
            'ffmpeg',
            '-i', str(input_path),
            '-vf', f'scale=\'min({VIDEO_MAX_WIDTH},iw)\':-2',  # Scale down if needed
            '-c:v', 'libx264',
            '-preset', VIDEO_PRESET,
            '-crf', str(VIDEO_CRF),
            '-c:a', 'aac',
            '-b:a', '128k',
            '-movflags', '+faststart',  # Enable streaming
            '-y',  # Overwrite output
            str(output_path)
        ]

        result = subprocess.run(cmd,
                              stdout=subprocess.PIPE,
                              stderr=subprocess.PIPE,
                              text=True)

        if result.returncode == 0:
            print(f"  ✓ Optimized video: {output_path.name}")

            # Show file size comparison
            original_size = input_path.stat().st_size / (1024 * 1024)
            optimized_size = output_path.stat().st_size / (1024 * 1024)
            savings = ((original_size - optimized_size) / original_size) * 100
            print(f"    Original: {original_size:.2f}MB → Optimized: {optimized_size:.2f}MB ({savings:.1f}% reduction)")

            return True
        else:
            print(f"  ✗ Error optimizing {input_path.name}")
            print(f"    {result.stderr}")
            return False

    except Exception as e:
        print(f"  ✗ Error optimizing {input_path.name}: {e}")
        return False


def scan_gallery_in_html():
    """Scan the HTML file to find existing gallery items."""
    if not HTML_FILE.exists():
        return set()

    with open(HTML_FILE, 'r') as f:
        content = f.read()

    # Find all image and video references in the gallery section
    gallery_items = set()

    # Match image href patterns
    image_pattern = r'<a href="assets/images/gallery/([^"]+)"'
    for match in re.finditer(image_pattern, content):
        gallery_items.add(match.group(1))

    # Match video href patterns
    video_pattern = r'<a href="assets/videos/([^"]+)"'
    for match in re.finditer(video_pattern, content):
        gallery_items.add(match.group(1))

    return gallery_items


def generate_gallery_html_item(file_path, is_video=False):
    """Generate HTML for a gallery item."""
    file_path = Path(file_path)
    rel_path = file_path.relative_to(ASSETS_DIR)

    if is_video:
        # Video gallery item
        return f'''                <a href="assets/{rel_path}" class="glightbox photo-item"
                    data-size="portrait" data-title="Our Video" data-description="Highlights from our journey"
                    data-type="video" data-effect="fade">
                    <video autoplay loop muted playsinline style="width: 100%; height: 100%; object-fit: cover;">
                        <source src="assets/{rel_path}" type="video/mp4">
                    </video>
                    <div class="photo-overlay">
                        <h4>{file_path.stem.replace('_', ' ').title()}</h4>
                        <p>Highlights from our journey</p>
                    </div>
                </a>
'''
    else:
        # Image gallery item
        webp_path = file_path.parent / f"{file_path.stem}.webp"
        jpg_path = file_path.parent / f"{file_path.stem}.jpg"

        return f'''                <a href="assets/{rel_path}" class="glightbox photo-item" data-size="portrait"
                    data-title="{file_path.stem.replace('_', ' ').title()}" data-description="Making memories!">
                    <picture>
                        <source srcset="assets/{webp_path.relative_to(ASSETS_DIR)}" type="image/webp">
                        <img src="assets/{jpg_path.relative_to(ASSETS_DIR)}" alt="Gallery photo" loading="lazy"
                            style="opacity: 0; transition: opacity 0.3s;">
                    </picture>
                    <div class="photo-overlay">
                        <h4>{file_path.stem.replace('_', ' ').title()}</h4>
                        <p>Making memories!</p>
                    </div>
                </a>
'''


def update_html_gallery(new_items):
    """Update the HTML file with new gallery items."""
    if not HTML_FILE.exists() or not new_items:
        return

    print("\n📝 Updating HTML gallery...")

    with open(HTML_FILE, 'r') as f:
        content = f.read()

    # Find the gallery section
    gallery_start = content.find('<div class="photo-grid">')
    gallery_end = content.find('</div>', gallery_start + 100)

    if gallery_start == -1:
        print("  ⚠ Could not find gallery section in HTML")
        return

    # Sort new items by date (newest first)
    sorted_items = sorted(new_items, key=lambda x: get_file_date(x[0]), reverse=True)

    # Generate HTML for new items
    new_html = ""
    for file_path, is_video in sorted_items:
        file_date = get_file_date(file_path)
        date_comment = f"<!-- {file_date.strftime('%b %Y')} -->\n"
        new_html += date_comment
        new_html += generate_gallery_html_item(file_path, is_video)
        new_html += "\n"
        print(f"  ✓ Added to gallery: {file_path.name}")

    # Insert new items at the beginning of the gallery
    insert_pos = gallery_start + len('<div class="photo-grid">\n')
    updated_content = content[:insert_pos] + new_html + content[insert_pos:]

    # Write back to file
    with open(HTML_FILE, 'w') as f:
        f.write(updated_content)

    print(f"  ✓ Gallery updated with {len(new_items)} new items")


def scan_and_optimize():
    """Scan for new files and optimize them."""
    state = load_state()
    optimized_files = state.get("optimized_files", {})
    existing_gallery_items = scan_gallery_in_html()

    new_files_found = False
    new_gallery_items = []
    stats = {"images": 0, "videos": 0, "skipped": 0, "errors": 0}

    # Scan images in gallery folder
    print("\n📸 Scanning for images in gallery...")
    gallery_img_dir = IMAGES_DIR / "gallery"
    if gallery_img_dir.exists():
        image_extensions = {'.jpg', '.jpeg', '.png', '.heic'}

        for img_path in gallery_img_dir.glob('*'):
            if img_path.is_file() and img_path.suffix.lower() in image_extensions:
                rel_path = str(img_path.relative_to(ASSETS_DIR))
                file_hash = get_file_hash(img_path)

                # Check if already optimized and unchanged
                if rel_path in optimized_files and optimized_files[rel_path] == file_hash:
                    stats["skipped"] += 1
                    continue

                new_files_found = True
                print(f"\n🖼️  Processing: {img_path.name}")

                if optimize_image(img_path, replace_original=True):
                    optimized_files[rel_path] = file_hash
                    stats["images"] += 1

                    # Check if this item is already in the gallery HTML
                    if img_path.name not in existing_gallery_items:
                        new_gallery_items.append((img_path, False))
                else:
                    stats["errors"] += 1

    # Scan videos
    print("\n🎥 Scanning for videos...")
    if VIDEOS_DIR.exists():
        video_extensions = {'.mp4', '.mov', '.avi', '.mkv'}

        for vid_path in VIDEOS_DIR.glob('*'):
            # Skip already optimized files (with _optimized suffix)
            if vid_path.stem.endswith('_optimized'):
                continue

            if vid_path.is_file() and vid_path.suffix.lower() in video_extensions:
                rel_path = str(vid_path.relative_to(ASSETS_DIR))
                file_hash = get_file_hash(vid_path)

                # Check if already optimized and unchanged
                if rel_path in optimized_files and optimized_files[rel_path] == file_hash:
                    stats["skipped"] += 1
                    continue

                new_files_found = True
                print(f"\n🎬 Processing: {vid_path.name}")

                if optimize_video(vid_path, replace_original=True):
                    optimized_files[rel_path] = file_hash
                    stats["videos"] += 1

                    # Check if this item is already in the gallery HTML
                    optimized_name = f"{vid_path.stem}_optimized.mp4"
                    if optimized_name not in existing_gallery_items:
                        # Use the optimized version path
                        optimized_path = vid_path.parent / optimized_name
                        new_gallery_items.append((optimized_path, True))
                else:
                    stats["errors"] += 1

    # Update HTML gallery with new items
    if new_gallery_items:
        update_html_gallery(new_gallery_items)

    # Save state
    state["optimized_files"] = optimized_files
    state["last_run"] = datetime.now().isoformat()
    save_state(state)

    # Print summary
    print("\n" + "="*60)
    print("📊 OPTIMIZATION SUMMARY")
    print("="*60)
    print(f"✓ Images optimized: {stats['images']}")
    print(f"✓ Videos optimized: {stats['videos']}")
    print(f"⊘ Files skipped (already optimized): {stats['skipped']}")
    if stats['errors'] > 0:
        print(f"✗ Errors: {stats['errors']}")
    if new_gallery_items:
        print(f"📝 New gallery items added: {len(new_gallery_items)}")
    print("="*60)

    if not new_files_found:
        print("\n✨ All files are already optimized!")


def main():
    """Main function."""
    print("="*60)
    print("🎉 WEDDING WEBSITE MEDIA OPTIMIZER")
    print("="*60)
    print(f"Assets directory: {ASSETS_DIR}")
    print(f"HTML file: {HTML_FILE}")

    # Check dependencies
    print("\n🔍 Checking dependencies...")

    try:
        print("  ✓ Pillow (PIL) installed")
    except ImportError:
        print("  ✗ Pillow not installed. Install with: pip install Pillow")
        sys.exit(1)

    if check_ffmpeg():
        print("  ✓ ffmpeg installed")
    else:
        print("  ⚠ ffmpeg not installed (video optimization will be skipped)")
        print("    Install with: brew install ffmpeg")

    scan_and_optimize()
    print("\n✅ Done!\n")


if __name__ == "__main__":
    main()
