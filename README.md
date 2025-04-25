# Automated System Viewer
This tool enables automatic system level visualization using CDL files as part of the Automated System Processor (ASP) framework.

# Developing
After cloning the repo, to install the necessary libraries, use the following command:
```shell
npm i
  ```

To start a development server, run the following command:
```shell
npm start
```

To build the application, run the following command:
```shell
npm run build
```
# Websocket Server
To start the websocket server that ASV connects to, please clone this [repo][asp-repo].  

After cloning the repo, navigate to components/asp and run the system processor to generate the ASP database using the following command:
```shell
python3 SystemProcessor.py
```
This will process all the log files in the system logs folder and it will save the extracted traces to the ASP database.

To start the websocket server that ASV connects to, navigate to components/query_handler and run the following command:
```shell
python3 server.py
```
This will start a websocket server on port 8765 (ASV connects to this port).

# How does it work? 


[demo-url]: https://vishalpalaniappan.github.io/automated-system-viewer/
[asp-repo]: https://github.com/vishalpalaniappan/asp.git
