import Page from "./Page"
import homeView from "../templates/profile.handlebars"
import "../assets/css/stylekita.css"
import $ from 'jquery'

class Profile extends Page {
  constructor(params) {
    super(params)
  }

  action() {
  }

  render() {
    
    return homeView({})
  }
}

export default Profile