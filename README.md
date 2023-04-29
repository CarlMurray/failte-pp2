![Cover image](assets/readme/img/cover-img.jpg "Cover image")
---
### The production site is available at https://failte.carlmurray.design OR https://carlmurray.github.io/failte-pp2/ (in case custom domain doesn't work)
---
# Table of Contents
TBD
---
# Project Background
fáilte is a site that aims to make it easy for users to find and discover attractions in Ireland. The site features an interactive map which has over 600 attractions plotted, along with a geo-guessing game where users can test their knowledge of Ireland's attractions.

With the rising popularity of staycations, people require easy access to information that helps them make the most of their trips and explore their surroundings. The project's primary objectives include creating a user-friendly platform for browsing various attractions in Ireland, such as historic sites, nature reserves, museums, art galleries, and other points of interest. Additionally, it aims to provide information about specific attractions and directions to navigate to them.

The key goals for this project include providing a user-friendly experience for browsing attractions in Ireland, including historic site, nature reserves, museums, art galleries and other points of interest. Additionally it aims to make it easy for users to find out more about an attraction of interest and find directions to navigate to the attraction.
---
# User Experience
## Design
- To guide the development process, mockups of the intended design were created in Figma before starting development. These early designs provided clear direction for development, however the final build may differ as various iterations were explored throughout the development.
- A simple colour palette was used consisting of a green primary colour, inspired by Ireland's national colour, along with a spectrum of gray to white. 
- Lilita Pro was the chosen typeface for headings as it conveys a sense of welcome (fáilte) and friendliness, while Roboto was used for body text for its simple and modern appearance.
![Colour palette](assets/readme/img/colour-palette.png "Colour palette")
![Lilita Pro for headings and Roboto for body](assets/readme/img/fonts.png "Font choices")

## Site Structure
- **fáilte** has four pages:
    - The landing page contains the primary feature of the site - an interactive map showing 600+ attractions, with a search input feature.
    - The 'Play' page features a geo-guessing game where users can test their knowledge of Ireland's attractions.
    - The 'About' page contains a short description of the site and its purpose. Additionally it includes an attribution statement to credit Fáilte Ireland for the data used for the site.
    - The 'Contact' page allows users to contact the site owner (me) with feedback, questions and suggestions.
    ![Diagram showing site map](assets/readme/img/sitemap.png "Sitemap")

## Features
### Navigation Bar
- The site features a responsive navigation bar which includes links to each page. 
- Clicking the **fáilte** logo brings users to the Home/Map page in line with UX best practice.
- The active page a user is on is highlighted with a decorative underline to help orient the user as they navigate the site.

### Interactive Map
![Map with search results](assets/readme/img/map-main.jpg "Map")
- The Map utilises the Google Maps JavaScript API along with attraction data provided by the Fáilte Ireland Open Data API which includes the name, address, phone number, website and geographical coordinates for 622 attractions in Ireland.
- Users can pan and zoom around the Map using the mouse, keyboard or on-screen controls. Additionally, the Map includes native Google Maps controls such as Street View, Satellite view, zoom and fullscreen.
- The Map features a set of marker icons which denote the type of attraction i.e. museum, forest, hike, cafe etc. and are colour coded for readability.
- When a marker is clicked, an info window displays above the marker with the name and location of the attraction, as well as a link to a website, phone number and Google Maps directions. If the attraction has no website or phone number, the buttons are greyed out and are unclickable.
- Users can click the 'close' button or click anywhere outside the info window, to close it. The active info window will also close if another is opened.

### Search 
![Demonstration showing use of search feature](assets/readme/img/map-search-demo.gif "Search demo")
- Users can use the Search function to search for specific attractions.
- The Search works by checking the name, location and "tags" associated with each attraction against the user's search query. Most attractions have multiple tags (e.g. "Castle, Forest, Museum") which is why a search for "Castle" may also show other types of attractions.
- The Search results dynamically update as the user types and is quick and responsive to user input.
- If an invalid search query is entered, an error message is displayed prompting the user to enter a new search query.
- The Search Results show the same information, including links and buttons, as the info windows on each map marker.

