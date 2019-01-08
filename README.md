# docit

This is a simple application tool that let's people write documents in simple text maner, as if writing in MS Word or Google Doc. Than easily export the document as one of the following formats:

- [ ] html: Ready to use, load the content of the arichive on your server and you are good to go
- [ ] pdf
- [ ] json: write your own script to format the document presentation
- [ ] markdown

## Run app in development mode

### run backend (nodejs) server
in your terminal move to backend folder

``` 
cd simpleDocBuilder/backend/ 

```

then run 
```
npm install 
```
to install all necessary dependencies, after run 

```
npm start
``` 
a simple backend server should run at localhost:8080

### run frontend (vuejs)
open a new terminal window, and go to the frontend folder


```
cd simpleDocBuilder/frontend/

```

run 

```
npm install 

```
to install the dependencies, and than run 

```
npm serve

```
