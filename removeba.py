import torch
from torchvision import models, transforms
from PIL import Image
import matplotlib.pyplot as plt

# Load the DeepLabV3+ model
model = models.segmentation.deeplabv3_resnet101(pretrained=True).eval()

# Define the transformation to preprocess the image
preprocess = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

# Load the image and preprocess it
image_path = 'assets/img/products/img5.jpg'  # Replace with the actual path to your image
input_image = Image.open(image_path)
input_tensor = preprocess(input_image)
input_batch = input_tensor.unsqueeze(0)

# Perform inference
with torch.no_grad():
    output = model(input_batch)['out'][0]
output_predictions = output.argmax(0)

# Create a mask where the object is present (invert the background mask)
object_mask = output_predictions == 15  # Assuming the background class is 15

# Apply the mask to the input image
input_image = Image.open(image_path).convert('RGBA')
input_image.putalpha(255)
object_image = Image.new('RGBA', input_image.size)
for x in range(input_image.width):
    for y in range(input_image.height):
        if object_mask[y, x]:
            object_image.putpixel((x, y), input_image.getpixel((x, y)))

# Save the resulting images (background removed and object only)
background_removed_path = 'background_removed_image.png'
object_only_path = 'object_only_image.png'
object_image.save(object_only_path)
background_removed_image = Image.alpha_composite(Image.new('RGBA', input_image.size), object_image)
background_removed_image.save(background_removed_path)

print('Background removed image saved at:', background_removed_path)
print('Object only image saved at:', object_only_path)
