# Writing App

Minimal web interface for writing stories.

## Scenes and Cards

The interface boils down to writing Scenes in the Text Editor, and referencing information stored in Cards.

**Scene**

A Scene is a logical segment of a Story


**Card**

A Card stores information about some entity in the Story

- Character
- Location
- Cultural Reference
- Object
- etc.

**Association**

A Scene can reference one or more Cards, and the Card will contain a list of all Scenes it is referenced in.

## Layout

Basic Layout consists of:

- Text Editor
- Scene Navigator
- Card Navigator

## Usage

The user will Select or Create a Scene in the Scene Navigator, and write in the Text Editor.
Text Editor content is automatically saved.

The user can Select or Create a Card in the Card Navigator, which will open the card in the in a floating window. This makes the Card readable while continuing to direct keyboard inputto the Text Editor.

## Requirements

### Responsive and Offline

A Progressive Web App contains most of the app logic and data on the local machine to operate quickly and responsively.
This also means it works with no network connectivity.

### Text Editor

A writer needs something to hold the text. The App should have a text editor that saves the text. There should also be some formatting tools

### Automated Testing

Write automated unit/integration tests to ensure functionality before deploying updates.

## Milestones

Here are some features and behaviors to define development goals for this App.

### 1. PWA Skeleton

Minimum skeleton to operate as a Progressive Web App. Static landing page that is cached locally.

### 2. Text Editor

Text editor in a browser that saves content to the local machine.

### 3. Scene Navigation

Scene Navigator is collapsable and is collapsed by default.

Select from a list of Scenes (single text file), and load the selected Scene into the Text Editor.
Create a new Scene in the Scene Navigator, and open a blank scene in the Text Editor.

Scenes in the Scene Navigator should be draggable to change the order of Scenes in the Story.


When Scene Navigator is open, keyboard still goes to Text Editor

### 4. Cards and Card Navigation

Card Navigator is collapsable, and is collapsed by default.

Card Actions:

- Select a Card from a list of Cards
- Create a New Card

Both Card Actions will open a Card Window. This window floats on top of the Text Editor, and should be draggable and resizable.

Card Window Modes:

- Read Mode
- Edit Mode

Selecting an existing Card will open it in Read Mode, with a button to change it to Edit Mode.

Creating a New Card will open a Card Window in Edit Mode, with a button to Save the Card.

Edit Mode will take keyboard input away from the Text Editor.

## Development

This is a node.js app, attempting to be as portable and reproducible as possible.

To run on your local machine, use standard commands:

```
$> npm install
$> npm run start
```


### Using Docker Container

The included `docker-compose.yml` is the standard test platform. This helps provide a consistent app environment for working on different machines.

The app folder is shared between your local system and the Docker Container. Changes on either side will be immediately visible on the other.

Once the container is running, changes made in your IDE/shell will be visible to the node server. Refresh your browser, or restart the server (by restarting the container).

To test you app on different versions of node, edit `docker-compose.yml` with the desired version, and re-create the container.

Once you're done testing, the Docker Container can be stopped and cleaned up.

#### Docker Compose commands

**Create the Container**

To start the docker container, run:

```
$> docker-compose up -d
```

**Watch the log activity**

To follow the log output of the container, run:

```
$> docker-compose logs -f
```

Press `ctrl+c` to close

**Start/Stop/Restart**

To restart the node server, run:

```
$> docker-compose restart
```

You can also stop/start with:

```
$> docker-compose stop
$> docker-compose start
```

**Access the Container**

To get to a prompt inside the running docker container, run:

```
$> docker-compose exec node bash
```

This will let you use the same node/npm commands as the running app.

**Cleanup/Delete**

To clean up the container, run:

```
$> docker-compose down
```

This will stop the container if it's running.

#### Example workflow

In a shell in the same directory as `docker-compose.yml`, and run:

```
$> docker-compose up -d
$> docker-compose logs -f
```

This will show the running logs of the app environment.

Open IDE if desired, or open another shell session to edit files from the command-line.

Open Browser to [localhost:8000](http://localhost:8000)

Refresh to browser after making changes.
If you change the server config / startup, restart the container.

Test and commit changes.

When you're done working, cleanup the container, and push git changes

```
$> docker-compose down
$> git push
```

