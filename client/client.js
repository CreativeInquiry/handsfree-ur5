/**
 *        ✨
 *         (\.   \      ,/)
 *          \(   |\     )/
 *          //\  | \   /\\
 *        (/ /\_#👓#_/\ \)
 *          \/\  ####  /\/
 *              \`##' /
 *
 *  🔮 https://github/labofoz/handsfree-ur5
 *  🧙‍ https://twitter.com/labofoz
 */

// Here we instantiate handsfree with debug mode on (visible webcam feed with wireframe overlay)
const handsfree = new Handsfree({debug: true})

/**
 * Create a new Handsfree.js plugin
 * - onFrame(poses) gets called once per webcam frame
 */
let lastPose = null
handsfree.use({
  name: 'socketConnector',

  /**
   * Called once per webcam frame
   * @param {Array} poses List of pose objects, one per tracked user (if `settings.maxPoses` is set)
   */
  onFrame (poses) {
    poses.forEach(pose => {
      lastPose = pose
      this.sendMessage(pose)
    })
  },

  /**
   * Sends a message to the socket
   */
  sendMessage: throttle(function (a) {
    console.log('a', a)
    lastPose && socketConnected && socket && socket.send(JSON.stringify({
      handsfree: true,
      action: 'updateCursor',
      cursor: lastPose.cursor,
      face: {
        rotationX: lastPose.face.rotationX,
        rotationY: lastPose.face.rotationY,
        rotationZ: lastPose.face.rotationZ
      }
    }))
  }, 0)
})

/**
 * Toggle Debugger
 */
function toggleDebugger () {
  handsfree.toggleDebugger()
  handsfree.debug.isEnabled = !handsfree.debug.isEnabled
}

/**
 * Connect or disconnect from the robot
 */
const $socketURI = document.querySelector('#websocket')
const $connectedState = document.querySelector('#connected-state')
let socket = null
let socketConnected = false
function toggleWebsocket () {
  if (socket) socket.close()
  
  if ($connectedState.checked && $socketURI.value) {
    socketConnected = false
    socket = new WebSocket($socketURI.value)
    socket.onopen = () => {
      socketConnected = true
      socket.send('{"handsfree": true, "connected": true}')
    }
  } else {
    socketConnected = false
  }
}

/**
 * Basic throttling method, which calls `callback` at most once per `limit` milliseconds
 * 
 * @param {Function} callback The callback to throttle
 * @param {Number} limit Number of milliseconds to wait before calling the callback again
 */
function throttle (callback, limit) {
  let wait = false
  return function () {
    if (!wait) {
      callback.call(this, arguments)
      wait = true
      setTimeout(() => wait = false, limit)
    }
  }
}

/**
 * Update the version number under the title
 */
handsfree.on('ready', () => {
  document.querySelector('#version').innerHTML = Handsfree.version
})

/* globals
Handsfree */