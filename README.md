# Eve.io Coding Challenge

### [https://eveio.netlify.app/](https://eveio.netlify.app/)

### `npm install && npm start`

Once the project is running:

-   Test out the client functionality @ [http://localhost:3333/](http://localhost:3333/)

## Instructions

-   Create a web application in your preferred framework/language.
-   The user should be able to type in a location.
-   Display a Google Map with 4 pins: One main pin for the users entered location, 3 pins for the nearest 3 cities to their chosen location.
-   Display a list with basic information about those 4 locations, including the following points: Name, Current temperature, Population and distance to the user-entered city.

Some datasets/APIs we would advise you to use:

-   [http://www.geonames.org/](http://www.geonames.org/)
-   [https://openweathermap.org/api](https://openweathermap.org/api)
-   [https://developers.google.com/maps/documentation](https://developers.google.com/maps/documentation)
-   And incase you prefer others: https://github.com/awesomedata/awesome-public-datasets

Our goal is to see how you can sanitize data and use data received from one API interaction with a new API and display it collectively to the user, whilst having a structured/scalable implementation.

### Application improvements

Given more time, there are several updates/changes that should be made to increase flexibility and extensibility:

-   Documentation: implement Storybook to visually validate individual components while providing implementation details
-   Testing: implement Jest & React Testing Library for unit and integration tests, TestCafe/Cypress for end-to-end testing of the entire application
-   Store:
    -   Separate the UI from the API services (components use selectors to consume store data)
    -   Establish an internal model for places (define a data structure that is combination of the pieces from each API)
    -   Setup reducers and selectors to efficiently handle actions and maximize data reuse
    -   Introduce redux-thunk or redux-sagas to make API calls
-   Global side effect handling: abstract loading and error handling out from individual pages/components
