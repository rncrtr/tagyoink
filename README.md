# Be sure all the things are installed:
run 
```
npm install
```

then
```
bower install
```

# Then start this puppy:

```
node server
```

Currently configured to run on Cloud 9 using the ip and port variables.

## Notes:
If things aren't working, it is because you currently need to include every file in the index.html, controllers, bower dependencies. Maybe someday I'll get around to putting in gulp.
Don't include bower dependencies in the controller, because they are already there.