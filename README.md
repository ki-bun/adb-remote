# adb-remote
**Network ADB remote** made with Node.js

This is a personal project that aims to simplify remote keypresses from Network ADB protocol by using a web GUI.

## Dependencies
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- Receiver's **Network ADB/Wireless Debugging** turned on
- **ADB** from android-tools

## Installation
1. Clone this repository
```
git clone https://github.com/ki-bun/adb-remote.git
cd adb-remote
```
2. Install the necessary dependencies
```
npm install
```
3. Run server.js
```
node server.js
```
## FAQ
- **Can I use this remote with two devices at the same time?**

Yes, but both devices should not start the ADB server and connect to the same device at the same time. The other device/s should visit the URL replacing the TV's IP with the IP of the device that started the server instead.

- **Why is there a delay?**

This is due to the implementation of Network ADB in some android devices which causes the command `input keyevent` to launch a java process everytime and terminate it. Measure the latency using `time input keyevent`.

## License
This project is a free and open source project licensed under the **GNU General Public License v3.0**
