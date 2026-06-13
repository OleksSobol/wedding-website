#!/usr/bin/env python3
"""Generate a print-ready QR code for the guest photo-upload page.

The QR points at the *branded* /upload page (NOT the raw Google Photos link),
so the album can be re-pointed later without reprinting any signage.

Usage:
    pip install "qrcode[pil]"
    python scripts/make_qr.py
    # custom url / output:
    python scripts/make_qr.py --url https://solstice2026.party/upload --out assets/images/upload-qr.png
"""

import argparse
import os

try:
    import qrcode
    from qrcode.constants import ERROR_CORRECT_H
except ImportError:
    raise SystemExit('Missing dependency. Run:  pip install "qrcode[pil]"')

DEFAULT_URL = "https://solstice2026.party/upload"
DEFAULT_OUT = "assets/images/upload-qr.png"


def main() -> None:
    parser = argparse.ArgumentParser(description="Make a QR code PNG for the upload page.")
    parser.add_argument("--url", default=DEFAULT_URL, help="URL the QR should open.")
    parser.add_argument("--out", default=DEFAULT_OUT, help="Output PNG path.")
    args = parser.parse_args()

    # box_size 40 -> a large, crisp PNG that prints sharply on table cards/signage.
    # ERROR_CORRECT_H tolerates smudges/folds (~30% of the code can be damaged).
    qr = qrcode.QRCode(error_correction=ERROR_CORRECT_H, box_size=40, border=4)
    qr.add_data(args.url)
    qr.make(fit=True)
    img = qr.make_image(fill_color="#2d3436", back_color="white")

    os.makedirs(os.path.dirname(args.out) or ".", exist_ok=True)
    img.save(args.out)
    print(f"✅ QR code saved to {args.out}  →  {args.url}")


if __name__ == "__main__":
    main()
