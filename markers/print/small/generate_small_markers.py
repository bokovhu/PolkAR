from PIL import Image
import os

marker_images = [
    "../back.png",
    "../front.png",
    "../left.png",
    "../right.png",
    "../top.png",
    "../bottom.png",
]

resize_to = 256

for marker_image in marker_images:
    image = Image.open(marker_image)
    image.thumbnail((resize_to, resize_to))
    image.save(os.path.basename(marker_image))
