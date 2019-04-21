# gdrive-api-test
Hi
This application contains front end and services written using react js and spring boot, for interacting with google drive api.

To run the project
[Spring Boot]
* Import the project as maven project in eclipse.
* Change SAVE_FILES_DIR in Constants.java file.
* mvn clean command (or through eclipse interface).
* mvn install command (or through eclipse interface).
it will build a war.
run it in apache tomcat.

after that goto -> http://localhost:(tomcat port no)/api-test/swagger-ui.html

[React]
* Go to the frontend folder, which contains package.json.
* change URL in EndPoints.ts to Spring Boot app url. 
* type & enter:  yarn install
* type & enter: yarn run dev
* type & enter(for test): yarn run test
* Launch the app by going to http://localhost:1234.

[FilesAndFoldersView]
* Click on config button, which will open a modal window, enter the details and you will get the files and folders loaded.

[Upload File]
* Enter the details and click on submit.

React part, i am using parcel as the bundler and typescipt.
So, initially i ran into some issues with the types, and while setting up the the app for testing with jest and enzyme it took me a while
to setup (as i ran into issues like it and expect undefined).

I am not familiar with unit testing. so i had to learn before writing the unit tests, so i did some googling and wrote few basic
tests in spring boot and in react.

Because of time constraints, i was unable to write each and every possible test case, but the project was setup to extend the unit tests.
I kept exception handling to basic.
