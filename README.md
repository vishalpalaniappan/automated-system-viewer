# Automated System Viewer (ASV)
This tool enables automatic visualization of system level traces as part of the Automated System Processor (ASP) framework.

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
# Automated System Processor
Start Automated System Processor(ASP) by cloning this [repo][asp-repo] and following usage instructions. It will start a websocket server which allows ASV to query the ASP database.

# Demo

If you don't want to run the ASV development server yourself, you can visit the [demo][demo-url] page and it will connect to the ASP server that is running locally on your machine.

ASP runs its own instance of the automated system viewer, so to avoid running two instances, the asp-asv-container should be stopped first.

# How does it work? 

ASV primarily visualizes information that has already been processed by the Automated System Processor. For this reason, ASV does not implement logic to process systems, instead, it implements logic to visualize the system level traces. 

![Alt text](docs/workflow_diagram.png)

To make this possiblem, ASV does the following:
- It connects to ASP's websocket server to query the ASP database.
- It creates a structure to load each system in the database along with its metadata (such as version, programs, deployments).
- It provides a user interface for selecting a system with a specified version and a specified deployment.
- It queries the database for all the traces that belong to this deployment.
- It provides a user interface to select system level traces.
- It visualizes the system level trace in the canvas using React Flow.
- It visualizes the input/output variables in the system level trace.
- It visualizes the input/output variables for the selected node in the system level trace.
- It provides a user interface to filter through the traces with key values extracted from the trace input.

Note: Once system level root cause analysis is implemented in ASP, traces that end in failures will be visualized in ASV along with the root cause of failure.

## User Interface 
An image of the current state of the application's UI is provided below:

![image](https://github.com/user-attachments/assets/e4730b09-d789-4ed0-a401-5e89f8026563)

In this image, the UI can be broken down as follows:

### System (left container):
- The top section contains a user interface for selecting a system. It provides options to select the system id, version and deployment.
- The bottom section contains the system level traces for the chosen system and it allows the user to select a trace for inspection.
- Selected traces are highlighted with a green border on the left of its row.
- This will be extended to support filtering of system level traces.

### Canvas (center container):
- The canvas in the middle contains the flow diagram of the trace that has been selected.
- The nodes in the trace can be selected to inspect the input/output values. 

### Variable Container (right container):
- The top two sections contain the input/output variable information for the entire system trace.
- The bottom two sections contain the input/output variable information for the node that is selected in the canvas.

# Providing feedback

You can use GitHub issues to [report a bug][bug-report] or [request a feature][feature-req].

[demo-url]: https://vishalpalaniappan.github.io/automated-system-viewer/
[asp-repo]: https://github.com/vishalpalaniappan/asp.git
[bug-report]: https://github.com/vishalpalaniappan/automated-system-viewer/issues
[feature-req]: https://github.com/vishalpalaniappan/automated-system-viewer/issues
