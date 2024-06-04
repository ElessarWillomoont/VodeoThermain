import tkinter as tk
from tkinter import filedialog
from PIL import Image, ImageTk

class ImageRGBViewer:
    def __init__(self, root):
        self.root = root
        self.root.title("Image RGB Viewer")

        self.canvas = tk.Canvas(root, cursor="cross")
        self.canvas.pack(fill=tk.BOTH, expand=True)

        self.canvas.bind("<Button-1>", self.get_pixel_rgb)

        self.rgb_label = tk.Label(root, text="", font=("Helvetica", 16))
        self.rgb_label.pack()

        self.load_image()

    def load_image(self):
        self.image_path = filedialog.askopenfilename()
        if not self.image_path:
            self.root.quit()
            return
        
        self.image = Image.open(self.image_path)
        self.tk_image = ImageTk.PhotoImage(self.image)
        self.canvas.create_image(0, 0, anchor=tk.NW, image=self.tk_image)
        self.canvas.config(scrollregion=self.canvas.bbox(tk.ALL))

    def get_pixel_rgb(self, event):
        x, y = event.x, event.y
        rgb = self.image.getpixel((x, y))
        self.rgb_label.config(text=f"RGB: {rgb}")

if __name__ == "__main__":
    root = tk.Tk()
    app = ImageRGBViewer(root)
    root.mainloop()
