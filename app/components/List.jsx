import React, { Component } from 'react';

export default class List extends Component {
  render() {
    let list = [];
    let boolHeaders = [ "Data is machine readable", "Data is freely available online", "Context is provided", "Available in bulk", "Up-to-date", "Incident-level data" ];
    console.log(JSON.stringify(this.props.data, null, '\t'));
    for(let department in this.props.data) {
      for (var i = 0; i < this.props.data[department].length; i++) {
        let view = this.props.data[department][i];

        // Use # ids to do TOC
        list.push(<div class="list-item" ref={department}>

            <div className="inline-items">
              <p className="data-title">Last Updated:</p>
              &nbsp;
              <p>{view["Row last updated"]}</p>
            </div>

            <div className="inline-items">
              <p className="data-title">Type of Data:</p>
              &nbsp;
              <p>{view["Type of Data"]}</p>
            </div>

            <h1>
              {view["Department"]}, {view["State"]}
            </h1>

            <div className="inline-items">
              <p>{view["Description"]}</p>
              <a href={`${view["Link"]}`}>Source</a>
            </div>

            <ul className="leaders">
              {
                boolHeaders.map(function(header) {
                  return <li>
                    <span className="data-title">{header}:</span>
                    <span>
                      <svg height="20" width="40">
                        <rect y="5" height="20" width="40" fill={view[header] == "Yes" ? "#8BDD3A" : (view[header] == "No" ? "#DD3D3A" : "#39BEFA") } />
                      </svg>
                    </span>
                  </li>
                }.bind(this))
              }
            </ul>

            {
              ["Content Available", "Fields Included", "Available downloads", "Update frequency", "Data timeline"].map((header) => {
                return <div>
                  <p className="data-title">{header}:</p>
                  <p>{view[header]}</p>
                </div>
              })
            }
        </div>);
      }
    }

    // Sort rows A-Z
    list.sort((a, b) => {
      if (a.ref > b.ref) {
        return 1;
      }
      if (a.ref < b.ref) {
        return -1;
      }
      return 0;
    });

    return <div className="list-data container">
            <div className="row">
              <div className="col-xs-12">
              {list}
              </div>
            </div>
          </div>
  }
}