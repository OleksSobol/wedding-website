# Quick Start Guide

## Adding New Photos/Videos to Your Website

### 1. Add Media Files

Drop your new photos and videos into these folders:
- **Photos**: `assets/images/gallery/`
- **Videos**: `assets/videos/`

### 2. Run the Optimization Script

```bash
# Activate virtual environment
source .venv/bin/activate

# Run the script
python scripts/optimize_media.py
```

### 3. What Happens

The script will:
- ✅ Optimize all new images (compress, create WebP versions)
- ✅ Optimize all new videos (compress, reduce size)
- ✅ Automatically add them to your HTML gallery
- ✅ Sort them chronologically (newest first)

### 4. Done!

Your website is updated! The optimized files are ready to deploy.

---

## Example

```bash
# Add files to gallery
cp ~/my_photos/IMG_20260113.jpg assets/images/gallery/
cp ~/my_videos/beach.mp4 assets/videos/

# Optimize and update gallery
source .venv/bin/activate
python scripts/optimize_media.py

# Check the results
# - New WebP and JPEG files created in gallery folder
# - index.html updated with new gallery items
# - See file size savings in console output
```

---

## File Size Savings

Typical savings:
- **Images**: 40-70% reduction
- **Large videos**: 80-95% reduction
- **Already optimized files**: Skipped automatically

---

## Need More Info?

See the full documentation: [scripts/README.md](README.md)
