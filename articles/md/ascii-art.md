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

### Step 2: Adding ASCII characters

Now, we need some of these characters. Ideally, I would want to have a text node in the compositor, but there is no such thing (yet?). So we will have to go into a program like Krita to create textures of our characters. I created 8 different textures of characters ranging from 'light' to 'dark':

@#$%*+-.

I used a monospaced font to make sure that all characters have the same width. If you don't have a monospaced font, that is no big deal since we are kind of baking the characters anyway. Just make sure all characters are centered and use the same font size.

Now we can just drag and drop our images into the compositor and it should create image nodes for each of them seperately. If we preview them using Node Wrangler, we can see that they are pretty big. We need to scale them down and tile them so they fit perfectly in our pixelated image. This is where a lot of math and technical knowdledge comes in.

For each image we need to:
- Add a set alpha node to remove the background.
- Add a scale node set to 'fit' to scale the image to fit our scene.
- Add another scale node set to relative to scale down the image.
- Add a translate node to tile the image and position it correctly.

You can group these nodes to reuse them a little easier, but set it up for one image first to get the in- and outputs baked in when grouping.

And here is the final result:

![ASCII Earth](../assets/images/ascii-earth.jpg)

