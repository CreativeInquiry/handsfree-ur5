# Handsfree UR5

*Recovered copy of Oz Ramos' project for controlling UR robots with Handsfree.js.*

![Handsfree Dashboard & UR5](https://media.giphy.com/media/8OVu1dX8c6q9P1kmcD/giphy.gif)

This repository contains everything you need to start controlling your Universal Robot (UR5) handsfree through your webcam! I made this with [handsfree.js](https://handsfree.js.org) during my residency at [The STUDIO at CMU](http://studioforcreativeinquiry.org/).

There are four main parts to this project:
- [The Robot](https://github.com/labofoz/handsfree-ur5/wiki/Setup---Robot)
- [RoboDK](https://github.com/labofoz/handsfree-ur5/wiki/Setup---RoboDK)
- [A Server](https://github.com/labofoz/handsfree-ur5/wiki/Setup---Server)
- [A Client](https://github.com/labofoz/handsfree-ur5/wiki/Setup---Client)

> **Info:** RoboDK supports a wide range of [robots besides the UR5](https://robodk.com/library), so if yours is in their directory then it's a good chance that this guide will work with your robot as well!

> **Warning:** The RoboDK simulator is very good at predicting [singularities](https://robohub.org/3-types-of-robot-singularities-and-how-to-avoid-them/) even in real time. However, it can't know about the dimensions of any attachments when calculating collisions with itself so make sure to practice without attachments first!

---

## System Requirements

- Windows, OS X, Linux (I was on Windows 10)
- [RoboDK](https://robodk.com/download) >= 3.5 (I used the Trial)
- [NodeJS](https://nodejs.org/en/) >= 8 (I tried 8.11.4 and 10.15.1)
- [Chrome](https://www.google.com/chrome/) or [FireFox](https://www.mozilla.org/en-US/firefox/new) (Safari is currently broken due to a [bug](https://github.com/labofoz/handsfree.js/issues/25))
- [Python](https://www.python.org/downloads/) >= 3.6 (I have 3.7.x)

## Prereqs
- Make sure to have RoboDK and NodeJS installed (I used the defaults)
- Either [download this project zip](https://github.com/labofoz/handsfree-ur5/archive/master.zip) or run: `git clone https://github.com/labofoz/handsfree-ur5`
- Inside the project directory, install dependencies with: `npm install`
- `pip install asyncio`

## File Structure

```
handsfree-ur5/
├── client/             # Served with: `npm start`
│   ├── client.css
│   ├── client.js
│   ├── index.html
├── node_modules/       # Appears after you `npm install`
├── servers/
│   └── head-puppet.py  # Puppeteer the robot tool as if it where a head
├── package.json 
├── README.json
```

---

# Concepts
## Terms
Because I'm not a roboticist, here's what I actually mean when I use the word:
- "_Tool_": refers to the final joint on the robot, where you would attach a gripper or head
- "_Attachment_": the actual gripper or head
- "_Singularity_": occurs when the robot makes a dramatic adjustment in order to continue following along a path. If you have a long attachment and a singularity occurs, there's a chance that the attachment may collide with the robot as it reorientates itself

---

# Setup

## The Robot

Because we're using the RoboDK as an API to communicate with a [wide range of robots](https://robodk.com/library), you can probably follow along with any supported robot. Just make sure to turn your robot on and manually position it to where you want the robot's origin to be.

[<< Learn More >>](https://github.com/labofoz/handsfree-ur5/wiki/Setup---Robot)

## RoboDK

RoboDK is a robot framework that works with several popular manufacturers out of the box, and is how we connect with our UR5. The benefit to using RoboDK is that we can live-preview what our code would look like in the simulator before actually running it on the robot.

> **Tip:** The Trial should be sufficient since we never have to actually save anything from inside app

[<< Learn More >>](https://github.com/labofoz/handsfree-ur5/wiki/Setup---RoboDK)

## Server

Once we have RoboDK installed we need to load a program. Because I don't know Python very well, what I did was create an infinitely running loop that listens for incoming WebSocket messages.

Each file in `/servers/` is an individual program that can be run on the robot.

> **Tip:** I found that keeping all the logic outside of the server led to a faster development cycle

[<< Learn More >>](https://github.com/labofoz/handsfree-ur5/wiki/Setup---Server)

## Client

Finally, the client is just a simple [Handsfree.js plugin](https://handsfree.js.org/#/docs/plugins) that sends the users current head pose to the server. Included is a quick dashboard I made to help me in developing this project.

Use `npm start` to run a local copy of the server.

> **Tip:** This dashboard could also be run from your mobile device: https://handsfree-dashboard.glitch.me

[<< Learn More >>](https://github.com/labofoz/handsfree-ur5/wiki/Setup---Client)

# More Coming Soon

This is a work in progress and you can reach me at:

- https://twitter.com/labofoz
- labofoz@gmail.com
