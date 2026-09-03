#!/usr/bin/env python3
"""
Image Optimization & Sizing-Down Utility for Wedding Website
Converts images (JPG, PNG, HEIC, etc.) to web-optimized WebP and compressed JPEG formats.
Handles EXIF rotation, high-quality downscaling, and provides clear file-size reduction statistics.

Usage Examples:
    python scripts/size_down.py path/to/image.jpg
    python scripts/size_down.py path/to/image.jpg --max-dim 1200 --quality 78
    python scripts/size_down.py assets/images/story_photos/ --max-dim 1200
    python scripts/size_down.py hero.jpg --max-dim 1920 --create-mobile
"""

import argparse
import os
import sys
from pathlib import Path
from PIL import Image, ImageOps

# Ensure UTF-8 output on Windows consoles
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

SUPPORTED_INPUT_FORMATS = {'.jpg', '.jpeg', '.png', '.webp', '.tiff', '.bmp', '.heic', '.heif'}


def optimize_single_image(input_path: Path, output_dir: Path, max_dim: int, quality: int,
                          create_jpeg: bool, create_mobile: bool, mobile_dim: int) -> list:
    """Optimize a single image to WebP (and optionally JPEG/mobile). Returns list of created files."""
    results = []
    
    if not input_path.exists():
        print(f"❌ File not found: {input_path}", file=sys.stderr)
        return results

    orig_size = input_path.stat().st_size

    try:
        with Image.open(input_path) as img:
            # Correct orientation from camera EXIF
            img = ImageOps.exif_transpose(img)

            # Convert color mode if necessary
            if img.mode in ('RGBA', 'LA') and create_jpeg:
                # For JPEG, create white background
                bg = Image.new('RGB', img.size, (255, 255, 255))
                bg.paste(img, mask=img.split()[-1])
                rgb_img = bg
            elif img.mode != 'RGB':
                rgb_img = img.convert('RGB')
            else:
                rgb_img = img.copy()

            orig_w, orig_h = rgb_img.size

            # Compute new dimensions keeping aspect ratio
            longest_side = max(orig_w, orig_h)
            if longest_side > max_dim:
                scale = max_dim / longest_side
                new_w = max(1, int(orig_w * scale))
                new_h = max(1, int(orig_h * scale))
                resized = rgb_img.resize((new_w, new_h), Image.Resampling.LANCZOS)
            else:
                new_w, new_h = orig_w, orig_h
                resized = rgb_img

            stem = input_path.stem
            # Prevent double extension like photo.webp.webp
            if stem.endswith('.heic') or stem.endswith('.jpeg'):
                stem = Path(stem).stem

            output_dir.mkdir(parents=True, exist_ok=True)

            # 1. Save main WebP
            out_webp = output_dir / f"{stem}.webp"
            resized.save(out_webp, 'WEBP', quality=quality, method=6)
            webp_size = out_webp.stat().st_size
            results.append({
                'path': out_webp,
                'width': new_w,
                'height': new_h,
                'orig_size': orig_size,
                'new_size': webp_size,
                'type': 'WebP'
            })

            # 2. Optionally save mobile WebP
            if create_mobile and longest_side > mobile_dim:
                m_scale = mobile_dim / longest_side
                m_w = max(1, int(orig_w * m_scale))
                m_h = max(1, int(orig_h * m_scale))
                m_resized = rgb_img.resize((m_w, m_h), Image.Resampling.LANCZOS)
                out_m_webp = output_dir / f"{stem}-mobile.webp"
                m_resized.save(out_m_webp, 'WEBP', quality=quality, method=6)
                m_size = out_m_webp.stat().st_size
                results.append({
                    'path': out_m_webp,
                    'width': m_w,
                    'height': m_h,
                    'orig_size': orig_size,
                    'new_size': m_size,
                    'type': 'Mobile WebP'
                })

            # 3. Optionally save fallback JPEG
            if create_jpeg:
                out_jpg = output_dir / f"{stem}-optimized.jpg"
                resized.save(out_jpg, 'JPEG', quality=quality + 2, optimize=True)
                jpg_size = out_jpg.stat().st_size
                results.append({
                    'path': out_jpg,
                    'width': new_w,
                    'height': new_h,
                    'orig_size': orig_size,
                    'new_size': jpg_size,
                    'type': 'JPEG'
                })

    except Exception as e:
        print(f"❌ Error processing {input_path}: {e}", file=sys.stderr)

    return results


def format_size(bytes_val: int) -> str:
    if bytes_val >= 1024 * 1024:
        return f"{bytes_val / (1024 * 1024):.2f} MB"
    return f"{bytes_val / 1024:.1f} KB"


def main():
    parser = argparse.ArgumentParser(description="Size down and optimize images for the wedding website.")
    parser.add_argument("inputs", nargs="+", help="File paths or directories containing images to optimize")
    parser.add_argument("--max-dim", "-m", type=int, default=1400,
                        help="Maximum width or height in pixels (default: 1400)")
    parser.add_argument("--quality", "-q", type=int, default=78,
                        help="WebP compression quality 1-100 (default: 78)")
    parser.add_argument("--output-dir", "-o", type=str, default=None,
                        help="Output directory (default: same directory as input file)")
    parser.add_argument("--jpeg", action="store_true",
                        help="Also generate an optimized JPEG fallback")
    parser.add_argument("--create-mobile", action="store_true",
                        help="Also generate a smaller -mobile.webp version")
    parser.add_argument("--mobile-dim", type=int, default=1080,
                        help="Max dimension for mobile version (default: 1080)")

    args = parser.parse_args()

    files_to_process = []
    for input_arg in args.inputs:
        path = Path(input_arg)
        if path.is_dir():
            for child in path.glob('*'):
                if child.is_file() and child.suffix.lower() in SUPPORTED_INPUT_FORMATS:
                    # Ignore already converted outputs unless explicitly targeted
                    if not child.name.endswith('.webp') and not child.name.endswith('-optimized.jpg'):
                        files_to_process.append(child)
        elif path.is_file():
            files_to_process.append(path)
        else:
            print(f"⚠️ Warning: '{input_arg}' does not exist or is not a file/directory", file=sys.stderr)

    if not files_to_process:
        print("No matching image files found.")
        sys.exit(1)

    print(f"\n🖼️  Processing {len(files_to_process)} image(s) (Max Dimension: {args.max_dim}px, Quality: {args.quality})...\n")

    total_orig = 0
    total_new = 0

    for f in files_to_process:
        target_out_dir = Path(args.output_dir) if args.output_dir else f.parent
        results = optimize_single_image(
            input_path=f,
            output_dir=target_out_dir,
            max_dim=args.max_dim,
            quality=args.quality,
            create_jpeg=args.jpeg,
            create_mobile=args.create_mobile,
            mobile_dim=args.mobile_dim
        )

        for res in results:
            saved_pct = (1 - res['new_size'] / res['orig_size']) * 100
            total_orig += res['orig_size']
            total_new += res['new_size']
            print(f"  ✓ [{res['type']}] {res['path'].name} ({res['width']}x{res['height']})")
            print(f"    {format_size(res['orig_size'])} ➔ {format_size(res['new_size'])} ({saved_pct:.1f}% reduction)\n")

    print("✨ All done!")


if __name__ == "__main__":
    main()
