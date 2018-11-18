import React from 'react'
import './Header.css'
const Header = ({ userLogged }) => (
  <section className="header-container">
    <h2>Usuário Logado: {userLogged.name}</h2>
  </section >
)

export default Header