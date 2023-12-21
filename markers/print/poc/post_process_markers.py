from PIL import Image, ImageOps

marker_images = [
    "barcode_3x3_hamming63_border25_0.v2.png",
    "barcode_3x3_hamming63_border25_1.v2.png",
    "barcode_3x3_hamming63_border25_2.v2.png",
    "barcode_3x3_hamming63_border25_3.v2.png",
    "barcode_3x3_hamming63_border25_4.v2.png",
    "barcode_3x3_hamming63_border25_5.v2.png"
]

def add_concentric_borders(image_path, output_path, border_width=8, ring_count=3):
    # Load the image
    image = Image.open(image_path)

    # Define colors for the borders
    colors = ['white', 'black'] * ring_count

    # Function to add a single border
    def add_border(img, border_width, color):
        return ImageOps.expand(img, border=border_width, fill=color)

    # Add borders to the image
    for color in colors:
        image = add_border(image, border_width, color)

    # Save the result
    image.save(output_path)

    return output_path

for marker_image in marker_images:
    image_path = marker_image
    output_path = image_path.replace('.v2.png', '.v3.png')
    add_concentric_borders(image_path, output_path, border_width=16, ring_count=4)
