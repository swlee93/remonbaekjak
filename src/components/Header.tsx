import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { MenuContext, UserContext } from 'contexts'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import Account from './Account'
import { createPortal } from 'react-dom'
const useHeaderID = () => {
  const { currentMenu } = useContext(MenuContext)
  return useMemo<string>(() => `__header__${currentMenu?.uri}`, [currentMenu?.uri])
}
const HeaderPlace = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const headerId = useHeaderID()
  const [place, setPlace] = useState(document.getElementById(headerId))
  useEffect(() => {
    setPlace(document.getElementById(headerId))
  }, [headerId])

  if (place) {
    return createPortal(children, place)
  } else {
    return <>{children}</>
  }
}

const Header = () => {
  const {} = useContext(UserContext)

  const headerPlaceId = useHeaderID()

  return (
    <>
      <div id={headerPlaceId}></div>
      <Account />
    </>
  )
}

export { Header as default, HeaderPlace }
