# A UI-Router Demo with authenticated states, modal states, page titles & metadata

This project uses [Lineman](http://www.linemanjs.com).

It includes the following features:

* Home state redirecting to Logged in / Logged out pages using "/" root URL
* Parent Layouts
* Passing google analytics utm parameters
* States that require authentication and redirect to the prior state after login
* Modals
    * Open modal automatically on state change
    * Close prior modal as an option
    * Pass-through UI-Modal settings
    * Direct access a Modal with URL and return to home when the modal is closed
* Page Contexts setting Title and Metadata
* 404 Page

# Instructions

1. `git clone https://github.com/tallented/cincyng-ui-router.git cincyng-ui-router`
2. `cd cincyng-ui-router`
3. `sudo npm install -g lineman`
4. `npm install`
5. `lineman run`
6. open your web browser to localhost:8000
