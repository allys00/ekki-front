import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Input, Button } from 'antd';
import { doLogin, doRegister } from './Login.actions';
import './Login.css';

const options = [
  'Login',
  'Criar Conta'
]

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      optionSelected: 'Login',
      email: '',
      name: '',
      password: '',
      passwordConf: ''
    }
  }
  changeOption = (option) => {
    this.setState({
      optionSelected: option,
      email: '',
      name: '',
      password: '',
      passwordConf: ''
    })
  }

  render() {
    const { doLogin, doRegister } = this.props
    const { optionSelected, email, name, password, passwordConf } = this.state
    return (
      <section className="login-container">
        <div className="options">
          {options.map((option, key) => (
            <div key={key} className={`option ${optionSelected === option ? 'selected' : ''}`}
              onClick={() => this.changeOption(option)} > {option}</div>
          ))}
        </div>
        <div className="login-form">
          <Input
            value={email}
            placeholder="Email"
            onChange={({ target }) => this.setState({ email: target.value })} />
          {optionSelected === 'Criar Conta' &&
            < Input
              value={name}
              placeholder="Nome"
              onChange={({ target }) => this.setState({ name: target.value })} />
          }
          <Input
            value={password}
            type="password"
            placeholder="Senha"
            onChange={({ target }) => this.setState({ password: target.value })} />
          {optionSelected === 'Criar Conta' &&
            < Input
              value={passwordConf}
              type="password"
              placeholder="Confirmar Senha"
              onChange={({ target }) => this.setState({ passwordConf: target.value })} />
          }
          {optionSelected === 'Login' ?
            <Button type="primary" onClick={() => doLogin({ email, password })}>Entrar</Button> :
            <Button type="primary" onClick={() => doRegister({ email, name, password, passwordConf })}>Criar conta</Button>
          }
        </div>
      </section >
    );
  }
}

const mapStateToProps = ({ login }) => ({ login })

export default connect(mapStateToProps, { doLogin, doRegister })(Login);
