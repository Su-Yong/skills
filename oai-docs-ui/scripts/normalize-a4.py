#!/usr/bin/env python3
"""Correct pen.dev's sub-point A4 page-box truncation. Requires pypdf."""
import argparse
from io import BytesIO
from pathlib import Path

from pypdf import PdfReader, PdfWriter
from pypdf.generic import RectangleObject

A4 = (210 * 72 / 25.4, 297 * 72 / 25.4)


def normalize(reader):
    if not reader.pages:
        raise ValueError("The PDF has no pages.")
    for page in reader.pages:
        box = page.mediabox
        if page.rotation or tuple(box.lower_left) != (0, 0):
            raise ValueError("Expected unrotated pages with origin (0, 0).")
        if any(abs(float(size) - target) > 1 for size, target in zip((box.width, box.height), A4)):
            raise ValueError("This is not a native A4 export; check frame size and export scale.")
    writer = PdfWriter()
    for page in reader.pages:
        page.mediabox = RectangleObject((0, 0, *A4))
        page.cropbox = RectangleObject((0, 0, *A4))
        writer.add_page(page)
    return writer


def check():
    source = PdfWriter()
    source.add_blank_page(width=595, height=841)
    data = BytesIO()
    source.write(data)
    result = normalize(PdfReader(data))
    assert all(abs(float(v) - target) < 1e-5 for v, target in zip(
        (result.pages[0].mediabox.width, result.pages[0].mediabox.height), A4))
    source = PdfWriter()
    source.add_blank_page(width=1920, height=1080)
    data = BytesIO()
    source.write(data)
    try:
        normalize(PdfReader(data))
    except ValueError:
        return
    raise AssertionError("Landscape presentation must be rejected.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", nargs="?", type=Path)
    parser.add_argument("destination", nargs="?", type=Path)
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    if args.check:
        check()
        print("A4 correction and non-A4 rejection: PASS")
    else:
        if not args.source or not args.destination:
            parser.error("Provide source.pdf and a new destination.pdf.")
        writer = normalize(PdfReader(args.source))
        with args.destination.open("xb") as output:
            writer.write(output)
        print(args.destination.resolve())
