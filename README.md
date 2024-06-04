# VodeoThermain
This is a video thermain coded based on the 🎃 Coding a Theremin in JavaScript (#JSVFX) 🎃 of  Radu Mariescu-Istodor

The original turtorial is on the https://www.youtube.com/watch?v=k8seP2yEKqQ

I just keep the yellow mark of the recognized area for adjust the parameter and add another axis to allow using x position to control volume.

The rgb.py will aloow the user to open a photo of the pointer picked, click a point on it, and the program will output the RGB value.

Then, adjust the RGB value in the 

'''const locs = getLocationsWithColor(imagData, { r: 0, g: 255, b: 0 });
'''

of the effect.js and treshold in the

'''function colorMatch(c1, c2, treshold = 180)
'''

of the utill.js, based on the object selected and light condion, the program most likely to work.

The pointer object in this code is a green marker, so if the user use something also green, then don't need to care about rgb.py or requirements.txt, they could just open the index.html and adjust the "function colorMatch(c1, c2, treshold = 180)" based on their situation.
