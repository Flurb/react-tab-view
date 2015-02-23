/** @jsx React.DOM */

var React = require('react');

/**
 * Tabs module
 * A simple tab component.
**/

var Tabs = React.createClass({
  getInitialState: function(){
     return {
       headers: this.props.headers
     }
  },
  componentDidMount: function() {
    // set 1st tab and tab header as active
    var tabs = this.refs.tabs.getDOMNode().children[0].className = "react-tab";
    this.refs['list0'].getDOMNode().className = "pure-menu-selected";
  },
  componentWillUnmount: function() {
  },  
  /** 
   * Tab has changed 
  **/
  changeTab: function (e) {
    var id = e.target.getAttribute('data-tab-id');
    this.setActiveTab(id);

    var list = e.target.parentElement.parentElement.children;
    this.setActiveTabHeader(list,id);
  },
  /** 
   * Set the active tab by id 
  **/
  setActiveTab: function (id) {
    // hide all tab content    
    var tabs = this.refs.tabs.getDOMNode().children;
    for(var i = 0; i < tabs.length; i++){
      tabs[i].className = "react-tab hidden";
    }
    // set selected tab content as visible
    tabs[id].className = "react-tab";    
  },
  /** 
   * Set the active tab header in the list by id 
  **/  
  setActiveTabHeader: function (list, id) {
    // set all headings as deselected
    for(var i = 0; i < list.length; i++){
      list[i].className = "pure-menu";
    }
    // set selected heading as selected
    list[id].className = "pure-menu-selected";    
  },
  render: function(){

    var headers = this.state.headers.map(function (h, i) {
      return (
        <li ref={'list' + i} className="pure-menu">
          <a data-tab-id={i} onClick={this.changeTab}>
            {h}
          </a>
        </li>
      );
    }.bind(this));

    return (
      <div className="react-tabs">
        <div className="pure-menu pure-menu-open pure-menu-horizontal">
            <ul>
                {headers}
            </ul>
        </div>
        
        <div className="pure-g">
            <div className="pure-u-1-1" ref="tabs">
              {this.props.children}                           
            </div>
        </div>
      </div>
    );
  }

});

module.exports = Tabs;
