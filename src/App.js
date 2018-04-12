import React, { Component } from "react";
import fetchJsonp from "fetch-jsonp";
import Suggestions from "./Suggestions";
import "./App.css";

const API_URL =
  "http://suggestqueries.google.com/complete/search?client=youtube&q=";

class Search extends Component {
  state = {
    query: "",
    results: []
  };

  getInfo = () => {
    fetchJsonp(`${API_URL} + ${this.state.query}`)
      .then(function(response) {
        return response.json();
      })
      .then(json => {
        const fetchedData = json[1];
        let suggestions = [];
        fetchedData.forEach(element => {
          suggestions.push(element[0]);
        });
        this.setState({
          results: [...suggestions]
        });
      })
      .catch(function(ex) {
        console.log("parsing failed", ex);
      });
  };

  handleInputChange = () => {
    this.setState(
      {
        query: this.search.value
      },
      () => {
        if (this.state.query && this.state.query.length > 1) {
          this.getInfo();
        }
      }
    );
  };

  render() {
    return (
      <form>
        <div className="wrap">
          <input
            className="searchbar"
            placeholder="Search for..."
            ref={input => (this.search = input)}
            onChange={this.handleInputChange}
            list="datalist"
          />
          <datalist id="datalist">
            <Suggestions results={this.state.results} />
          </datalist>
        </div>
      </form>
    );
  }
}

export default Search;
