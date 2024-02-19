import pytesseract
from PIL import ImageGrab
import pyautogui
#import pytesseract 
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

import re


# brew install tesseract

# Specify the path to the Tesseract binary if not automatically detected or not in PATH
# For Windows, it might look like this:
# pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def capture_screenshot_and_extract_text():
    # Take a screenshot using PyAutoGUI
    #screenshot = pyautogui.screenshot()

    # Use PIL's ImageGrab (alternative way, if preferred)
    screenshot = ImageGrab.grab()

    # Save the screenshot for debugging purposes (optional)
    screenshot.save("screenshot.png")

    # Use Pytesseract to extract text
    extracted_text = pytesseract.image_to_string(screenshot)

    # Print the extracted text
    print(extracted_text)

    # Regular expression pattern to match the desired portion of the text
    pattern = r"(API Azure Webhooks.*?)(?=Make invisi)"

    # Using re.DOTALL to make the '.' special character match any character at all, including a newline
    match = re.search(pattern, extracted_text, re.DOTALL)

    if match:
        desired_text = match.group(1)  # This should be your extracted text
        print(desired_text)
        with open("extracted_summary.txt", "w") as f:
          f.write(desired_text)
    else:
        print("No match found")

    # Save the extracted text for debugging purposes (optional)
    with open("extracted_text.txt", "w") as f:
        f.write(extracted_text)

if __name__ == "__main__":
    capture_screenshot_and_extract_text()
