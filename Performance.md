# Performance of Beyond our Earth

## Introduction and Methodology
<!-- Briefly state how you gathered data about app performance, and in what environment 
(which browsers, what browser versions, what kind of device, OS,
width and height of viewport as reported in the console with `window.screen) -->

First thing I used to gather data was the profiler. I used it in Google Chrome x4 throttling on my pc.
Second thing was noticed while on network tab and using lighthouse report.
Third tool was interacting with the app.

<!-- Also report overall impact on whatdoesmysitecost results before and after all your changes -->
### Before whatdoesmysitecost results

### After whatdoesmysitecost results

## Baseline Performance

<!-- Summarize initial results for each tool that you used. Did the tools
detect all the performance issues you see as a user? -->
Profiler shows that the Main component is being re-rendered on every interaction with the app.
While on the network tab and light house. A lot of resources are being requested for the 3rd party library cesium/resium.
While interacting I noticed that clicking next page in the "View meteorites in your country mode" is very slow.

## Areas to Improve

## Summary of Changes 

<!-- Briefly describe each change and the impact it had one performance (be specific). If there
was no performance improvement, explain why that might be the case -->

### <!-- Change 1 -->

Lead: Israel Aristide

### The problem
When going through the meteors present on your own country, the fetches always take over 400ms and it makes things feels sluggish. 
![before](./img/prob1before.png)

### The solution
Caching! In the server i implemented a cache for the meteorites in a given country, this reduced the time to fetch after the first time significantly.

![after](./img/prob1after.png)

...

### <!-- Change n -->

Lead: <!-- name main contributor to this change -->

## Conclusion

The first change absolutely had the greatest impact, a reducement from 400ms each fetch all the way down to 5ms at most. Although we do now understand the the library we chose for visualization is not the best when it comes to performance and load times. The app much less usable on slower internet connections because the library has to download so many images so often. Next time resium will not be the first choice. Another thing is that since the library uses 3D rendering, systems that do not support WEBGL will be unusable for this app.

Another thing that was important for just the general feel of the app was to speed up the animations in the resium viewer. Even though it didnt change peformance, it helped with the User Experience and making it feel faster.