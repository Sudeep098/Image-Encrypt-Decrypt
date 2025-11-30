from PIL import Image
import random

def encrypt_image(input_path, output_path, seed):
    img = Image.open(input_path).convert("RGB")
    pixels = img.load()
    width, height = img.size

    random.seed(seed)

    for x in range(width):
        for y in range(height):
            r, g, b = pixels[x, y]

            # Random mask
            mr = random.randint(0, 255)
            mg = random.randint(0, 255)
            mb = random.randint(0, 255)

            # XOR encryption
            pixels[x, y] = (r ^ mr, g ^ mg, b ^ mb)

    img.save(output_path)
    print(f"Remember this seed: {seed}")


def decrypt_image(encrypted_path, output_path, seed):
    # Same process restores original
    encrypt_image(encrypted_path, output_path, seed)
    print(f"successfull using seed: {seed}")


# Example usage:
address=input("Enter image address: ")
seed=int(input("Ented seed (Numbers only): "))
encrypt_image(address, "encrypted.jpg", seed=)
decrypt_image(address,"decrypted.jpg", seed=)
