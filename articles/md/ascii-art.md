# ASCII Art in the Blender compositor

##### In this article, we will explore how to create ASCII art using Blender's compositor. All realtime, so you can see the changes instantly.

###### 26/09/2025

I have wanted to create realtime ASCII art in Blender for a while now, and I finally got around to it. The process is quite simple and involves using the compositor to convert the viewport into ASCII characters based on brightness levels. In this article I will explain my thought process of how I got to this result, and how you can do it too. There is a lot of math involved, but that is what makes it fun!

At first I really wanted to do this in geometry nodes since then I could let the user choose which characters to use, which makes it more customizable. However, I couldn't figure out how to do it in puregeometry nodes without rendering or using texture data, so I decided to use the compositor instead. I feel like this is a good compromise since it is still realtime and allows for a lot of flexibility, even though adding or removing characters is not as easy.

Now that we have that out of the way, we can finally get started.

### Step 1: Extracting brightness values

For ASCII art, you need to accurately know the brightness of each pixel so we can map it to a character. We can then associate each brightness range with a specific character. so we know where to place them.

So the first step is to convert our scene to grayscale, since we do not need any color data for this. You _can_ keep color data if you want to add it in later, but I feel this is not consistent with the ASCII art style. I like to use only one color like white or green. We will use this grayscale image as a sort of mask, but this is way too detailed for ASCII art since the characters are larger than just a single pixel.

So the next step is to pixelate our render result to create 'blocks' of brightness values. You can do this with the pixelate node, and here is the only problem I have with this setup: the pixelate node _can't_ receive input from a node group. This is what I used to say when I made this setup, but it seems like as of writing this, the pixelate node now can receive integer inputs! This means you can create one node group for everything and keep everything organized.

In the pixelate node we can set an arbitrary pixel size that looks good to us for now. See this value as the 'scale' of our ASCII art. Great, now we have a pixelated grayscale image of our scene that we can use as a mask for the characters.

This is what our mask looks like so far:

![Pixelated grayscale image](../articles/media/ascii-art/pixelated-grayscale-earth.jpg)

### Step 2: Adding ASCII characters

Now, we need some of these ASCII characters. Ideally, I would want to have a text node in the compositor, but there is no such thing (yet?). So we will have to go into a program like Krita to create textures of our characters. I created 8 different textures of characters ranging from 'light' to 'dark':

@#$%*+-.

I used a monospaced font to make sure that all characters have the same width. If you don't have a monospaced font, that is no big deal since we are kind of baking the characters anyway. Just make sure all characters are centered and use the same font size.

Now we can just drag and drop our images into the compositor and it should create image nodes for each of them seperately. If we preview them using Node Wrangler, we can see that they are pretty big. We need to scale them down and tile them so they fit perfectly in our pixelated image. This is where a lot of math and technical knowdledge comes in.

For each image we need to:
- Add a set alpha node to remove the background.
- Add a scale node set to 'fit' to scale the image to fit our scene.
- Add another scale node set to relative to scale down the image.
- Add a translate node to tile the image and position it correctly.

You can group these nodes to reuse them a little easier, but set it up for one image first to get the in- and outputs baked in when grouping. It should look something like this:

![Node setup for one character](../articles/media/ascii-art/character-transform-nodes.jpg)

Take note of the values I used for the scale and translate nodes. These were calculated by eye first, that's how I like to start with complex math-based setups. I just slide the values while holding shift for more control and then I try to line everything up. After that I can give meaning to these arbitrary values by figuring out where they came from and how they relate to other values. This is what works for me, but that doesn't mean it is the best way or will work for you.

Some settings to take note of:
- Set the first scale node to 'Render Size' and 'Fit', this will make sure the images have consistent scaling based on the render resolution.
- Set the second scale node to 'Relative' and scale down the image (I used 0.05, but we will calculate this later).
- Set the translate node to repeat on 'Both Axes', this will tile the image. This will give us an X and Y offset, which we will calculate later.

Now do this for all characters and take note of how many characters you have. I used 8 characters, which will be an important value in the next step. This is what it should look like when you are done:

![Tiled ASCII characters](../articles/media/ascii-art/tiled-ascii-characters.jpg)

### Step 3: Creating masks for each character

