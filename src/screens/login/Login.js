import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Input, Button } from 'antd';
import { doLogin, doRegister, forgotPassword } from './Login.actions';
import Modal from '../../components/Modal';
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

  sendForgotPassword = () => {
    this.setState({ showForgotPassword: false, emailToForgotPassword: '' })
    this.props.forgotPassword(this.state.emailToForgotPassword)
  }

  onKeyDown = ({ key }) => {
    const { email, password, optionSelected } = this.state
    if (key === 'Enter' && optionSelected === 'Login') {
      this.props.doLogin({ email, password })
    }
  }

  render() {
    const { doLogin, doRegister, login } = this.props
    const { loading_login, loading_forgot_password } = login
    const { optionSelected, email, name, password, passwordConf, showForgotPassword, emailToForgotPassword } = this.state
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
            onKeyDown={this.onKeyDown}
            placeholder="Senha"
            onChange={({ target }) => this.setState({ password: target.value })} />
          {optionSelected === 'Criar Conta' &&
            < Input
              value={passwordConf}
              type="password"
              placeholder="Confirmar Senha"
              onChange={({ target }) => this.setState({ passwordConf: target.value })} />
          }
          <div className="buttons-login">
            {optionSelected === 'Login' ?
              <Button
                type="primary"
                loading={loading_login}
                onClick={() => doLogin({ email, password })}>
                {loading_login ? 'Entrando' : 'Entrar'}</Button> :
              <Button
                type="primary"
                loading={loading_login}
                onClick={() => doRegister({ email, name, password, passwordConf })}>
                {loading_login ? 'Criando conta' : 'Criar conta'}</Button>
            }
            {optionSelected === "Login" &&
              <Button onClick={() => this.setState({ showForgotPassword: true })} loading={loading_forgot_password}>
                {loading_forgot_password ? 'Enviando email' : 'Esqueci minha senha'} </Button>}
          </div>
        </div>
        <Modal
          visible={showForgotPassword}
          onClose={() => this.setState({ showForgotPassword: false, emailToForgotPassword: '' })}
          footer={[
            <Button key="back" onClick={() => this.setState({ showForgotPassword: false, emailToForgotPassword: '' })}>Cancelar</Button>,
            <Button key="submit" onClick={() => this.sendForgotPassword()}>Enviar</Button>
          ]}
          title="Digite seu email">
          <Input
            value={emailToForgotPassword}
            onChange={({ target }) => this.setState({ emailToForgotPassword: target.value })}
            placeholder="Email" />
        </Modal>
      </section >
    );
  }
}
const mapStateToProps = ({ login }) => ({ login })

export default connect(mapStateToProps, { doLogin, doRegister, forgotPassword })(Login);
