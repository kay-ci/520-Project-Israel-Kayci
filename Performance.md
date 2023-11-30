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

<!-- Summarize which changes had the greatest impact, note any surprising results and list 2-3 main 
things you learned from this experience. -->