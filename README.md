# SaltSprayTrails

Inspired by AllTrails, SaltSpray Trails is a full stack web application with a focus on usability that allows users to browse locations for water activities and sports, manage visited and saved locations, and review locations in the USA. Future features include connecting with other users of the site and eventually messaging.

# Live Site

# Main Stack Technologies

# Database

# Features Overview

### User Auth:
Create an account or sign in and log out
Sign in as a Demo User to access full site functionality

### Locations:
View locations for best swimming, kayaking, rafting, and surfing spots
Add, Edit, or Delete Locations
Organize locations based on type of activity

### Reviews/Ratings:
View reviews/ratings for a location and post a review
Edit or delete your own reviews/ratings
Filter locations based on rating score

### Collections:
View your collections on the 'My SplashSite' page
Customize your collections via add, edit and delete forms (Visited or Saved/Future)

### Search:
All Users can explore locations

LongTerm Goals:
Create a social community for people to post pictures at the locations and comment on eachothers

Very LongTerm Goals:
Add friends and social network
Live messaging

# Features Indepth

## Locations

### Get all Locations

Users should be able to view all Locations.
When navigating to the "Locations" section of the platform, users should see a list of all available locations for water activities and sports.

Each location in the list should display its name, an image thumbnail, and relevant information for easy identification.

By clicking on a location, users should be taken to its detailed page for more information.

Require Authentication: False
Request
Method: GET
URL: /locations


### Create a Location (For Admin Use)

Admin users should be able to create a new location listing.
New listing should include name, description, image(s), and other relevant details.
Once created, the location should appear in the locations catalog for users to view and explore.

Require Authentication: True (Admin Only)
Request
Method: POST
URL: /locations


### Update a Location (For Admin Use)

Admin users should be able to update the details of existing location listings.
All changes made to the location details should be reflected accurately in the system once the update is confirmed.

Require Authentication: True (Admin Only)
Request
Method: PUT
URL: /locations/:id


### Delete a Location (For Admin Use)

Admin users should be able to delete existing location listings.
Before confirming the deletion, the system should display a confirmation dialog to ensure that the admin intends to delete the selected location.

Require Authentication: True (Admin Only)
Request
Method: DELETE
URL: /locations/:id


## Reviews

### View all reviews for a Location

Users should be able to view all the reviews associated with a location.
When navigating to a location detail page, users should see a section dedicated to displaying location reviews.

Require Authentication: False
Request
Method: GET
URL: /locations/:id/reviews


### Create a review for a Location

Logged-in users should be able to create a review for a location they have visited.
The review should be displayed in the location's review section along with other reviews.

Require Authentication: True
Request
Method: POST
URL: /locations/:id/reviews


### Update a review for a Location

Users should be able to update a review they have previously submitted for a location.
Users should be able to make changes to any of the reviews they have made before.

Require Authentication: True
Require proper authorization: review must belong to the current user
Request
Method: PUT
URL: /locations/:id/reviews/:reviewId


### Delete a review from a Location

Users should be able to delete a review they have previously submitted for a location.
The review should be permanently removed from the location's review section.

Require Authentication: True
Require proper authorization: review must belong to the current user
Request
Method: DELETE
URL: /locations/:id/reviews/:reviewId


## Collections

### View user's collections

Users should be able to view their collections on the 'My SplashSite' page.
The Visited and Saved/Future collections should be displayed.

Require Authentication: True
Request
Method: GET
URL: /users/:userId/collections


### Add a location to a collection
Users should be able to add a location to their Visited or Saved/Future collection.
The location should be added to the selected collection upon confirmation.

Require Authentication: True
Request
Method: POST
URL: /users/:userId/collections/:collectionId/locations


### Remove a location from a collection
Users should be able to remove a location from their Visited or Saved/Future collection.
The location should be immediately removed from the selected collection upon confirmation.

Require Authentication: True
Request
Method: DELETE
URL: /users/:userId/collections/:collectionId/locations/:locationId


## Search

### Search for Locations

Users should be able to search for locations by entering relevant keywords, so that they can easily find the locations they're interested in.
Users should be able to filter locations based on various criteria.
Require Authentication: False
Request
Method: GET
URL:
