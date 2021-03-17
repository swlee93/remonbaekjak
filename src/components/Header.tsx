import React, { useContext } from 'react'
import { UserContext } from 'contexts'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import Account from './Account'

const Header = () => {
  const { user } = useContext(UserContext)
  const hasUser = !!user
  return (
    <>
      Header
      <Account />
    </>
  )
}

export default Header
