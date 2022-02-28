import React from "react";
import User from "../User/User";

class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      filteredUsers: [],
      userRefs: {},
      nameQuery: '',
      tagQuery: ''
    };

    this.getRandomUsers = this.getRandomUsers.bind(this);
    this.filterList = this.filterList.bind(this);
    this.filterUsersByName = this.filterUsersByName.bind(this);
    this.filterUsersByTag = this.filterUsersByTag.bind(this);
  }

  filterList() {
    let users = this.state.users;

    users = users.filter(user => {
      const nameCondition = (user.firstName + " " + user.lastName).toLowerCase().indexOf(this.state.nameQuery) !== -1;
      console.log(this.state.userRefs[user.id]);
      const tagCondition = (([...this.state.userRefs[user.id]?.current?.state?.tags].join()).toLowerCase().indexOf(this.state.tagQuery) !== -1);

      return nameCondition && tagCondition;
    });
    this.setState({ filteredUsers: users });
    console.log(this.state);
  }
  async getRandomUsers() {
    const res = await fetch('https://api.hatchways.io/assessment/students');
    const data = await res.json();
    return data.students;
  }

  async componentDidMount() {
    const users = await this.getRandomUsers();
    const userRefs = [];
    users.forEach(user => {
      userRefs[user.id] = React.createRef();
    });
    this.setState({ users, filteredUsers: users, userRefs });
  }

  filterUsersByName(event) {
    const nameQuery = event.target.value.toLowerCase();
    this.setState({ nameQuery }, () => this.filterList())
  }

  filterUsersByTag(event) {
    const tagQuery = event.target.value.toLowerCase();
    this.setState({ tagQuery }, () => this.filterList())
  }

  renderUsers() {
    const userList = [];
    this.state.filteredUsers.forEach((user) => {
      userList.push(<User
        ref={this.state.userRefs[user.id]}
        key={user.id}
        id={user.id}
        name={`${user.firstName} ${user.lastName}`}
        avatar={user.pic}
        email={user.email}
        city={user.city}
        company={user.company}
        skill={user.skill}
        grades={user.grades}
        average={user.grades.reduce((a, b) => parseInt(a) + parseInt(b), 0) / user.grades.length}
      />);
    });
    return userList;
  }

  render() {
    return <div>
      <input type="text" placeholder="Search by name" value={this.state.nameQuery} onChange={this.filterUsersByName} className="input" />
      <input type="text" placeholder="Search by tag" value={this.state.tagQuery} onChange={this.filterUsersByTag} className="input" />
      {this.renderUsers()}
    </div>;
  }
}

export default UserList;
