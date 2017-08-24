# Mass Mutual Exercise

## Git Hub Repo

The source files for this project can be found on my GitHub profile at [https://github.com/pjliddy/mass-mutual-exercise]

## Getting Started

In order to run the application, complete the following steps:

1. Download and decompress the .zip archive of the code repository to your local machine.
2. In the terminal, navigate to the new directory (mass-mutual-exercise-master).
3. Install the necessary gulp packages using node package manager by typing: `npm install`.
4. Generate build files into the `dist/` directory by running the default gulp task: `gulp`.
5. Launch the gulp development server by typing: `gulp serve`.

Gulp will run the appropriate tasks and open a new tab in your default browser displaying the application.

## Prototype Application

This prototype application adheres closely to the wireframes and allows users to view all articles listed in the provided JSON data file. The user can click on any title or thumbnail and view the article displayed in an iFrame.

NOTE: Most of the link provided by the data feed are not active, but the 404 pages are successfully displayed in their place.

This prototype is built as a single page application with dynamic generation of content and HTML elements. All page templating and component creation is done with basic JavaScript and CSS. While this approach demonstrates my skills, I would usually use a custom Bootstrap theme for rapid creation of UI components and Handlebars for dynamic templating.

## Responsive Layout

The primary area of experience improvement that I chose to demonstrate with this prototype application is the responsive layout and behavior. This responsive design can be seen in the following areas:

1. The navigation switches from a static nav bar to a standard mobile push-down menu.
2. The search input box is moved down out of the header into the blank nav bar region.
3. Primary and secondary feature components shift their layout to a single column.
4. Images in the article listing components are repositioned above the article headline.

## Task Runner

Gulp is used as the task runner for development activities, including compiling SASS into CSS, running a development server on `localhost:3000`, and assembling all build files into a `dist/` directory that is not part of the git repo.

In order to make the final build files easier to review, I intentionally did not minify final CSS or JavaScript files.

## External Libraries

Aside from gulp for development tasks, the only external library used for this exercise is jQuery for its convenience in selecting elements from the DOM and making asynchronous AJAX calls.

## Fonts

This application uses a selection of weights from the Open Sans family from Google Fonts. While the original wireframes included an example of a serif font, this font was only used in one instance as the tile of the main page. To gain consistency and reduce load, I used the semi-bold weight of Open Sans for all headings.

## Feature Backlog

As potential next steps, I have identified the following opportunities for potential improvement:

1. Use the top nav to filter articles in the JSON feed to demonstrate how sections of the news site would work.
2. Create a unique layout for stories where there are no images provided instead of using a placeholder image.
3. Explore other options for displaying externally linked stories, either in or out of an iframe.
4. Auto-scroll the user's view when selecting an article or navigating back to the home/section page.
5. Add keywords to the sample data file and use the search input field to filter results.
