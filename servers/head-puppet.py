# Load this microserver to puppeteer the robot using your own head
# @see https://twitter.com/LabOfOz/status/1090662898232410113

# This macro shows an example to draw a polygon of radius R and n_sides vertices using the RoboDK API for Python
from robolink import *    # API to communicate with RoboDK for simulation and offline/online programming
from robodk import *      # Robotics toolbox for industrial robots
import asyncio
import websockets
import json

# Any interaction with RoboDK must be done through RDK:
RDK = Robolink()

# Select a robot (popup is displayed if more than one robot is available)
robot = RDK.ItemUserPick('Select a robot', ITEM_TYPE_ROBOT)
robot.setSpeed(400)
if not robot.Valid():
    raise Exception('No robot selected or available')

# get the current position of the TCP with respect to the reference frame:
# (4x4 matrix representing position and orientation)
target_ref = robot.Pose()
pos_ref = target_ref.Pos()

# Simple Server
async def echo(websocket, path):
    async for message in websocket:
        if message == 'q':
            quit()
        data = json.loads(message)

        # Print the result
        if 'connected' not in data:
            # Move towards the current head pose
            if (data['face']['rotationZ']):
                target_i = Mat(target_ref)
                target_i = target_ref \
                    * rotx(data['face']['rotationX'] * -1.5) \
                    * roty(data['face']['rotationY'] * -1.5) \
                    * rotz(data['face']['rotationZ'] * 1.5)
                robot.MoveL(target_i)

asyncio.get_event_loop().run_until_complete(
    websockets.serve(echo, 'localhost', 1337))
asyncio.get_event_loop().run_forever()

raise Exception('Program not edited.')