### Geo Guessing Game
- fáilte features a Geo Guessing Game that provides users a fun way to discover Ireland's attractions.
- Users are dropped at a random Street View of a popular attraction in Ireland and must guess the location by clicking on the map. 
- The closer the user's guess, the more points they win, over the course of a five round game.
- The game can be enjoyed by users of all abilities as it features accessible controls [see Accessibility](#accessibility).

### Mobile UX
- On mobile screens, the Map and Play pages are designed to fit within the browser's viewport at all times, taking native browser UI elements into account. This was accomplished by using DVH (Dynamic Viewport Units) in CSS rules.
- This was intentionally done so that no scrolling is necessary and the Map and Play features are always visible on screen, and are easy to interact with, without the possibility of unintentional (and frustrating) scrolling as users try to navigate the Map or Street View, particularly on touch screens.
- Map and Street View controls are also hidden on mobile screens to preserve screen real estate, with the exception of the fullscreen control which is of particular importance on small screens (fullscreen not available on iOS, see [Bug #8](#bugs-and-issues)).
- On the Map and Play pages, layouts are designed to adapt for optimal usability on small screens. For example, on the Map page, Search Results are hidden in a bottom-drawer on small screens. Additionally, on the Play page, the layout of Street View and the Map change based on the aspect ratio of the screen (i.e. side-by-side vs. vertically stacked Map/Street View)
![Mobile layout on map and street view](assets/readme/img/mobile-layout.jpg "Mobile layout")

### Accessibility
- Designing for accessibility was an important goal of this project, and steps were taken to ensure that users of all abilites can enjoy what fáilte has to offer.
- The Map is navigable with keyboard controls and all attractions on the map and search results can be cycled through by tabbing. 
- All attraction icons on the Map, along with their associated links, have aria-labels and/or titles so users of screen readers can use the Map.
- The Geo Guessing Game can be enjoyed by all users too, as it features optional accessible controls which show a red crosshair at the center of the map and allow users to make a guess by using an on-screen button.
![Game with accessible controls](assets/readme/img/accessible-controls.png "Accessible controls")


# Technologies Used
I used the following technologies, platforms and support in building my project:
- Wireframes and mockups were designed in [Figma](https://www.figma.com/)
- The website is built with [HTML](https://html.spec.whatwg.org/), [CSS](https://www.w3.org/Style/CSS/Overview.en.html) and [JavaScript](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/)
- The Code Institute modules/lessons aided my learning and many of the concepts learned were applied in this project
- [Stack Overflow](https://stackoverflow.com/) was used for troubleshooting and debugging throughout the project, as referenced.
- [MacOS VoiceOver](https://bbc.github.io/accessibility-news-and-you/assistive-technology/testing-steps/voiceover-mac.html) was used for accessibility testing.
- [Git](https://git-scm.com/) was used for version control
- [GitHub](https://github.com/) was used for the project repository
- [Google Fonts](https://fonts.google.com/) was used for all fonts on the site
- [FontAwesome](https://fontawesome.com/v4/) was used for icons which then had additional styling applied to them
- [Favicon Generator](https://favicon.io) was used to generate the favicon used
- The site is hosted on [AWS Amplify](https://aws.amazon.com/amplify/)
- Custom domain registered with [NameSilo](https://www.namesilo.com/), with a specific subdomain for this project (https://failte.carlmurray.design)
- [Google Analytics](https://analytics.google.com/analytics/web/) was linked to the site to track site traffic and user behaviour.
- The [Google Maps JavaScript API]() was used for the Map and Street View functionality.
- The [Fáilte Ireland OpenData API](https://failteireland.developer.azure-api.net/api-details#api=opendata-api-v1&operation=attractions-csv) was used for attraction data.
- [EmailJS](https://www.emailjs.com/) was used to add functionality to the Contact form.

# Bugs and Issues

## Resolved

1. During the initial stage of development, when fetching the Attraction Data from the Fáilte Ireland API, it would only return a maximum of 50 results as results are paginated. Documentation for the API is non-existant/inaccessible at time of writing and I could not determine a solution. However, I was able to download the full dataset in CSV format which I could then parse to JSON using [CSVtoJSON](https://csvjson.com/csv2json) and `fetch` the file locally which turned out to be a simpler and better solution.
2. The biggest challenge was implementing the search feature so that it functions as desired. During development, I was able to make Attractions which matched the search query appear on the map, however when I cleared or editted the search input, the Attractions remained on the map as I had not told the program to clear the map when a new search query is made. Drawing up a flowchart helped me think through the logic of my code and the issue and solution became obvious after doing this.
![Flowchart showing incorrect code logic](assets/readme/img/flowchart.png "Flowchart")
3. When testing on an iPhone XS Max, it was noted that the site did not fit within the viewport as intended. This was due to `vh` units not taking into account the native browser UI elements such as the toolbar etc. I found a solution on [Stack Overflow](https://stackoverflow.com/questions/58886797/how-to-access-the-real-100vh-on-ios-in-css): a newer CSS unit - `dvh` (Dynamic Viewport Units) - takes into account the browser UI and changing any `vh` units in my CSS to `dvh` fixed this issue and the site now displays as intended. This was tested on all major mobile browsers (Chrome, Edge, Safari, Firefox, Opera, DuckDuckGo) wihtout issue.
![Before and after screenshots of adding dvh units](assets/readme/img/bug-dvh.png "vh to dvh big fix")
4. After implementing the search functionality, I tested it on an iPhone XS Max and it would not return any search results. I found that the iPhone keyboard was automatically setting the first character to uppercase, and I had not made the search query function case-insensitive. This was fixed by simply adding `.toLowerCase()` to the `searchQuery` argument in my app.
![Code snippet showing bug fix](assets/readme/img/bug-search.png "Fixing search bug with .toLowerCase()")
5. When implementing the geo-guessing game, on occasion the app was trying to load a non-existent Street View at a Lat/Long location that did not have Street View on Maps (e.g. on private property or an inaccessible attraction). To fix this bug, I first had to study the Maps API Documentation more thoroughly and re-write my functions to allow for reading the promise response after checking the status of the Street View request. I then wrote logic that would check if the Street View is valid, and if not, try again.
![Screenshot of site and console showing bug](assets/readme/img/bug-street-view.png "Invalid Street View bug showing 'ZERO_RESULTS' status")
6. When testing the Geo Guessing Game during development, after 3-4 rounds a number of errors started to appear in console, particularly relating to WebGL contexts, before the game would eventually stop working. After some research, I found that the issue was due to my code initialising the Street View each time the game started a new round which consumed excess browser resources, rather than re-using the same Street View and changing the Panorama. The fix was to stop re-initialising Street View and instead write a function that would update the Street View with a new Panorama each round.
[Relevant Stack Overflow Thread](https://stackoverflow.com/questions/45654166/reuse-a-google-maps-street-view-inside-of-a-modal)
![Screenshot of site and console showing bug](assets/readme/img/bug-webgl.png "Bug due to having too many WebGL contexts")
7. When testing the site towards the end of development, I noticed a bug in the Geo Guessing Game where every 5 - 10 rounds, the Street View would not update and users were shown a stale Street View even though a new Map position was generated, similar to bug #5. This was a challenging bug to diagnose and there were a couple of occasions where I mistakenly thought I had fixed it, but I believe it relates to the Lat/Lng coordinates in the Fáilte Ireland dataset - some locations do not have a valid Street View. I also think that fixing bug #6 led to this bug arising. To fix this bug, I created my own dataset with locations for the game in `geo-guess-locations.json`. This served two purposes: 1. It fixed the bug as I chose locations that I was able to verify had a valid Street View; 2. It fixed the issue of the game being too difficult as it now shows popular and familiar locations in Ireland rather than obscure locations that are too hard to guess.
8. During testing I noticed the fullscreen control was not showing on Map or Street View. After some troubleshooting, I learned from the Google Maps JavaScript API Documentation that iOS does not support fullscreen. [Reference](https://developers.google.com/maps/documentation/javascript/controls#:~:text=The%20Fullscreen%20control%20offers%20the,not%20visible%20on%20iOS%20devices.)

## Unresolved

1. On initial load of the Geo Guessing Game, if the user enables the Accessibility Controls, the "Guess" button initially displays off-center. I could not diagnose the issue, however the button shifts to it's intended position once the user interacts with the Map (pan/zoom) and as such, does not have any significant impact on performance, usability or functionality.
![Screenshot of game showing off-center button](assets/readme/img/bug-game-off-center-btn.png "'Guess' button showing off-center on initial load only")

---

# Testing

## Overview
- Responsiveness was tested as per below table (go to section: [Responsiveness](#responsiveness))
- All HTML files were passed through the W3C validator with no errors (Validation results: [Home page](), [Game page](), [About page](), [Contact page]() )
- The CSS stylesheet was passed through the W3C validator with no errors ([Validation of styles.css]())
- The website was tested on major browsers including Chrome, Safari, Firefox and Edge as detailed in [Testing Process](#testing-process) below.
- All user flows were tested in depth including navigating through content, entering search queries, clicking CTAs and links, and form submission.
- All forms were tested to ensure validation was present and that forms could be submitted without error
- Lighthouse was used to test for Performance, Accessibility, Best Practices and SEO and adjustments were made to improve test results. [Example of Home page test results here]()
- Accessibility testing was conducted by navigating the site and performing tasks using keyboard navigation and a screen reader (MacOS VoiceOver)

## Testing Process
| Test                | Action                   | Success Criteria  |
| -------------       |-------------             | -----|
| Homepage loads      | Navigate to website URL  | Page loads < 3s, no errors |
| Game                | Play 50 rounds of game  | Locations not repeated until all have been shown once, correct map and street view shown, interactivity functions as intended |
| Links               | Click on each Navigation link, CTA, button, logo, footer link, attraction links   | Correct page is loaded/correct action performed, new tab opened if applicable |
| Attraction links    | Verify invalid links are not clickable, correct button style applied, correct title shown on hover, check info windows and search results views   | Invalid links not clickable, grey icon shown, correct title shown on hover |
| Form validation     | Enter data into each input field, ensure only valid data is accepted | Form doesn't submit until correct data entered, error message shown |
| Successful Contact form submission     | Complete contact form and submit | Form successfully submits, feedback message shown |
| Unsuccessful Contact form submission     | Complete contact form, disable network connection and submit | Form submission fails, error message shown |
| Responsiveness      | Resize viewport window from 320px upwards with Chrome Dev Tools. Test devices as detailed in [Testing Process](#testing-process) | Page layout remains intact and adapts to screen size as intended |
| Accessibility       | Navigate the site with keyboard and screen reader | Tab index works in correct order, map is navigable, game is playable with accessible controls enabled, content/aria-labels read aloud |
| Lighthouse          | Perform Lighthouse test on each page | Score of > 89 on Performance, Accessibility, Best Practices, SEO |
| Browser compatibility | Test links, layout, appearance, functionality and above Tests on Chrome, Safari, Firefox and Edge. | Website looks and functions as intended and passes all tests above


## Responsiveness

- Testing for responsiveness was conducted using Chrome Dev Tools and ResponsivelyApp.
- The website was tested extensively on a range of emulated mobile, tablet and large format screen sizes in both portrait and landscape orientations.

|Device            |Galaxy S8+|iPhone SE|iPhone X|Galaxy S21 Plus|iPhone 12 Pro|Galaxy S20 Ultra|iPhone 6/7/8 Plus|iPhone XR|iPad Mini|iPad Air|iPad Pro |Macbook Pro|
|------------------|----------|---------|--------|---------------|-------------|----------------|-----------------|---------|---------|--------|---------|-----------|
|**Resolution**    |**360x740**|**375x667**|**375x812**|**384x854**|**390x844**|**412x915**|**414x76**|**414x896**|**768x1024**|**820x1180**|**1024x1366**|**1440x900**|
|Render            |Pass      |Pass     |Pass    |Pass           |Pass         |Pass            |Pass             |Pass     |Pass     |Pass    |Pass     |Pass       |
|Layout            |Pass      |Pass     |Pass    |Pass           |Pass         |Pass            |Pass             |Pass     |Pass     |Pass    |Pass     |Pass       |
|Functionality     |Pass      |Pass     |Pass    |Pass           |Pass         |Pass            |Pass             |Pass     |Pass     |Pass    |Pass     |Pass       |
|Links             |Pass      |Pass     |Pass    |Pass           |Pass         |Pass            |Pass             |Pass     |Pass     |Pass    |Pass     |Pass       |
|Images            |Pass      |Pass     |Pass    |Pass           |Pass         |Pass            |Pass             |Pass     |Pass     |Pass    |Pass     |Pass       |
|Portrait/Landscape|Pass      |Pass     |Pass    |Pass           |Pass         |Pass            |Pass             |Pass     |Pass     |Pass    |Pass     |Pass       |

*Testing using ResponsivelyApp:*
![Screenshot of responsiveness testing in Responsively App](assets/readme/img/responsiveness-testing.png "Responsiveness testing in Responsively App")

---
# Roadmap
- Add more popular attractions to game dataset
- Improve search function to allow multiple keywords and locations to be entered
- Add search filter options to allow users to filter attractions by type, location etc.
- Add game options including difficulty, number of rounds, high score, location boundaries
---
# Credits

### Assets
- Attraction data: [Fáilte Ireland OpenData API](https://failteireland.developer.azure-api.net/api-details#api=opendata-api-v1&operation=attractions-csv)
- Map & Street View: [Google Maps JavaScript API](https://developers.google.com/maps)
- Favicon: [Favicon.io](https://favicon.io/)
- Icons: [Font Awesome](https://fontawesome.com/)

### Tools & Utilities
- Responsiveness Testing: [ResponsivelyApp](https://responsively.app/)
- Accessibility Testing: [WAVE Web Accessibility Evaluation Tool](https://wave.webaim.org/)
- Flow Diagram: [SmartDraw](https://cloud.smartdraw.com/)
- Code Snippet README Images: [Carbon](https://carbon.now.sh/)
- Contact form submission: [EmailJS](https://www.emailjs.com/)

### Educational Resources
- [MDN Documentation](https://developer.mozilla.org/en-US/)
- [Working with Data and APIs in JavaScript, The Coding Train](https://www.youtube.com/watch?v=DbcLg8nRWEg&list=PLRqwX-V7Uu6YxDKpFzf_2D84p0cyk4T7X)
- [Google Maps API JavaScript Tutorial, Traversy Media](https://www.youtube.com/watch?v=Zxf1mnP5zcw&ab_channel=TraversyMedia)
- [The Web Developer Bootcamp 2023, Colt Steele](https://www.udemy.com/course/the-web-developer-bootcamp/)
- [Google Maps JavaScript API Documentation](https://developers.google.com/maps/documentation/javascript)