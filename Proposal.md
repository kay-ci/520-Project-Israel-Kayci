# Beyond our Earth

## Data
Choosing Data issue: https://gitlab.com/csy3dawson23-24/520/teams/TeamE12-IsraelKayci/520-Project-Israel-Kayci/-/issues/2

summary: Information on the data sets (attributions, size, description), along with the properties we plan to use from the data

## API
2 Endpoints 
app.get('/meteorites')
query parameters:
- min-year & max-year
- class
- min-mass & max-mass

app.post('/meteorites/:meteorite/rate')
- post user rating for a meteorite

## Data visualization
https://cesium.com/platform/cesiumjs/
Showing the meteor locations and potentially showing a 3D representation of the impact.

We want people to learn more about meteorites and be able to share their admiration to meteorites through a rating system. 
If we have the time we would like to add a user commenting feature.

## View
** Above the Fold ** 
on the left we will have a filtering panel with a search bar, a year selection range and a mass selection range.
We will also have all the results in a Card component that will hold a meteorites information and a like and dislike button

On the right: We will have the globe displaying the points of impact for each meteorite 

** Below the Fold **
the other cards fetched from the filtering

## Functionality
- Filtering and searching through the meteorite history
- The user will be able to click like or dislike on a meteorite 

## Features and Priorities
Core features: 
- Server endpoints
- Data display
- Database implementation (insert, delete)
- React components
- Globe viewport implementation

Potentially cut features:
- User comment feature 
- Like and dislike button

## Dependencies
https://resium.reearth.io/
Why? So we can give the user a better visualization of the points of impact.