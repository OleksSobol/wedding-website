# Media Optimization Script

This Python script automatically optimizes photos and videos for your wedding website and updates the HTML gallery.

## Features

### Image Optimization
- Converts images to WebP format (smaller file size, modern browsers)
- Creates JPEG fallbacks for compatibility
- Resizes large images (max 1920x1920px)
- Maintains aspect ratios
- Supports: JPG, JPEG, PNG, HEIC

### Video Optimization
- Compresses videos using H.264 codec
- Reduces resolution to max 1280px width
- Optimizes for web streaming (faststart)
- Shows file size savings
- Supports: MP4, MOV, AVI, MKV

### Smart Features
- ✅ Only processes new or modified files
- ✅ Replaces originals with optimized versions (in-place)
- ✅ Automatically updates HTML gallery with new media
- ✅ Sorts gallery items by date (newest first)
- ✅ Extracts dates from filenames or uses file modification date
- ✅ Tracks optimization state to avoid re-processing

## Setup

### 1. Install Python Dependencies

```bash
cd /Users/olekssobol/workspace/personal_projects/wedding-website

# Create virtual environment (if not already created)
uv venv

# Activate virtual environment
source .venv/bin/activate

# Install dependencies
uv pip install -r requirements.txt
```

### 2. Install ffmpeg (for video optimization)

```bash
brew install ffmpeg
```

## Usage

### Basic Usage

Run the script from the project root or from the scripts directory:

```bash
# From project root
python scripts/optimize_media.py

# Or from scripts directory
cd scripts
python optimize_media.py
```

The script will:
1. Scan `assets/images/gallery/` for new or modified images
2. Scan `assets/videos/` for new or modified videos
3. Optimize each file and create WebP versions
4. Update `index.html` with new gallery items
5. Add items in chronological order (newest first)

### Workflow

1. **Add new photos/videos** to your assets folders:
   - Images: `assets/images/gallery/`
   - Videos: `assets/videos/`

2. **Run the script**:
   ```bash
   source .venv/bin/activate
   python scripts/optimize_media.py
   ```

3. **Review the output**:
   - Check the console for optimization stats
   - Verify the HTML gallery has been updated
   - Test the website to ensure new media loads correctly

4. **Commit changes** (if satisfied):
   ```bash
   git add .
   git commit -m "Add new photos and videos"
   git push
   ```

## Configuration

You can adjust optimization settings in the script:

```python
# Image settings
IMAGE_MAX_WIDTH = 1920
IMAGE_MAX_HEIGHT = 1920
WEBP_QUALITY = 85       # 0-100, higher is better quality
JPEG_QUALITY = 85       # 0-100, higher is better quality

# Video settings
VIDEO_MAX_WIDTH = 1280
VIDEO_CRF = 28          # 18-28, lower is better quality (larger file)
VIDEO_PRESET = "medium"  # ultrafast, fast, medium, slow, slower
```

## File Organization

### Before Running Script
```
assets/
├── images/
│   └── gallery/
│       ├── IMG20250627114905.jpg    (Original, large file)
│       └── proposal.jpg              (Original, large file)
└── videos/
    └── proposal.mp4                  (Original, large file)
```

### After Running Script
```
assets/
├── images/
│   └── gallery/
│       ├── IMG20250627114905.jpg    (Optimized JPEG)
│       ├── IMG20250627114905.webp   (New WebP version)
│       ├── proposal.jpg              (Optimized JPEG)
│       └── proposal.webp             (New WebP version)
└── videos/
    ├── proposal.mp4                  (Original, untouched)
    └── proposal_optimized.mp4        (New optimized version)
```

The HTML gallery will automatically reference the optimized versions.

## HTML Gallery Integration

The script automatically adds new items to your `index.html` gallery section with proper formatting:

```html
<!-- Jan 2026 -->
<a href="assets/images/gallery/IMG20260113120000.jpg" class="glightbox photo-item" data-size="portrait"
    data-title="Img20260113120000" data-description="Making memories!">
    <picture>
        <source srcset="assets/images/gallery/IMG20260113120000.webp" type="image/webp">
        <img src="assets/images/gallery/IMG20260113120000.jpg" alt="Gallery photo" loading="lazy"
            style="opacity: 0; transition: opacity 0.3s;">
    </picture>
    <div class="photo-overlay">
        <h4>Img20260113120000</h4>
        <p>Making memories!</p>
    </div>
</a>
```

## State Tracking

The script maintains a state file (`.optimization_state.json`) that tracks:
- Which files have been optimized
- When they were last modified
- When the script was last run

This prevents re-processing unchanged files on subsequent runs.

## Tips

1. **Filename conventions**: Use dates in filenames (YYYYMMDD format) for automatic chronological sorting
   - Example: `20250627_adventure.jpg` → Sorted as June 27, 2025

2. **Large batches**: Process photos/videos in batches if you have many files

3. **Test locally**: Always test the website locally before deploying

4. **Backup originals**: Keep a backup of original files elsewhere before running optimization

## Troubleshooting

### "Module not found" error
```bash
# Make sure virtual environment is activated
source .venv/bin/activate

# Reinstall dependencies
uv pip install -r requirements.txt
```

### Videos not optimizing
```bash
# Check if ffmpeg is installed
which ffmpeg

# Install if missing
brew install ffmpeg
```

### Gallery not updating
- Check that `index.html` exists in the project root
- Verify the gallery section has `<div class="photo-grid">` tag
- Check console output for errors

## Example Output

```
============================================================
🎉 WEDDING WEBSITE MEDIA OPTIMIZER
============================================================
Assets directory: /Users/.../wedding-website/assets
HTML file: /Users/.../wedding-website/index.html

🔍 Checking dependencies...
  ✓ Pillow (PIL) installed
  ✓ ffmpeg installed

📸 Scanning for images in gallery...

🖼️  Processing: IMG20260113120000.jpg
  ✓ Created WebP: IMG20260113120000.webp
  ✓ Created JPEG: IMG20260113120000.jpg

🎥 Scanning for videos...

🎬 Processing: new_video.mp4
  ✓ Optimized video: new_video_optimized.mp4
    Original: 25.50MB → Optimized: 2.34MB (90.8% reduction)

📝 Updating HTML gallery...
  ✓ Added to gallery: IMG20260113120000.jpg
  ✓ Added to gallery: new_video_optimized.mp4
  ✓ Gallery updated with 2 new items

============================================================
📊 OPTIMIZATION SUMMARY
============================================================
✓ Images optimized: 1
✓ Videos optimized: 1
⊘ Files skipped (already optimized): 45
📝 New gallery items added: 2
============================================================

✅ Done!
```

## Advanced: Customizing Gallery Items

If you want custom titles/descriptions for specific photos, edit them manually in `index.html` after the script generates them. The script won't overwrite existing gallery items.

## Questions?

Contact: wedding@solstice2026.party
