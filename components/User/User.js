import React from "react";
import { Collapse } from "react-bootstrap";

class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      tags: new Set()
    };

    this.collapse = this.collapse.bind(this);
    this.addTag = this.addTag.bind(this);
  };

  collapse() {
    this.setState({ open: !this.state.open });
  }

  addTag(event) {
    const tagName = event.target.value.toLowerCase();
    if (event.key === 'Enter' || event.keyCode === 13) {
      this.setState({ tags: this.state.tags.add(tagName) });
      event.target.value = '';
    }
  }

  render() {
    return (
      <div className="card">
        <div className="user-info">
          <img className="circle-img" src={this.props.avatar} alt=" " />
          <h2>Name: {this.props.name}</h2>
          <p>Email: {this.props.email}</p>
          <p>City: {this.props.city}</p>
          <p>Company: {this.props.company}</p>
          <p>Skill: {this.props.skill}</p>
          <p>Grade average: {this.props.average} % </p>
          <i className={(!this.state.open) ? "fa fa-plus fa-5x custom-icon" : "fa fa-minus fa-3x custom-icon"} onClick={this.collapse} aria-controls={this.props.id} aria-expanded={this.state.open}> </i>
          <Collapse in={this.state.open}>
            <div id={this.props.id}>
              <ul className="grades">Grades:
                {this.props.grades.map((grade, index) => {
                  return <ol key={index}>Test {++index} - {grade}</ol>
                })}
              </ul>
            </div>
          </Collapse>
          <div className="tags">{[...this.state.tags].map((tag, index) => <div key={index} className="tag">{tag}</div>)}</div>
          <input type="text" placeholder="Add tag" value={this.state.tagName} onKeyUp={this.addTag} className="input" />
        </div>
      </div>
    )
  }
}

export default User;