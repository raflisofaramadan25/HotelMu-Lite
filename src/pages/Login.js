import Page from "./Page"
import homeView from "../templates/login.handlebars"
import "../assets/css/stylekita.css"
import $ from 'jquery'

class Login extends Page {
  constructor(params) {
    super(params)
  }

  action() {
  }

  render() {
    
    return homeView({})
  }
}

export default Login