We now have a grayscale pixelated image and 8 tiled ASCII characters. The next step is to create masks for each character using the grayscale image. Add a 'Greater Than' math node and connect our pixelated image to the first input. The second input will be 0 for this first character. Add a 'Less Than' math node and also connect the pixelated image to the first input. The second input will be 1 divided by the number of characters we have (in my case 8). Now add a 'Multiply' math node and connect the outputs of the 'Greater Than' and 'Less Than' nodes to the inputs. This will create a mask for the first character based on the brightness values. What we just did is create a black and white image where the pixels that are in our range of 0-0.125 are white, and the rest is black.

![Node setup for creating masks](../articles/media/ascii-art/mask-per-character.jpg)

We need to do this for each character, but then change the greater than and less than values accordingly. For the second character it will look like this:
- Greater Than: 1 / number of characters (0.125)
- Less Than: 2 / number of characters (0.25)

And then just add 1 / number of characters for each subsequent character. There are a lot of ways to make this easier to manage, but since I didn't want to add more characters later, I just set it up manually. If you do want to add characters later, you can string together some math nodes to calculate the values based on the total number of characters. This will be your homework.

Pro tip: You can do math inside of any value field in Blender. For this example you can just type '1 / 8' in the value field and it will return 0.125.

### Step 4: Making everything fit

Now we have defined masks for each character based on brightness ranges, but when we try to multiply the two together, it doesn't look too good. This is because the masks are not aligned and scaled with the characters yet. This is where we need to calculate the scale and translate values we skipped earlier.

We need to know a few things about our scene to calculate the values for the scale and translate nodes:
- The render resolution (width and height)
- The pixel size we used in the pixelate node
- The render scale (percentage, optional)

We can get the render resolution from either the output properties in Blender manually, we can use drivers that get the values from the output properties, or we can use a really cool node called 'Image Info', this last node can give you the width and height of any image that is used as an input. 

We can get the pixel size from the pixelate node using drivers, or in the newer versions of Blender, we can use a value node or group input to drive this value and also use it for the calculation.

The render scale is only needed if you are getting the values manually from the output properties, if you are using the image info node, you can skip this.

Alright, let's start with the math. First we need to calculate the scale value. We will get this based on the resolution and pixel size. The pixel size in the pixelate node defines how big a 'pixel' is in our image. So if we have the render resolution and divide it by the pixel size, we will get a number that tells us how many 'pixels' fit in our image. We want to use the Y resolution for this, since this is the smallest dimension and that will work with how we scaled the images to fit. We can then use this 'number of pixels' to get the fraction we need for the scale node. Divide 1 by the value we just calculated and that result can be used in the scale node. This will make the images exactly as big as our 'pixels'.

In math, that looks like this:

- ResolutionY / PixelSize = NumberOfPixels
- 1 / NumberOfPixels = ScaleValue

This will almost work, but chances are that your resolution makes it so our characters are offset a little. This happens because our pixels are calculated from the corner of the image, but the characters are perfectly centered. To compensate for this offset, we can divide the pixel size and resolution by 2, and then subtract the halved pixel size from the halved resolution. This will give us the center of the pixel, which is where we want our characters to be.

In math, that looks like this:
- ResolutionX / 2 = HalfedResolutionX
- ResolutionY / 2 = HalfedResolutionY
- PixelSize / 2 = HalfedPixelSize
- (HalfedResolutionX - HalfedPixelSize) = InputForTranslateX
- (HalfedResolutionY - HalfedPixelSize) = InputForTranslateY

This will always perfectly center the characters to the pixels, no matter what resolution or pixel size you use. Great!

### Step 5: Combining everything

Now we have all the parts we need to construct our final image. Make sure you got everything working before you continue. You should have:
- A pixelated grayscale image of your scene
- (8) scaled and tiled ASCII character images
- (8) masks for each character based on brightness ranges
- Calculations for the scale and translate nodes

Now we can just multiply each character image with its corresponding mask, and then add all the results together. Add nodes in Blender only have two inputs, so you will have to chain them together. White values should not overlap, so clamping the values is not necessary but you can always do it to be sure. Finally, add an anti-aliasing node to smooth out the edges a little. Now you should be able to hit render to properly see your scene transformed into ASCII art!

![Final ASCII character nodes](../articles/media/ascii-art/final-character-nodes.jpg)

To add color, you can connect a set alpha node with our result to the alpha input and then change the color to whatever you want the background color to be. Then after that you can add an alpha over node and connect that result to the bottom image input. Then you can set the text color in the top image input.

And here is the final result:

<div class="cardMedia">
    <video src="../assets/videos/ascii-earth.webm" alt="" autoplay muted loop>
</div>
