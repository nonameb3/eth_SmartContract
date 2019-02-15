import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from '../routes'

export default function Header() {
  return (
    <Menu size="massive" style={{marginTop:"10px"}} >
      <Link route="/">
        <a className="item">CrowCoin</a>
      </Link>
      <Menu.Menu position="right">
        <Link route="/">
          <a className="item">Campaigns</a>
        </Link>
        <Link route="/campaigns/new">
          <a className="item">+</a>
        </Link>
      </Menu.Menu>
    </Menu>
  )
}
