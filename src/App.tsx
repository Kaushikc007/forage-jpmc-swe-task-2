import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
interface IState {
  data: any[];
  showGraph: boolean;
}

/**
 * The parent element of the react app.
 * It renders title, button, and Graph react element.
 */
class App extends Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      showGraph: false,
    };
  }

  /**
   * Render Graph react component with state.data passed as property data
   */
  renderGraph() {
    if (this.state.showGraph) {
      return <Graph data={this.state.data} />;
    }
    return null;
  }

  /**
   * Get new data from server and update the state with the new data
   */
  getDataFromServer() {
    setInterval(() => {
      fetch('/api/stocks') // Adjust the endpoint based on the API you're using.
        .then((response) => response.json())
        .then((data) => {
          this.setState((prevState) => ({
            data: this.aggregateData(prevState.data, data),
          }));
        });
    }, 1000); // Polling the server every second for updates
  }

  /**
   * Aggregates data to remove duplicates and averages prices.
   */
  aggregateData(existingData: any[], newData: any[]) {
    // Handle data aggregation logic here, removing duplicates and averaging prices
    return newData; // Placeholder logic, implement accordingly
  }

  /**
   * Start streaming data and display the graph
   */
  startStreaming = () => {
    this.setState({ showGraph: true }); // Show the graph
    this.getDataFromServer(); // Start fetching data continuously
  };

  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">Bank & Merge Co Task 2</header>
        <div className="App-content">
          <button
            className="btn btn-primary Stream-button"
            onClick={this.startStreaming} // Use startStreaming method here
          >
            Start Streaming Data
          </button>
          <div className="Graph">{this.renderGraph()}</div>
        </div>
      </div>
    );
  }
}

export default App;
